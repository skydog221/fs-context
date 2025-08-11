import { blockType, extension } from 'fs-context';

export default extension()
    .block(
        blockType.reporter('cookApplePie')
            .text('制作一个苹果派，使用[apple:number=1]个苹果，当[sugar:bool=true]时放糖，[flour:number=200]g面粉，[egg:number=1]个鸡蛋，给[people="阳毅"]吃')
            .action((args, _defaults) => {








                args;
                _defaults;
            })
            .build()
    )