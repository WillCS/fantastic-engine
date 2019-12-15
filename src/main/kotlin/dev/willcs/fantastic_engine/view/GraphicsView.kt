package dev.willcs.fantastic_engine.view

import com.jogamp.opengl.*
import com.jogamp.opengl.awt.GLJPanel
import com.jogamp.opengl.glu.GLU
import javafx.embed.swing.SwingNode
import tornadofx.*
import dev.willcs.fantastic_engine.view.graphics.ModelRenderer
import dev.willcs.fantastic_engine.controller.ModelProvider
import dev.willcs.fantastic_engine.controller.event.ModelChangedEvent
import dev.willcs.fantastic_engine.model.modelling.Model
import dev.willcs.fantastic_engine.model.ModelTypeRegistry

/*  Thanks to Pixel on StackOverflow for their solution that helped 
 *  me figure this out - https://stackoverflow.com/a/58434114 */

class GraphicsView : View() {
    private val modelProvider: ModelProvider by inject()

    override val root = stackpane {}

    init {
        val swingNode = SwingNode()
        val glProfile = GLProfile.get(GLProfile.GL2)
        val glCapabilities = GLCapabilities(glProfile)
        val jPanel = GLJPanel(glCapabilities)

        jPanel.addGLEventListener(Renderer)

        swingNode.content = jPanel

        this.root.children.add(swingNode)

        Renderer.setModel(this.modelProvider.getModel())

        subscribe<ModelChangedEvent> { event ->
            Renderer.setModel(this@GraphicsView.modelProvider.getModel())
        }
    }
}

private object Renderer : GLEventListener {
    private var renderModel: ModelRenderer? = null
    private var model: Model? = null

    fun setModel(model: Model) {
        Renderer.renderModel = ModelTypeRegistry.getRenderer(model::class)
        println(model::class)
        println(Renderer.model)
        Renderer.model = model
    }

    override fun reshape(autoDrawable: GLAutoDrawable, 
            x: Int, y: Int, width: Int, height: Int) {
        val gl2Instance = autoDrawable.getGL().getGL2()
        
        gl2Instance.glMatrixMode(GL2.GL_PROJECTION)
        gl2Instance.glLoadIdentity()

        val gluInstance = GLU()
        gluInstance.gluOrtho2D(0.0F, width.toFloat(), 0.0F, height.toFloat())

        gl2Instance.glMatrixMode(GL2.GL_MODELVIEW)
        gl2Instance.glLoadIdentity()

        gl2Instance.glViewport(0, 0, width, height)
    }

    override fun init(autoDrawable: GLAutoDrawable) {}

    override fun dispose(autoDrawable: GLAutoDrawable) {}

    override fun display(autoDrawable: GLAutoDrawable) {
        val gl2Instance = autoDrawable.getGL().getGL2()

        gl2Instance.glClear(GL.GL_COLOR_BUFFER_BIT)

        if (Renderer.model != null) {
            Renderer.renderModel?.invoke(Renderer.model!!, gl2Instance)
        }
    }
}
