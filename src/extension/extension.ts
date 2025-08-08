import { extension } from "fs-context";
import add from "./blocks/add";

export default extension("fourcalc")
    .name("四则运算")
    .loader("arraySplitedWithSpace", (src) => src.split(" "))
    .block(add.build());