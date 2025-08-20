import { BlockMetadata } from 'fs-context/structs/metadata';

export function blockText(extensionId: string, block: BlockMetadata) {
    return `${extensionId}.blocks.${block.opcode}.text`;
}