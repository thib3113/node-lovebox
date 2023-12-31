declare module 'gif-frames' {
    import { Initializer } from 'multi-integer-range';
    import { Canvas } from 'canvas';
    import stream from 'stream';

    export function gifFrames<T extends GifFrameOptions>(options: T): Promise<GifFrameData<T>[]>;
    export function gifFrames<T extends GifFrameOptions>(options: T, callback: (err: Error, frameData: GifFrameData<T>[]) => void): void;

    interface BaseOptions {
        url: string | Buffer;
        frames: number | 'all' | string;
        /**
         * @default false
         */
        cumulative?: boolean;
    }

    type JpegOutputOptions = {
        /**
         * @default jpg
         */
        outputType?: 'jpg' | 'jpeg' | undefined;
        /**
         * quality number, 1 to 100
         */
        quality?: number;
    };

    type GifPngOutputOptions = {
        /**
         * @default jpg
         */
        outputType?: 'gif' | 'png' | 'canvas';
    };

    type GifFramesOptions = BaseOptions & (JpegOutputOptions | GifPngOutputOptions);

    type GifOutputType = 'jpeg' | 'jpg' | 'gif' | 'png' | 'canvas';
    type GifFrameData<T extends GifFrameOptions> = T['outputType'] extends 'canvas' ? GifFrameCanvas : GifFrameReadableStream;

    interface GifFrameOptions {
        url: string | Buffer;
        frames: 'all' | Initializer;
        outputType?: GifOutputType;
        quality?: number;
        cumulative?: boolean;
    }

    interface GifFrameCanvas {
        getImage(): Canvas;
        frameIndex: number;
        frameInfo: GifFrameInfo;
    }

    interface GifFrameReadableStream {
        getImage(): stream.Readable;
        frameIndex: number;
        frameInfo: GifFrameInfo;
    }

    interface GifFrameInfo {
        x: number;
        y: number;
        width: number;
        height: number;
        has_local_palette: boolean;
        palette_offset: number;
        palette_size: number;
        data_offset: number;
        data_length: number;
        transparent_index: number;
        interlaced: boolean;
        delay: number;
        disposal: number;
    }

    function gifFrames(options: GifFramesOptions): Promise<FrameData[]>;

    interface FrameInfo {
        x: number;
        y: number;
        width: number;
        height: number;
        has_local_palette: boolean;
        palette_offset: number;
        palette_size: number;
        data_offset: number;
        data_length: number;
        transparent_index: number;
        interlaced: boolean;
        delay: number;
        disposal: number;
        // Ajoutez d'autres champs si nécessaire
    }

    export interface FrameData {
        getImage(): NodeJS.ReadableStream;
        frameIndex: number;
        frameInfo: FrameInfo;
        // Ajoutez d'autres propriétés et méthodes selon les besoins
    }

    interface BaseOptions {
        url: string | Buffer;
        frames: number | 'all' | string;
        /**
         * @default false
         */
        cumulative?: boolean;
    }

    type JpegOutputOptions = {
        /**
         * @default jpg
         */
        outputType?: 'jpg' | 'jpeg' | undefined;
        /**
         * quality number, 1 to 100
         */
        quality?: number;
    };

    type GifPngOutputOptions = {
        /**
         * @default jpg
         */
        outputType?: 'gif' | 'png';
    };

    type GifFramesOptions = BaseOptions & (JpegOutputOptions | GifPngOutputOptions);

    function gifFrames(options: GifFramesOptions): Promise<FrameData[]>;

    namespace gifFrames {}

    export = gifFrames;
}
