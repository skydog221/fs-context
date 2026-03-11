import { blockType, extension } from "fs-context";
import { translate } from "./translator";
let unbanKey: string = "";
export default extension()
  .block(
    blockType
      .command("ban")
      .text("BAN VVenve")
      .action(() => {
        unbanKey = (window as any).__VVENVE__.ban();
      })
      .build(),
  )
  .block(
    blockType
      .command("unban")
      .text("UNBAN VVenve")
      .action(() => {
        (window as any).__VVENVE__.unban(unbanKey);
      })
      .build(),
  )
  .use(translate);
