import { translator } from 'fs-context';

export const translate = translator('zh-CN')
    .write('block.add', {
        "zh-cn": ""
    });