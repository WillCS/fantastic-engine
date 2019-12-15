package dev.willcs.fantastic_engine.controller.event

import kotlin.reflect.KClass
import tornadofx.*
import tornadofx.EventBus.RunOn.*
import javafx.beans.property.SimpleObjectProperty
import javafx.beans.property.SimpleIntegerProperty
import dev.willcs.fantastic_engine.model.modelling.entity.EntityModel
import dev.willcs.fantastic_engine.model.modelling.Model

data class NewModelSetup(
    var typeProperty:          SimpleObjectProperty<KClass<out Model>> 
            = SimpleObjectProperty(EntityModel::class),
    var textureWidthProperty:  SimpleIntegerProperty = SimpleIntegerProperty(128),
    var textureHeightProperty: SimpleIntegerProperty = SimpleIntegerProperty(128)
)

class CreateModelEvent(val modelSettings: NewModelSetup) : FXEvent(BackgroundThread)