"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventEnum = _interopRequireDefault(require("../Events/EventEnum"));

var _Env = _interopRequireDefault(require("../Config/Env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EntityProcessor {
  constructor(eventEmitter, styles, userDefinedOptions) {
    this.style = styles;
    this.enableFixedEdgeLabelWidth = userDefinedOptions.enableFixedEdgeLabelWidth !== undefined ? userDefinedOptions.enableFixedEdgeLabelWidth : _Env.default.FIXED_EDGE_LABEL_WIDTH;
    this.edgeLabelWidth = userDefinedOptions.edgeLabelWidth ? userDefinedOptions.edgeLabelWidth : _Env.default.LABEL_WIDTH;
    this.maxEdgeLabelWidth = userDefinedOptions.maxEdgeLabelWidth ? userDefinedOptions.maxEdgeLabelWidth : _Env.default.LABEL_WIDTH * 2;
    this.ee = eventEmitter;
    this.ee.on(_EventEnum.default.NODE_FIXATION_REQUESTED, (node, x, y) => {
      this.repositionNode(node, x, y);
    });
    this.ee.on(_EventEnum.default.DATASTORE_UPDATED, (nodes, edges) => {
      this.updateEdgeedNodeIDs(edges, nodes);
      this.updateEdgeDistances(edges);
      this.updateEdgeLabelWidths(edges);
      this.updateEdgeCounters(edges);
      this.updateNodeParameters(nodes);
      this.ee.trigger(_EventEnum.default.DATA_PROCESSOR_FINISHED, nodes, edges);
    });
  }

  repositionNode(node, x, y) {
    node.fx = x;
    node.fy = y;
  }
  /* Translates node IDs to index IDs */


  updateEdgeedNodeIDs(edges, nodes) {
    edges.forEach(edge => {
      //D3 uses the index of the node as source and target. Convert from the ID specified
      edge.source = nodes.findIndex(node => node.id === edge.sourceNode);
      edge.target = nodes.findIndex(node => node.id === edge.targetNode);

      if (edge.source === undefined || edge.target === undefined) {
        console.error("Broken Edge", edge);
      }
    });
  }
  /* Updates the edge distances */


  updateEdgeDistances(edges) {
    edges.forEach(edge => {
      if (this.style && this.style.edges) {
        const style = this.style.edges.find(style => style.id === edge.type);

        if (style && style.edgeDistance) {
          edge.edgeDistance = style.edgeDistance;
        } else {
          edge.edgeDistance = _Env.default.DEFAULT_VISIBLE_EDGE_DISTANCE;
        }
      } else {
        edge.edgeDistance = _Env.default.DEFAULT_VISIBLE_EDGE_DISTANCE;
      }
    });
  }
  /* Updates the edge label width */


  updateEdgeLabelWidths(edges) {
    edges.forEach(edge => {
      if (this.enableFixedEdgeLabelWidth) {
        edge.nameToWidth = this.edgeLabelWidth;
        edge.nameFromWidth = this.edgeLabelWidth;
      } else {
        if (edge.nameTo) {
          let width = edge.nameTo.width();
          width = width < this.maxEdgeLabelWidth ? width : this.maxEdgeLabelWidth;
          edge.nameToWidth = width + _Env.default.EDGE_LABEL_PADDING;
        } else {
          edge.nameToWidth = this.edgeLabelWidth;
        }

        if (edge.nameFrom) {
          let width = edge.nameTo.width();
          width = width < this.maxEdgeLabelWidth ? width : this.maxEdgeLabelWidth;
          edge.nameFromWidth = width + _Env.default.EDGE_LABEL_PADDING;
        } else {
          edge.nameFromWidth = this.edgeLabelWidth;
        }
      }
    });
  }
  /* Updates the edge counts for self-references and multi-references (to the same node) */


  updateEdgeCounters(edges) {
    edges.forEach(edge => {
      //Multi edge counter
      let i = 0;

      if (isNaN(edge.multiEdgeCount)) {
        let sameEdges = [];
        edges.forEach(otherEdge => {
          if (edge.source === otherEdge.source && edge.target === otherEdge.target || edge.target === otherEdge.source && edge.source === otherEdge.target) {
            sameEdges.push(otherEdge);
          }
        });

        for (i = 0; i < sameEdges.length; i++) {
          sameEdges[i].multiEdgeCount = sameEdges.length;
          sameEdges[i].multiEdgeIndex = i;
        }
      } //Self edge counter


      if (isNaN(edge.selfCycleCount)) {
        let selfCycles = [];
        edges.forEach(otherEdge => {
          if (edge.source === otherEdge.source && edge.target === otherEdge.target) {
            selfCycles.push(otherEdge);
          }
        });

        for (i = 0; i < selfCycles.length; i++) {
          selfCycles[i].selfCycleCount = selfCycles.length;
          selfCycles[i].selfCycleIndex = i;
        }
      }
    });
  }
  /* Updates node parameters */


  updateNodeParameters(nodes) {
    nodes.forEach(node => {
      /* Init Radius and max text length values */
      if (this.style && this.style.nodes) {
        const style = this.style.nodes.find(style => style.id === node.type);

        if (style) {
          switch (style.shape) {
            case "circle":
            case "layeredCircle":
              node.radius = style.radius ? style.radius : _Env.default.DEFAULT_CIRCLE_NODE_RADIUS;
              node.maxTextWidth = 2 * node.radius;
              node.shape = style.shape;
              break;

            case "rectangle":
              node.height = style.maxHeight ? style.maxHeight : _Env.default.DEFAULT_RECTANGLE_MAX_HEIGHT;
              node.width = style.maxWidth ? style.maxWidth : _Env.default.DEFAULT_RECTANGLE_MAX_WIDTH;
              node.maxTextWidth = style.maxWidth ? style.maxWidth : _Env.default.DEFAULT_RECTANGLE_MAX_WIDTH;
              node.shape = style.shape;
              break;

            default:
              //Use circle by default
              node.radius = style.radius ? style.radius : _Env.default.DEFAULT_CIRCLE_NODE_RADIUS;
              node.maxTextWidth = 2 * node.radius;
              node.shape = style.shape;
              break;
          }
        } else {
          //Use 50r circle as default
          node.radius = _Env.default.DEFAULT_CIRCLE_NODE_RADIUS;
          node.maxTextWidth = 2 * node.radius;
          node.shape = "circle";
        }
      } else {
        //Use 50r circle as default
        node.radius = _Env.default.DEFAULT_CIRCLE_NODE_RADIUS;
        node.maxTextWidth = 2 * node.radius;
        node.shape = "circle";
      }
    });
  }

}

exports.default = EntityProcessor;