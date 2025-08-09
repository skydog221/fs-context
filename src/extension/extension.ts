import { blockType, extension, numberParser } from "fs-context";
import { ArgumentMap } from "fs-context/structs/parser/compiltime";

export default extension("fourcalc")
    .name("四则运算")
    .loader("numberArray", (src) => src.split(" ").map(numberParser.toNumber))