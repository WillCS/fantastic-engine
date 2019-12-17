package dev.willcs.fantastic_engine.model.modelling

data class TextureList(
    val list: List<Texture>
)

data class Texture(
    var id:   String,
    val size: Point2D
)
