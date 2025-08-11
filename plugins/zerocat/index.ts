import tw from "../tw";
import { definePlugin } from "fs-context/native-plugin";
export default definePlugin({ ...tw, platform: "zerocat" });
