package dev.willcs.fantastic_engine.view.graphics

import com.jogamp.opengl.GL2
import dev.willcs.fantastic_engine.model.modelling.Model
import dev.willcs.fantastic_engine.model.modelling.json.JsonModel
import dev.willcs.fantastic_engine.model.modelling.entity.EntityModel

typealias ModelRenderer = (model: Model, glInstance: GL2) -> Unit

fun <JsonModel>renderJsonModel(model: JsonModel, glInstance: GL2) {

}

fun <EntityModel>renderEntityModel(model: EntityModel, glInstance: GL2) {

}
