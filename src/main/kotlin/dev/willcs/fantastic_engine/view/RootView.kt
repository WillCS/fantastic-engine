package dev.willcs.fantastic_engine.view

import tornadofx.*
import dev.willcs.fantastic_engine.model.modelling.json.Element

class RootView : View() {
    private val graphicsView: GraphicsView by inject()
    // private val componentTree = treeview<Element> {
    //     root = TreeItem(Element(comment = "Components"))

    //     cellFormat { text = it.comment }

    //     populate { parent ->
    //         parent.
    //     }
    // }

    override val root = borderpane {
        top {
            menubar {
                menu("File") {
                    menu("New") {
                        item("Json Model")
                        item("Entity Model")
                    }
                    
                    item("Open")
                    separator()
                    item("Save")
                    item("Save as")
                    separator()
                    item("Export")
                }
                
                menu("Edit")
            }
        }

        left {
            squeezebox {
                fold("Model", expanded = true) {

                }
            }
        }

        center = graphicsView.root
    }
}