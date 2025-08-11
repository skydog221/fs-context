import { blockType } from 'fs-context';
import { user } from '../stores';

export default blockType.reporter('userNickname')
    .text('用户昵称')
    .action(() => {
        return user.nickname || '';
    })
    .build();