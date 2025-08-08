import { blockType } from "fs-context";

export default blockType.reporter("add")
    .text("Add [a:number] to [b:number=123] and [c:color=#ff0000]")
    .action(args => args.a + args.b + args.c);