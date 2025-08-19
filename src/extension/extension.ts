import { blockType, extension } from 'fs-context';

export default extension()
    .block(
        blockType.command("a").text("").build()
    )