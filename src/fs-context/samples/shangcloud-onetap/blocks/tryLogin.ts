import { blockType } from "fs-context";
import { SHANGCLOUD_ORIGIN } from "../constants";
import { client } from "../stores";

export default blockType.command("tryLogin")
    .text("尝试登录")
    .action(() => {
        if (!client.id) {
            console.error("CLIENT_ID 不能为空");
            return;
        }
        const loginWindow = window.open(
            `${SHANGCLOUD_ORIGIN}/auth/window?ui=1&client_id=${encodeURIComponent(client.id)}&origin=${encodeURIComponent(location.origin)}`,
            "loginWindow",
            "width=600,height=400"
        );
        window.addEventListener("message", function (event) {
            if (event.data.type === "login-success" && loginWindow) {
                const { token } = event.data.payload;
                const token_json = JSON.parse(token);
                if (token_json) {
                    client.accessToken = token_json.access_token;
                }
                if (token_json.refresh_token) {
                    client.refreshToken = token_json.refresh_token;
                }
                loginWindow.close();
            }
        });
    })
    .build();