package dev.willcs.fantastic_engine.view

import com.jogamp.opengl.*
import com.jogamp.opengl.awt.GLJPanel
import com.jogamp.opengl.glu.GLU
import com.jogamp.opengl.util.gl2.GLUT
import com.jogamp.opengl.util.Animator
import javafx.scene.input.KeyEvent
import javafx.scene.input.MouseEvent
import javafx.scene.input.MouseButton
import javafx.scene.input.KeyCode
import javafx.event.EventHandler
import javafx.event.EventType
import javafx.stage.WindowEvent
import javafx.embed.swing.SwingNode
import tornadofx.*
import dev.willcs.fantastic_engine.view.graphics.ModelRenderer
import dev.willcs.fantastic_engine.view.graphics.renderBackdrop
import dev.willcs.fantastic_engine.view.graphics.OrbitalCamera
import dev.willcs.fantastic_engine.controller.ModelProvider
import dev.willcs.fantastic_engine.controller.event.RayCastEvent
import dev.willcs.fantastic_engine.controller.event.ModelChangedEvent
import dev.willcs.fantastic_engine.model.Ray
import dev.willcs.fantastic_engine.model.modelling.Model
import dev.willcs.fantastic_engine.model.Vector3
import dev.willcs.fantastic_engine.model.Vector4
import dev.willcs.fantastic_engine.model.Vector2
import dev.willcs.fantastic_engine.model.Vector2I
import dev.willcs.fantastic_engine.model.multiplyMat4ByVec4
import dev.willcs.fantastic_engine.model.ModelTypeRegistry

/*  Thanks to Pixel on StackOverflow for their solution that helped 
 *  me figure this out - https://stackoverflow.com/a/58434114 */

class GraphicsView : View() {
    private val modelProvider: ModelProvider by inject()
    private val renderer: Renderer
    private val animator: Animator

    override val root = stackpane {
        keyboard {
            addEventFilter(KeyEvent.KEY_PRESSED) { event ->
                this@GraphicsView.getRenderer().doStuff(event.code)
            }
        }

        addEventFilter(MouseEvent.MOUSE_CLICKED) { event ->
            val ray = this@GraphicsView.castRay(Vector2I(
                event.pickResult.intersectedPoint.x.toInt(),
                event.pickResult.intersectedPoint.y.toInt()))
            fire(RayCastEvent(ray))
        }

        addEventFilter(MouseEvent.MOUSE_PRESSED) { event ->
            if (event.button == MouseButton.MIDDLE) {
                this@GraphicsView.getRenderer().beginPanning(Vector2(
                    event.pickResult.intersectedPoint.x,
                    event.pickResult.intersectedPoint.y))
            }
        }

        addEventFilter(MouseEvent.MOUSE_DRAGGED) { event ->
            if (event.button == MouseButton.MIDDLE) {
                this@GraphicsView.getRenderer().pan(Vector2(
                    event.pickResult.intersectedPoint.x,
                    event.pickResult.intersectedPoint.y))
            }
        }

        addEventFilter(MouseEvent.MOUSE_RELEASED) { event ->
            if (event.button == MouseButton.MIDDLE) {
                this@GraphicsView.getRenderer().endPanning(Vector2(
                    event.pickResult.intersectedPoint.x,
                    event.pickResult.intersectedPoint.y))
            }
        }
    }

    private fun castRay(fromLocation: Vector2I): Ray {
        return this.getRenderer().castRay(fromLocation)
    }

    private fun getRenderer(): Renderer {
        return this.renderer
    }

    init {
        val swingNode = SwingNode()
        val glProfile = GLProfile.get(GLProfile.GL2)
        val glCapabilities = GLCapabilities(glProfile)
        val jPanel = GLJPanel(glCapabilities)
        
        this.renderer = Renderer(this.modelProvider.getModel())
        this.animator = Animator(jPanel)
        this.animator.start()

        jPanel.addGLEventListener(this.renderer)

        swingNode.content = jPanel

        this.root.children.add(swingNode)

        subscribe<ModelChangedEvent> { event ->
            this@GraphicsView.renderer.setModel(this@GraphicsView.modelProvider.getModel())
        }
    }

    override fun onDock() {
        this.currentWindow?.setOnCloseRequest {
            this.stop()
        }
    }

    fun stop() {
        this.animator.stop()
    }
}

private class Renderer(model: Model) : GLEventListener {
    private var model: Model = model
    private var renderModel: ModelRenderer = ModelTypeRegistry.getRenderer(model::class)
    private val camera: OrbitalCamera = OrbitalCamera(Vector3(0.0, 0.0, 0.0), Math.PI / 4, 3 * Math.PI / 4, 500.0)
    private val glu:  GLU  = GLU()
    private val glut: GLUT = GLUT()
    private var cameraChanged = false

