import { extension } from "fs-context";
import loginStatus from "./blocks/loginStatus";
import userUid from "./blocks/userUid";
import userNickname from "./blocks/userNickname";
import writeVar from "./blocks/writeVar";
import setClientID from "./blocks/setClientID";
import tryLogin from "./blocks/tryLogin";
import getVar from "./blocks/getVar";
import delVar from "./blocks/delVar";
import isTokenValid from "./blocks/isTokenValid";

export default extension()
    .name("ShangCloud 云变量")
    .description("ShangCloud 云变量扩展")
    .label("鉴权相关")
    .separator()
    .block(setClientID)
    .block(loginStatus)
    .block(isTokenValid)
    .block(tryLogin)
    .label("用户信息")
    .block(userUid)
    .block(userNickname)
    .label("变量增删改查")
    .block(writeVar)
    .block(getVar)
    .block(delVar);
