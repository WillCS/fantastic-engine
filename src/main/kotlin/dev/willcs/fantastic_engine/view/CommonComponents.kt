package dev.willcs.fantastic_engine.view

import javafx.scene.control.Spinner
import javafx.collections.FXCollections

fun powerOfTwoSpinner(): Spinner<Int> = Spinner(
    FXCollections.observableArrayList(powerOfTwoRange(5, 9))
).let {
    it.setMaxSize(80.0, 16.0)
    return it
}

fun powerOfTwoRange(from: Int, to: Int): List<Int> = (from..to).map {
    Math.pow(2.0, it.toDouble()).toInt()
}