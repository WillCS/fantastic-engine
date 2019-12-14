package dev.willcs.fantastic_engine.view

import tornadofx.*
import dev.willcs.fantastic_engine.model.ModelType
import dev.willcs.fantastic_engine.controller.UIAction
import javafx.collections.FXCollections
import javafx.geometry.Pos
import java.lang.Math

class NewModelFragment : Fragment() {
    override val root = form {
        fieldset {
            field("type") {
                combobox<ModelType> {
                    items = FXCollections.observableArrayList(*ModelType.values())
                    setValue(ModelType.ENTITY)
                    cellFormat { text = it.nameKey }
                }
            }


            hbox(spacing = 20) {
                field("x_size") {
                    add(powerOfTwoSpinner())
                }

                field("y_size") {
                    add(powerOfTwoSpinner())
                }
            }

            vbox(spacing = 20, alignment = Pos.CENTER) {
                button(UIAction.CREATE.titleKey) {
                    action {

                    }
                }
            }
        }
    }

    init {
        this.title = "new"
    }
}