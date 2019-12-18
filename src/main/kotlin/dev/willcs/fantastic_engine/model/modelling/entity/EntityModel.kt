package dev.willcs.fantastic_engine.model.modelling.entity

import dev.willcs.fantastic_engine.model.modelling.Model
import dev.willcs.fantastic_engine.model.Vector3
import dev.willcs.fantastic_engine.model.Vector2I
import dev.willcs.fantastic_engine.model.modelling.Texture
import dev.willcs.fantastic_engine.model.modelling.TextureList
import dev.willcs.fantastic_engine.model.Ray

data class EntityModel(
    val assemblies: AssemblyList = AssemblyList(ArrayList()),
    val textures:   TextureList  = TextureList(ArrayList())
) : Model()

data class AssemblyList(
    val list: List<Assembly>
)

data class Assembly(
    var name:          String,
    val rotationPoint: Vector3,
    val rotationAngle: Vector3,
    val offset:        Vector3,
    val textureOffset: Vector2I,
    val children:      SubAssemblyList,
    var mirrored:      Boolean,
    val texture:       Texture
)

data class SubAssemblyList(
    val assemblies: List<Assembly>,
    val cubes:      List<Box>
)

data class Box(
    var name:          String,
    val position:      Vector3,
    val dimensions:    Vector3,
    val textureCoords: Vector2I,
    var mirrored:      Boolean
)
