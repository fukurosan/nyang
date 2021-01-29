/**
 * The UI class manages all different UI addons.
 */
export default class UI {
    constructor(graphContainerElement: any, eventEmitter: any, styles: any, userDefinedOptions: any);
    graphContainerElement: any;
    style: any;
    ee: any;
    zoomHandler: ZoomHandler;
    contextMenu: ContextMenu;
    tooltip: Tooltip;
    stylesID: string;
    rootG: any;
    highlighter: Highlighter;
    grid: Grid;
    DOMProcessor: DOMProcessor;
    get zoom(): any;
    get context(): ContextMenu;
    get width(): any;
    get height(): any;
    initializeDOM(): any;
    destroy(): void;
}
import ZoomHandler from "./ZoomHandler/ZoomHandler";
import ContextMenu from "./ContextMenu/ContextMenu";
import Tooltip from "./Tooltip/Tooltip";
import Highlighter from "./Highlighter/Highlighter";
import Grid from "./Grid/Grid";
import DOMProcessor from "./DOMProcessor/DOMProcessor";
