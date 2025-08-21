import { BlockMetadata } from 'fs-context/structs/metadata';

export function blockText(extensionId: string, blockOpcode: string) {
    return `${extensionId}.blocks.${blockOpcode}.text`;
}