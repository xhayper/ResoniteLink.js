import type { Message } from "../..";

/**
 * Import a audio clip asset from a file on the local file system. Note that this must be a file
 * format supported by Resonite, otherwise this will fail.
 * If you are unsure if the file format is supported, send raw audio data instead.
 * Generally WAV, OGG & FLAC files are supported as audio clips.
 */
export interface ImportAudioClipFile extends Message {
    $type: "ImportAudioClipFile";

    /**
     * Path of the audio clip file to import
     */
    filePath: string;
}
