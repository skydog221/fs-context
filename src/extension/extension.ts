import { extension } from "fs-context/structs";
import add from "./blocks/add";

export default extension("fourcalc")
    .name("四则运算")
    .block(add.build());