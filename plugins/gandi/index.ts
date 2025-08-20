import { defineModLoader } from 'fs-context/structs/plugin';

declare const window: Window & {
    tempExt: any;
};
export default defineModLoader({
    id: 'gandi',
    obtainRuntime(_, ...args) {
        return args[0];
    },
    apply(env) {
        window.tempExt = {
            Extension: env.extender.stored,
            info: {
                extensionId: env.extension.metadata.id
            }
        };
    },
    load() { },
    isSandboxed() {
        return false;
    },
    setupTranslation(env, _, translator) {
        const data: Record<string, Record<string, string>> = {};
        for (const key in translator.store) {
            for (const lang in translator.store[key]) {
                data[lang] = data[lang] || {};
                data[lang][key] = translator.store[key][lang];
            }
        }
        env.window.Scratch?.translate.setup(data);
    },
    readTranslationKey(env, _, key) {
        return env.window.Scratch?.translate(key) ?? key.default;
    },
});