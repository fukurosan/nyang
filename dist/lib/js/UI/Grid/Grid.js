"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _Env = _interopRequireDefault(require("../../Config/Env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Grid {
  constructor(graphContainerElement, eventEmitter, options) {
    this.graphContainerElement = graphContainerElement;
    this.enableGrid = options.enableGrid !== undefined ? options.enableGrid : _Env.default.ENABLE_GRID;
    this.ee = eventEmitter;

    if (this.enableGrid) {
      this.initializeGrid();
    }
  }

  initializeGrid() {
    const defs = d3.select(this.graphContainerElement).select("svg").select("g").select("defs");
    const gridPattern = defs.append("pattern").attr("id", "grid").attr("width", 60).attr("height", 60).attr("patternUnits", "userSpaceOnUse");
    gridPattern.append("path").attr("d", "M 60 0 L 0 0 0 60").attr("style", "fill: none; stroke: #a0a0a0; stroke-width: 1; stroke-dasharray: 2;");
    d3.select(this.graphContainerElement).select("svg").insert("rect", ":first-child").attr("width", "100%").attr("height", "100%").attr("fill", "url(#grid)");
  }

}

exports.default = Grid;