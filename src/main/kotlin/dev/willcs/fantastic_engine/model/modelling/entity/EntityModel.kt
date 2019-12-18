package dev.willcs.fantastic_engine.model.modelling.entity

import dev.willcs.fantastic_engine.model.modelling.Model
import dev.willcs.fantastic_engine.model.modelling.Point3D
import dev.willcs.fantastic_engine.model.modelling.Point2DI
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
    val rotationPoint: Point3D,
    val rotationAngle: Point3D,
    val offset:        Point3D,
    val textureOffset: Point2DI,
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
    val position:      Point3D,
    val dimensions:    Point3D,
    val textureCoords: Point2DI,
    var mirrored:      Boolean
)
