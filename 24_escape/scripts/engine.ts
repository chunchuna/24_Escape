

export class ENGINE_MUST {
    //-----------------------------------------------------------------------------
    // Chun Chun Engine
    //
    // chun chun engine 基本周期函数和方法

    static CORE: IRuntime;
    static EVENT_HANDLER: InstanceType.EventHandler;

    static waitTime = (ms: number) => {
        return new Promise(res => setTimeout(res, ms));
    }
    static init = function (func: () => void) {
        runOnStartup(async runtime => {
            runtime.addEventListener("afteranylayoutstart", () => {
                func();
            })
        });
    }

    static tick = function (func: () => void) {
        runOnStartup(async runtime => {
            runtime.addEventListener("tick", () => {
                func();
            });
        });
    };



    //-----------------------------------------------------------------------------
    // 自定义
    //
    // 这里可以申明一些自定义的函数

    static LEVEL_INIT = function (func: () => void) {
        runOnStartup(async runtime => {
            runtime.addEventListener("afteranylayoutstart", () => {
                if (runtime.globalVars.GameType != "Level") return;
                func();
            })
        });
    }

    static LEVEL_TICK = function (func: () => void) {
        runOnStartup(async runtime => {
            runtime.addEventListener("tick", () => {
                if (runtime.globalVars.GameType != "Level") return;
                func();
            });
        });
    };


    //-----------------------------------------------------------------------------
    // Math
    //
    // 数学相关

    static lerp(start: number, end: number, t: number): number {

        return (1 - t) * start + t * end;
    }

    static calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

}


runOnStartup(async runtime => {

    ENGINE_MUST.CORE = runtime;

});

ENGINE_MUST.init(() => {
    //@ts-ignoreleta
    ENGINE_MUST.EVENT_HANDLER = ENGINE_MUST.CORE.objects.EventHandler.getFirstInstance();
})




