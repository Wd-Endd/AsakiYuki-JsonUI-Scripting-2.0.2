"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
const __1 = require("..");
const Config_1 = require("../cached/Config");
const Manager_1 = require("../cached/Manager");
const CurrentLine_1 = require("../lib/CurrentLine");
/**
 * Animation class to handle animation creation and registration.
 */
class Animation {
    animate;
    static apply() { }
    ;
    static arguments = '';
    static bind() { }
    ;
    static call() { }
    ;
    static caller = '';
    static length = '';
    static name = '';
    static toString() { }
    ;
    /**
     * Constructor for Animation class.
     * @param animate - The AnimationInterface object containing animation data.
     */
    constructor(animate) {
        this.animate = animate;
        // Obfuscate element name if enabled in config
        if (Config_1.Config.data.obfuscate_element_names) {
            animate.name = (0, __1.generateRandomName)();
            animate.namespace = `${(0, __1.getRandomNamespace)()}`;
        }
        else {
            // If name is not provided, generate a random name
            animate.name = animate.name || (0, CurrentLine_1.CurrentLine)();
            // If namespace is not provided, generate a random namespace
            animate.namespace = `${animate.namespace || (0, __1.getRandomNamespace)()}`;
        }
        const animateLength = animate.keys.length;
        let index = 0, from = animate.from;
        // Loop through animation keys
        while (index++ < animateLength) {
            const key = animate.keys[index - 1];
            const next = animate.loop ? (`${this.getPath()}${(index === animateLength) ? '' : `-${index}`}`) : ((index !== animateLength) ? `${this.getPath()}-${index}` : undefined);
            // If key is a number, create a wait animation
            if (typeof key === 'number') {
                const animBuild = {
                    anim_type: __1.AnimTypes.Wait,
                    duration: key
                };
                Manager_1.CachedManager.register(`${animate.name}${(index === 1) ? '' : `-${index - 1}`}`, animate.namespace, this.buildAnimation(undefined, animBuild, next));
            }
            else {
                // If key is an object, create an animation with provided properties
                const animBuild = {
                    from,
                    anim_type: animate.type,
                    ...key
                };
                Manager_1.CachedManager.register(`${animate.name}${(index === 1) ? '' : `-${index - 1}`}`, animate.namespace, this.buildAnimation(undefined, animBuild, next));
                from = animBuild.to;
            }
        }
    }
    static create(animate) {
        return new this(animate);
    }
    /**
     * Private method to build animation object.
     * @param from - The starting value of the animation.
     * @param animKey - The animation properties.
     * @param next - The next animation to be played.
     * @returns The built animation object.
     */
    buildAnimation(from, animKey, next) {
        animKey.duration ??= 1;
        return {
            from,
            next,
            ...animKey
        };
    }
    /**
     * Method to get the animation path.
     * @returns The animation path in the format '@namespace.name'.
     */
    getPath(animationState) {
        if (animationState !== undefined && animationState > 0 && animationState < this.animate.keys.length)
            return `@${this.animate.namespace}.${this.animate.name}-${animationState}`;
        else
            return `@${this.animate.namespace}.${this.animate.name}`;
    }
}
exports.Animation = Animation;
