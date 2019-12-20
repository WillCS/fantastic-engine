package dev.willcs.fantastic_engine.controller

import tornadofx.*
import dev.willcs.fantastic_engine.controller.event.*

enum class UIAction(val titleKey: String, val keyCombination: String? = null) {
    NEW("new", "Shortcut+N"),
    OPEN("open", "Shortcut+O"),
    SAVE("save", "Shortcut+S"),
    SAVE_AS("save_as", "Shortcut+Shift+S"),
    EXPORT("export", "Shortcut+Shift+E"),
    EXIT("exit", "Shortcut+Q"),
}

class UIController : Controller() {
    init {
        subscribe<UIInputEvent> { event ->
            fire(when (event.actionType) {
                UIAction.NEW     -> NewModelEvent
                UIAction.OPEN    -> OpenModelEvent
                UIAction.SAVE    -> SaveModelEvent(false)
                UIAction.SAVE_AS -> SaveModelEvent(true)
                UIAction.EXPORT  -> ExportModelEvent
                UIAction.EXIT    -> ExitApplicationEvent
            })
        }
    }
}
