package dev.willcs.fantastic_engine.view

import tornadofx.*
import dev.willcs.fantastic_engine.model.modelling.json.JsonModel
import dev.willcs.fantastic_engine.model.modelling.json.Element
import javafx.scene.control.ListView

/** Helper function to create data driven list views based on JsonModels */
fun jsonModelComponentList(model: JsonModel) = ListView<Element>(model.elements.observable())