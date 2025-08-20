import { DeepReadonly } from 'fs-context/structs/util';
import { ScratchRuntime } from '../structs/stored';

declare global {
    const fsContext: DeepReadonly<{
        platform: string;
        developing: boolean;
        extension: {
            id: string;
            name: string;
            description: string;
            version: string;
            platform: string[];
            author: string;
            language: string;
        };
    }>;
    interface Window {
        Scratch: ScratchRuntime;
    }
}