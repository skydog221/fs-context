export interface BlockMetadata<Text extends string = string> {
    opcode: string;
    text: Text;
    action: (args: any) => any;
}
export interface MenuMetadata {
}