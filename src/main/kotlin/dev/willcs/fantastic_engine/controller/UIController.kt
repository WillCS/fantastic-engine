package dev.willcs.fantastic_engine.controller

import tornadofx.*

enum class UIAction(val titleKey: String, val keyCombination: String? = null) {
    NEW("new", "Shortcut+N"),
    OPEN("open", "Shortcut+O"),
    SAVE("save", "Shortcut+S"),
    SAVE_AS("save_as", "Shortcut+Shift+S"),
    EXPORT("export", "Shortcut+Shift+E"),
    EXIT("exit", "Shortcut+Q"),
    CREATE("create")
}

class UIController : Controller() {
    private val modelProvider: ModelProvider by inject()
}