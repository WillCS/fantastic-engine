package dev.willcs.fantastic_engine

import tornadofx.*
import dev.willcs.fantastic_engine.model.modelling.json.registerJsonConversions
import dev.willcs.fantastic_engine.view.RootView
import dev.willcs.fantastic_engine.controller.UIController

class ModelApp : App(RootView::class) {
    init {
        find(UIController::class)
    }
}

fun main(args: Array<String>) {
    registerJsonConversions()
    
    launch<ModelApp>(args)
}