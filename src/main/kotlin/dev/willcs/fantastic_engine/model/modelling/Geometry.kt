package dev.willcs.fantastic_engine.model.modelling

data class Point3D(val x: Double, val y: Double, val z: Double) {
    fun getMagnitude(): Double = Math.sqrt(
        this.x * this.x + this.y * this.y + this.z * this.z)

    fun getNormal(): Point3D = this.getMagnitude().let { magnitude ->
        Point3D(this.x / magnitude, this.y / magnitude, this.z / magnitude)
    }

    fun negate(): Point3D = Point3D(-1 * this.x, -1 * this.y, -1 * this.z)
}

data class Point2D(val x: Double, val y: Double)

data class Rect2D(val point1: Point2D, val point2: Point2D) {
    constructor(
            x1: Double, y1: Double,
            x2: Double, y2: Double): this(
        Point2D(x1, y1), Point2D(x2, y2))
}

data class Volume3D(val point1: Point3D, val point2: Point3D) {
    constructor(
            x1: Double, y1: Double, z1: Double,
            x2: Double, y2: Double, z2: Double): this(
        Point3D(x1, y1, z1), Point3D(x2, y2, z2))
}

data class Point3DI(val x: Int, val y: Int, val z: Int)

data class Point2DI(val x: Int, val y: Int)
