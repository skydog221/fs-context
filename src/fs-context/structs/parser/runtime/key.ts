export function blockText(extensionId: string, blockOpcode: string) {
    return `${extensionId}.blocks.${blockOpcode}.text`;
}