import { blockType, extension, numberParser } from "fs-context";

export default extension("fourcalc")
    .name("四则运算")
    .loader("numberArray", (src) => src.split(" ").map(numberParser.toNumber))
    .block(
        blockType.reporter("add")
            .text("计算加法：[a:number]+[b:number]+[c:number]")
            .action(args => args.a + args.b + args.c)
            .build()
    )
    .block(
        blockType.reporter("addArray")
            .text("计算数组总和：[a:numberArray]")
            .action(args => {
                console.log(args);
                return (args.a as number[]).reduce((a, b) => a + b, 0);
            })
            .build()
    )