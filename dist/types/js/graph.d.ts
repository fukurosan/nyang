/**
 * The main graph class
 */
export class NYANG {
    /**
     * Main constructor
     * @param {HTMLElement} graphContainerElement - Element that the graph should mount in
     * @param {object} inputData - Data that the graph should display
     * @param {object} options - Optional configuration for the graph
     * @param {boolean} options.enableGrid - Should the grid background pattern be enabled?
     * @param {boolean} options.enableFadeOnHover - Should nodes and edges that are not directly connected to a hovered node be faded out when said node is hovered?
     * @param {boolean} options.enableZoomButtons - Should zoom buttons be enabled?
     * @param {boolean} options.enableContextMenu - Should the conext menu be enabled?
     * @param {Function} options.entityClickedListener - Click listener for entities.
     * @param {Function} options.entityDoubleClickedListener - Double click listener for entities.
     * @param {Function} options.entityHoveredListener - Hover listener for entities.
     * @param {boolean} options.enableFixedEdgeLabelWidth - Should edge label width be fixed? Note that you need to provide the edgeLabelWidth option together with this option.
     * @param {number} options.edgeLabelWidth - Default edge label width.
     * @param {number} options.maxEdgeLabelWidth - Maximum edge label width.
     * @param {object} options.customContextMenu - Custom context menu.
     * @param {boolean} options.enableMultiLineNodeLabels - Allow node names to take up two lines.
     * @param {rotateLabels} options.customContextMenu - Make edge labels perpendicular to the edge.
     * @param {boolean} options.enableOnionOnFocus - Should nodes and edge labels get an onion border on focus (selection)?
     * @param {number} options.focusedOnionNumberOfLayers - How many layers should onion borders have by default?
     * @param {string} options.focusedOnionBaseColor - What should the base color be of the onion borders?
     * @param {number} options.focusedOnionLayerSize - How big should each layer in the onion border be by default?
     *
     */
    constructor(graphContainerElement: HTMLElement, inputData: object, options: {
        enableGrid: boolean;
        enableFadeOnHover: boolean;
        enableZoomButtons: boolean;
        enableContextMenu: boolean;
        entityClickedListener: Function;
        entityDoubleClickedListener: Function;
        entityHoveredListener: Function;
        enableFixedEdgeLabelWidth: boolean;
        edgeLabelWidth: number;
        maxEdgeLabelWidth: number;
        customContextMenu: object;
        enableMultiLineNodeLabels: boolean;
        customContextMenu: object;
        enableOnionOnFocus: boolean;
        focusedOnionNumberOfLayers: number;
        focusedOnionBaseColor: string;
        focusedOnionLayerSize: number;
    });
    _options: any;
    _style: any;
    _ee: EventEmitter;
    _UI: UI;
    _datastore: Datastore;
    _engine: Engine;
    /**
     * Sets and applies new filters, overwriting any existing.
     * @param {object[]} filters
     * @return {void}
     */
    setFilters(filters: object[]): void;
    /**
     * Returns all current filters.
     * @return {object[]} - The filters
     */
    getFilters(): object[];
    /**
     * Removes all current filters.
     * @return {void}
     */
    resetAllFilters(): void;
    /**
     * Toggles multiplicity on and off in the graph.
     * @return {void}
     */
    toggleMultiplicity(): void;
    /**
     * Highlights nodes in the graph based on input criteria.
     * @param {string} attribute - Attribute name to look for
     * @param {string} value - Value that the attribute should start with
     * @param {Function} filterFunction  - Optional filter function that can be used instead of an attribute. Should return true if the node is to be highlighted
     * @return {void}
     */
    highlight(attribute: string, value: string, filterFunction: Function): void;
    /**
     * Disables (dims) nodes in the graph based on input criteria.
     * @param {string} attribute - Attribute name to look for
     * @param {string} value - Value that the attribute should start with
     * @param {Function} filterFunction  - Optional filter function that can be used instead of an attribute. Should return true if the node is to be disabled
     * @return {void}
     */
    disable(attribute: string, value: string, filterFunction: Function): void;
    /**
     * Resets the disabling of nodes set by the "disable" function.
     * @return {void}
     */
    clearDisable(): void;
    /**
     * Resets the zoom (Zoom to fit).
     * @return {void}
     */
    resetZoom(): void;
    /**
     * Zooms in on a specific node.
     * @param {string} nodeID - ID of the node to zoom to
     * @return {void}
     */
    zoomToNode(nodeID: string): void;
    /**
     * Sets a matrix layout for the simulation.
     * @param {string} attribute - Property name on the nodes to group by
     * @param {Function} filterFunction  - Optional filter function that can be used instead of attribute. Should return a string that represents the group that the node belongs to.
     * @param {Function} sortFunction  - Optional sort function that will be applied to nodes before the layout is created. Use this to ensure correct positioning of groups on the screen
     * @return {void}
     */
    setMatrixLayout(attribute: string, filterFunction: Function, sortFunction: Function): void;
    /**
     * Resets the layout to the default mode.
     * @return {void}
     */
    resetLayout(): void;
    /**
     * Pins a node to the center of the graph.
     * @param {string} nodeID - ID of the node to center
     * @return {void}
     */
    centerNode(nodeID: string): void;
    /**
     * Sets the pin mode for nodes on and off
     * Pin mode is when nodes are fixated upon drag
     * @param {boolean} isEnabled
     * @return {void}
     */
    setPinMode(isEnabled: boolean): void;
    /**
     * Pins the entire graph
     * @return {void}
     */
    pinGraph(): void;
    /**
     * Resets all pins in the graph
     * @return {void}
     */
    resetAllPins(): void;
    /**
     * Implodes/explodes all nodes one step out from the provided node.
     * @param {string} nodeID - ID of the node
     * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
     * @return {void}
     */
    implodeOrExplodeNode(nodeID: string, isImplode: boolean): void;
    /**
     * Implodes/explodes all leaf nodes one step out from the provided node. I.e. nodes that have no further connections.
     * @param {string} nodeID - ID of the node
     * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
     * @return {void}
     */
    implodeOrExplodeNodeLeafs(nodeID: string, isImplode: boolean): void;
    /**
     * Implodes/explodes all branching nodes from the provided node recursively.
     * @param {string} nodeID - ID of the node
     * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
     * @return {void}
     */
    implodeOrExplodeNodeRecursive(nodeID: string, isImplode: boolean): void;
    /**
     * Implodes/explodes all branching nodes from the provided node recursively, but only ones that are not circular. I.e. branches that do not lead back to the provided node.
     * @param {string} nodeID - ID of the node
     * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
     * @return {void}
     */
    implodeOrExplodeNodeNonCircular(nodeID: string, isImplode: boolean): void;
    /**
     * Updates the data in the graph. This is commonly used for reflecting changes in the outer application
     * @param {object} newDataset - New data set
     * @return {void}
     */
    updateDataset(newDataset: object): void;
    /**
     * Exports the graph dataset into a JSON file that can be loaded into the graph at a later time
     * @param {boolean} includeOnlyLiveData - Should only live data be included in the export, or the entire dataset?
     */
    saveGraphAsJSON(includeOnlyLiveData: boolean): void;
    /**
     * Completely dismount and remove the graph
     * @return {void}
     */
    destroyGraph(): void;
}
import EventEmitter from "./Events/EventEmitter";
import UI from "./UI/UI";
import Datastore from "./Datastore/Datastore";
import Engine from "./Engine/Engine";
