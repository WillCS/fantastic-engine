package dev.willcs.fantastic_engine.view.graphics

import com.jogamp.opengl.glu.GLU
import com.jogamp.opengl.GL2
import dev.willcs.fantastic_engine.model.Vector3
import dev.willcs.fantastic_engine.model.Vector4
import dev.willcs.fantastic_engine.model.invert4x4Matrix

/**
 *  Simple object encapsulating the camera used for the 3D view.
 *  Used to simplify manipulation of the view and calculation of
 *  view and projection matrices.
 */
class OrbitalCamera(
        private var origin: Vector3,
        private var azimuth: Double,
        private var inclination: Double,
        private var radius: Double) {
    private val glu: GLU = GLU()
    private var aspectRatio: Double = 1.0

    private var width  = 0
    private var height = 0

    private var viewTransform:            DoubleArray = DoubleArray(16)
    private var inverseViewTransform:     DoubleArray = DoubleArray(16)
    private var projection:               DoubleArray = DoubleArray(16)
    private var inverseProjection:        DoubleArray = DoubleArray(16)
    private var viewport:                 IntArray    = IntArray(4)

    fun unproject(x: Double, y: Double, z: Double): Vector3 {
        var outArray = DoubleArray(3)
        this.glu.gluUnProject(x, y, z,
            this.viewTransform,  0,
            this.projection,     0,
            this.viewport,       0,
            outArray,            0)
        return Vector3(outArray[0], outArray[1], outArray[2])
    }

    fun getAzimuth(): Double {
        return this.azimuth
    }

    fun getInclination(): Double {
        return this.inclination
    }

    fun getRadius(): Double {
        return this.radius
    }

    fun setAzimuth(azimuth: Double) {
        this.azimuth = azimuth
    }

    fun setInclination(inclination: Double) {
        var clampedInclination = inclination

        if (clampedInclination <= Math.PI / 20) {
            clampedInclination = Math.PI / 20
        } else if (clampedInclination >= 19 * Math.PI / 20) {
            clampedInclination = 19 * Math.PI / 20
        }

        this.inclination = clampedInclination
    }

    fun setRadius(radius: Double) {
        this.radius = radius
    }

    fun getViewTransform(): DoubleArray {
        return this.viewTransform
    }

    fun getInverseViewTransform(): DoubleArray {
        return this.viewTransform
    }

    fun getProjection(): DoubleArray {
        return this.projection
    }

    fun getInverseProjection(): DoubleArray {
        return this.inverseProjection
    }

    fun getViewport(): IntArray {
        return this.viewport
    }

    fun getViewportWidth():  Int = this.width

    fun getViewportHeight(): Int = this.height

    fun getOrigin(): Vector3 = this.origin

    /**
     *  Get the location of the camera, in grid coordinates.
     *  Internally, the camera uses a spherical coordinate system
     *  so we transform them to get the grid coordinates that OpenGL
     *  uses.
     */
    fun getCameraLocation(): Vector3 = Vector3(
        this.origin.x + this.radius * Math.cos(this.azimuth) * Math.sin(this.inclination),
        this.origin.y + this.radius * Math.cos(this.inclination),
        this.origin.z + this.radius * Math.sin(this.azimuth) * Math.sin(this.inclination)
    )

    fun getLookDirection(): Vector3 = 
        this.getCameraLocation().let { location ->
            Vector3(
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
    fun getUpDirection(): Vector3 = this.getLookDirection().negate().let {
        orbitNormal -> Vector3(
            Math.cos(this.azimuth - (Math.PI / 2)),
            0.0,
            Math.sin(this.azimuth - (Math.PI / 2))
        ).let { bisection ->
            Vector3(
                  orbitNormal.y * bisection.z - orbitNormal.z * bisection.y,
                -(orbitNormal.x * bisection.z - orbitNormal.z * bisection.x),
                  orbitNormal.x * bisection.y - orbitNormal.y * bisection.x
            )
        }
    }.getNormal()

    fun setOrigin(origin: Vector3) {
        this.origin = origin
    }

    fun setFov(fov: Double, glInstance: GL2) {
        glInstance.glMatrixMode(GL2.GL_PROJECTION)
        glInstance.glLoadIdentity()

        this.glu.gluPerspective(fov, this.aspectRatio, 1.0, 1000.0)

        glInstance.glGetDoublev(GL2.GL_PROJECTION_MATRIX, this.projection, 0)
        this.inverseProjection = invert4x4Matrix(this.projection)
    }

    fun reshapeViewport(x: Int, y: Int, width: Int, height: Int, glInstance: GL2) {
        this.aspectRatio = width / height.toDouble()
        this.width       = width
        this.height      = height

        glInstance.glMatrixMode(GL2.GL_VIEWPORT)
        glInstance.glLoadIdentity()

        glInstance.glViewport(x, y, width, height)

        glInstance.glGetIntegerv(GL2.GL_VIEWPORT, this.viewport, 0)
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

        glInstance.glGetDoublev(GL2.GL_MODELVIEW_MATRIX, this.viewTransform, 0)
        this.inverseViewTransform = invert4x4Matrix(this.viewTransform)
    }
}