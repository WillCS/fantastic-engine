package dev.willcs.fantastic_engine.view.graphics

import com.jogamp.opengl.glu.GLU
import com.jogamp.opengl.GL2
import dev.willcs.fantastic_engine.model.modelling.Point3D
import dev.willcs.fantastic_engine.model.modelling.Point2DI

/**
 *  Simple object encapsulating the camera used for the 3D view.
 *  Used to simplify manipulation of the view and calculation of
 *  view and projection matrices.
 */
class OrbitalCamera(
        private var origin: Point3D,
        var azimuth: Double,
        var inclination: Double,
        var radius: Double) {
    private val glu: GLU = GLU()
    private var aspectRatio: Double = 1.0

    private var modelTransform: DoubleArray = DoubleArray(16)
    private var projection:     DoubleArray = DoubleArray(16)
    private var viewport:       IntArray    = IntArray(16)

    fun getModelTransform(glInstance: GL2): DoubleArray {
        glInstance.glGetDoublev(GL2.GL_MODELVIEW, this.modelTransform, 0)
        return this.modelTransform
    }

    fun getProjection(glInstance: GL2): DoubleArray {
        glInstance.glGetDoublev(GL2.GL_PROJECTION, this.projection, 0)
        return this.projection
    }

    fun getViewport(glInstance: GL2): IntArray {
        glInstance.glGetIntegerv(GL2.GL_VIEWPORT, this.viewport, 0)
        return this.viewport
    }

    fun getOrigin(): Point3D = this.origin

    /**
     *  Get the location of the camera, in grid coordinates.
     *  Internally, the camera uses a spherical coordinate system
     *  so we transform them to get the grid coordinates that OpenGL
     *  uses.
     */
    fun getCameraLocation(): Point3D = Point3D(
        this.origin.x + this.radius * Math.cos(this.azimuth) * Math.sin(this.inclination),
        this.origin.y + this.radius * Math.cos(this.inclination),
        this.origin.z + this.radius * Math.sin(this.azimuth) * Math.sin(this.inclination)
    )

    fun getLookDirection(): Point3D = 
        this.getCameraLocation().let { location ->
            Point3D(
                this.origin.x - location.x,
                this.origin.y - location.y,
                this.origin.z - location.z
            )
        }.getNormal()

    /***
     *  Fun linear algebra - refer to
     *  https://github.com/WillCS/angular-planets/blob/master/src/app/camera.ts#L304
     *  for more details.
     */
    fun getUpDirection(): Point3D = this.getLookDirection().negate().let {
        orbitNormal -> Point3D(
            Math.cos(this.azimuth - (Math.PI / 2)),
            0.0,
            Math.sin(this.azimuth - (Math.PI / 2))
        ).let { bisection ->
            Point3D(
                  orbitNormal.y * bisection.z - orbitNormal.z * bisection.y,
                -(orbitNormal.x * bisection.z - orbitNormal.z * bisection.x),
                  orbitNormal.x * bisection.y - orbitNormal.y * bisection.x
            )
        }
    }.getNormal()

    fun setOrigin(origin: Point3D) {
        this.origin = origin
    }

    fun setFov(fov: Double, glInstance: GL2) {
        glInstance.glMatrixMode(GL2.GL_PROJECTION)
        glInstance.glLoadIdentity()

        this.glu.gluPerspective(fov, this.aspectRatio, 1.0, 100.0)

        this.getProjection(glInstance)
    }

    fun reshapeViewport(x: Int, y: Int, width: Int, height: Int, glInstance: GL2) {
        this.aspectRatio = width / height.toDouble()

        glInstance.glMatrixMode(GL2.GL_VIEWPORT)
        glInstance.glLoadIdentity()

        glInstance.glViewport(x, y, width, height)

        this.getViewport(glInstance)
    }

    fun lookAtOrigin(glInstance: GL2) {
        glInstance.glMatrixMode(GL2.GL_MODELVIEW)
        glInstance.glLoadIdentity()

        val cameraPos   = this.getCameraLocation()
        val upDirection = this.getUpDirection()

        this.glu.gluLookAt(
           -cameraPos.x,  -cameraPos.y,  -cameraPos.z,
            this.origin.x, this.origin.y, this.origin.z,
            upDirection.x, upDirection.y, upDirection.z)

        this.getModelTransform(glInstance)
    }
}