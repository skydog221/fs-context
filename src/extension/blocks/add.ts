import { blockType } from "fs-context/structs";

export default blockType.reporter("add")
    .text("Add [a:number] to [b:number] and [c:color]")
    .action(args => args.a + args.b + args.c);