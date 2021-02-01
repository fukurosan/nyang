export default class NYANGNode {
    constructor(id: any, type: any, name: any, icon: any, data: any);
    id: any;
    type: any;
    name: any;
    icon: any;
    data: any;
    x: number;
    y: number;
    fx: any;
    fy: any;
    vx: any;
    vy: any;
    isFiltered: boolean;
    isHidden: boolean;
    hiddenEdgeCount: number;
    shape: any;
    radius: any;
    width: any;
    height: any;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    originalFx: any;
    originalFy: any;
    isAnimating: boolean;
    index: any;
    /**
     * Fixates node to a given position in the graph.
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    pinNode(x: number, y: number): void;
    /**
     * Removes coordinate fixation.
     */
    unPinNode(): void;
    /**
     * Repositions node to given coordinates.
     * @param {number} newX - Target X coordinate
     * @param {number} newY - Target Y coordinate
     */
    repositionNode(newX: number, newY: number): Promise<any>;
    /**
     * Animates position from source to target
     */
    animate(): Promise<any>;
    animating: boolean | undefined;
}
