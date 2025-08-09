import { blockType } from "fs-context";
import { client } from "../stores";

export default blockType.command("setClientID")
    .text("设置客户端 ID [CLIENT_ID:string]")
    .action(args => {
        client.id = args.CLIENT_ID;
    })
    .build();