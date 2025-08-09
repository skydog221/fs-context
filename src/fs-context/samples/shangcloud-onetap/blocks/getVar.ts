import { blockType } from "fs-context";
import { client } from "../stores";
import { SHANGCLOUD_ORIGIN } from "../constants";

export default blockType.reporter("getVar")
    .text("获取云变量 [KEY:string=temp] 的内容")
    .action(async args => {
        if (!client.accessToken) return "";
        const key = args.KEY;
        const res = await fetch(SHANGCLOUD_ORIGIN + "/api/var/" + key, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + client.accessToken
            }
        });
        const data = await res.json();
        if (data.msg === "success") {
            return data.data.value;
        }
        return "";
    })
    .build();