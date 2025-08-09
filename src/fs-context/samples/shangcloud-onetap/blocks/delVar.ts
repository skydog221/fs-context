import { blockType } from "fs-context";
import { client } from "../stores";
import { SHANGCLOUD_ORIGIN } from "../constants";

export default blockType.command("delVar")
    .text("删除云变量 [KEY:string=temp]")
    .action(async args => {
        if (!client.accessToken) return;
        const key = args.KEY;
        const res = await fetch(SHANGCLOUD_ORIGIN + "/api/var/" + key, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + client.accessToken
            }
        });
        if (res.status === 200 || res.status === 204) {
            console.log("删除成功");
        }
    })
    .build();