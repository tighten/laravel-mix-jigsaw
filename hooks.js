const { SyncHook } = require('tapable');

const JigsawHooksMap = new WeakMap();

function getJigsawHooks(compilation) {
    let hooks = JigsawHooksMap.get(compilation);

    if (hooks === undefined) {
        hooks = { done: new SyncHook([]) };

        JigsawHooksMap.set(compilation, hooks);
    }

    return hooks;
}

module.exports = { getJigsawHooks };
