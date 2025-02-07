package com.tailoredfeedandroid

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.net.URL
import kotlin.concurrent.thread

class BandwidthModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "BandwidthModule"
    }

    @ReactMethod
    fun getBandwidth(promise: Promise) {
        thread {
            try {
                val startTime = System.currentTimeMillis()
                val url = URL("https://raw.githubusercontent.com/yourkin/fileupload-fastapi/a85a697cab2f887780b3278059a0dd52847d80f3/tests/data/test-5mb.bin")
                val connection = url.openConnection()
                connection.connect()
                val inputStream = connection.getInputStream()
                val buffer = ByteArray(1024)
                var bytesRead: Int
                var totalBytesRead = 0

                while (inputStream.read(buffer).also { bytesRead = it } != -1) {
                    totalBytesRead += bytesRead
                }

                val endTime = System.currentTimeMillis()
                val duration = endTime - startTime
                val bandwidthBytesPerSecond = totalBytesRead / (duration / 1000.0) // bytes per second

                // Convert bytes per second to Megabits per second
                val bandwidthMbps = (bandwidthBytesPerSecond * 8) / (1024 * 1024)

                promise.resolve(bandwidthMbps)
            } catch (e: Exception) {
                promise.reject("Error", e)
            }
        }
    }
}
