package dev.willcs.fantastic_engine.model.modelling.json

import com.beust.klaxon.Converter
import com.beust.klaxon.JsonValue
import com.beust.klaxon.Klaxon
import dev.willcs.fantastic_engine.model.modelling.Point3D

object KlaxonInstance {
    val INSTANCE: Klaxon = Klaxon()
}

fun registerJsonConversions(): Unit = arrayOf(
        point3DConverter
    ).forEach { KlaxonInstance.INSTANCE.converter(it) }

val point3DConverter = object : Converter {
    override fun canConvert(cls: Class<*>): Boolean = cls == Point3D::class

    override fun toJson(value: Any): String =
        (value as Point3D).let {
            "[ ${it.x}, ${it.y}, ${it.z} ]"
        }

    override fun fromJson(jv: JsonValue): Any? =
        if(jv.array?.size == 3) {
            jv.array?.map { it as Double }?.let {
                Point3D(it[0], it[1], it[2])
            }
        } else {
            Point3D(0.0, 0.0, 0.0)
        }
}
