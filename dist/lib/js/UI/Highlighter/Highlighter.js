"use strict";

require("core-js/modules/es.string.includes");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _EventEnum = _interopRequireDefault(require("../../Events/EventEnum"));

var _Env = _interopRequireDefault(require("../../Config/Env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Highlighter {
  constructor(eventEmitter) {
    this.ee = eventEmitter;
    this.ee.on(_EventEnum.default.CLICK_ENTITY, data => {
      data && this.setElementFocus(data.id, data.direction);
    });
    this.ee.on(_EventEnum.default.CLICK_ENTITY, data => {
      data || this.removeAllEntityFocus();
    });
    this.ee.on(_EventEnum.default.HIGHLIGHT_NODE_REQUESTED, nodes => {
      this.highlightNode(nodes.map(node => node.id));
    });
  }
  /* This function sets the exclusive focus on a given entity */


  setElementFocus(entityID) {
    let isFromDirection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    if (entityID) {
      let isFrom;

      if (isFromDirection === "from") {
        isFrom = true;
      } else if (isFromDirection === "to") {
        isFrom = false;
      }

      this.removeAllEntityFocus();
      this.toggleEntityFocusByID(entityID, isFrom);
    }
  }
  /* This function turns off focus for all nodes and edges */


  removeAllEntityFocus() {
    d3.selectAll(".focused").classed("focused", false);
  }
  /* This function toggles the highlighting of a given node */


  toggleEntityFocusByID(entityID) {
    let isFrom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    return this.toggleNodeEntityFocus(entityID) || this.toggleEdgeEntityFocus(entityID, isFrom);
  }
  /* Toggles focus on nodes */


  toggleNodeEntityFocus(entityID) {
    const nodeElement = d3.select("[id='".concat(entityID, "']"));

    if (nodeElement.node()) {
      const DOMElement = nodeElement.node();
      const DOMNeighborhood = DOMElement.parentElement.children;
      d3.selectAll([...DOMNeighborhood]).classed("focused", !nodeElement.classed("focused"));
      return true;
    }

    return false;
  }
  /* Toggles focus on edges */


  toggleEdgeEntityFocus(entityID, isFrom) {
    const labelGroup = d3.select("#label".concat(entityID).concat(isFrom ? "from" : "to"));

    if (labelGroup) {
      const label = labelGroup.select("rect");
      const focusedState = label.classed("focused");
      label.classed("focused", !focusedState);
      d3.selectAll("marker[id*=\"".concat(entityID).concat(isFrom ? "inverse" : "", "\"]")).select("path").classed("focused", !focusedState);
      d3.selectAll("[class*=\"".concat(entityID).concat(isFrom ? "inverse" : "", "\"]")).selectAll("path, text").classed("focused", !focusedState);
      return true;
    }

    return false;
  }

  highlightNode(nodes) {
    d3.selectAll(".node").filter(d => {
      return nodes.includes(d.id);
    }).append("circle").attr("r", 50).classed("highlighted-node", true).transition().duration(_Env.default.HIGHLIGHT_TIME).ease(d3.easeBounce).style("transform", "scale(5)").transition().duration(_Env.default.HIGHLIGHT_TIME_REMOVE).remove();
  }

}

exports.default = Highlighter;