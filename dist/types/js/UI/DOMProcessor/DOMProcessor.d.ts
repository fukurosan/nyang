/**
 * The DOM Processor class is responsible for managing the DOM using the provided node and edge data, as well as provided configuration.
 */
export default class DOMProcessor {
    constructor(rootG: any, eventEmitter: any, userDefinedOptions: any);
    enableFadeOnHover: any;
    showMultiplicity: boolean;
    enableMultiLineNodeLabels: any;
    rotateLabels: any;
    rootG: any;
    nodes: any[];
    edges: any[];
    listeningForTick: boolean;
    ee: any;
    /**
     * Updates all markers (arrows for edges)
     * @param {object[]} edges - All edges
     */
    updateMarkers(edges: object[]): void;
    /**
     * Updates all edges in the DOM, including enter and exit operations.
     * @param {object[]} edges - edges to be present in the DOM
     */
    updateEdges(edges: object[]): void;
    edgePath: any;
    /**
     * Updates all multiplicity counters on edges.
     * @param {object[]} edges - List of all edges
     */
    updateMultiplicityCounters(edges: object[]): void;
    activeMultiplicities: any;
    /**
     * Updates all nodes in the DOM, including enter and exit operations.
     * @param {object[]} nodes - List of all nodes
     */
    updateNodes(nodes: object[]): void;
    nodeElements: any;
    /**
     * Updates all labels on edges.
     * @param {object[]} edges - List of all edges
     */
    updateLabels(edges: object[]): void;
    labels: any;
    /**
     * Returns the distance (length) of the passed edge.
     * @param {object} l - Edge object
     */
    getEdgeDistance(l: object): any;
    /**
     * Retrieves marker ID.
     * @param {object} l - Edge object
     * @param {boolean} inverse - Is the edge inverse?
     */
    getMarkerId(l: object, inverse: boolean): string;
    /**
     * Draws a marker.
     * @param {D3Selection} defs - Definitions selection by D3
     * @param {object} edge - Edge object
     * @param {boolean} inverse - Is the edge inverse?
     */
    drawMarker(defs: any, edge: object, inverse: boolean): void;
    /**
     * Draws a label to a edge in direction X.
     * @param {D3Selection} edge - Edge HTMLElement selection by D3
     * @param {object} data - Edge object
     * @param {"to"|"from"} direction - Direction of the edge
     */
    drawLabel(edge: any, data: object, direction: "to" | "from"): void;
    /**
     * Draws a rectangle as a label background.
     * @param {D3Selection} label - D3 selection of the label parent HTMLElement
     * @param {object} data - Edge object
     * @param {"to"|"from"} direction - Direction of the edge
     */
    drawLabelRect(label: any, data: object, direction: "to" | "from"): void;
    /**
     * Draws a new <tspan> to a supplied label.
     * @param {D3Selection} element - Label HTMLElement selection by D3
     * @param {object} d - Edge object
     * @param {"to"|"from"} direction - Direction of the edge
     */
    drawLabelText(element: any, d: object, direction: "to" | "from"): void;
    /**
     * Highlights the marker and edge for the given label and direction.
     * @param {object} edgeData - Edge object
     * @param {"to"|"from"} direction - Direction of the edge
     */
    labelMouseEnter(edgeData: object, direction: "to" | "from"): void;
    /**
     * Removes highlighting of marker and edge for the given label and direction
     * @param {object} edgeData - Edge object
     * @param {"to"|"from"} direction - Direction of the edge
     */
    labelMouseLeave(edgeData: object, direction: "to" | "from"): void;
    /**
     * Draws multiplicity notation
     * @param {object} edge - Edge object
     * @param {"to"|"from"} direction - Direction of the edge
     */
    drawMultiplicity(edge: object, direction: "to" | "from"): void;
    /**
     * Draws a node
     * @param {D3Selection} element - D3 selection of the node html element.
     * @param {object} data - Node object
     */
    drawNode(element: any, data: object): void;
    /**
     * Draws an <image> block to a given element with an icon in it
     * @param {D3Selection} element - The element that the text block should be written to
     * @param {string} icon - The source icon
     */
    drawIcon(element: any, icon: string): any;
    /**
     * Draws a <text> block to a given element
     * @param {D3Selection} element - The element that the text block should be written to
     */
    drawTextBlock(element: any, anchor: any): void;
    /**
     * Draws a new line of text to a given element.
     * @param {D3Selection} element - D3 Selection of the element that the text should be drawn in.
     * @param {*} word - Text to be written
     * @param {*} type - Type of node
     * @param {*} y - Y position padding
     */
    drawTextline(element: any, word: any, type: any, y: any): void;
    /**
     * Draws a badge in the top right corner of nodes with a number of a hidden edge count in it.
     * @param {D3Selecton} element - Node element selection by D3
     * @param {Object} data - Node data
     */
    drawNodeCollapsedEdgeCounter(element: any, data: Object): void;
    /**
     * Creates event listener for onClick events for nodes and edges
     */
    attachEntityClickListeners(): void;
    /**
     * Handles what happens when an item is hovered
     * @param {object} hoveredData - Object that has been hovered
     * @param {"enter"|"exit"} eventType - What type of event it is.
     */
    handleHoverEvent(hoveredData: object, eventType: "enter" | "exit"): void;
    /**
     * Animation tick
     */
    tick(): void;
}
