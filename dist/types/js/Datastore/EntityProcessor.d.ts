/**
 * The entity processor has two purposes
 * It is used to prepare data on nodes and edges so that it does not have to be calculated on the fly.
 * It is also used to manipulate the data stored on the objects to achieve certain effects (such as fixating coordinates)
 */
export default class EntityProcessor {
    constructor(eventEmitter: any, styles: any, userDefinedOptions: any);
    style: any;
    fixedEdgeLabelWidth: any;
    edgeLabelWidth: any;
    maxEdgeLabelWidth: any;
    ee: any;
    /**
     * Executes the preprocessor for when data is about to go live
     * @param {object[]} nodes
     * @param {object[]} edges
     */
    executePreProcessor(nodes: object[], edges: object[]): void;
    /**
     * Fixate a node to a given position in the graph.
     * @param {object} node - Node object to be fixated
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    repositionNode(node: object, x: number, y: number): void;
    /**
     * Translates node IDs to index IDs on edge objects. This is essentially only to satisfy the D3 force layout.
     * @param {object[]} edges - Edges to be updated
     * @param {object[]} nodes - List of all nodes
     */
    updateEdgeNodeIDs(edges: object[], nodes: object[]): void;
    /**
     * Updates the edge distances (lengths, essentially).
     * @param {object[]} edges - Edges to be updated
     */
    updateEdgeDistances(edges: object[]): void;
    /**
     * Updates the edge label width on a given array of edges.
     * @param {object[]} edges -
     */
    updateEdgeLabelWidths(edges: object[]): void;
    /**
     * Updates the edge counts for self-references and multi-references (to the same node).
     * @param {object[]} edges
     */
    updateEdgeCounters(edges: object[]): void;
    /**
     * Updates node parameters. This is for example in order to more easily access information such as radius, height, width, etc at runtime.
     * @param {object[]} nodes
     */
    updateNodeParameters(nodes: object[]): void;
    /**
     * Animates all node positions from source to target
     * Nodes without a source/target will be frozen during the animation
     * @param {object[]} nodes - All nodes in the data store
     */
    animateNodePositions(nodes: object[]): Promise<any>;
}
