package dev.willcs.fantastic_engine.controller.event

import tornadofx.*
import tornadofx.EventBus.RunOn.*
import dev.willcs.fantastic_engine.controller.UIAction

class UIInputEvent(val actionType: UIAction) : FXEvent()

class SaveModelEvent(val saveAs: Boolean? = false) : FXEvent()

object NewModelEvent : FXEvent()

object OpenModelEvent : FXEvent()

object ExportModelEvent : FXEvent()

object ExitApplicationEvent: FXEvent()

object ModelChangedEvent: FXEvent()
