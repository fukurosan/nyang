/**
 * The zoom handler class handles anything and everything related to zooming.
 */
export default class ZoomHandler {
    constructor(graphContainerElement: any, eventEmitter: any, options: any);
    graphContainerElement: any;
    enableZoomButtons: any;
    ee: any;
    zoom: any;
    zoomButtonContainer: any;
    /**
     * Initializes the zoom controls in the bottom right corner.
     */
    initializeZoomButtons(): void;
    /**
     * Set the zoom scale to a given number.
     * @param {number} scale - New scale
     */
    scaleTo(scale: number): void;
    /**
     * Scale the zoom by a given amount.
     * @param {number} ratio - Amount to scale by
     */
    scaleBy(ratio: number): void;
    /**
     * Reset the zoom (Zoom to fit).
     */
    resetZoom(): void;
    /**
     * Transforms the svg>g element to a specific translation and scale.
     * @param {number} x - New X coordinate
     * @param {number} y - New Y coordinate
     * @param {number} scale - New scale
     */
    zoomToCoordinates(x: number, y: number, scale: number): void;
    /**
     * Handle an incoming zoom request.
     * @param {number?} x - New X coordinate
     * @param {number?} y - New Y coordinate
     * @param {number?} scale - New scale
     */
    handleZoomRequest(x: number | null, y: number | null, scale: number | null): void;
    /**
     * Completely remove the zoom utility from the DOM.
     */
    destroy(): void;
}
