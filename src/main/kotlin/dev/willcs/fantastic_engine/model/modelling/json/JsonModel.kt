package dev.willcs.fantastic_engine.model.modelling.json

import com.beust.klaxon.Json
import dev.willcs.fantastic_engine.math.Vector3
import dev.willcs.fantastic_engine.math.Rect2D
import dev.willcs.fantastic_engine.model.modelling.Model
import dev.willcs.fantastic_engine.model.modelling.Texture

data class JsonModel(
    var parent:           String? = null,

    @Json(name = "display")
    var displayTypes:     List<DisplayType> = ArrayList(),

    var textures:         List<Texture> = ArrayList(),
    var elements:         List<Element> = ArrayList(),

    @Json(name = "ambientocclusion")
    var ambientOcclusion: Boolean = true
) : Model()

data class Element(
    @Json(name = "__comment")
    var comment:  String,

    var from:     Vector3,
    var to:       Vector3,
    var faces:    Map<BlockFace, ElementFace>,
    var rotation: Rotation,
    var shade:    Boolean = true
)

data class Rotation(
    val origin:  Vector3,
    val axis:    Axis,
    val angle:   ElementRotation,
    val rescale: Boolean = false
)

data class DisplayType(
    val display:     DisplayPosition,
    val rotation:    Vector3,
    val translation: Vector3,
    val scale:       Vector3
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
