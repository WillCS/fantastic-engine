package dev.willcs.fantastic_engine.view

import tornadofx.*
import kotlin.reflect.KClass
import dev.willcs.fantastic_engine.model.modelling.Model
import dev.willcs.fantastic_engine.model.ModelTypeRegistry
import dev.willcs.fantastic_engine.controller.UIAction
import dev.willcs.fantastic_engine.controller.event.NewModelSetup
import dev.willcs.fantastic_engine.controller.event.CreateModelEvent
import javafx.collections.FXCollections
import javafx.geometry.Pos
import javafx.beans.value.ObservableValue
import java.lang.Math
import dev.willcs.fantastic_engine.math.Vector3

class NewModelFragment : Fragment() {
    private val modelSetup: NewModelSetup = NewModelSetup()

    override val root = form {
        fieldset {
            field("type") {
                combobox<KClass<out Model>> {
                    items = FXCollections.observableArrayList(ModelTypeRegistry.allTypes())
                    bind(modelSetup.typeProperty)

                    cellFormat { text = ModelTypeRegistry.getNameKey(it) }
                    spacing = 20.0
                }
            }

            vbox(spacing = 20) {
                alignment = Pos.CENTER

                hbox(spacing = 20) {
                    field("x_size") {
                        val spinner = powerOfTwoSpinner()
                        @Suppress("UNCHECKED_CAST")
                        spinner.bind(modelSetup.textureWidthProperty as ObservableValue<Int>)
                        add(spinner)
                    }

                    field("y_size") {
                        val spinner = powerOfTwoSpinner()
                        @Suppress("UNCHECKED_CAST")
                        spinner.bind(modelSetup.textureHeightProperty as ObservableValue<Int>)
                        add(spinner)
                    }
                }

                button("create") {
                    action {
                        fire(CreateModelEvent(modelSetup))
                    }
                }
            }
        }
    }

    init {
        this.title = "new"
    }
}