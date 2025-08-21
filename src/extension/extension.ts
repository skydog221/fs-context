import { blockType, extension } from 'fs-context';
import { translate } from './translator';

export default extension()
    .block(
        blockType.reporter('add')
            .text('Add [a:number=114] + [b:number=514]')
            .action((args) => {
                return args.a + args.b;
            })
            .build()
    )
    .use(translate)