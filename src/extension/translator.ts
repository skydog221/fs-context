import { keyParser, translator } from 'fs-context';

export const translate = translator()
    .write(keyParser.blockText('exampleextension', 'add'), {
        'zh-cn': '计算加法[a:number]+[b:number]',
        'es': 'sumar [a:number] + [b:number]',
    });