export const blockTypes = ["command", "reporter", "boolean"] as const;
export type BlockType = typeof blockTypes[number];
