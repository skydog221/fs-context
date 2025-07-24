import { BlockType, Extension } from "@framework/structs";
export default class ScOS_Engine extends Extension {
    id = "scosengine";
    displayName = "ScratchOS引擎";
    description = "";
    disableBlockInjection: boolean = true;
    ws: WebSocket | null = null;
    connected = false;
    @BlockType.Command("连接开发服务器[url:string=http://localhost:25565]")
    async connect({ url }: { url: string }) {
        return new Promise<void>((resolve, reject) => {
            this.ws = new WebSocket(url);
            this.ws.addEventListener("message", (event) => {
                const data = JSON.parse(event.data);
                if (data.type === "init") {
                    this.connected = true;
                }
            });
            this.ws.addEventListener("open", () => {
                resolve();
            });
            this.ws.addEventListener("error", (error) => {
                reject(error);
                this.connected = false;
            });
        });
    }
    @BlockType.Command("断开连接")
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
            this.connected = false;
        }
    }
    @BlockType.Boolean("是否已连接到开发服务器")
    isConnected() {
        return this.connected;
    }
}