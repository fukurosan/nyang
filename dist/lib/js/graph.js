"use strict";

require("core-js/modules/es.string.starts-with");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./Utils/Protoypes");

var _Env = _interopRequireDefault(require("./Config/Env"));

var _Datastore = _interopRequireDefault(require("./Datastore/Datastore"));

var _EventEmitter = _interopRequireDefault(require("./Events/EventEmitter"));

var _UI = _interopRequireDefault(require("./UI/UI"));

var _Engine = _interopRequireDefault(require("./Engine/Engine"));

var _EventEnum = _interopRequireDefault(require("./Events/EventEnum"));

var _EntityProcessor = _interopRequireDefault(require("./Datastore/EntityProcessor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ModelGraph {
  constructor(graphContainerElement, inputData, options) {
    /* Init user input */
    this.options = Object.assign.apply(Object, [{}].concat(options));
    this.style = inputData.style ? JSON.parse(JSON.stringify(inputData.style)) : {};
    /* Init EventEmitter */

    this.ee = new _EventEmitter.default(); //If the user specified listeners in options then add them

    this.options.entityClickedListener && this.ee.on(_EventEnum.default.CLICK_ENTITY, this.options.entityClickedListener);
    this.options.entityDoubleClickedListener && this.ee.on(_EventEnum.default.DBL_CLICK_ENTITY, this.options.entityDoubleClickedListener);
    this.options.entityHoveredListener && this.ee.on(_EventEnum.default.HOVER_ENTITY, this.options.entityHoveredListener);
    /* Init UI */

    this.UI = new _UI.default(graphContainerElement, this.ee, this.style, options);
    /* Init Datastore */

    this.entityProcessor = new _EntityProcessor.default(this.ee, this.style, this.options);
    this.datastore = new _Datastore.default(inputData.nodes, inputData.edges, this.ee, this.style, this.options);
    /* Init Engine */

    this.engine = new _Engine.default(this.UI.width / 2, this.UI.height / 2, this.ee);
    /* Graph has mounted! */

    this.ee.on(_EventEnum.default.GRAPH_HAS_MOUNTED, () => {
      this.UI.zoomHandler.scaleTo(_Env.default.INITIAL_SCALE);
    });
    this.ee.trigger(_EventEnum.default.GRAPH_HAS_MOUNTED);
  }
  /* Tells the datatstore to set the filters */


  setFilters(filters) {
    this.ee.trigger(_EventEnum.default.DATA_FILTER_REQUESTED, filters);
  }
  /* Returns all the filters from the datastore */


  getFilters() {
    return this.datastore.filters;
  }
  /* Tells the datastore to reset the filters */


  resetAllFilters() {
    this.ee.trigger(_EventEnum.default.DATA_FILTER_RESET_REQUESTED);
  }
  /* Toggles multiplicity on and off in the graph */


  toggleMultiplicity() {
    this.ee.trigger(_EventEnum.default.TOGGLE_MULTIPLICITY_REQUESTED);
  }
  /* Highlights nodes in the graph based on input criteria */


  highlight(attribute, value, filterFunction) {
    if (attribute && value || filterFunction) {
      const nodesToHighlight = this.datastore.nodes.filter(node => {
        if (filterFunction) {
          return filterFunction(node.data);
        }

        return node[attribute].toUpperCase().startsWith(value.toUpperCase());
      });
      this.ee.trigger(_EventEnum.default.HIGHLIGHT_NODE_REQUESTED, nodesToHighlight);
    } else {
      throw new Error("No attribute, value or filterfunction provided");
    }
  }
  /* Resets the zoom to the initial position */


  resetZoom() {
    this.ee.trigger(_EventEnum.default.ZOOM_REQUESTED, null, null, null);
  }
  /* Zooms in on a specific node */


  zoomToNode(nodeID) {
    const node = this.datastore.nodes.find(node => node.id === nodeID);

    if (node) {
      const width = this.UI.graphContainerElement.offsetWidth / 2;
      const height = this.UI.graphContainerElement.offsetHeight / 2;
      const scale = 1.5;
      const x = -node.x * scale + width;
      const y = -node.y * scale + height;
      this.ee.trigger(_EventEnum.default.ZOOM_REQUESTED, x, y, scale);
    } else {
      throw new Error("No such node: " + nodeID);
    }
  }
  /* Sets a matrix layout for the simulation */


  setMatrixLayout(attribute, filterFunction, sortFunction) {
    this.ee.trigger(_EventEnum.default.ENGINE_LAYOUT_REQUESTED, this.datastore.nodes, this.datastore.edges, attribute, filterFunction, sortFunction);
  }
  /* Resets the layout to the default mode */


  resetLayout() {
    this.ee.trigger(_EventEnum.default.ENGINE_LAYOUT_RESET_REQUESTED, this.datastore.nodes, this.datastore.edges);
  }

  centerNode(nodeID) {
    const node = this.datastore.nodes.find(potentialNode => potentialNode.id === nodeID);

    if (node) {
      const width = this.UI.rootG.node().getBBox().width / 4;
      const height = this.UI.rootG.node().getBBox().height / 4;
      this.ee.trigger(_EventEnum.default.NODE_FIXATION_REQUESTED, node, width, height);
    }
  }
  /* Implodes and explodes nodes */


  implodeOrExplodeNode(nodeID, isImplode) {
    this.ee.trigger(_EventEnum.default.IMPLODE_EXPLODE_REQUESTED, nodeID, isImplode);
  }

  implodeOrExplodeNodeLeafs(nodeID, isImplode) {
    this.ee.trigger(_EventEnum.default.IMPLODE_EXPLODE_LEAFS_REQUESTED, nodeID, isImplode);
  }

  implodeOrExplodeNodeRecursive(nodeID, isImplode) {
    this.ee.trigger(_EventEnum.default.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, nodeID, isImplode);
  }

  implodeOrExplodeNodeNonCircular(nodeID, isImplode) {
    this.ee.trigger(_EventEnum.default.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, nodeID, isImplode);
  }
  /* Tells the datastore to change the dataset for a new one
     This is most commonly used for reflecting changes in the outer application */


  updateDataset(newDataset) {
    this.ee.trigger(_EventEnum.default.DATA_UPDATE_REQUESTED, newDataset.nodes, newDataset.edges);
  }
  /* Completely remove the graph from DOM and memory */


  destroyGraph() {
    //All unmount listeners must be synchronous!!
    this.ee.trigger(_EventEnum.default.GRAPH_WILL_UNMOUNT);
    Object.keys(this).forEach(key => {
      delete this[key];
    });
  }

}

exports.default = ModelGraph;