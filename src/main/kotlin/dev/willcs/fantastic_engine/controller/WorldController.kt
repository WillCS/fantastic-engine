package dev.willcs.fantastic_engine.controller

import tornadofx.*
import dev.willcs.fantastic_engine.controller.event.RayCastEvent
import dev.willcs.fantastic_engine.model.modelling.Point3D

class WorldController : Controller() {
    init {
        subscribe<RayCastEvent> { event ->
            println(event.ray)

            val rayOrigin = event.ray.origin
            val rayDirection = event.ray.direction

            val distance = rayOrigin.y / rayDirection.y
            val intersection = Point3D(
                rayOrigin.x - rayDirection.x * distance,
                rayOrigin.y - rayDirection.y * distance,
                rayOrigin.z - rayDirection.z * distance)

            println(distance)
            println(intersection)
        }
    }
}