package dev.willcs.fantastic_engine.graphics

import com.jogamp.opengl.GL2
import java.nio.FloatBuffer
import java.nio.IntBuffer
import dev.willcs.fantastic_engine.math.Vector3
import dev.willcs.fantastic_engine.model.modelling.Model
import dev.willcs.fantastic_engine.model.modelling.json.JsonModel
import dev.willcs.fantastic_engine.model.modelling.entity.EntityModel
import dev.willcs.fantastic_engine.model.modelling.entity.Assembly

typealias RenderModel = (model: Model, glInstance: GL2) -> Unit

fun <JsonModel>renderJsonModel(model: JsonModel, glInstance: GL2) {

}

fun <EntityModel>renderEntityModel(model: EntityModel, glInstance: GL2) {
    fun renderAssembly(assembly: Assembly) {
        glInstance.glPushMatrix()
                
        // Translate to subassembly offset
        glInstance.glTranslated(
            assembly.offset.x,
            assembly.offset.y,
            assembly.offset.z
        )

        // Translate to subassembly rotation point
        glInstance.glTranslated(
            assembly.rotationPoint.x
            assembly.rotationPoint.y
            assembly.rotationPoint.z
        )

        // Rotate
        glInstance.glRotated(1.0,
            assembly.rotation.x,
            assembly.rotation.y,
            assembly.rotation.z
        )

        // Translate back to subassembly offset
        glInstance.glTranslated(
            -assembly.rotationPoint.x
            -assembly.rotationPoint.y
            -assembly.rotationPoint.z
        )

        // bind texture

        // render cubes

        // render subassemblies
        assembly.children.assemblies.forEach { renderAssembly(it)}

        glInstance.glPopMatrix()
    }
}