package dev.willcs.fantastic_engine

import tornadofx.*
import dev.willcs.fantastic_engine.model.modelling.json.registerJsonConversions
import dev.willcs.fantastic_engine.model.modelling.json.JsonModel
import dev.willcs.fantastic_engine.model.modelling.entity.EntityModel
import dev.willcs.fantastic_engine.model.ModelTypeRegistry
import dev.willcs.fantastic_engine.view.RootView
import dev.willcs.fantastic_engine.view.graphics.renderJsonModel
import dev.willcs.fantastic_engine.view.graphics.renderEntityModel
import dev.willcs.fantastic_engine.controller.UIController
import dev.willcs.fantastic_engine.controller.ModelProvider

class ModelApp : App(RootView::class) {
    init {
        find(UIController::class)
        find(ModelProvider::class)

        ModelTypeRegistry.registerModelType(JsonModel::class, ::renderJsonModel, "json_model_type")
        ModelTypeRegistry.registerModelType(EntityModel::class, ::renderEntityModel, "entity_model_type")
    }
}

fun main(args: Array<String>) {
    registerJsonConversions()
    
    launch<ModelApp>(args)
}