package dev.willcs.fantastic_engine

import javafx.scene.control.Label
import javafx.scene.layout.BorderPane
import tornadofx.*
import dev.willcs.fantastic_engine.model.modelling.Volume3D
import dev.willcs.fantastic_engine.model.modelling.Point3D
import dev.willcs.fantastic_engine.model.modelling.json.registerJsonConversions
import dev.willcs.fantastic_engine.view.GraphicsView
import dev.willcs.fantastic_engine.view.RootView

class ModelApp : App(RootView::class)

fun main(args: Array<String>) {
    registerJsonConversions()
    
    launch<ModelApp>(args)
}