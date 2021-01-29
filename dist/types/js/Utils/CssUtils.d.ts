declare namespace _default {
    export { initializeGraphStyles };
    export { tween };
}
export default _default;
/**
 * Writes user defined styles as CSS classes to the DOM dynamically.
 * @param {object} style - User provided styles parameters
 * @param {string} id - ID of the UI-class of this NYANG instance
 */
declare function initializeGraphStyles(style: object, id: string): void;
declare function tween(element: any, property: any, initialValue: any, target: any, startTime: any, animationTime: any, setter: any): void;
