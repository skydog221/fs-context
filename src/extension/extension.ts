import { blockType, extension } from "fs-context";

export default extension()
    .block(
        blockType.reporter("guessDisease")
            .text("猜病|日期：[DATE=0101]消息：[MESSAGE=Hello]chatId:[CHATID]")
            .action(args => {
                console.log(args);
            })
            .build()
    )