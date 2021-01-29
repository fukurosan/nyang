/**
 * The data store class is responsible to storing and managing all edges and nodes.
 * The data store decides what nodes and edges are live, as well as makes sure they have the correct data set on them.
 */
export default class Datastore {
    constructor(nodes: any, edges: any, eventEmitter: any, styles: any, userDefinedOptions: any);
    allNodes: any;
    allEdges: any;
    liveNodes: any;
    liveEdges: any;
    filters: {
        nodes: never[];
        edges: never[];
    };
    ee: any;
    entityProcessor: EntityProcessor;
    /**
     * Will always return only what data is currently live
     */
    get edges(): any;
    /**
     * Will always return only what data is currently live
     */
    get nodes(): any;
    /**
     * Bootstraps the update animation for implosion and explosions of nodes, and ensures things happen a correct order
     */
    implodeExplodedNodesAnimation(id: any, isImplode: any): void;
    /**
     * If there are edges that lack IDs this function will set these to a number that represents the index in the edge array.
     */
    updateEdgeIDs(): void;
    /**
     * Updates the data in the data store.
     * @param {object[]} newNodes - All nodes to be included in the new data set
     * @param {object[]} newEdges - All edges to be included in the new data set
     */
    updateDataset(newNodes: object[], newEdges: object[]): void;
    /**
     * Retrieves a node object by its ID
     * @param {string} ID - ID of the node
     * @return {object|null} - Node object or null
     */
    getNodeByID(ID: string): object | null;
    /**
     * Retrieves an edge object by its ID
     * @param {string} ID - ID of the edge
     * @return {object|null} - Edge object or null
     */
    getEdgeByID(ID: string): object | null;
    /**
     * Clears all filters
     */
    resetAllFilters(): void;
    /**
     * Stores new filters, overwriting and clearing any existing ones. Note that this function not apply the filters.
     * @param {object[]} filters - Array of filters to be set
     */
    setFilters(filters: object[]): void;
    /**
     * Applies all defined filters to the dataset
     */
    applyFilters(): void;
    /**
     * Creates source and target coordinates for nodes that are staged to go live from an implosion/explosion.
     * The result of this function is primarily used to animate the graph into a new state
     * @param {number?} rootX - Start position for the transition
     * @param {number?} rootY - Start position for the transition
     * @param {number?} targetX - End position for the transition
     * @param {number?} targetY - End position for the transition
     */
    stageNodePositions(rootX: number | null, rootY: number | null, targetX: number | null, targetY: number | null): void;
    /**
     * Updates the live data by filtering non-relevant nodes and edges
     */
    updateLiveData(): void;
    /**
     * Updates the counter on all nodes that has information about how many hidden edges it is a source to
     */
    updateNumberOfHiddenEdgesOnNodes(): void;
    /**
     * Checks if a node is live or not.
     * @param {object} node - Node object to be evaluated
     * @return {boolean} - isLive?
     */
    isNodeLive(node: object): boolean;
    /**
     * Checks if an edge is live or not.
     * @param {object} node - Edge object to be evaluated
     * @return {boolean} - isLive?
     */
    isEdgeLive(edge: any): boolean;
    /**
     * Sets given nodes and edges to a specified hidden status.
     * @param {object[]} nodes - Array of node objects
     * @param {object[]} edges - Array of edge objects
     * @param {boolean} status - Status to be set, true if hidden, false if not
     */
    setNodesAndEdgesHiddenStatus(nodes: object[], edges: object[], status: boolean): void;
    /**
     * Sets all nodes connected to the provided root node to hidden=true/false (in the TO direction)
     * @param {string} rootNodeID - ID of the root node of the operation
     * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
     * @return {object} - Affected nodes and edges
     */
    implodeOrExplodeNode(rootNodeID: string, isImplode: boolean): object;
    /**
     * Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction) where no further branching continues.
     * @param {string} rootNodeID - ID of the root node of the operation
     * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
     * @return {object} - Affected nodes and edges
     */
    implodeOrExplodeNodeLeafs(rootNodeID: string, isImplode: boolean): object;
    /**
     * Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction) recursively until it reaches the end of the tree.
     * @param {string} rootNodeID - ID of the root node of the operation
     * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
     * @param {string[]} processedNodeIDs - IDs that have been processed. Generally would not set this manually when calling the function.
     */
    implodeOrExplodeNodeRecursive(nodeID: any, isImplode: boolean, processedNodeIDs?: string[]): void;
    /**
     * Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction)
     * recursively until it reaches the end of the tree, but only for branches that don't create circular references back.
     * (to avoid imploding the entire tree on highly interconnected data)
     * @param {string} rootNodeID - ID of the root node of the operation
     * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
     * @return {object} - Affected nodes and edges
     */
    implodeOrExplodeNodeNonCircular(rootNodeID: string, isImplode: boolean): object;
    /**
     * Calculates the shortest path from one node to another. Returns an array with the nodeIDs, or an empty array if there is no path.
     * @param {string} nodeIDFrom - Node ID where the road starts
     * @param {string} nodeIDTo - Node ID where the road ends
     * @param {string[]} path - The current path, typically you provide this as undefined
     * @param {string[]} crossedNodes - Nodes that have already been seen, typically you provide this as undefined
     * @return {string[]} - Shortest path
     */
    calculateEdgePathFromNodeToNode(nodeIDFrom: string, nodeIDTo: string, path?: string[], crossedNodes?: string[]): string[];
}
import EntityProcessor from "./EntityProcessor";
