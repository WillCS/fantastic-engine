package dev.willcs.fantastic_engine.controller

import tornadofx.*
import dev.willcs.fantastic_engine.model.modelling.Model

class ModelProvider : Controller() {
    private var model: Model? = null

    fun getModel(): Model? {
        null
    }

    fun setModel(newModel: Model): Unit {
        this.model = newModel
    }
}