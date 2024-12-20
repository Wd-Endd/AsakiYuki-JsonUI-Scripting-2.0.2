import { AnimationInterface } from "../jsonUITypes/AnimationInterface";
/**
 * Animation class to handle animation creation and registration.
 */
export declare class Animation {
    private animate;
    private static apply;
    private static arguments;
    private static bind;
    private static call;
    private static caller;
    private static length;
    private static name;
    private static toString;
    /**
     * Constructor for Animation class.
     * @param animate - The AnimationInterface object containing animation data.
     */
    constructor(animate: AnimationInterface);
    static create(animate: AnimationInterface): Animation;
    /**
     * Private method to build animation object.
     * @param from - The starting value of the animation.
     * @param animKey - The animation properties.
     * @param next - The next animation to be played.
     * @returns The built animation object.
     */
    private buildAnimation;
    /**
     * Method to get the animation path.
     * @returns The animation path in the format '@namespace.name'.
     */
    getPath(animationState?: number): string;
}
