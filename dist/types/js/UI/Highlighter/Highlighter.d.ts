/**
 * The Highlighter class handles highlighting of nodes in the graph.
 * This includes both highlighting on selections as well as highlighting on search.
 */
export default class Highlighter {
    constructor(graphContainerElement: any, eventEmitter: any, userDefinedOptions: any);
    graphContainerElement: any;
    ee: any;
    enableOnionOnFocus: any;
    focusedOnionNumberOfLayers: any;
    focusedOnionBaseColor: any;
    focusedOnionLayerSize: any;
    /**
     * Adds default filter definitions for node
     */
    writeHighlightFilters(): void;
    /**
     * This function sets the exclusive focus on a given entity
     * @param {string} entityID - ID of the entity to be focused
     * @param {boolean?} isFromDirection - Is the edge in the from direction? If applicable
     */
    setElementFocus(entityID: string, isFromDirection?: boolean | null): void;
    /**
     * Removes focus from all nodes and edges
     */
    removeAllEntityFocus(): void;
    /**
     * Toggles the highlighting of a given node
     * @param {string} entityID - ID of the entity to toggle
     * @param {boolean?} isFrom - Is the edge in the from direction? If applicable
     */
    toggleEntityFocusByID(entityID: string, isFrom?: boolean | null): boolean;
    /**
     * Toggles focus on nodes
     * @param {string} entityID - ID of the node to toggle focus for
     */
    toggleNodeEntityFocus(entityID: string): boolean;
    /**
     * Creates an onion border around a given svg node by cloning it a given amount of times
     * @param {HTMLElement} DOMElement - Element to add the border to
     * @param {number} size - Size of the onion layers
     * @param {string} color - Base color of the layers
     * @param {number} layers - number of layers
     * @param {boolean} wasTurnedOn - Returns true if the onion border was toggled on, and false if it was toggled off
     */
    toggleOnionBorder(DOMElement: HTMLElement, size: number, color: string, layers?: number): boolean;
    /**
     * Toggles focus on edges
     * @param {string} entityID - ID of the entity to toggle
     * @param {boolean} isFrom - Is the edge in the from direction?
     */
    toggleEdgeEntityFocus(entityID: string, isFrom: boolean): boolean;
    /**
     * Highlights multiple nodes with an expanding circle that disappears after a given time frame.
     * @param {string[]} nodes - Array of node IDs to highlight
     */
    highlightNode(nodes: string[]): void;
    /**
     * Disables (dims) nodes and their connected edges.
     * @param {string[]} nodes - Array of node IDs to fade
     */
    disableNodes(nodeIDsToDisable: any): void;
    /**
     * Clears all disabling for nodes and connected edges set by "disableNodes".
     * @param {string[]} nodes - Array of node IDs to fade
     */
    clearDisabled(): void;
}
