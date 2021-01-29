/**
 * The tooltip class handles generating and positioning the tooltip in the graph.
 */
export default class Tooltip {
    constructor(graphContainerElement: any, eventEmitter: any);
    graphContainerElement: any;
    ee: any;
    tooltip: any;
    /**
     * Initializes the tooltip
     */
    initializeTooltip(): any;
    /**
     * Displays the tooltip with a text at coordinates x and y
     * @param {object} node - The node object where the tooltip should be
     */
    showTooltip(node: object): void;
    /**
     * Hides the tooltip
     */
    hideTooltip(): void;
    /**
     * Unmounts the tooltip from the DOM
     */
    destroy(): void;
}
