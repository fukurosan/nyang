/**
 * The context menu class governs the custom context menu (right click menu)
 */
export default class ContextMenu {
    constructor(graphContainerElement: any, eventEmitter: any, options: any);
    showContextMenu: any;
    customContextMenuAddons: any;
    graphContainerElement: any;
    ee: any;
    /**
     * Generates and positions a context menu.
     * @param {object|null} item - Node, Edge, or "null" (canvas) that has been clicked
     * @param {string?} direction - The direction of the edge clicked (if applicable)
     */
    buildMenu(item: object | null, direction: string | null): void;
    /**
     * Creates a custom floating menu on the screen using the given input
     * @param {object|null} clickedItem - Node, Edge, or "null" (canvas) that has been clicked
     * @param {object[]} contextSectionsArray - Default menu items
     * @param {object[]} customSectionsArray - User provided menu items
     * @param {number} mouseX - Mouse X coordinate
     * @param {number} mouseY - Mouse Y coordinate
     * @param {string?} direction The direction of the edge clicked (if applicable)
     */
    createContextMenu(clickedItem: object | null, contextSectionsArray: object[], customSectionsArray: object[], mouseX: number, mouseY: number, direction?: string | null): void;
    /**
     * Processes and creates a specific section of the context menu.
     * @param {HTMLElement} ul - The entire menu
     * @param {object[]} section - Array of menu items to be added
     * @param {boolean} shouldAddSeparatorBefore - Add a separating line before this new section?
     * @param {object|null} clickedItem - Item that was clicked
     * @param {string?} direction - Direction of the clicked edge, if applicable.
     */
    processSection(ul: HTMLElement, section: object[], shouldAddSeparatorBefore: boolean, clickedItem: object | null, direction?: string | null): void;
    /**
     * Create a node context menu
     * @param {object} clickedItem - Clicked node
     * @param {number} mouseX - Mouse X coordinate
     * @param {number} mouseY - Mouse Y coordinate
     */
    createNodeContextMenu(clickedItem: object, mouseX: number, mouseY: number): void;
    /**
     * Create an edge context menu
     * @param {object|null} clickedItem - Clicked edge
     * @param {number} mouseX - Mouse X coordinate
     * @param {number} mouseY - Mouse Y coordinate
     * @param {string} direction - Direction of the edge
     */
    createEdgeContextMenu(clickedItem: object | null, mouseX: number, mouseY: number, direction: string): void;
    /**
     * Create a canvas context menu
     * @param {null} clickedItem - Clicked canvas
     * @param {number} mouseX - Mouse X coordinate
     * @param {number} mouseY - Mouse Y coordinate
     */
    createCanvasContextMenu(clickedItem: null, mouseX: number, mouseY: number): void;
    /**
     * Removes the current floating menu
     */
    removeContextmenu(): void;
    /**
     * Initializes the menu sections
     */
    InitializeMenuSections(): void;
    NodeMenu: {
        label: string;
        action: (data: any, id: any) => void;
    }[] | undefined;
    EdgeMenu: {
        label: string;
        action: (data: any, id: any, edgeDirection: any) => void;
    }[] | undefined;
    UniversalMenu: {
        label: string;
        action: () => void;
    }[] | undefined;
}
