package dev.willcs.fantastic_engine.model.modelling

data class Point4D(val x: Double, val y: Double, val z: Double, val w: Double)

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

/**
 *  Quick solution thanks to willnode's answer
 *  https://stackoverflow.com/a/44446912
 *  on stackoverflow
 */
fun invert4x4Matrix(m: DoubleArray): DoubleArray {
    var A2323 = m[4 * 2 + 2] * m[4 * 3 + 3] - m[4 * 2 + 3] * m[4 * 3 + 2] 
    var A1323 = m[4 * 2 + 1] * m[4 * 3 + 3] - m[4 * 2 + 3] * m[4 * 3 + 1] 
    var A1223 = m[4 * 2 + 1] * m[4 * 3 + 3] - m[4 * 2 + 2] * m[4 * 3 + 1] 
    var A0323 = m[4 * 2 + 0] * m[4 * 3 + 3] - m[4 * 2 + 3] * m[4 * 3 + 0] 
    var A0223 = m[4 * 2 + 0] * m[4 * 3 + 3] - m[4 * 2 + 2] * m[4 * 3 + 0] 
    var A0123 = m[4 * 2 + 0] * m[4 * 3 + 3] - m[4 * 2 + 1] * m[4 * 3 + 0] 
    var A2313 = m[4 * 1 + 2] * m[4 * 3 + 3] - m[4 * 1 + 3] * m[4 * 3 + 2] 
    var A1313 = m[4 * 1 + 1] * m[4 * 3 + 3] - m[4 * 1 + 3] * m[4 * 3 + 1] 
    var A1213 = m[4 * 1 + 1] * m[4 * 3 + 3] - m[4 * 1 + 2] * m[4 * 3 + 1] 
    var A2312 = m[4 * 1 + 2] * m[4 * 2 + 2] - m[4 * 1 + 3] * m[4 * 2 + 2] 
    var A1312 = m[4 * 1 + 1] * m[4 * 2 + 2] - m[4 * 1 + 3] * m[4 * 2 + 1] 
    var A1212 = m[4 * 1 + 1] * m[4 * 2 + 2] - m[4 * 1 + 2] * m[4 * 2 + 1] 
    var A0313 = m[4 * 1 + 0] * m[4 * 3 + 3] - m[4 * 1 + 3] * m[4 * 3 + 0] 
    var A0213 = m[4 * 1 + 0] * m[4 * 3 + 3] - m[4 * 1 + 2] * m[4 * 3 + 0] 
    var A0312 = m[4 * 1 + 0] * m[4 * 2 + 2] - m[4 * 1 + 3] * m[4 * 2 + 0] 
    var A0212 = m[4 * 1 + 0] * m[4 * 2 + 2] - m[4 * 1 + 2] * m[4 * 2 + 0] 
    var A0113 = m[4 * 1 + 0] * m[4 * 3 + 3] - m[4 * 1 + 1] * m[4 * 3 + 0] 
    var A0112 = m[4 * 1 + 0] * m[4 * 2 + 2] - m[4 * 1 + 1] * m[4 * 2 + 0] 

    var det = m[4 * 0 + 0] * ( m[4 * 1 + 1] * A2323 - m[4 * 1 + 2] * A1323 + m[4 * 1 + 3] * A1223 ) 
        - m[4 * 0 + 1] * ( m[4 * 1 + 0] * A2323 - m[4 * 1 + 2] * A0323 + m[4 * 1 + 3] * A0223 ) 
        + m[4 * 0 + 2] * ( m[4 * 1 + 0] * A1323 - m[4 * 1 + 1] * A0323 + m[4 * 1 + 3] * A0123 ) 
        - m[4 * 0 + 3] * ( m[4 * 1 + 0] * A1223 - m[4 * 1 + 1] * A0223 + m[4 * 1 + 2] * A0123 ) 
    det = 1 / det

    return doubleArrayOf(
        det *   ( m[4 * 1 + 1] * A2323 - m[4 * 1 + 2] * A1323 + m[4 * 1 + 3] * A1223 ),
        det * - ( m[4 * 0 + 1] * A2323 - m[4 * 0 + 2] * A1323 + m[4 * 0 + 3] * A1223 ),
        det *   ( m[4 * 0 + 1] * A2313 - m[4 * 0 + 2] * A1313 + m[4 * 0 + 3] * A1213 ),
        det * - ( m[4 * 0 + 1] * A2312 - m[4 * 0 + 2] * A1312 + m[4 * 0 + 3] * A1212 ),
        det * - ( m[4 * 1 + 0] * A2323 - m[4 * 1 + 2] * A0323 + m[4 * 1 + 3] * A0223 ),
        det *   ( m[4 * 0 + 0] * A2323 - m[4 * 0 + 2] * A0323 + m[4 * 0 + 3] * A0223 ),
        det * - ( m[4 * 0 + 0] * A2313 - m[4 * 0 + 2] * A0313 + m[4 * 0 + 3] * A0213 ),
        det *   ( m[4 * 0 + 0] * A2312 - m[4 * 0 + 2] * A0312 + m[4 * 0 + 3] * A0212 ),
        det *   ( m[4 * 1 + 0] * A1323 - m[4 * 1 + 1] * A0323 + m[4 * 1 + 3] * A0123 ),
        det * - ( m[4 * 0 + 0] * A1323 - m[4 * 0 + 1] * A0323 + m[4 * 0 + 3] * A0123 ),
        det *   ( m[4 * 0 + 0] * A1313 - m[4 * 0 + 1] * A0313 + m[4 * 0 + 3] * A0113 ),
        det * - ( m[4 * 0 + 0] * A1312 - m[4 * 0 + 1] * A0312 + m[4 * 0 + 3] * A0112 ),
        det * - ( m[4 * 1 + 0] * A1223 - m[4 * 1 + 1] * A0223 + m[4 * 1 + 2] * A0123 ),
        det *   ( m[4 * 0 + 0] * A1223 - m[4 * 0 + 1] * A0223 + m[4 * 0 + 2] * A0123 ),
        det * - ( m[4 * 0 + 0] * A1213 - m[4 * 0 + 1] * A0213 + m[4 * 0 + 2] * A0113 ),
        det *   ( m[4 * 0 + 0] * A1212 - m[4 * 0 + 1] * A0212 + m[4 * 0 + 2] * A0112 )
    )
}

fun multiplyMat4ByVec4(m: DoubleArray, vec: Point4D): Point4D = Point4D(
    m[0 + 0]  * vec.x + m[0 + 1]  * vec.y + m[0 + 2]  * vec.z + m[0 + 3]  * vec.w,
    m[4 + 0]  * vec.x + m[4 + 1]  * vec.y + m[4 + 2]  * vec.z + m[4 + 3]  * vec.w,
    m[8 + 0]  * vec.x + m[8 + 1]  * vec.y + m[8 + 2]  * vec.z + m[8 + 3]  * vec.w,
    m[12 + 0] * vec.x + m[12 + 1] * vec.y + m[12 + 2] * vec.z + m[12 + 3] * vec.w
)