    private var panningCamera = false
    private var panStart = Vector2(0.0, 0.0)
    private var cameraStartAngles = Vector2(0.0, 0.0)

    /**
     * Set the model to render. We want to automatically update the model
     * renderer when this happens.
     */
    fun setModel(model: Model) {
        this.renderModel = ModelTypeRegistry.getRenderer(model::class)
        this.model = model
    }

    /**
     *  Used to cast a ray out from the camera at a given position in screen,
     *  given in pixel coordinates from the top left. Returns the ray.
     */
    fun castRay(screenPoint: Vector2I): Ray {
        val normalisedX = (2.0 * screenPoint.x) / this.camera.getViewportWidth() - 1.0
        val normalisedY = 1.0 - (2.0 * screenPoint.y) / this.camera.getViewportHeight()

        val rayClip = Vector4(normalisedX, normalisedY, -1.0, 1.0)

        val inverseProjection = this.camera.getInverseProjection()

        val invertedClip = multiplyMat4ByVec4(inverseProjection, rayClip)

        val eye = Vector4(invertedClip.x, invertedClip.y, -1.0, 0.0)

        val inverseViewTransform = this.camera.getInverseViewTransform()
        val rayDirection = multiplyMat4ByVec4(inverseViewTransform, eye)
        val normalisedRayDirection = Vector3(
            rayDirection.x, rayDirection.y, rayDirection.z
        ).getNormal()

        return Ray(this.camera.getCameraLocation(), normalisedRayDirection)
    }

    fun beginPanning(point: Vector2) {
        if (!this.panningCamera) {

            this.panningCamera = true
            this.panStart = point

            this.cameraStartAngles = Vector2(
                this.camera.getAzimuth(), this.camera.getInclination()
            )
        }
    }

    fun pan(point: Vector2) {
        if (this.panningCamera) {

            val newAngles = this.cameraStartAngles - (panStart - point) * 0.005

            this.camera.setAzimuth(newAngles.x)
            this.camera.setInclination(newAngles.y)

            this.cameraChanged = true
        }
    }

    fun endPanning(point: Vector2) {
        if (this.panningCamera) {
            this.panningCamera = false
        }
    }

    /**
     * Testing!
     */
    fun doStuff(key: KeyCode) {
        println(key)
        
        // when (key) {
        //     KeyCode.LEFT   -> camera.azimuth     += 0.01
        //     KeyCode.RIGHT  -> camera.azimuth     -= 0.01
        //     KeyCode.UP     -> camera.inclination -= 0.01
        //     KeyCode.DOWN   -> camera.inclination += 0.01
        //     KeyCode.EQUALS -> camera.radius      -= 1
        //     KeyCode.MINUS  -> camera.radius      += 1
        //     else -> Unit
        // }

        this.cameraChanged = true
    }

    override fun reshape(autoDrawable: GLAutoDrawable, 
            x: Int, y: Int, width: Int, height: Int) {
        val gl2Instance = autoDrawable.getGL().getGL2()

        this.camera.reshapeViewport(x, y, width, height, gl2Instance)
        this.camera.setFov(Math.PI / 2, gl2Instance)
        this.camera.lookAtOrigin(gl2Instance)
    }

    override fun init(autoDrawable: GLAutoDrawable) {}

    override fun dispose(autoDrawable: GLAutoDrawable) {}

    override fun display(autoDrawable: GLAutoDrawable) {
        val gl2Instance = autoDrawable.getGL().getGL2()

        if (this.cameraChanged) {
            this.camera.lookAtOrigin(gl2Instance)
        }

        // Set the background to sky blue
        gl2Instance.glClearColor(135 / 255F, 206 / 255F, 235 / 255F, 0F)
        gl2Instance.glClear(GL2.GL_COLOR_BUFFER_BIT or GL2.GL_DEPTH_BUFFER_BIT)
        gl2Instance.glClearDepth(1.0)
        
        gl2Instance.glEnable(GL2.GL_DEPTH_TEST)

        renderBackdrop(gl2Instance)
        
        gl2Instance.glEnable(GL2.GL_LIGHTING)
        gl2Instance.glEnable(GL2.GL_LIGHT0)
        gl2Instance.glEnable(GL2.GL_COLOR_MATERIAL)

        gl2Instance.glColor3f(1.0F, 1.0F, 1.0F)
        this.glut.glutSolidCube(1F)

        this.renderModel(this.model, gl2Instance)

        gl2Instance.glDisable(GL2.GL_DEPTH_TEST)
        gl2Instance.glDisable(GL2.GL_LIGHTING)
        gl2Instance.glDisable(GL2.GL_LIGHT0)
        gl2Instance.glDisable(GL2.GL_COLOR_MATERIAL)
    }
}
