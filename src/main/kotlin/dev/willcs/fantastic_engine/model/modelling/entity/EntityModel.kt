package dev.willcs.fantastic_engine.model.modelling.entity

import dev.willcs.fantastic_engine.model.modelling.Model
import dev.willcs.fantastic_engine.model.modelling.Point3D
import dev.willcs.fantastic_engine.model.modelling.Point2DI
import dev.willcs.fantastic_engine.model.modelling.Texture

data class EntityModel(
    val assemblies: List<Assembly> = ArrayList(),
    val textures:   List<Texture> = ArrayList()
) : Model()

data class Assembly(
    var name:          String,
    val rotationPoint: Point3D,
    val rotationAngle: Point3D,
    val offset:        Point3D,
    val textureOffset: Point2DI,
    val children:      List<Assembly>,
    val cubes:         List<Box>,
    var mirrored:      Boolean,
    val texture:       Texture
)

data class Box(
    var name:          String,
    val position:      Point3D,
    val dimensions:    Point3D,
    val textureCoords: Point2DI,
    var mirrored:      Boolean
)
