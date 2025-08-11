import { Linter } from 'eslint';
import fs from 'fs';
import { ExtendWebpackConfig, NativePlugin } from './structs/plugin';
import path from 'path';
import { Configuration } from 'webpack';
import chalkTemplate from 'chalk-template';

export function load() {
    console.log(`Mode: ${process.env.NODE_ENV === 'production' ? 'production' : 'development'}`);
    const webpack: Record<string, (config: ExtendWebpackConfig) => Configuration> = {};
    const eslint: Linter.Config[] = [];
    const pluginsDir = path.join(__dirname, '../../plugins');
    const pluginFolders = fs.readdirSync(pluginsDir)
        .filter(file => fs.statSync(path.join(pluginsDir, file)).isDirectory());
    const pluginIds: string[] = [];
    function pad(id: string) {
        return id.padEnd(Math.max(...pluginIds.map(id => id.length)), ' ');
    }
    for (const folder of pluginFolders) {
        pluginIds.push(folder);
    }
    for (const folder of pluginFolders) {
        const currentNativeId = folder;
        try {
            const nativePath = path.resolve('dist/native/plugins', folder, 'native.js');
            if (fs.existsSync(nativePath)) {
                const { default: plugin }: { default: NativePlugin } = require(nativePath);
                webpack[currentNativeId] = plugin.configureWebpack?.call(plugin) ?? (() => ({}));
                eslint.push(...(plugin.configureESLint?.call(plugin) ?? []));
                console.log(chalkTemplate`{gray ${pad(currentNativeId)}} | {green loaded successfully}: {cyan ${plugin.platform}}.`);
            } else {
                webpack[currentNativeId] = () => ({});
                console.warn(chalkTemplate`{gray ${pad(currentNativeId)}} | {yellow not found native module}.`);
            }
        } catch (err) {
            console.error(chalkTemplate`{gray ${pad(currentNativeId)}} | {red ${err}}`);
        }
    }
    return { webpack, eslint };
}