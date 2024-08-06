import { ENGINE_MUST } from "../engine.js";
var FadeSprite;
ENGINE_MUST.init(() => {
    FadeSprite = ENGINE_MUST.CORE.objects.FadeSprite.getFirstInstance();
    if (FadeSprite == null)
        return;
    FadeSprite?.behaviors.Fading.addEventListener("fadeinend", () => {
        ENGINE_MUST.CORE.globalVars.Fade_is_Fading = false;
        console.log("Fadein is end");
    });
    FadeSprite?.behaviors.Fading.addEventListener("fadeoutend", () => {
        ENGINE_MUST.CORE.globalVars.Fade_is_Fading = false;
        console.log("Fadeoutis end");
    });
});
export class Fade {
    static Fade_black_to_empty(time, waittime) {
        FadeSprite = ENGINE_MUST.CORE.objects.FadeSprite.getFirstInstance();
        if (FadeSprite == null) {
            console.log("FadeSprite not found");
            return;
        }
        FadeSprite.behaviors.Fading.fadeOutTime = time;
        if (waittime != 0) {
            FadeSprite.behaviors.Fading.waitTime = waittime;
        }
        FadeSprite.opacity = 100;
        FadeSprite.behaviors.Fading.restartFade();
        ENGINE_MUST.CORE.globalVars.Fade_is_Fading = true;
    }
    static Fade_Empty_to_black(time, waittime) {
        FadeSprite = ENGINE_MUST.CORE.objects.FadeSprite.getFirstInstance();
        if (FadeSprite == null) {
            console.log("FadeSprite not found");
            return;
        }
        FadeSprite.behaviors.Fading.fadeInTime = time;
        if (waittime != 0) {
            FadeSprite.behaviors.Fading.waitTime = waittime;
        }
        FadeSprite.opacity = 0;
        FadeSprite.behaviors.Fading.restartFade();
        ENGINE_MUST.CORE.globalVars.Fade_is_Fading = true;
    }
}
