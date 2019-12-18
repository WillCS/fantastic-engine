package dev.willcs.fantastic_engine

import tornadofx.*
import dev.willcs.fantastic_engine.model.modelling.json.registerJsonConversions
import dev.willcs.fantastic_engine.model.modelling.json.JsonModel
import dev.willcs.fantastic_engine.model.modelling.entity.EntityModel
import dev.willcs.fantastic_engine.model.ModelTypeRegistry
import dev.willcs.fantastic_engine.view.RootView
import dev.willcs.fantastic_engine.view.EntityTreeFragment
import dev.willcs.fantastic_engine.view.JsonListFragment
import dev.willcs.fantastic_engine.view.graphics.renderJsonModel
import dev.willcs.fantastic_engine.view.graphics.renderEntityModel
import dev.willcs.fantastic_engine.controller.WorldController
import dev.willcs.fantastic_engine.controller.UIController
import dev.willcs.fantastic_engine.controller.ModelProvider

class ModelApp : App(RootView::class) {
    init {
        find(UIController::class)
        find(ModelProvider::class)
        find(WorldController::class)

        ModelTypeRegistry.registerModelType(
            JsonModel::class,
            ::renderJsonModel,
            "json_model_type",
            JsonListFragment::class)

        ModelTypeRegistry.registerModelType(
            EntityModel::class,
            ::renderEntityModel,
            "entity_model_type",
            EntityTreeFragment::class)
    }
}

fun main(args: Array<String>) {
    registerJsonConversions()
    
    launch<ModelApp>(args)
}