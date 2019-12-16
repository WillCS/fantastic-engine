package dev.willcs.fantastic_engine.view

import tornadofx.*
import javafx.application.Platform
import dev.willcs.fantastic_engine.model.modelling.json.Element
import dev.willcs.fantastic_engine.controller.UIAction
import dev.willcs.fantastic_engine.controller.event.*
import dev.willcs.fantastic_engine.controller.UIController

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
                    item(UIAction.NEW.titleKey, UIAction.NEW.keyCombination!!).action {
                        fire(UIInputEvent(UIAction.NEW))
                    }

                    item(UIAction.OPEN.titleKey, UIAction.OPEN.keyCombination!!).action {
                        fire(UIInputEvent(UIAction.OPEN))
                    }

                    separator()

                    item(UIAction.SAVE.titleKey,UIAction.SAVE.keyCombination!!).action {
                        fire(UIInputEvent(UIAction.SAVE))
                    }

                    item(UIAction.SAVE_AS.titleKey, UIAction.SAVE_AS.keyCombination!!).action {
                        fire(UIInputEvent(UIAction.SAVE_AS))
                    }

                    separator()

                    item(UIAction.EXPORT.titleKey, UIAction.EXPORT.keyCombination!!).action {
                        fire(UIInputEvent(UIAction.EXPORT))
                    }

                    separator()

                    item(UIAction.EXIT.titleKey, UIAction.EXIT.keyCombination!!).action {
                        fire(UIInputEvent(UIAction.EXIT))
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

    init {
        subscribe<ExitApplicationEvent> {
            handleCloseEvent()
        }

        subscribe<NewModelEvent> {
            handleNewModelEvent()
        }

        subscribe<OpenModelEvent> {
            handleOpenModelEvent()
        }
    }

    override fun onBeforeShow() {
        this.setWindowMinSize(640, 480)
        this.title = "fantastic-engine"
    }

    private fun handleCloseEvent() {
        System.exit(0)
    }

    private fun handleNewModelEvent() {
        find<NewModelFragment>().openModal()
    }

    private fun handleOpenModelEvent() {
        
    }
}
