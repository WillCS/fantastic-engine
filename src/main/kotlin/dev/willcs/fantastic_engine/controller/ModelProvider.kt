package dev.willcs.fantastic_engine.controller

import kotlin.reflect.KParameter
import tornadofx.*
import dev.willcs.fantastic_engine.model.modelling.Model
import dev.willcs.fantastic_engine.model.modelling.entity.EntityModel
import dev.willcs.fantastic_engine.controller.event.CreateModelEvent
import dev.willcs.fantastic_engine.controller.event.ModelChangedEvent

class ModelProvider : Controller() {
    private var internalModel: Model = EntityModel()

    init {
        subscribe<CreateModelEvent> { event ->
            val constructor = event.modelSettings.typeProperty.value.constructors.first()

            val model: Model = constructor.callBy(HashMap())

            this@ModelProvider.setModel(model)
        }
    }

    fun getModel(): Model = this.internalModel

    fun setModel(newModel: Model): Unit {
        this.internalModel = newModel

        fire(ModelChangedEvent)
    }
}