import { defineModLoader } from 'fs-context/structs/plugin';

export default defineModLoader({
    id: 'tw',
    obtainRuntime(environment) {
        return environment.window.Scratch;
    },
    load(environment, runtime) {
        runtime?.extensions.register(environment.extension.stored);
    },
    isSandboxed(_, runtime) {
        return !runtime?.extensions.unsandboxed;
    },
    setupTranslation(_, runtime, translator) {
        const data: Record<string, Record<string, string>> = {};
        for (const key in translator.store) {
            for (const lang in translator.store[key]) {
                data[lang] = data[lang] || {};
                data[lang][key] = translator.store[key][lang];
            }
        }
        runtime?.translate.setup(data);
    },
    readTranslationKey(_, runtime, key) {
        return runtime?.translate(key) ?? key.default;
    }
});