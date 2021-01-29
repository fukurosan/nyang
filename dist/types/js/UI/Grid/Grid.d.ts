/**
 * The Grid class is responsible for drawing the background grid pattern to the canvas (if applicable)
 */
export default class Grid {
    constructor(graphContainerElement: any, eventEmitter: any, options: any);
    graphContainerElement: any;
    enableGrid: any;
    enableSecondaryGrid: any;
    ee: any;
    /**
     * Initialize the background grid
     */
    initializeGrid(): void;
    /**
     * Initialize the secondary grid
     */
    initializeAlternativeGrid(): void;
    /**
     * @param {D3Selection} container - D3 selection of the container we are drawing inside of
     * @param {*} startX - Start X coordinate of the line
     * @param {*} startY - Start Y coordinate of the line
     * @param {*} endX - End X coordinate of the line
     * @param {*} endY - End Y coordinate of the line
     */
    createLine(container: any, startX: any, startY: any, endX: any, endY: any): void;
}
