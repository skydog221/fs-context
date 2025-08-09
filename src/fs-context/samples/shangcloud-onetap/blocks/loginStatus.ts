import { blockType } from "fs-context";
import { client } from "../stores";

export default blockType.reporter("loginStatus")
    .text("是否获取到Token")
    .action(() => {
        return client.accessToken ? "已授权" : "未授权";
    })
    .build();