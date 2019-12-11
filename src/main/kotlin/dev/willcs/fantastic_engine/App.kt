package dev.willcs.fantastic_engine

import javafx.scene.control.Label
import javafx.scene.layout.BorderPane
import tornadofx.*
import dev.willcs.fantastic_engine.model.Volume3D
import dev.willcs.fantastic_engine.model.Point3D
import dev.willcs.fantastic_engine.model.registerJsonConversions

class ModelApp : App(MasterView::class)

class MasterView : View() {
    override val root = borderpane {
        top<TopView>()
        bottom<BottomView>()
    }
}
class TopView : View() {
    override val root = label("hehe")
}

class BottomView: View() {
    override val root = label("funny")

}

fun main(args: Array<String>) {
    registerJsonConversions()
    
    launch<ModelApp>(args)
}