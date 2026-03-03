import type { BinaryPayloadMessage } from "@/models/index.js";

export interface ImportAudioClipRawData extends BinaryPayloadMessage {
    $type: "importAudioClipRawData";

    /**
     * Number of audio samples in this audio clip. This does NOT account for channel count and will be the same
     * regardless of mono/stereo/5.1 etc.
     */
    sampleCount: number;

    /**
     * Sample rate of the audio data
     */
    sampleRate: number;

    /**
     * Number of audio channels. 1 mono, 2 stereo, 6 is 5.1 surround
     * It's your responsibility to make sure that Resonite supports given audio channel count
     * The actual audio sample data is interleaved in the buffer
     */
    channelCount: number;
}
