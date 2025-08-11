import { blockType } from 'fs-context';
import { SHANGCLOUD_ORIGIN } from '../constants';
import { client } from '../stores';

export default blockType.command('writeVar')
    .text('向云变量 [KEY:string="temp"] 写入 [VALUE:string="1"]')
    .action(async (args, _defaults) => {
        if (!client.accessToken) return;
        const key = args.KEY;
        const value = args.VALUE;
        const params = new URLSearchParams();
        params.append('value', value);
        const res = await fetch(SHANGCLOUD_ORIGIN + '/api/var/' + key, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + client.accessToken
            },
            body: params
        });
        const data = await res.json();
        if (data.ok) {
            console.log('写入成功');
        }
    })
    .build();