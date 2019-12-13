package dev.willcs.fantastic_engine.view

import tornadofx.*
import dev.willcs.fantastic_engine.model.modelling.json.Element
import dev.willcs.fantastic_engine.controller.UIAction

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
                    item(UIAction.NEW.titleKey, UIAction.NEW.keyCombination!!)
                    item(UIAction.OPEN.titleKey, UIAction.OPEN.keyCombination!!)

                    separator()

                    item(UIAction.SAVE.titleKey,UIAction.SAVE.keyCombination!!)
                    item(UIAction.SAVE_AS.titleKey, UIAction.SAVE_AS.keyCombination!!)

                    separator()

                    item(UIAction.EXPORT.titleKey)

                    separator()

                    item(UIAction.EXIT.titleKey, UIAction.EXIT.keyCombination!!).action {
                        close()
                    }
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

    override fun onBeforeShow() {
        this.setWindowMinSize(640, 480)
        this.title = "fantastic-engine"
    }
}
