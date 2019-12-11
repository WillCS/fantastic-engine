package dev.willcs.fantastic_engine.model

import com.beust.klaxon.Json

data class Model(
    var parent:           String,

    @Json(name = "display")
    var displayTypes:     List<DisplayType>,

    var textures:         List<Texture>,
    var elements:         List<Element>,

    @Json(name = "ambientocclusion")
    var ambientOcclusion: Boolean = true
)

data class Element(
    @Json(name = "__comment")
    var comment:  String,

    var from:     Point3D,
    var to:       Point3D,
    var faces:    Map<BlockFace, ElementFace>,
    var rotation: Rotation,
    var shade:    Boolean = true
)

data class Rotation(
    val origin:  Point3D,
    val axis:    Axis,
    val angle:   ElementRotation,
    val rescale: Boolean = false
)

data class DisplayType(
    val display:     DisplayPosition,
    val rotation:    Point3D,
    val translation: Point3D,
    val scale:       Point3D
)

data class ElementFace(
    val uvCoords:        Rect2D,
    val texture:         Texture,
    val textureRotation: TextureRotation,

    @Json(name = "cullface")
    val cullface:        BlockFace,
    
    @Json(name = "tintindex")
    val tintIndex:       Boolean = false
)

data class Texture(
    val id: String
)

enum class BlockFace {
    DOWN, UP, NORTH, SOUTH, WEST, EAST
}

enum class TextureRotation(val rotation: Int) {
    NONE(0),
    QUARTER(90),
    HALF(180),
    THREE_QUARTERS(270)
}

enum class DisplayPosition(val displayType: String) {
    THIRDPERSON_RIGHTHAND("thirdperson_righthand"),
    THIRDPERSON_LEFTHAND("thirdperson_lefthand"),
    FIRSTPERSON_RIGHTHAND("firstperson_righthand"),
    FIRSTPERSON_LEFTHAND("firstperson_lefthand"),
    GUI("gui"),
    HEAD("head"),
    GROUND("ground"),
    FIXED("fixed")
}

enum class Axis {
    X, Y, Z
}

enum class ElementRotation(val rotation: Double) {
    NEGATIVE(-45.0),
    HALF_NEGATIVE(-22.5),
    NONE(0.0),
    HALF_POSITIVE(22.5),
    POSITIVE(45.0)
}
