import { BinaryPayloadMessage } from "../../messages";

export interface ImportAudioClipRawData extends BinaryPayloadMessage {
    $type: "importAudioClipRawData";

    /**
     * Number of audio samples
     */
    audioSampleCount: number;

    /**
     * Sample rate of the audio data
     */
    sampleRate: number;

    /**
     * The duration of the audio clip in seconds, computed from the sample count and sample rate.
     * This is just convenience property, setting it will update AudioSampleCount accordingly.
     */
    channelCount: number;
}
