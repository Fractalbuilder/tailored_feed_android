package com.tailoredfeedandroid

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class CurrentTimeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "CurrentTime"
    }

    @ReactMethod
    fun currentTime(promise: Promise) {
        val currentTime = System.currentTimeMillis().toString()
        promise.resolve(currentTime)
    }
}
