package dev.willcs.fantastic_engine.controller.event

import tornadofx.*
import tornadofx.EventBus.RunOn.*
import dev.willcs.fantastic_engine.model.Ray

class RayCastEvent(val ray: Ray) : FXEvent(BackgroundThread)