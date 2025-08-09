import { remoteStore } from "fs-context/structs";

export const user = remoteStore({
    uid: "",
    nickname: "",
    accessToken: "",
});
export const client = remoteStore({
    id: "",
    accessToken: "",
    refreshToken: ""
});