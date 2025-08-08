import { colorParser } from "fs-context";
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
export const casterMap: {
    [K in InputType]: (value: string) => InputTypeCast[K]
} = {
    string: String,
    number: Number,
    bool: Boolean,
    menu: String,
    angle: Number,
    color: colorParser.fix,
    "hat-param": String,
};