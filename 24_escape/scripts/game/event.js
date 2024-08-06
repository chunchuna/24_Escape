import { ENGINE_MUST } from "../engine.js";
import { StartDialogue } from "./level.js";
import { Fade } from "./fade.js";
class GUARD {
    static 1() {
        // 和狱警对话
        var GameVariblesInstance = ENGINE_MUST.CORE.objects.GameVariables.getFirstInstance();
        if (GameVariblesInstance == null)
            return;
        var map = GameVariblesInstance.getDataMap();
        //@ts-ignoreleta
        if (map.get("GuardDie") == 1)
            return;
        //@ts-ignoreleta
        if (map.get("GetOutRoom") == 1) {
            StartDialogue("Kill", 26);
        }
        //@ts-ignoreleta
        if (map.get("GetOutRoom") == 0) {
            if (map.get("GetGold") == 1) {
                StartDialogue("Guard_AboutGold", 26);
            }
            //@ts-ignoreleta
            if (map.get("GetGold") == 0) {
                StartDialogue("Guard", 26);
            }
        }
    }
    static 2() {
        //击杀狱警
        //@ts-ignoreleta
        var Guard = ENGINE_MUST.CORE.getInstanceByUid(26);
        if (Guard == null)
            return;
        //@ts-ignoreleta
        var NudeGuard = ENGINE_MUST.CORE.getInstanceByUid(130);
        if (NudeGuard == null)
            return;
        Fade.Fade_black_to_empty(5, 3);
        Guard.destroy();
        NudeGuard.opacity = 100;
        //ENGINE_MUST.CORE.callFunction("SetObjectRotation", Guard.uid, 0, -90, 0)
        //Guard.behaviors.Solid.isEnabled = false;
        //Guard.zElevation -= 100
        //@ts-ignoreleta
        var FakeGuardSprite = ENGINE_MUST.CORE.getInstanceByUid(88);
        //@ts-ignoreleta
        var PrisonerMainSprite = ENGINE_MUST.CORE.getInstanceByUid(17);
        PrisonerMainSprite.opacity = 0;
        FakeGuardSprite.opacity = 100;
        var GameVariblesInstance = ENGINE_MUST.CORE.objects.GameVariables.getFirstInstance();
        if (GameVariblesInstance == null)
            return;
        var map = GameVariblesInstance.getDataMap();
        map.set("Police", 1);
        map.set("GuardDie", 1);
    }
}
class SECRET {
    static 1() {
        //地下通道入口互动 
        var GameVariblesInstance = ENGINE_MUST.CORE.objects.GameVariables.getFirstInstance();
        if (GameVariblesInstance == null)
            return;
        var map = GameVariblesInstance.getDataMap();
        var GetSecret = map.get("GetSecret"); //是否发现密道
        if (GetSecret == 0) {
            StartDialogue("Secret", 0);
        }
    }
    static 2() {
        console.log("传送到秘密通道");
    }
}
class GOLD {
    static 1() {
        var GameVariblesInstance = ENGINE_MUST.CORE.objects.GameVariables.getFirstInstance();
        if (GameVariblesInstance == null)
            return;
        var map = GameVariblesInstance.getDataMap();
        if (map.get("GetGold") == 0) {
            StartDialogue("Gold", 0);
        }
    }
    static 2() {
        //@ts-ignoreletada
        var Suitcase = ENGINE_MUST.CORE.getInstanceByUid(124);
        //@ts-ignoreleta
        var PrisonerMain = ENGINE_MUST.CORE.objects.prisonerMain.getFirstInstance();
        if (PrisonerMain == null || Suitcase == null)
            return;
        if (Suitcase.opacity == 0) {
            Suitcase.opacity = 100;
        }
        Suitcase.x = PrisonerMain.x - 50;
        Suitcase.y = PrisonerMain.y;
        Suitcase.zElevation = PrisonerMain.zElevation + 200;
        PrisonerMain.addChild(Suitcase, {
            transformX: true,
            transformY: true,
            destroyWithParent: false,
        });
    }
}
class GATE {
    static 1() {
        // 狱警开门
        //@ts-ignoreleta
        var Gate1 = ENGINE_MUST.CORE.getInstanceByUid(24);
        //@ts-ignoreleta
        var Gate2 = ENGINE_MUST.CORE.getInstanceByUid(3);
        Gate1.behaviors.Solid.isEnabled = false;
        Gate2.behaviors.Solid.isEnabled = false;
        // Gate1.y -= 200;
        // Gate2.y -= 500;
        Gate1.destroy();
        Gate2.destroy();
        //@ts-ignoreleta
        var Suitcase = ENGINE_MUST.CORE.getInstanceByUid(124);
        //@ts-ignoreleta
        var PrisonerMain = ENGINE_MUST.CORE.objects.prisonerMain.getFirstInstance();
        PrisonerMain.removeChild(Suitcase);
        Suitcase.zElevation = 22;
        var GameVariblesInstance = ENGINE_MUST.CORE.objects.GameVariables.getFirstInstance();
        if (GameVariblesInstance == null)
            return;
        var map = GameVariblesInstance.getDataMap();
        map.set("GetOutRoom", 1);
    }
    static 2() {
        //士兵打开第二道大门
        var GameVariblesInstance = ENGINE_MUST.CORE.objects.GameVariables.getFirstInstance();
        if (GameVariblesInstance == null)
            return;
        var map = GameVariblesInstance.getDataMap();
        var Gate = ENGINE_MUST.CORE.getInstanceByUid(133);
        if (Gate == null)
            return;
        Gate.destroy();
        map.set("GOpenGate2", 1);
    }
}
class AMEIRICAN_GUARD {
    // 士兵相关
    static 1() {
        // 和士兵谈话
        var GameVariblesInstance = ENGINE_MUST.CORE.objects.GameVariables.getFirstInstance();
        if (GameVariblesInstance == null)
            return;
        var map = GameVariblesInstance.getDataMap();
        if (map.get("GOpenGate2") == 1) {
            return;
        }
        if (map.get("Police") == 1) {
            StartDialogue("AmeiricanGuard", 136);
        }
        else {
            alert("被逮捕结局");
        }
    }
}
class PRISONER_OTHER {
    // 其他囚犯
    static 1() {
        var GameVariblesInstance = ENGINE_MUST.CORE.objects.GameVariables.getFirstInstance();
        if (GameVariblesInstance == null)
            return;
        var map = GameVariblesInstance.getDataMap();
        if (map.get("Police") == 1) {
            StartDialogue("Otherprisoners", 116);
        }
        else {
            StartDialogue("Otherprisoners2", 116);
        }
    }
}
const functionMap = {
    'guard:config:1': GUARD[1],
    'guard:config:2': GUARD[2],
    'gold:config:1': GOLD[1],
    'gold:config:2': GOLD[2],
    'gate:config:1': GATE[1],
    'gate:config:2': GATE[2],
    'secret:config:1': SECRET[1],
    'secret:config:2': SECRET[2],
    "ameirican_guard:config:1": AMEIRICAN_GUARD[1],
    'prisonerother:config:1': PRISONER_OTHER[1],
};
// Function that calls another function based on a string key, with arguments
export function ConfigExecutor(functionName, ...args) {
    const func = functionMap[functionName];
    console.log("正在执行conifg:" + functionName);
    if (func) {
        func(...args);
    }
    else {
        console.log(`Function with name ${functionName} not found.`);
    }
}
