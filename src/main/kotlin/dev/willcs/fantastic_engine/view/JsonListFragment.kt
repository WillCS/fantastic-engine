package dev.willcs.fantastic_engine.view

import javafx.scene.control.TreeItem
import tornadofx.*
import dev.willcs.fantastic_engine.controller.ModelProvider
import dev.willcs.fantastic_engine.model.modelling.json.JsonModel
import dev.willcs.fantastic_engine.model.modelling.json.Element
import dev.willcs.fantastic_engine.model.modelling.Texture

class JsonListFragment : Fragment() {
    private val modelProvider: ModelProvider by inject()

    override val root = treeview<Any> {
        root = TreeItem(this@JsonListFragment.modelProvider.getModel())

        cellFormat {
            text = when(it) {
                is JsonModel -> "model"
                is Element   -> it.comment
                is Texture   -> it.id
                else         -> throw IllegalArgumentException("Invalid Json Model Component")
            }
        }

        populate { 
            val parent = it.value

            // This needs to search for parent models somewhere, until then
            // we'll just list the elements and the textures
            when(parent) {
                is JsonModel -> setOf(parent.elements, parent.textures)
                is Set<*>    -> (parent as Set<Any>).observable()
                else         -> null
            }
        }
    }
}