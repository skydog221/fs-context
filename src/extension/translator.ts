import { keyParser, translator } from "fs-context";

export const translate = translator()
  .write(keyParser.blockText("vvenvehelper", "unban"), {
    "zh-cn": "解除禁用VVenve",
    es: "UNBAN VVenve",
  })
  .write(keyParser.blockText("vvenvehelper", "ban"), {
    "zh-cn": "禁用VVenve",
    es: "BAN VVenve",
  });
