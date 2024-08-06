export class ENGINE_MUST {
    //-----------------------------------------------------------------------------
    // Math
    //
    // 数学相关
    static lerp(start, end, t) {
        return (1 - t) * start + t * end;
    }
    static calculateDistance(x1, y1, x2, y2) {
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
}
ENGINE_MUST.waitTime = (ms) => {
    return new Promise(res => setTimeout(res, ms));
};
ENGINE_MUST.init = function (func) {
    runOnStartup(async (runtime) => {
        runtime.addEventListener("afteranylayoutstart", () => {
            func();
        });
    });
};
ENGINE_MUST.tick = function (func) {
    runOnStartup(async (runtime) => {
        runtime.addEventListener("tick", () => {
            func();
        });
    });
};
//-----------------------------------------------------------------------------
// 自定义
//
// 这里可以申明一些自定义的函数
ENGINE_MUST.LEVEL_INIT = function (func) {
    runOnStartup(async (runtime) => {
        runtime.addEventListener("afteranylayoutstart", () => {
            if (runtime.globalVars.GameType != "Level")
                return;
            func();
        });
    });
};
ENGINE_MUST.LEVEL_TICK = function (func) {
    runOnStartup(async (runtime) => {
        runtime.addEventListener("tick", () => {
            if (runtime.globalVars.GameType != "Level")
                return;
            func();
        });
    });
};
runOnStartup(async (runtime) => {
    ENGINE_MUST.CORE = runtime;
});
ENGINE_MUST.init(() => {
    //@ts-ignoreleta
    ENGINE_MUST.EVENT_HANDLER = ENGINE_MUST.CORE.objects.EventHandler.getFirstInstance();
});
