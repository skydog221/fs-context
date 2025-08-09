import { blockType } from "fs-context";
import { SHANGCLOUD_ORIGIN } from "../constants";
import { client } from "../stores";

export default blockType.boolean("isTokenValid")
    .text("Token是否有效")
    .action(async () => {
        if (!client.accessToken) return false;
        try {
            const res = await fetch(SHANGCLOUD_ORIGIN + "/api/token/test", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + client.accessToken
                }
            });
            if (res.status === 200) {
                const data = await res.json();
                if (data.msg === "ok" || data.msg === "OK") {
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("Token验证失败:", error);
            return false;
        }
    })
    .build();