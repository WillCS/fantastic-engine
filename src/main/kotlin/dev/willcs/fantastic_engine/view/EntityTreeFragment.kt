package dev.willcs.fantastic_engine.view

import tornadofx.*
import javafx.scene.control.TreeItem
import dev.willcs.fantastic_engine.controller.ModelProvider
import dev.willcs.fantastic_engine.model.modelling.entity.AssemblyList
import dev.willcs.fantastic_engine.model.modelling.entity.Assembly
import dev.willcs.fantastic_engine.model.modelling.entity.Box
import dev.willcs.fantastic_engine.model.modelling.entity.EntityModel
import dev.willcs.fantastic_engine.model.modelling.TextureList
import dev.willcs.fantastic_engine.model.modelling.Texture

class EntityTreeFragment : Fragment() {
    private val modelProvider: ModelProvider by inject()

    override val root = treeview<Any> {
        root = TreeItem(this@EntityTreeFragment.modelProvider.getModel())

        cellFormat {
            text = when(it) {
                is EntityModel  -> "model"
                is Assembly     -> it.name
                is AssemblyList -> "assemblies"
                is TextureList  -> "textures"
                is Box          -> it.name
                is Texture      -> it.id
                else            -> throw IllegalArgumentException("Invalid Entity Model Component $it")
            }

            populate {
                val parent = it.value

                when(parent) {
                    is EntityModel  -> listOf(parent.assemblies, parent.textures).observable()
                    is AssemblyList -> parent.list.observable()
                    is TextureList  -> parent.list.observable()
                    is Assembly     -> (parent.children.assemblies + parent.children.cubes).observable()
                    else            -> null
                }
            }
        }
    }
}