package dev.willcs.fantastic_engine.model

import kotlin.reflect.KClass
import dev.willcs.fantastic_engine.model.modelling.Model
import dev.willcs.fantastic_engine.model.modelling.entity.EntityModel
import dev.willcs.fantastic_engine.model.modelling.json.JsonModel
import dev.willcs.fantastic_engine.view.graphics.*

enum class ModelType(val nameKey: String) {
    ENTITY("entity_model_type"), 
    JSON("json_model_type")
}

private data class ModelTypeData<T : Model>(
    val renderer: ModelRenderer<T>,
    val nameKey:  String
)

object ModelTypeRegistry {
    private val modelTypes: MutableMap<KClass<*>, ModelTypeData<*>> = HashMap()

    fun <T : Model>registerModelType(type: KClass<T>, renderer: ModelRenderer<T>, nameKey: String) {
        modelTypes.put(type, ModelTypeData<T>(renderer, nameKey))
    }

    private fun <T: Model> get(type:KClass<T>): ModelTypeData<*>? = this.modelTypes.getOrDefault(type, null)

    fun <T : Model>getRenderer(type: KClass<T>): ModelRenderer<T>? = ModelTypeRegistry.get(type)?.renderer

    fun <T : Model>getNameKey(type: KClass<T>): String? = ModelTypeRegistry.get(type)?.nameKey
}