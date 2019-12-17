package dev.willcs.fantastic_engine.view

import tornadofx.*
import javafx.stage.WindowEvent
import javafx.scene.control.TitledPane
import javafx.event.Event
import javafx.application.Platform
import dev.willcs.fantastic_engine.model.modelling.json.Element
import dev.willcs.fantastic_engine.controller.UIAction
import dev.willcs.fantastic_engine.controller.event.*
import dev.willcs.fantastic_engine.controller.UIController
import dev.willcs.fantastic_engine.model.ModelTypeRegistry
import dev.willcs.fantastic_engine.controller.ModelProvider

class RootView : View() {
    private val graphicsView:  GraphicsView by inject()
    private val modelProvider: ModelProvider by inject()
    private val modelPane: TitledPane = TitledPane("model", null)

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
                add(this@RootView.modelPane)
            }
        }

        center = this@RootView.graphicsView.root
    }

    init {
        subscribe<ExitApplicationEvent> {
            this@RootView.handleCloseEvent()
        }

        subscribe<NewModelEvent> {
            this@RootView.handleNewModelEvent()
        }

        subscribe<OpenModelEvent> {
            this@RootView.handleOpenModelEvent()
        }

        subscribe<ModelChangedEvent> {
            this@RootView.handleModelChangedEvent()
        }
    }

    override fun onBeforeShow() {
        this.setWindowMinSize(640, 480)
        this.title = "fantastic-engine"
    }

    private fun handleCloseEvent() {
        // Request that the window closes. We do it this way
        // rather than using Platform.exit or something else
        // because this is the only way that seems to ensure
        // that all window-closing events are called.
        this.currentWindow?.fireEvent(
            WindowEvent(this.currentWindow, WindowEvent.WINDOW_CLOSE_REQUEST))
    }

    private fun handleNewModelEvent() {
        find<NewModelFragment>().openModal()
    }

    private fun handleOpenModelEvent() {
        
    }

    private fun handleModelChangedEvent() {
        val modelClass = this.modelProvider.getModel()::class
        val newComponentBrowser = ModelTypeRegistry.getComponentBrowserClass(modelClass)
        this.modelPane.add(find(newComponentBrowser))
    }
}
