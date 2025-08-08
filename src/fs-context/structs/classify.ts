import { HexColorString } from "./util";

export const blockTypes = ["command", "reporter", "boolean"] as const;
export type BlockType = typeof blockTypes[number];

export type InputTypeCast = {
    string: string;
    number: number;
    bool: boolean;
    menu: string;
    angle: number;
    color: HexColorString;
    "hat-param": string;
};
export type InputType = keyof InputTypeCast;