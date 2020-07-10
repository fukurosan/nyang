"use strict";

require("core-js/modules/es.array.sort");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _EventEnum = _interopRequireDefault(require("../Events/EventEnum"));

var _Env = _interopRequireDefault(require("../Config/Env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Engine {
  constructor(forceCenterX, forceCenterY, eventEmitter) {
    this.ee = eventEmitter;
    this.ee.on(_EventEnum.default.DOM_PROCESSOR_FINISHED, (nodes, edges) => {
      this.updateSimulation(nodes, edges);
      this.ee.trigger(_EventEnum.default.ENGINE_UPDATE_FINISHED, nodes, edges);
    });
    this.ee.on(_EventEnum.default.NODE_DRAG_START, () => {
      this.target(0.5);
      this.stop();
    });
    this.ee.on(_EventEnum.default.NODE_DRAG_DRAGGED, () => this.restart());
    this.ee.on(_EventEnum.default.NODE_DRAG_ENDED, () => this.target(0));
    this.ee.on(_EventEnum.default.CLICK_ENTITY, () => this.stop());
    this.ee.on(_EventEnum.default.ENGINE_LAYOUT_REQUESTED, (nodes, edges, attribute, filterFunction, sortFunction) => this.createLayout(nodes, edges, attribute, filterFunction, sortFunction));
    this.ee.on(_EventEnum.default.ENGINE_LAYOUT_RESET_REQUESTED, (nodes, edges) => this.resetLayout(nodes, edges));
    this.ee.on(_EventEnum.default.NODE_FIXATION_REQUESTED, (node, x, y) => {
      this.alpha(1);
      this.restart();
    });
    this.ee.on(_EventEnum.default.TOGGLE_MULTIPLICITY_REQUESTED, () => this.restart());
    this.ee.on(_EventEnum.default.GRAPH_WILL_UNMOUNT, () => this.stop());
    this.forceCenterX = forceCenterX;
    this.forceCenterY = forceCenterY;
    this.simulation = this.initializeSimulation();
  }

  initializeSimulation() {
    return d3.forceSimulation().force("charge", d3.forceManyBody().strength(_Env.default.CHARGE)).force("center", d3.forceCenter(this.forceCenterX, this.forceCenterY)).force("y", d3.forceY(0).strength(_Env.default.GRAVITY)).force("x", d3.forceX(0).strength(_Env.default.GRAVITY)).nodes([]).force("edge", d3.forceLink().links([]).distance(l => {
      return this.getEdgeDistance(l);
    }).strength(_Env.default.EDGE_STRENGTH)).on("tick", () => {
      this.ee.trigger(_EventEnum.default.ENGINE_TICK);
    });
  }

  updateSimulation(nodes, edges) {
    this.simulation.nodes(nodes);
    this.simulation.force("edge", d3.forceLink().links(edges).distance(l => {
      return this.getEdgeDistance(l);
    }).strength(_Env.default.EDGE_STRENGTH));
    this.alpha(1);
    this.restart();
  }

  stop() {
    this.simulation.stop();
  }

  restart() {
    this.simulation.restart();
  }

  target(target) {
    this.simulation.alphaTarget(target);
  }

  decay(target) {
    this.simulation.alphaDecay(target);
  }

  alpha(target) {
    this.simulation.alpha(target);
  }

  createLayout(nodes, edges, attribute, filterFunction, sortFunction) {
    if (sortFunction) {
      nodes = nodes.sort((a, b) => sortFunction(a, b));
    }

    let allGroups;

    if (filterFunction) {
      allGroups = nodes.map(node => filterFunction(node.data));
    } else {
      allGroups = nodes.map(node => node[attribute]);
    }

    let xGroups = [...new Set(allGroups)];
    const numberOfRowsAndColumns = Math.ceil(Math.sqrt(xGroups.length));
    let currentRow = 0;
    let currentColumn = 0;
    const matrix = xGroups.map(() => {
      if (currentColumn === numberOfRowsAndColumns) {
        currentColumn = 0;
        currentRow += 1;
      }

      currentColumn += 1;
      return [currentRow, currentColumn - 1];
    });
    const columnScale = d3.scalePoint().domain([...Array(numberOfRowsAndColumns).keys()]).range([30, 2000]);
    const rowScale = d3.scalePoint().domain([...Array(numberOfRowsAndColumns).keys()]).range([30, 2000]);
    this.simulation.force("x", d3.forceX(d => {
      let value;

      if (filterFunction) {
        value = filterFunction(d.data);
      } else {
        value = d[attribute];
      }

      return columnScale(matrix[xGroups.indexOf(value)][1]);
    })).force("y", d3.forceY(d => {
      let value;

      if (filterFunction) {
        value = filterFunction(d.data);
      } else {
        value = d[attribute];
      }

      return rowScale(matrix[xGroups.indexOf(value)][0]);
    })).force("edge", d3.forceLink().links(edges).distance(l => {
      return this.getEdgeDistance(l);
    }).strength(0)).force("charge", d3.forceManyBody().strength(-800)).alpha(1).restart();
  }

  resetLayout(nodes, edges) {
    this.simulation.force("y", d3.forceY(0).strength(_Env.default.GRAVITY)).force("x", d3.forceX(0).strength(_Env.default.GRAVITY)).force("edge", d3.forceLink().links(edges).distance(l => {
      return this.getEdgeDistance(l);
    }).strength(_Env.default.EDGE_STRENGTH)).force("charge", d3.forceManyBody().strength(_Env.default.CHARGE)).alpha(1).restart();
  }
  /* Returns the distance of the passed edge */


  getEdgeDistance(l) {
    const targetRadius = l.target.radius !== undefined ? l.target.radius : 0;
    const sourceRadius = l.source.radius !== undefined ? l.source.radius : 0;
    let distance = targetRadius + sourceRadius;
    return distance + l.edgeDistance;
  }

}

exports.default = Engine;