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
    
    fun unproject(screenPoint: Point2DI, glInstance: GL2): Point3D
        = this.unproject(screenPoint.x, screenPoint.y, glInstance)
    
    fun unproject(screenX: Int, screenY: Int, glInstance: GL2): Point3D {
        var outCoords: DoubleArray = DoubleArray(3)
        this.glu.gluUnProject(
                screenX.toDouble(), screenY.toDouble(), 0.0, 
                this.getModelTransform(glInstance), 0, 
                this.getProjection(glInstance),     0, 
                this.getViewport(glInstance),       0, 
                outCoords,                0)
        return Point3D(outCoords[0], outCoords[1], outCoords[2])
    }

    fun getModelTransform(glInstance: GL2): DoubleArray {
        var outArray: DoubleArray = DoubleArray(16)
        glInstance.glGetDoublev(GL2.GL_MODELVIEW, outArray, 0)
        return outArray
    }

    fun getProjection(glInstance: GL2): DoubleArray {
        var outArray: DoubleArray = DoubleArray(16)
        glInstance.glGetDoublev(GL2.GL_PROJECTION, outArray, 0)
        return outArray
    }

    fun getViewport(glInstance: GL2): IntArray {
        var outArray: IntArray = IntArray(16)
        glInstance.glGetIntegerv(GL2.GL_VIEWPORT, outArray, 0)
        return outArray
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

    fun setOrigin(origin: Point3D, glInstance: GL2) {
        this.origin = origin
    }

    fun setFov(fov: Double, glInstance: GL2) {
        glInstance.glMatrixMode(GL2.GL_PROJECTION)
        glInstance.glLoadIdentity()

        this.glu.gluPerspective(fov, this.aspectRatio, 1.0, 100.0)
    }

    fun reshapeViewport(x: Int, y: Int, width: Int, height: Int, glInstance: GL2) {
        this.aspectRatio = width / height.toDouble()

        glInstance.glMatrixMode(GL2.GL_VIEWPORT)
        glInstance.glLoadIdentity()

        glInstance.glViewport(x, y, width, height)
    }

    fun beginFrame(glInstance: GL2) {
        glInstance.glMatrixMode(GL2.GL_MODELVIEW)
        glInstance.glLoadIdentity()

        val cameraPos   = this.getCameraLocation()
        val upDirection = this.getUpDirection()

        this.glu.gluLookAt(
           -cameraPos.x,  -cameraPos.y,  -cameraPos.z,
            this.origin.x, this.origin.y, this.origin.z,
            upDirection.x, upDirection.y, upDirection.z)
    }
}