"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _EventEnum = _interopRequireDefault(require("../Events/EventEnum"));

var _Grid = _interopRequireDefault(require("./Grid/Grid"));

var _ZoomHandler = _interopRequireDefault(require("./ZoomHandler/ZoomHandler"));

var _ContextMenu = _interopRequireDefault(require("./ContextMenu/ContextMenu"));

var _Highlighter = _interopRequireDefault(require("./Highlighter/Highlighter"));

var _Tooltip = _interopRequireDefault(require("./Tooltip/Tooltip"));

var _DOMProcessor = _interopRequireDefault(require("./DOMProcessor/DOMProcessor"));

var _CssUtils = _interopRequireDefault(require("../Utils/CssUtils.js"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class UI {
  constructor(graphContainerElement, eventEmitter, styles, userDefinedOptions) {
    this.graphContainerElement = graphContainerElement;
    this.style = styles;
    this.ee = eventEmitter;
    this.ee.on(_EventEnum.default.GRAPH_WILL_UNMOUNT, () => this.destroy());
    this.initializeContainerAutoResize();
    this.zoomHandler = new _ZoomHandler.default(this.graphContainerElement, this.ee, userDefinedOptions);
    this.contextMenu = new _ContextMenu.default(this.graphContainerElement, this.ee, userDefinedOptions);
    this.highlighter = new _Highlighter.default(this.ee);
    this.tooltip = new _Tooltip.default(this.graphContainerElement, this.ee);
    this.stylesID = "A" + (0, _v.default)(); //Add a letter in front for HTML4 support

    _CssUtils.default.initializeGraphStyles(this.style, this.stylesID);

    this.rootG = this.initializeDOM();
    this.grid = new _Grid.default(graphContainerElement, this.ee, userDefinedOptions);
    this.DOMProcessor = new _DOMProcessor.default(this.rootG, this.ee, userDefinedOptions);
  }

  get zoom() {
    return this.zoomHandler.zoom;
  }

  get context() {
    return this.contextMenu;
  }

  get width() {
    return this.graphContainerElement.offsetWidth;
  }

  get height() {
    return this.graphContainerElement.offsetHeight;
  }
  /* This function automatically resizes the svg container when the window size changes */


  initializeContainerAutoResize() {
    d3.select(window).on("resize", () => {
      /* Because of how flex layouts work we need to first remove the graphcontainers space,
       and then we can measure the new dimensions */
      d3.select(this.graphContainerElement).select("svg").attr("width", 0).attr("height", 0);
      d3.select(this.graphContainerElement).select("svg").attr("width", this.width).attr("height", this.height).attr("viewBox", "0 0 " + this.width + " " + this.height);
    });
  }

  initializeDOM() {
    const width = this.graphContainerElement.offsetWidth;
    const height = this.graphContainerElement.offsetHeight;
    const rootG = d3.select(this.graphContainerElement).insert("svg", "*").attr("class", "NYANG").classed("svgGraph", true).attr("width", width).attr("height", height).attr("viewBox", "0 0 " + width + " " + height).on("click", () => {
      //Do not bubble the event
      d3.event.stopPropagation();
      this.ee.trigger(_EventEnum.default.CLICK_ENTITY, null);
    }).on("contextmenu", d => {
      d3.event.preventDefault();
      d3.event.stopPropagation();
      this.ee.trigger(_EventEnum.default.RIGHT_CLICK_ENTITY, null);
    }).call(this.zoom).on("dblclick.zoom", null).append("g");
    rootG.append("defs");
    rootG.append("g").attr("id", "edge-container");
    rootG.append("g").attr("id", "label-container");
    rootG.append("g").attr("id", "multiplicity-container");
    rootG.append("g").attr("id", "node-container");
    return rootG;
  }

  destroy() {
    this.rootG.select("#edge-container").selectAll(".edge").remove();
    this.rootG.select("#multiplicity-container").selectAll(".multiplicity").remove();
    this.rootG.select("#node-container").selectAll(".node").remove();
    this.rootG.select("#label-container").selectAll(".label").remove();
    d3.select(this.graphContainerElement).select("svg").remove();
    d3.select("#".concat(this.stylesID)).remove();
  }

}

exports.default = UI;