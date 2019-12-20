package dev.willcs.fantastic_engine.controller

import kotlin.reflect.KParameter
import tornadofx.*
import com.jogamp.opengl.GL2
import dev.willcs.fantastic_engine.math.Vector3
import dev.willcs.fantastic_engine.model.modelling.Model
import dev.willcs.fantastic_engine.model.modelling.entity.EntityModel
import dev.willcs.fantastic_engine.model.ModelTypeRegistry
import dev.willcs.fantastic_engine.controller.event.CreateModelEvent
import dev.willcs.fantastic_engine.controller.event.RayCastEvent
import dev.willcs.fantastic_engine.controller.event.ModelChangedEvent
import dev.willcs.fantastic_engine.graphics.RenderModel

class ModelProvider : Controller() {
    private var internalModel: Model = this.getDefaultModel()
    private var renderModel: RenderModel = ModelTypeRegistry.getRenderer(this.internalModel::class)

    init {
        subscribe<CreateModelEvent> { event ->
            val constructor = event.modelSettings.typeProperty.value.constructors.first()

            val model: Model = constructor.callBy(HashMap())

            this@ModelProvider.setModel(model)
        }
        
        subscribe<RayCastEvent> { event ->
            // println(event.ray)

            val rayOrigin    = event.ray.origin
            val rayDirection = event.ray.direction

            val distance     = rayOrigin.y / rayDirection.y
            val intersection = Vector3(
                rayOrigin.x - rayDirection.x * distance,
                rayOrigin.y - rayDirection.y * distance,
                rayOrigin.z - rayDirection.z * distance)

            // println(distance)
            // println(intersection)
        }
    }

    fun getModel(): Model = this.internalModel

    fun setModel(newModel: Model): Unit {
        this.internalModel = newModel
        this.renderModel = ModelTypeRegistry.getRenderer(newModel::class)

        fire(ModelChangedEvent)
    }

    fun renderModel(glInstance: GL2) {
        this.renderModel(this.internalModel, glInstance)
    }

    fun getDefaultModel(): Model = EntityModel()
}