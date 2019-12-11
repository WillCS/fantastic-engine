package dev.willcs.modeller

import tornadofx.*

class ModelApp : App(ModelView::class)

class ModelView : View() {
    override val root = vbox {
        button("Testy boi")
        label("hehehe")
    }
}

fun main(args: Array<String>) {
    launch<ModelApp>(args)
}