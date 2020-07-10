"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _EventEnum = _interopRequireDefault(require("../../Events/EventEnum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Tooltip {
  constructor(graphContainerElement, eventEmitter) {
    this.graphContainerElement = graphContainerElement;
    this.ee = eventEmitter;
    this.tooltip = this.initializeTooltip();
    this.ee.on(_EventEnum.default.MOUSE_OVER_NODE, node => {
      this.showTooltip(node);
    });
    this.ee.on(_EventEnum.default.MOUSE_LEFT_NODE, () => {
      this.hideTooltip();
    });
    this.ee.on(_EventEnum.default.GRAPH_WILL_UNMOUNT, () => this.destroy());
  }
  /* Initializes the tooltip */


  initializeTooltip() {
    return d3.select(this.graphContainerElement).append("div").attr("id", "NYANG-tooltip");
  }
  /* Displays the tooltip with a text at coordinates x and y */


  showTooltip(node) {
    const coordinates = d3.mouse(document.documentElement);
    this.tooltip.style("left", coordinates[0] - window.pageXOffset + "px").style("top", coordinates[1] + 20 - window.pageYOffset + "px").style("transform", "transalteX(-50%)").style("display", "inline-block").style("position", "fixed").html(node.name);
  }
  /* Hides the tooltip */


  hideTooltip() {
    this.tooltip.style("display", "none");
  }

  destroy() {
    this.tooltip.remove();
  }

}

exports.default = Tooltip;