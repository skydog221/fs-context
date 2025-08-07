import add from "./blocks/add";
import { extension } from "fs-context";

export default extension("fourcalc")
    .name("四则运算")
    .block(add.build());