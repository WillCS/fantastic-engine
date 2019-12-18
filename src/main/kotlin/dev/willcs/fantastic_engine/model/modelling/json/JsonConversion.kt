package dev.willcs.fantastic_engine.model.modelling.json

import com.beust.klaxon.Converter
import com.beust.klaxon.JsonValue
import com.beust.klaxon.Klaxon
import dev.willcs.fantastic_engine.model.Vector3

object KlaxonInstance {
    val INSTANCE: Klaxon = Klaxon()
}

fun registerJsonConversions(): Unit = arrayOf(
        Vector3Converter
    ).forEach { KlaxonInstance.INSTANCE.converter(it) }

val Vector3Converter = object : Converter {
    override fun canConvert(cls: Class<*>): Boolean = cls == Vector3::class

    override fun toJson(value: Any): String =
        (value as Vector3).let {
            "[ ${it.x}, ${it.y}, ${it.z} ]"
        }

    override fun fromJson(jv: JsonValue): Any? =
        if(jv.array?.size == 3) {
            jv.array?.map { it as Double }?.let {
                Vector3(it[0], it[1], it[2])
            }
        } else {
            Vector3(0.0, 0.0, 0.0)
        }
}
