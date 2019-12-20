package dev.willcs.fantastic_engine.graphics

import com.jogamp.opengl.GL2

fun renderBackdrop(glInstance: GL2) {
    glInstance.glBegin(GL2.GL_LINES)
    
    glInstance.glColor3f(0F, 0F, 0F)

    val gridExtent = 10
    val exaggeration = 1F

    for (xCoord in (-gridExtent .. gridExtent)) {
        glInstance.glVertex3f(xCoord * exaggeration, 0F, -gridExtent * exaggeration)
        glInstance.glVertex3f(xCoord * exaggeration, 0F,  gridExtent * exaggeration)
    }

    for (zCoord in (-gridExtent .. gridExtent)) {
        glInstance.glVertex3f(-gridExtent * exaggeration, 0F, zCoord * exaggeration)
        glInstance.glVertex3f( gridExtent * exaggeration, 0F, zCoord * exaggeration)
    }

    glInstance.glEnd()
}