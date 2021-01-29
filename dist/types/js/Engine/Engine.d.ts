/**
 * The Engine class is responsible for running the physics simulation of the graph.
 */
export default class Engine {
    constructor(forceCenterX: any, forceCenterY: any, eventEmitter: any);
    ee: any;
    forceCenterX: any;
    forceCenterY: any;
    simulation: any;
    /**
     * Start the simulation engine
     */
    initializeSimulation(): any;
    /**
     * Update the simulation with a new data set
     * @param {object[]} nodes
     * @param {edges[]} edges
     */
    updateSimulation(nodes: object[], edges: any): void;
    /**
     * Stop the simulation
     */
    stop(): void;
    /**
     * Restart the simulation
     */
    restart(): void;
    /**
     * Set the current alpha value of the simulation
     * @param {number} target - Alpha value
     */
    alpha(target: number): void;
    /**
     * Set the target alpha value for the simulation
     * @param {number} target - Alpha value
     */
    target(target: number): void;
    /**
     * Set the alpha decay value of the simulation.
     * @param {number} target - Alpha decay value
     */
    decay(target: number): void;
    /**
     * Creates a force group layout and positions nodes in the different groups depending on given input.
     * @param {object[]} nodes - All nodes to be affected
     * @param {object[]} edges - All edges to be affected
     * @param {string} attribute - Attribute to be used to determine the group of a node
     * @param {Function} filterFunction - Optional filter function that can be used instead of the attribute. Should return a string that determines the group of the provided node.
     * @param {Function} sortFunction - Optional sort function that will determine the order of the groups in the layout. Starting from left to right, top to bottom.
     */
    createLayout(nodes: object[], edges: object[], attribute: string, filterFunction: Function, sortFunction: Function): void;
    /**
     * Resets the force layout to its default mode and removes any existing groups.
     * @param {object[]} nodes - Nodes affected
     * @param {object[]} edges - Edges affected
     */
    resetLayout(nodes: object[], edges: object[]): void;
    /**
     * Returns the distance (length) of the passed edge
     * @param {object} l - Edge
     */
    getEdgeDistance(l: object): any;
}
