package com.tailoredfeedandroid

import android.media.MediaRecorder
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.Manifest
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat

class NoiseModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var mediaRecorder: MediaRecorder? = null

    override fun getName(): String {
        return "NoiseModule"
    }

    @ReactMethod
    fun getNoiseLevel(promise: Promise) {
        val permission = Manifest.permission.RECORD_AUDIO

        if (ContextCompat.checkSelfPermission(reactApplicationContext, permission) != PackageManager.PERMISSION_GRANTED) {
            promise.reject("PermissionError", "Microphone permission not granted")
            return
        }

        releaseMediaRecorder()

        try {
            mediaRecorder = MediaRecorder().apply {
                setAudioSource(MediaRecorder.AudioSource.MIC)
                setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP)
                setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB)
                setOutputFile("/dev/null")
                prepare()
                start() // This is where "start failed" can occur
            }

            // Capture the noise level in decibels
            val noiseLevel = 20 * Math.log10(mediaRecorder?.maxAmplitude?.toDouble() ?: 0.0)
            promise.resolve(noiseLevel)

        } catch (e: Exception) {
            promise.reject("NoiseError", "Failed to start MediaRecorder: ${e.message}")
        } finally {
            releaseMediaRecorder()
        }
    }

    private fun releaseMediaRecorder() {
        try {
            mediaRecorder?.stop()
        } catch (e: Exception) {
            // Ignore if already stopped
        } finally {
            mediaRecorder?.release()
            mediaRecorder = null
        }
    }
}
