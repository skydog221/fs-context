import { blockType } from "fs-context";

export default blockType.reporter("add")
    .text("Add [a:number] to [b=123] and [c:color=#ff0000] and [d:bool]")
    .action(args => args.a + args.b + args.c + args.d);