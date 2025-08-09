import { blockType } from "fs-context";
import { user } from "../stores";

export default blockType.reporter("userUid")
    .text("用户 UID")
    .action(() => {
        return user.uid || "";
    })
    .build();