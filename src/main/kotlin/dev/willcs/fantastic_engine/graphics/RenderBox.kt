package dev.willcs.fantastic_engine.graphics

import java.nio.IntBuffer
import java.nio.FloatBuffer
import dev.willcs.fantastic_engine.math.Vector3
import dev.willcs.fantastic_engine.math.Vector2
import com.jogamp.opengl.GL2

class RenderBox(
        public var position:   Vector3,
        public var dimensions: Vector3,
        public var texCoords:  Vector2) {
    private val vbos = IntArray(3)

    public fun allocateBuffers(glInstance: GL2) {
        glInstance.glGenBuffers(3, this.vbos, 0)
        this.updateBuffers(glInstance)
    }

    public fun updateBuffers(glInstance: GL2) {
        val x =  this.position.x.toFloat()
        val y =  this.position.y.toFloat()
        val z =  this.position.z.toFloat()
        val dx = this.dimensions.x.toFloat()
        val dy = this.dimensions.y.toFloat()
        val dz = this.dimensions.z.toFloat()
        val tx = this.texCoords.x.toFloat()
        val ty = this.texCoords.y.toFloat()

        val vertices = FloatBuffer.allocate(8).put(floatArrayOf(
            x,      y + dy, z + dz, // 1
            x + dx, y + dy, z + dz, // 2
            x,      y,      z + dz, // 3
            x + dx, y,      z + dz, // 4
            x + dx, y,      z,      // 5
            x + dx, y + dy, z,      // 6
            x,      y + dy, z,      // 7
            x,      y,      z,      // 8
        ))

        val indices = IntBuffer.allocate(14).put(intArrayOf(
            1, 2, 3, 4, 5, 2, 6, 1, 7, 3, 8, 5, 7, 6
        ))

        glInstance.glBindBuffer(GL2.GL_ARRAY_BUFFER, vbos[0])
        glInstance.glBufferData(GL2.GL_ARRAY_BUFFER, 
            vertices.capacity() * GLSLConstants.GLSL_FLOAT_SIZE_BITS, 
            vertices,
            GL2.GL_DYNAMIC_DRAW)

        // glInstance.glBindBuffer(GL2.GL_ARRAY_BUFFER, vbos[1])
        // glInstance.glBufferData(GL2.GL_ARRAY_BUFFER,
        //     texCoords.capacity() * GLSLConstants.GLSL_FLOAT_SIZE_BITS,
        //     texCoords,
        //     GL2.GL_DYNAMIC_DRAW)

        glInstance.glBindBuffer(GL2.GL_ELEMENT_ARRAY_BUFFER, vbos[2])
        glInstance.glBufferData(GL2.GL_ELEMENT_ARRAY_BUFFER,
            indices.capacity() * GLSLConstants.GLSL_INT_SIZE_BITS,
            indices,
            GL2.GL_DYNAMIC_DRAW)

        glInstance.glBindBuffer(GL2.GL_ARRAY_BUFFER, 0)
        glInstance.glBindBuffer(GL2.GL_ELEMENT_ARRAY_BUFFER, 0)
    }

    private fun bindAttributes(glInstance: GL2) {
        glInstance.glBindBuffer(GL2.GL_ARRAY_BUFFER, this.vbos[0])
        glInstance.glEnableVertexAttribArray(GLSLConstants.GLSL_POSITION_ATTRIB_INDEX)
        glInstance.glVertexAttribPointer(
            GLSLConstants.GLSL_POSITION_ATTRIB_INDEX, // Attribute index
            GLSLConstants.GLSL_POSITION_COMPONENTS,   // Number of components in the vector
            GL2.GL_FLOAT,                             // Data type
            false,                                    // Normalised?
            GLSLConstants.GLSL_POSITION_STRIDE,       // Element separation
            0)                                        // Offset from start

        glInstance.glBindBuffer(GL2.GL_ARRAY_BUFFER, this.vbos[2])
        glInstance.glEnableVertexAttribArray(GLSLConstants.GLSL_TEX_COORD_ATTRIB_INDEX)
        glInstance.glVertexAttribPointer(
            GLSLConstants.GLSL_TEX_COORD_ATTRIB_INDEX,
            GLSLConstants.GLSL_TEX_COORD_COMPONENTS,
            GL2.GL_FLOAT,
            false,
            GLSLConstants.GLSL_TEX_COORD_STRIDE,
            0)

        glInstance.glBindBuffer(GL2.GL_ARRAY_BUFFER, 0)
    }

    private fun unbindAttributes(glInstance: GL2) {
        glInstance.glDisableVertexAttribArray(GLSLConstants.GLSL_POSITION_ATTRIB_INDEX)
        glInstance.glDisableVertexAttribArray(GLSLConstants.GLSL_TEX_COORD_ATTRIB_INDEX)
    }

    public fun draw(glInstance: GL2) {
        this.bindAttributes(glInstance)
        glInstance.glBegin(GL2.GL_TRIANGLE_STRIP)
    
        glInstance.glEnd()
        this.unbindAttributes(glInstance)
    }

    public fun dispose(glInstance: GL2) {
        glInstance.glDeleteBuffers(3, this.vbos, 0)
    }
}
