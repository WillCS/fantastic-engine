package dev.willcs.fantastic_engine.model.modelling

import dev.willcs.fantastic_engine.math.Vector2

data class TextureList(
    val list: List<Texture>
)

data class Texture(
    var id:   String,
    val size: Vector2
)
