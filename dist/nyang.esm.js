/** @preserve @license @cc_on
 * ----------------------------------------------------------
 * nyang version 0.0.1
 * Not your average network graph 
 * https://github.com/fukurosan/nyang
 * Copyright (c) 2021 Fukurosan
 * All Rights Reserved. MIT License
 * https://mit-license.org/
 * ----------------------------------------------------------
 */

import { select, zoomIdentity, zoom, event, mouse, selectAll, easeBounce, line, curveCardinal, drag, easeLinear, forceSimulation, forceManyBody, forceCenter, forceY, forceX, forceLink, scalePoint } from 'd3';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * Default configuration for NYANG
 */
var Env = Object.freeze({
  //Params
  ENABLE_ZOOM_BUTTONS: false,
  ENABLE_GRID: false,
  DEFAULT_FADE_ON_HOVER: false,
  DEFAULT_USE_CONTEXT_MENU: true,
  SHOW_CONTEXT_MENU: true,
  DEFAULT_CUSTOM_CONTEXT_MENU: {},
  //Zoom
  ZOOM_PADDING: 40,
  //Edge Labels
  LABEL_HEIGHT: 28,
  LABEL_WIDTH: 80,
  EDGE_LABEL_PADDING: 20,
  FIXED_EDGE_LABEL_WIDTH: true,
  ROTATE_LABELS: false,
  //Multiplicity Positioning
  MULTIPLICITY_HDISTANCE: 20,
  MULTIPLICITY_VDISTANCE: 10,
  //Style Defaults
  DEFAULT_STROKE_WIDTH: 2,
  DEFAULT_FONT_FAMILY: "Helvetica, Arial, sans-serif",
  DEFAULT_FONT_SIZE: "12px",
  DEFAULT_FADE_OPACITY: 0.3,
  DEFAULT_FOCUS_COLOR: "#2A6D91",
  //Edges
  DEFAULT_EDGE_DOTTED_DASHARRAY: 3,
  DEFAULT_EDGE_DASHARRAY: 0,
  DEFAULT_EDGE_COLOR: "#000000",
  DEFAULT_ARROW_COLOR: "#000000",
  DEFAULT_MULTIPLICITY_FONT_SIZE: "10px",
  DEFAULT_EDGE_WIDTH: "2px",
  //Labels
  DEFAULT_LABEL_TEXT_COLOR: "#000000",
  DEFAULT_LABEL_TEXT_HOVER_COLOR: "#ffffff",
  DEFAULT_LABEL_BACKGROUND_COLOR: "#ffffff",
  DEFAULT_LABEL_HOVER_BACKGROUND_COLOR: "#2A6D91",
  DEFAULT_LABEL_BORDER_RADIUS_X: "4px",
  DEFAULT_LABEL_BORDER_RADIUS_Y: "4px",
  DEFAULT_LABEL_BORDER_WIDTH: "0px",
  DEFAULT_LABEL_BORDER_COLOR: "transparent",
  //Nodes
  DEFAULT_NODE_DOTTED_DASHARRAY: 8,
  DEFAULT_NODE_STROKE_COLOR: "transparent",
  DEFAULT_NODE_STROKE_HOVER_COLOR: "transparent",
  DEFAULT_NODE_COLOR: "#ffffff",
  DEFAULT_NODE_HOVER_COLOR: "#2A6D91",
  DEFAULT_NODE_FOCUSED_COLOR: "#ffffff",
  DEFAULT_NODE_TEXT_COLOR: "#000000",
  DEFAULT_NODE_TEXT_HOVER_COLOR: "#ffffff",
  DEFAULT_NODE_TEXT_FOCUSED_COLOR: "#000000",
  DEFAULT_NODE_BORDER_RADIUS_X: "0px",
  DEFAULT_NODE_BORDER_RADIUS_Y: "0px",
  DEFAULT_NODE_FOCUSED_BORDER_WIDTH: "4px",
  DEFAULT_NODE_HOVER_BORDER_WIDTH: "2px",
  DEFAULT_RECTANGLE_MAX_HEIGHT: 20,
  DEFAULT_RECTANGLE_MAX_WIDTH: 60,
  DEFAULT_CIRCLE_NODE_RADIUS: 50,
  DEFAULT_NODE_ICON_SIZE: 16,
  DEFAULT_NODE_ICON_PADDING: 8,
  DEFAULT_NODE_TEXT_MULTILINE: false,
  DEFAULT_NODE_FILTER: false,
  DEFAULT_NODE_HOVER_FILTER: false,
  DEFAULT_NODE_FOCUSED_FILTER: false,
  //Tooltip
  TOOLTIP_MIN_WIDTH: "80px",
  TOOLTIP_MAX_WIDTH: "150px",
  TOOLTIP_BACKGROUND: "black",
  TOOLTIP_COLOR: "white",
  TOOLTIP_BORDER_RADIUS: "2px",
  //Highlighting
  HIGHLIGHTING_BORDER_WIDTH: "0px",
  HIGHLIGHTING_BORDER_COLOR: "transparent",
  HIGHLIGHTING_COLOR: "#009ADE",
  //Onion Border
  ENABLE_ONION_ON_FOCUS: true,
  DEFAULT_ONION_FOCUSED_LAYERS: 2,
  DEFAULT_ONION_FOCUSED_COLOR: "#B6D5DB",
  DEFAULT_ONION_FOCUSED_SIZE: 10,
  DEFAULT_ONION_ANIMATION_TIME: 80,
  //Edge Length and Spacing
  DEFAULT_VISIBLE_EDGE_DISTANCE: 350,
  ADDITIONAL_TEXT_SPACE: 20,
  //Thresholds and timings
  DOUBLE_CLICK_THRESHOLD: 300,
  //ms
  FADE_TIME: 300,
  //ms
  ZOOM_TIME: 1000,
  //ms
  HIGHLIGHT_TIME: 1000,
  //ms
  HIGHLIGHT_TIME_REMOVE: 1000,
  //ms
  IMPLOSION_EXPLOSION_ANIMATION_TIME: 200,
  //ms
  //Force Layout
  EDGE_STRENGTH: 0.7,
  GRAVITY: 0.06,
  CHARGE: -2000,
  SCALE_EXTENT: [0.1, 4],
  INITIAL_SCALE: 0.3
});

/**
 * Calculates the width of a text string in pixels.
 * @param {string} textStyle - optional css class to apply to to the text
 */

String.prototype.width = function (textStyle) {
  // Set a default value
  if (!textStyle) {
    textStyle = "text";
  }

  var d = select("body").append("div").attr("class", textStyle) //The font size defaults to 12px right now. This may need to be changed in the future.
  .attr("style", "font-size:12px; position: absolute;float: left;white-space: nowrap;visibility: hidden;").attr("id", "width-test") // tag this element to identify it
  .text(this);
  var w = document.getElementById("width-test").offsetWidth;
  d.remove();
  return w;
};
/**
 * Truncates a string to a given width.
 * @param {number} maxLength - maximum length in pixels
 * @param {string} textStyle - optional css class to apply to to the text
 */


String.prototype.truncate = function (maxLength, textStyle) {
  maxLength -= Env.ADDITIONAL_TEXT_SPACE;

  if (isNaN(maxLength) || maxLength <= 0) {
    return this;
  }

  var text = this;
  var textLength = this.length;
  var textWidth;
  var ratio;

  while (true) {
    textWidth = text.width(textStyle);

    if (textWidth <= maxLength) {
      break;
    }

    ratio = textWidth / maxLength;
    textLength = Math.floor(textLength / ratio);
    text = text.substring(0, textLength);
  }

  if (this.length > textLength) {
    return this.substring(0, textLength - 3) + "...";
  }

  return this;
};

/**
 * All events in NYANG are stored here.
 */
var EVENTS = Object.freeze({
  /* PUBLIC EVENTS */
  // Params: data (.id, .data, .direction (undefined/"to"/"from"))
  CLICK_ENTITY: "ENTITY_CLICKED_EVENT",
  // Params: data (.id, .data, .direction (undefined/"to"/"from"))
  DBL_CLICK_ENTITY: "ENTITY_DBL_CLICKED_EVENT",
  // Params: data (.id, .data, .eventType (enter/leave))
  HOVER_ENTITY: "ENTITY_HOVER_EVENT",

  /* PRIVATE EVENTS */
  // Params: entity, direction (undefined/"to"/"from")
  RIGHT_CLICK_ENTITY: "ENTITY_RIGHT_CLICKED_EVENT",
  // Params: node
  NODE_DRAG_START: "NODE_DRAG_STARTED_EVENT",
  // Params: node
  NODE_DRAG_DRAGGED: "NODE_DRAG_DRAGGED_EVENT",
  // Params: node
  NODE_DRAG_ENDED: "NODE_DRAG_ENDED_EVENT",
  // Params: node
  MOUSE_OVER_NODE: "MOUSE_MOVED_OVER_NODE_EVENT",
  // Params: N/A
  MOUSE_LEFT_NODE: "MOUSE_MOVED_OUTSIDE_NODE_EVENT",
  // Params: node
  NODE_FIXATION_REQUESTED: "NODE_FIXATION_REQUESTED",
  // Params: [...nodes], [...edges]
  DATA_UPDATE_REQUESTED: "DATA_UPDATE_REQUESTED",
  // Params: [...nodes], [...edges]
  DATASTORE_UPDATED: "LIVE_DATA_UPDATED_EVENT",
  // Params: [...nodes], [...edges]
  DOM_PROCESSOR_FINISHED: "DOM_PROCESSOR_FINISHED",
  // Params: [...nodes], [...edges]
  ENGINE_UPDATE_FINISHED: "ENGINE_UPDATE_FINISHED_EVENT",
  // Params: filters ({node:[], edges:[]})
  DATA_FILTER_REQUESTED: "DATA_FILTER_REQUESTED_EVENT",
  // Params: N/A
  DATA_FILTER_RESET_REQUESTED: "DATA_FILTER_RESET_REQUESTED_EVENT",
  // Params: entityID, isImplode (true/false)
  IMPLODE_EXPLODE_REQUESTED: "IMPLODE_OR_EXPLODE_ENTITIES_REQUESTED_EVENT",
  // Params: entityID, isImplode (true/false)
  IMPLODE_EXPLODE_LEAFS_REQUESTED: "IMPLODE_OR_EXPLODE_ENTITIES_LEAFS_REQUESTED_EVENT",
  // Params: entityID, isImplode (true/false)
  IMPLODE_EXPLODE_RECURSIVE_REQUESTED: "IMPLODE_OR_EXPLODE_ENTITIES_RECURSIVE_REQUESTED_EVENT",
  // Params: entityID, isImplode (true/false)
  IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED: "IMPLODE_OR_EXPLODE_ENTITIES_NON_CIRCULAR_REQUESTED_EVENT",
  // Params: x, y, scale
  ZOOM_REQUESTED: "ZOOM_WAS_REQUESTED_EVENT",
  // Params: [...nodes]
  HIGHLIGHT_NODE_REQUESTED: "HIGHLIGHT_NODE_REQUESTED_EVENT",
  // Params: [...nodeIDs]
  DISABLE_NODES_REQUESTED: "DISABLE_NODES_REQUESTED_EVENT",
  // Params: N/A
  CLEAR_DISABLE_NODES_REQUESTED: "CLEAR_DISABLE_NODES_REQUESTED_EVENT",
  // Params N/A
  TOGGLE_MULTIPLICITY_REQUESTED: "TOGGLE_MULTIPLICITY_REQUEST_EVENT",
  // Params: N/A
  ENGINE_TICK: "ENGINE_TICK_EVENT",
  // Params: nodes, edges, attribute, filterFunction, sortFunction
  ENGINE_LAYOUT_REQUESTED: "ENGINE_LAYOUT_REQUESTED_EVENT",
  // Params: nodes, edges
  ENGINE_LAYOUT_RESET_REQUESTED: "ENGINE_LAYOUT_RESET_REQUESTED_EVENT",
  // Params: N/A
  GRAPH_HAS_MOUNTED: "GRAPH_HAS_MOUNTED",
  // Params: N/A
  GRAPH_WILL_UNMOUNT: "GRAPH_WILL_UNMOUNT" //All unmount listeners must be synchronous!!

});

/**
 * The entity processor has two purposes
 * It is used to prepare data on nodes and edges so that it does not have to be calculated on the fly.
 * It is also used to manipulate the data stored on the objects to achieve certain effects (such as fixating coordinates)
 */

var EntityProcessor = /*#__PURE__*/function () {
  function EntityProcessor(eventEmitter, styles, userDefinedOptions) {
    var _this = this;

    _classCallCheck(this, EntityProcessor);

    this.style = styles;
    this.fixedEdgeLabelWidth = userDefinedOptions.enableFixedEdgeLabelWidth !== undefined ? userDefinedOptions.enableFixedEdgeLabelWidth : Env.FIXED_EDGE_LABEL_WIDTH;
    this.edgeLabelWidth = userDefinedOptions.edgeLabelWidth ? userDefinedOptions.edgeLabelWidth : Env.LABEL_WIDTH;
    this.maxEdgeLabelWidth = userDefinedOptions.maxEdgeLabelWidth ? userDefinedOptions.maxEdgeLabelWidth : Env.LABEL_WIDTH * 2;
    this.ee = eventEmitter;
    this.ee.on(EVENTS.NODE_FIXATION_REQUESTED, function (node, x, y) {
      _this.repositionNode(node, x, y);
    });
  }
  /**
   * Executes the preprocessor for when data is about to go live
   * @param {object[]} nodes
   * @param {object[]} edges
   */


  _createClass(EntityProcessor, [{
    key: "executePreProcessor",
    value: function executePreProcessor(nodes, edges) {
      this.updateEdgeNodeIDs(edges, nodes);
      this.updateEdgeDistances(edges);
      this.updateEdgeLabelWidths(edges);
      this.updateEdgeCounters(edges);
      this.updateNodeParameters(nodes);
    }
    /**
     * Fixate a node to a given position in the graph.
     * @param {object} node - Node object to be fixated
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */

  }, {
    key: "repositionNode",
    value: function repositionNode(node, x, y) {
      node.fx = x;
      node.fy = y;
    }
    /**
     * Translates node IDs to index IDs on edge objects. This is essentially only to satisfy the D3 force layout.
     * @param {object[]} edges - Edges to be updated
     * @param {object[]} nodes - List of all nodes
     */

  }, {
    key: "updateEdgeNodeIDs",
    value: function updateEdgeNodeIDs(edges, nodes) {
      edges.forEach(function (edge) {
        //D3 uses the index of the node as source and target. Convert from the ID specified
        edge.source = nodes.findIndex(function (node) {
          return node.id === edge.sourceNode;
        });
        edge.target = nodes.findIndex(function (node) {
          return node.id === edge.targetNode;
        });

        if (edge.source === undefined || edge.target === undefined) {
          console.error("Broken Edge", edge);
        }
      });
    }
    /**
     * Updates the edge distances (lengths, essentially).
     * @param {object[]} edges - Edges to be updated
     */

  }, {
    key: "updateEdgeDistances",
    value: function updateEdgeDistances(edges) {
      var _this2 = this;

      edges.forEach(function (edge) {
        if (_this2.style && _this2.style.edges) {
          var style = _this2.style.edges.find(function (style) {
            return style.id === edge.type;
          });

          if (style && style.edgeDistance) {
            edge.edgeDistance = style.edgeDistance;
          } else {
            edge.edgeDistance = Env.DEFAULT_VISIBLE_EDGE_DISTANCE;
          }
        } else {
          edge.edgeDistance = Env.DEFAULT_VISIBLE_EDGE_DISTANCE;
        }
      });
    }
    /**
     * Updates the edge label width on a given array of edges.
     * @param {object[]} edges -
     */

  }, {
    key: "updateEdgeLabelWidths",
    value: function updateEdgeLabelWidths(edges) {
      var _this3 = this;

      edges.forEach(function (edge) {
        if (_this3.fixedEdgeLabelWidth) {
          edge.nameToWidth = _this3.edgeLabelWidth;
          edge.nameFromWidth = _this3.edgeLabelWidth;
        } else {
          if (edge.nameTo) {
            var width = edge.nameTo.width();
            width = width < _this3.maxEdgeLabelWidth ? width : _this3.maxEdgeLabelWidth;
            edge.nameToWidth = width + Env.EDGE_LABEL_PADDING;
          } else {
            edge.nameToWidth = _this3.edgeLabelWidth;
          }

          if (edge.nameFrom) {
            var _width = edge.nameTo.width();

            _width = _width < _this3.maxEdgeLabelWidth ? _width : _this3.maxEdgeLabelWidth;
            edge.nameFromWidth = _width + Env.EDGE_LABEL_PADDING;
          } else {
            edge.nameFromWidth = _this3.edgeLabelWidth;
          }
        }
      });
    }
    /**
     * Updates the edge counts for self-references and multi-references (to the same node).
     * @param {object[]} edges
     */

  }, {
    key: "updateEdgeCounters",
    value: function updateEdgeCounters(edges) {
      edges.forEach(function (edge) {
        //Multi edge counter
        var i = 0;

        if (isNaN(edge.multiEdgeCount)) {
          var sameEdges = [];
          edges.forEach(function (otherEdge) {
            if (edge.source === otherEdge.source && edge.target === otherEdge.target || edge.target === otherEdge.source && edge.source === otherEdge.target) {
              sameEdges.push(otherEdge);
            }
          });

          for (i = 0; i < sameEdges.length; i++) {
            sameEdges[i].multiEdgeCount = sameEdges.length;
            sameEdges[i].multiEdgeIndex = i;
          }
        } //Self edge counter


        if (isNaN(edge.selfEdgeCount)) {
          var selfEdges = [];
          edges.forEach(function (otherEdge) {
            if (edge.source === otherEdge.source && edge.target === otherEdge.target) {
              selfEdges.push(otherEdge);
            }
          });

          for (i = 0; i < selfEdges.length; i++) {
            selfEdges[i].selfEdgeCount = selfEdges.length;
            selfEdges[i].selfEdgeIndex = i;
          }
        }
      });
    }
    /**
     * Updates node parameters. This is for example in order to more easily access information such as radius, height, width, etc at runtime.
     * @param {object[]} nodes
     */

  }, {
    key: "updateNodeParameters",
    value: function updateNodeParameters(nodes) {
      var _this4 = this;

      nodes.forEach(function (node) {
        /* Init Radius and max text length values */
        if (_this4.style && _this4.style.nodes) {
          var style = _this4.style.nodes.find(function (style) {
            return style.id === node.type;
          });

          if (style) {
            switch (style.shape) {
              case "circle":
              case "layeredCircle":
                node.radius = style.radius ? style.radius : Env.DEFAULT_CIRCLE_NODE_RADIUS;
                node.maxTextWidth = 2 * node.radius;
                node.shape = style.shape;
                break;

              case "rectangle":
                node.height = style.maxHeight ? style.maxHeight : Env.DEFAULT_RECTANGLE_MAX_HEIGHT;
                node.width = style.maxWidth ? style.maxWidth : Env.DEFAULT_RECTANGLE_MAX_WIDTH;
                node.maxTextWidth = style.maxWidth ? node.icon ? style.maxWidth - Env.DEFAULT_NODE_ICON_SIZE - Env.ADDITIONAL_TEXT_SPACE / 2 - Env.DEFAULT_NODE_ICON_PADDING : style.maxWidth : Env.DEFAULT_RECTANGLE_MAX_WIDTH;
                node.shape = style.shape;
                break;

              default:
                //Use circle by default
                node.radius = style.radius ? style.radius : Env.DEFAULT_CIRCLE_NODE_RADIUS;
                node.maxTextWidth = 2 * node.radius;
                node.shape = style.shape;
                break;
            }
          } else {
            //Use 50r circle as default
            node.radius = Env.DEFAULT_CIRCLE_NODE_RADIUS;
            node.maxTextWidth = 2 * node.radius;
            node.shape = "circle";
          }
        } else {
          //Use 50r circle as default
          node.radius = Env.DEFAULT_CIRCLE_NODE_RADIUS;
          node.maxTextWidth = 2 * node.radius;
          node.shape = "circle";
        }
      });
    }
    /**
     * Animates all node positions from source to target
     * Nodes without a source/target will be frozen during the animation
     * @param {object[]} nodes - All nodes in the data store
     */

  }, {
    key: "animateNodePositions",
    value: function animateNodePositions(nodes) {
      return new Promise(function (resolve) {
        var tween = function tween(startTime, animationTime) {
          var deltaTime = Date.now() - startTime;

          if (deltaTime > animationTime) {
            nodes.forEach(function (node) {
              delete node.targetX;
              delete node.targetY;
              delete node.sourceX;
              delete node.sourceY;
              delete node.fx;
              delete node.fy;

              if (node.originalFx) {
                node.fx = node.originalFx;
                delete node.originalFx;
              }

              if (node.originalFy) {
                node.fy = node.originalFy;
                delete node.originalFy;
              }
            });
            resolve();
          } else {
            var percentOfAnimation = deltaTime / animationTime;
            nodes.filter(function (node) {
              return node.targetX && node.targetY;
            }).forEach(function (node) {
              node.fx = node.sourceX + (node.targetX - node.sourceX) * percentOfAnimation;
              node.fy = node.sourceY + (node.targetY - node.sourceY) * percentOfAnimation;
            });
            setTimeout(function () {
              return tween(startTime, animationTime);
            }, 1);
          }
        };

        nodes.forEach(function (node) {
          node.originalFx = node.fx;
          node.originalFy = node.fy;
          node.fx = node.x;
          node.fy = node.y;
        });
        tween(Date.now(), Env.IMPLOSION_EXPLOSION_ANIMATION_TIME);
      });
    }
  }]);

  return EntityProcessor;
}();

/* TODO:: Implement deep clone utility instead of JSON.stringify/parse */

/**
 * The data store class is responsible to storing and managing all edges and nodes.
 * The data store decides what nodes and edges are live, as well as makes sure they have the correct data set on them.
 */

var Datastore = /*#__PURE__*/function () {
  function Datastore(nodes, edges, eventEmitter, styles, userDefinedOptions) {
    var _this = this;

    _classCallCheck(this, Datastore);

    this.allNodes = JSON.parse(JSON.stringify(nodes));
    this.allEdges = JSON.parse(JSON.stringify(edges));
    this.liveNodes = this.allNodes;
    this.liveEdges = this.allEdges;
    this.filters = {
      nodes: [],
      edges: []
    };
    this.ee = eventEmitter;
    this.ee.on(EVENTS.DATA_UPDATE_REQUESTED, function (nodes, edges) {
      return _this.updateDataset(nodes, edges);
    });
    this.ee.on(EVENTS.GRAPH_HAS_MOUNTED, function () {
      _this.entityProcessor.executePreProcessor(_this.nodes, _this.edges);

      _this.ee.trigger(EVENTS.DATASTORE_UPDATED, _this.nodes, _this.edges);
    });
    this.ee.on(EVENTS.DATA_FILTER_REQUESTED, function (filters) {
      _this.setFilters(filters);

      _this.applyFilters();

      _this.updateNumberOfHiddenEdgesOnNodes();

      _this.updateLiveData();
    });
    this.ee.on(EVENTS.DATA_FILTER_RESET_REQUESTED, function () {
      _this.resetAllFilters();

      _this.applyFilters();

      _this.updateNumberOfHiddenEdgesOnNodes();

      _this.updateLiveData();
    });
    this.ee.on(EVENTS.IMPLODE_EXPLODE_REQUESTED, function (id, isImplode) {
      _this.implodeOrExplodeNode(id, isImplode);

      _this.updateNumberOfHiddenEdgesOnNodes();

      _this.implodeExplodedNodesAnimation(id, isImplode);
    });
    this.ee.on(EVENTS.IMPLODE_EXPLODE_LEAFS_REQUESTED, function (id, isImplode) {
      _this.implodeOrExplodeNodeLeafs(id, isImplode);

      _this.updateNumberOfHiddenEdgesOnNodes();

      _this.implodeExplodedNodesAnimation(id, isImplode);
    });
    this.ee.on(EVENTS.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, function (id, isImplode) {
      _this.implodeOrExplodeNodeRecursive(id, isImplode);

      _this.updateNumberOfHiddenEdgesOnNodes();

      _this.implodeExplodedNodesAnimation(id, isImplode);
    });
    this.ee.on(EVENTS.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, function (id, isImplode) {
      _this.implodeOrExplodeNodeNonCircular(id, isImplode);

      _this.updateNumberOfHiddenEdgesOnNodes();

      _this.implodeExplodedNodesAnimation(id, isImplode);
    });
    this.entityProcessor = new EntityProcessor(this.ee, styles, userDefinedOptions);
    this.updateEdgeIDs();
    this.applyFilters();
    this.updateNumberOfHiddenEdgesOnNodes();
  }
  /**
   * Will always return only what data is currently live
   */


  _createClass(Datastore, [{
    key: "implodeExplodedNodesAnimation",

    /**
     * Bootstraps the update animation for implosion and explosions of nodes, and ensures things happen a correct order
     */
    value: function implodeExplodedNodesAnimation(id, isImplode) {
      var _this2 = this;

      var rootNode = this.getNodeByID(id);
      this.stageNodePositions(isImplode ? null : rootNode.x, isImplode ? null : rootNode.y, isImplode ? rootNode.x : null, isImplode ? rootNode.y : null);

      if (isImplode) {
        this.entityProcessor.animateNodePositions(this.allNodes).then(function () {
          _this2.updateLiveData();
        });
      } else {
        this.updateLiveData();
        this.entityProcessor.animateNodePositions(this.allNodes);
      }
    }
    /**
     * If there are edges that lack IDs this function will set these to a number that represents the index in the edge array.
     */

  }, {
    key: "updateEdgeIDs",
    value: function updateEdgeIDs() {
      this.allEdges.forEach(function (edge, edgeIndex) {
        if (edge.id === undefined) {
          edge.id = edgeIndex;
        }
      });
    }
    /**
     * Updates the data in the data store.
     * @param {object[]} newNodes - All nodes to be included in the new data set
     * @param {object[]} newEdges - All edges to be included in the new data set
     */

  }, {
    key: "updateDataset",
    value: function updateDataset(newNodes, newEdges) {
      var nodes = JSON.parse(JSON.stringify(newNodes));
      var edges = JSON.parse(JSON.stringify(newEdges));
      this.allNodes = nodes;
      this.allEdges = edges;
      this.updateEdgeIDs();
      this.applyFilters();
      this.updateNumberOfHiddenEdgesOnNodes();
      this.updateLiveData();
    }
    /**
     * Retrieves a node object by its ID
     * @param {string} ID - ID of the node
     * @return {object|null} - Node object or null
     */

  }, {
    key: "getNodeByID",
    value: function getNodeByID(ID) {
      return this.allNodes.find(function (node) {
        return node.id === ID;
      });
    }
    /**
     * Retrieves an edge object by its ID
     * @param {string} ID - ID of the edge
     * @return {object|null} - Edge object or null
     */

  }, {
    key: "getEdgeByID",
    value: function getEdgeByID(ID) {
      return this.allEdges.find(function (edge) {
        return edge.id === ID;
      });
    }
    /**
     * Clears all filters
     */

  }, {
    key: "resetAllFilters",
    value: function resetAllFilters() {
      this.filters = {
        nodes: [],
        edges: []
      };
    }
    /**
     * Stores new filters, overwriting and clearing any existing ones. Note that this function not apply the filters.
     * @param {object[]} filters - Array of filters to be set
     */

  }, {
    key: "setFilters",
    value: function setFilters(filters) {
      var nodeFilters = [];
      var edgeFilters = [];
      filters.forEach(function (filter) {
        if (filter.entityType === "node") {
          nodeFilters.push({
            attribute: filter.attribute,
            value: filter.value,
            function: filter.filterFunction
          });
        } else if (filter.entityType === "edge") {
          edgeFilters.push({
            attribute: filter.attribute,
            value: filter.value,
            function: filter.filterFunction
          });
        } else {
          throw new Error("No such entity type for filters:", filter.entityType);
        }
      });
      this.filters.nodes = nodeFilters;
      this.filters.edges = edgeFilters;
    }
    /**
     * Applies all defined filters to the dataset
     */

  }, {
    key: "applyFilters",
    value: function applyFilters() {
      var _this3 = this;

      this.allNodes.forEach(function (node) {
        var isFiltered = false;

        _this3.filters.nodes.forEach(function (filter) {
          if (!isFiltered) {
            if (filter.filterFunction) {
              isFiltered = filter.filterFunction(node.data);
            } else if (node[filter.attribute] === filter.value) {
              isFiltered = true;
            }
          }
        });

        node.isFiltered = isFiltered;
      });
      this.allEdges.forEach(function (edge) {
        var isFiltered = false;

        _this3.filters.edges.forEach(function (filter) {
          if (!isFiltered) {
            if (filter.filterFunction) {
              isFiltered = filter.filterFunction(edge.data);
            } else if (edge[filter.attribute] === filter.value) {
              isFiltered = true;
            }
          }
        }); //If nodes have been removed there could be broken edges. Mark these as filtered as well.


        var foundSource = _this3.allNodes.find(function (node) {
          return edge.sourceNode === node.id && !node.isFiltered;
        });

        var foundTarget = _this3.allNodes.find(function (node) {
          return edge.targetNode === node.id && !node.isFiltered;
        });

        if (!foundSource || !foundTarget) {
          isFiltered = true;
        }

        edge.isFiltered = isFiltered;
      });
    }
    /**
     * Creates source and target coordinates for nodes that are staged to go live from an implosion/explosion.
     * The result of this function is primarily used to animate the graph into a new state
     * @param {number?} rootX - Start position for the transition
     * @param {number?} rootY - Start position for the transition
     * @param {number?} targetX - End position for the transition
     * @param {number?} targetY - End position for the transition
     */

  }, {
    key: "stageNodePositions",
    value: function stageNodePositions(rootX, rootY, targetX, targetY) {
      var _this4 = this;

      if (!rootX && !targetX) {
        return;
      }

      if (targetX && !rootX) {
        var nodes = this.allNodes.filter(function (node) {
          return !_this4.isNodeLive(node) && _this4.liveNodes.find(function (onScreenNode) {
            return onScreenNode.id === node.id;
          });
        });
        nodes.forEach(function (node) {
          node.targetX = targetX;
          node.targetY = targetY;
          node.sourceX = node.x;
          node.sourceY = node.y;
        });
      } else if (rootX && !targetX) {
        var _nodes = this.allNodes.filter(function (node) {
          return _this4.isNodeLive(node) && !_this4.liveNodes.find(function (onScreenNode) {
            return onScreenNode.id === node.id;
          });
        });

        var leafAncestryMap = {};
        var connectionMap = {};

        _nodes.forEach(function (node) {
          var connectedNodes = _this4.allEdges.filter(function (edge) {
            return (edge.targetNode === node.id || edge.sourceNode === node.id) && edge.targetNode !== edge.sourceNode;
          }).map(function (edge) {
            return edge.sourceNode === node.id ? {
              node: _this4.getNodeByID(edge.targetNode),
              edgeDistance: edge.edgeDistance
            } : {
              node: _this4.getNodeByID(edge.sourceNode),
              edgeDistance: edge.edgeDistance
            };
          }).filter(function (connectedNode) {
            return _this4.liveNodes.includes(connectedNode.node);
          }).reduce(function (acc, connectedNode) {
            if (!acc.map(function (connection) {
              return connection.node.id;
            }).includes(connectedNode.node.id)) {
              acc.push(connectedNode);
            }

            return acc;
          }, []);

          connectionMap[node.id] = connectedNodes;

          if (connectedNodes.length === 1) {
            Array.isArray(leafAncestryMap[connectedNodes[0].node.id]) ? leafAncestryMap[connectedNodes[0].node.id].push(node.id) : leafAncestryMap[connectedNodes[0].node.id] = [node.id];
          }
        });

        _nodes.forEach(function (node) {
          node.sourceX = rootX + 2; //I can't be the exact point of the root or there will be divisional errors

          node.sourceY = rootY + 2;

          if (connectionMap[node.id].length === 1) {
            var multiplier = leafAncestryMap[connectionMap[node.id][0].node.id].indexOf(node.id) + 1;
            var divider = leafAncestryMap[connectionMap[node.id][0].node.id].length;
            var angle = Math.floor(359 / divider * multiplier);
            node.targetX = connectionMap[node.id][0].node.x + connectionMap[node.id][0].edgeDistance * 2 * Math.cos(angle * Math.PI / 180);
            node.targetY = connectionMap[node.id][0].node.y + connectionMap[node.id][0].edgeDistance * 2 * Math.sin(angle * Math.PI / 180);
          } else if (connectionMap[node.id].length === 0) {
            node.targetX = 0;
            node.targetY = 0;
          } else {
            node.targetX = connectionMap[node.id].reduce(function (acc, connection) {
              return acc + connection.node.x;
            }, 0) / connectionMap[node.id].length;
            node.targetY = connectionMap[node.id].reduce(function (acc, connection) {
              return acc + connection.node.y;
            }, 0) / connectionMap[node.id].length;
          }
        });
      }
    }
    /**
     * Updates the live data by filtering non-relevant nodes and edges
     */

  }, {
    key: "updateLiveData",
    value: function updateLiveData() {
      var _this5 = this;

      var nodes = this.allNodes.filter(function (node) {
        return _this5.isNodeLive(node);
      });
      var edges = this.allEdges.filter(function (edge) {
        return _this5.isEdgeLive(edge);
      }); //Apply the result to the live data
      //Sidenote: the reason we don't just overwrite the live data is because that messes with D3s object references

      nodes.forEach(function (newNode) {
        if (!_this5.liveNodes.find(function (oldNode) {
          return oldNode.id === newNode.id;
        })) {
          _this5.liveNodes.push(newNode);
        }
      });
      this.liveNodes = this.liveNodes.filter(function (oldNode) {
        return nodes.find(function (newNode) {
          return oldNode.id === newNode.id;
        });
      });
      edges.forEach(function (newEdge) {
        if (!_this5.liveEdges.find(function (oldEdge) {
          return oldEdge.id === newEdge.id;
        })) {
          _this5.liveEdges.push(newEdge);
        }
      });
      this.liveEdges = this.liveEdges.filter(function (oldEdge) {
        return edges.find(function (newEdge) {
          return oldEdge.id === newEdge.id;
        });
      });
      this.entityProcessor.executePreProcessor(this.nodes, this.edges);
      this.ee.trigger(EVENTS.DATASTORE_UPDATED, this.nodes, this.edges);
    }
    /**
     * Updates the counter on all nodes that has information about how many hidden edges it is a source to
     */

  }, {
    key: "updateNumberOfHiddenEdgesOnNodes",
    value: function updateNumberOfHiddenEdgesOnNodes() {
      var _this6 = this;

      //Write number of hidden edges to nodes
      this.allNodes.forEach(function (node) {
        if (node.isHidden || node.isFiltered) {
          //Node is not live
          node.hiddenEdgeCount = null;
          return;
        }

        node.hiddenEdgeCount = _this6.allEdges.filter(function (edge) {
          return edge.isHidden && !edge.isFiltered && edge.sourceNode === node.id;
        }).length;
      });
    }
    /**
     * Checks if a node is live or not.
     * @param {object} node - Node object to be evaluated
     * @return {boolean} - isLive?
     */

  }, {
    key: "isNodeLive",
    value: function isNodeLive(node) {
      return !node.isHidden && !node.isFiltered;
    }
    /**
     * Checks if an edge is live or not.
     * @param {object} node - Edge object to be evaluated
     * @return {boolean} - isLive?
     */

  }, {
    key: "isEdgeLive",
    value: function isEdgeLive(edge) {
      return !edge.isHidden && !edge.isFiltered;
    }
    /**
     * Sets given nodes and edges to a specified hidden status.
     * @param {object[]} nodes - Array of node objects
     * @param {object[]} edges - Array of edge objects
     * @param {boolean} status - Status to be set, true if hidden, false if not
     */

  }, {
    key: "setNodesAndEdgesHiddenStatus",
    value: function setNodesAndEdgesHiddenStatus(nodes, edges, status) {
      nodes.forEach(function (node) {
        return node.isHidden = status;
      });
      edges.forEach(function (edge) {
        return edge.isHidden = status;
      });
    }
    /**
     * Sets all nodes connected to the provided root node to hidden=true/false (in the TO direction)
     * @param {string} rootNodeID - ID of the root node of the operation
     * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
     * @return {object} - Affected nodes and edges
     */

  }, {
    key: "implodeOrExplodeNode",
    value: function implodeOrExplodeNode(rootNodeID, isImplode) {
      var _this7 = this;

      var connectedEdges = this.allEdges.filter(function (edge) {
        return edge.sourceNode === rootNodeID;
      });
      var connectedNodes = connectedEdges.map(function (edge) {
        return edge.targetNode;
      }).filter(function (node) {
        return node !== rootNodeID;
      });
      var collateralEdges = this.allEdges.filter(function (edge) {
        if (connectedNodes.includes(edge.sourceNode) && connectedNodes.includes(edge.targetNode)) {
          //Processed nodes connecting to each other. This should always be included.
          return true;
        } else if (connectedNodes.includes(edge.sourceNode)) {
          //Going outwards
          return _this7.isNodeLive(_this7.getNodeByID(edge.targetNode));
        } else if (connectedNodes.includes(edge.targetNode)) {
          //Going inwards
          return _this7.isNodeLive(_this7.getNodeByID(edge.sourceNode));
        } else {
          return false;
        }
      });
      var edges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(collateralEdges));
      var nodes = connectedNodes.map(function (nodeID) {
        return _this7.getNodeByID(nodeID);
      });
      this.setNodesAndEdgesHiddenStatus(nodes, edges, isImplode);
      return {
        updatedNodes: nodes,
        updatedEdges: edges
      };
    }
    /**
     * Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction) where no further branching continues.
     * @param {string} rootNodeID - ID of the root node of the operation
     * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
     * @return {object} - Affected nodes and edges
     */

  }, {
    key: "implodeOrExplodeNodeLeafs",
    value: function implodeOrExplodeNodeLeafs(rootNodeID, isImplode) {
      var _this8 = this;

      var connectedEdges = this.allEdges.filter(function (edge) {
        return edge.sourceNode === rootNodeID;
      }).filter(function (edge) {
        return !_this8.allEdges.find(function (secondaryEdge) {
          return secondaryEdge.sourceNode === edge.targetNode;
        });
      });
      var connectedNodes = connectedEdges.map(function (edge) {
        return edge.targetNode;
      });
      var collateralEdges = this.allEdges.filter(function (edge) {
        return connectedNodes.includes(edge.sourceNode) || connectedNodes.includes(edge.targetNode);
      });
      var edges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(collateralEdges));
      var nodes = connectedNodes.map(function (nodeID) {
        return _this8.getNodeByID(nodeID);
      });
      this.setNodesAndEdgesHiddenStatus(nodes, edges, isImplode);
      return {
        updatedNodes: nodes,
        updatedEdges: edges
      };
    }
    /**
     * Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction) recursively until it reaches the end of the tree.
     * @param {string} rootNodeID - ID of the root node of the operation
     * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
     * @param {string[]} processedNodeIDs - IDs that have been processed. Generally would not set this manually when calling the function.
     */

  }, {
    key: "implodeOrExplodeNodeRecursive",
    value: function implodeOrExplodeNodeRecursive(nodeID, isImplode) {
      var _this9 = this;

      var processedNodeIDs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      if (!processedNodeIDs.includes(nodeID)) {
        processedNodeIDs.push(nodeID);

        var _this$implodeOrExplod = this.implodeOrExplodeNode(nodeID, isImplode),
            updatedNodes = _this$implodeOrExplod.updatedNodes;

        updatedNodes.forEach(function (node) {
          return _this9.implodeOrExplodeNodeRecursive(node.id, isImplode, processedNodeIDs);
        });
      }
    }
    /**
     * Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction)
     * recursively until it reaches the end of the tree, but only for branches that don't create circular references back.
     * (to avoid imploding the entire tree on highly interconnected data)
     * @param {string} rootNodeID - ID of the root node of the operation
     * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
     * @return {object} - Affected nodes and edges
     */

  }, {
    key: "implodeOrExplodeNodeNonCircular",
    value: function implodeOrExplodeNodeNonCircular(rootNodeID, isImplode) {
      var _this10 = this;

      var connectedEdges = this.allEdges.filter(function (edge) {
        return edge.sourceNode === rootNodeID;
      }).filter(function (edge) {
        return _this10.calculateEdgePathFromNodeToNode(edge.targetNode, rootNodeID).length === 0;
      });
      var connectedNodes = connectedEdges.map(function (edge) {
        return edge.targetNode;
      });
      var collateralEdges = this.allEdges.filter(function (edge) {
        return connectedNodes.includes(edge.sourceNode) || connectedNodes.includes(edge.targetNode);
      });
      var edges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(collateralEdges));
      var nodes = connectedNodes.map(function (nodeID) {
        return _this10.getNodeByID(nodeID);
      });
      this.setNodesAndEdgesHiddenStatus(nodes, edges, isImplode);
      connectedNodes.forEach(function (nodeID) {
        return _this10.implodeOrExplodeNodeRecursive(nodeID, isImplode);
      });
    }
    /**
     * Calculates the shortest path from one node to another. Returns an array with the nodeIDs, or an empty array if there is no path.
     * @param {string} nodeIDFrom - Node ID where the road starts
     * @param {string} nodeIDTo - Node ID where the road ends
     * @param {string[]} path - The current path, typically you provide this as undefined
     * @param {string[]} crossedNodes - Nodes that have already been seen, typically you provide this as undefined
     * @return {string[]} - Shortest path
     */

  }, {
    key: "calculateEdgePathFromNodeToNode",
    value: function calculateEdgePathFromNodeToNode(nodeIDFrom, nodeIDTo) {
      var _this11 = this;

      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var crossedNodes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var result = [];

      if (!crossedNodes.includes(nodeIDFrom)) {
        if (nodeIDFrom === nodeIDTo) {
          path.push(nodeIDTo);
          return path;
        }

        path.push(nodeIDFrom);
        crossedNodes.push(nodeIDFrom);
        var nextSteps = this.allEdges.filter(function (edge) {
          return edge.sourceNode === nodeIDFrom;
        });
        nextSteps.forEach(function (node) {
          var pathCopy = _toConsumableArray(path);

          var potentialPath = _this11.calculateEdgePathFromNodeToNode(node, nodeIDTo, pathCopy, crossedNodes);

          if (potentialPath.length > 0) {
            result = potentialPath;
          }
        });
      }

      return result;
    }
  }, {
    key: "edges",
    get: function get() {
      return this.liveEdges;
    }
    /**
     * Will always return only what data is currently live
     */

  }, {
    key: "nodes",
    get: function get() {
      return this.liveNodes;
    }
  }]);

  return Datastore;
}();

var EventEmitter = /*#__PURE__*/function () {
  /* Add all possible events from Enum to instance */
  function EventEmitter() {
    var _this = this;

    _classCallCheck(this, EventEmitter);

    this.events = {};
    Object.keys(EVENTS).forEach(function (key) {
      _this.events[EVENTS[key]] = [];
    });
  }
  /* Add a callback to an event */


  _createClass(EventEmitter, [{
    key: "on",
    value: function on(eventName, callback) {
      if (this.events[eventName]) {
        this.events[eventName].push(callback);
      } else {
        throw new Error("No such event: " + eventName);
      }
    }
    /* Trigger an Event */

  }, {
    key: "trigger",
    value: function trigger(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (this.events[eventName]) {
        this.events[eventName].forEach(function (callback) {
          callback.apply(null, args);
        });
      }
    }
  }]);

  return EventEmitter;
}();

/**
 * The zoom handler class handles anything and everything related to zooming.
 */

var ZoomHandler = /*#__PURE__*/function () {
  function ZoomHandler(graphContainerElement, eventEmitter, options) {
    var _this = this;

    _classCallCheck(this, ZoomHandler);

    this.graphContainerElement = graphContainerElement;
    this.enableZoomButtons = options.enableZoomButtons !== undefined ? options.enableZoomButtons : Env.ENABLE_ZOOM_BUTTONS;
    this.ee = eventEmitter;
    this.ee.on(EVENTS.ZOOM_REQUESTED, function (x, y, scale) {
      _this.handleZoomRequest(x, y, scale);
    });
    this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
      return _this.destroy();
    });
    this.zoom = zoom().scaleExtent(Env.SCALE_EXTENT).on("zoom", function () {
      var rootG = select(_this.graphContainerElement).select("g");
      rootG.attr("transform", event.transform);
    });

    if (this.enableZoomButtons) {
      this.initializeZoomButtons();
    } else {
      this.zoomButtonContainer = null;
    }
  }
  /**
   * Initializes the zoom controls in the bottom right corner.
   */


  _createClass(ZoomHandler, [{
    key: "initializeZoomButtons",
    value: function initializeZoomButtons() {
      var _this2 = this;

      this.zoomButtonContainer = select(this.graphContainerElement).append("div").attr("style", "position:relative;");
      var zoomButtons = this.zoomButtonContainer.append("svg").attr("filter", "drop-shadow(0px 0px 2px rgba(0, 0, 0, .5))").attr("style", "position:absolute;height:110px;width:34px;right:15px;bottom:30px;").append("g").attr("class", "nyang-zoom-controls").attr("style", "cursor:pointer;");
      zoomButtons.append("g").on("click", function () {
        _this2.scaleBy(1.5);
      }).attr("class", "nyang-zoom-in").attr("transform", "translate(0, 0)").append("defs").append("path").attr("id", "prefix__zoomin_a").attr("d", "M12.5 11h-.79l-.28-.27C12.41 9.59 13 8.11 13 6.5 13 2.91 10.09 0 6.5 0S0 2.91 0 6.5 2.91 13 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6-9C8.99 2 11 4.01 11 6.5S8.99 11 6.5 11 2 8.99 2 6.5 4.01 2 6.5 2zM7 4H6v2H4v1h2v2h1V7h2V6H7V4z").select(function () {
        return this.parentNode;
      }).select(function () {
        return this.parentNode;
      }).append("rect").attr("x", "2").attr("y", "2").attr("rx", "5").attr("ry", "5").attr("width", "30").attr("height", "30").attr("fill", "white").select(function () {
        return this.parentNode;
      }).append("g").attr("fill", "none").attr("fill-rule", "evenodd").attr("transform", "translate(9 9)").append("mask").attr("id", "prefix__zoomin_b").attr("fill", "#fff").append("use").attr("xedge:href", "#prefix__zoomin_a").select(function () {
        return this.parentNode;
      }).select(function () {
        return this.parentNode;
      }).append("g").attr("fill", "#666").attr("mask", "url(#prefix__zoomin_b)").append("path").attr("d", "M0 0H50V50H0z").attr("transform", "translate(-16 -16)");
      zoomButtons.append("g").on("click", function () {
        _this2.scaleBy(1 / 1.5);
      }).attr("class", "nyang-zoom-out").attr("transform", "translate(0, 38)").append("defs").append("path").attr("id", "prefix__zoomout_a").attr("d", "M12.5 11h-.79l-.28-.27C12.41 9.59 13 8.11 13 6.5 13 2.91 10.09 0 6.5 0S0 2.91 0 6.5 2.91 13 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11zM4 6h5v1H4V6z").select(function () {
        return this.parentNode;
      }).select(function () {
        return this.parentNode;
      }).append("rect").attr("x", "2").attr("y", "2").attr("rx", "5").attr("ry", "5").attr("width", "30").attr("height", "30").attr("fill", "white").select(function () {
        return this.parentNode;
      }).append("g").attr("fill", "none").attr("fill-rule", "evenodd").attr("transform", "translate(9 9)").append("mask").attr("id", "prefix__zoomout_b").attr("fill", "#fff").append("use").attr("xedge:href", "#prefix__zoomout_a").select(function () {
        return this.parentNode;
      }).select(function () {
        return this.parentNode;
      }).append("g").attr("fill", "#666").attr("mask", "url(#prefix__zoomout_b)").append("path").attr("d", "M0 0H50V50H0z").attr("transform", "translate(-16 -16)");
      zoomButtons.append("g").on("click", function () {
        _this2.resetZoom();
      }).attr("class", "nyang-zoom-reset").attr("transform", "translate(0, 76)").append("defs").append("path").attr("id", "prefix__reset_a").attr("d", "M15 10c.552 0 1 .448 1 1v5h-5c-.552 0-1-.448-1-1s.448-1 1-1h3v-3c0-.552.448-1 1-1zM1 10c.552 0 1 .448 1 1v3h3c.552 0 1 .448 1 1s-.448 1-1 1H0v-5c0-.552.448-1 1-1zM16 0v5c0 .552-.448 1-1 1s-1-.448-1-1V2h-3c-.552 0-1-.448-1-1s.448-1 1-1h5zM5 0c.552 0 1 .448 1 1s-.448 1-1 1H2v3c0 .552-.448 1-1 1s-1-.448-1-1V0z").select(function () {
        return this.parentNode;
      }).select(function () {
        return this.parentNode;
      }).append("rect").attr("x", "2").attr("y", "2").attr("rx", "5").attr("ry", "5").attr("width", "30").attr("height", "30").attr("fill", "white").select(function () {
        return this.parentNode;
      }).append("g").attr("fill", "none").attr("fill-rule", "evenodd").attr("transform", "translate(9 9)").append("mask").attr("id", "prefix__reset_b").attr("fill", "#fff").append("use").attr("xedge:href", "#prefix__reset_a").select(function () {
        return this.parentNode;
      }).select(function () {
        return this.parentNode;
      }).append("g").attr("fill", "#666").attr("mask", "url(#prefix__reset_b)").append("path").attr("d", "M0 0H50V50H0z").attr("transform", "translate(-16 -16)");
    }
    /**
     * Set the zoom scale to a given number.
     * @param {number} scale - New scale
     */

  }, {
    key: "scaleTo",
    value: function scaleTo(scale) {
      this.zoom.scaleTo(select(this.graphContainerElement).select("svg"), scale);
    }
    /**
     * Scale the zoom by a given amount.
     * @param {number} ratio - Amount to scale by
     */

  }, {
    key: "scaleBy",
    value: function scaleBy(ratio) {
      this.zoom.scaleBy(select(this.graphContainerElement).select("svg").transition().duration(Env.ZOOM_TIME / 2), ratio);
    }
    /**
     * Reset the zoom (Zoom to fit).
     */

  }, {
    key: "resetZoom",
    value: function resetZoom() {
      var rootG = select(this.graphContainerElement).select("g");
      var currentTransformStr = rootG.attr("transform");
      var currentScale = currentTransformStr.substring(currentTransformStr.indexOf("scale(") + 6, currentTransformStr.lastIndexOf(")"));
      currentScale = parseFloat(currentScale);
      var parentWidth = this.graphContainerElement.clientWidth;
      var parentHeight = this.graphContainerElement.clientHeight;
      var width = (rootG.node().getBBox().width + Env.ZOOM_PADDING * 2) * currentScale;
      var height = (rootG.node().getBBox().height + Env.ZOOM_PADDING * 2) * currentScale;
      var widthRatio = parentWidth / width;
      var heightRatio = parentHeight / height;
      var newScale = Math.min(widthRatio, heightRatio);
      var midX = rootG.node().getBBox().x + rootG.node().getBBox().width / 2;
      var midY = rootG.node().getBBox().y + rootG.node().getBBox().height / 2;
      select(this.graphContainerElement).select("svg").transition().duration(Env.ZOOM_TIME / 4).call(this.zoom.scaleBy, newScale).transition().call(this.zoom.translateTo, midX, midY);
    }
    /**
     * Transforms the svg>g element to a specific translation and scale.
     * @param {number} x - New X coordinate
     * @param {number} y - New Y coordinate
     * @param {number} scale - New scale
     */

  }, {
    key: "zoomToCoordinates",
    value: function zoomToCoordinates(x, y, scale) {
      select(this.graphContainerElement).select("svg").transition().duration(Env.ZOOM_TIME).call(this.zoom.transform, zoomIdentity.translate(x, y).scale(scale)).select("g").attr("transform", "translate(".concat(x, ",").concat(y, ")scale(").concat(scale, ")"));
    }
    /**
     * Handle an incoming zoom request.
     * @param {number?} x - New X coordinate
     * @param {number?} y - New Y coordinate
     * @param {number?} scale - New scale
     */

  }, {
    key: "handleZoomRequest",
    value: function handleZoomRequest(x, y, scale) {
      if ((x || x === 0) && (y || y === 0) && scale) {
        this.zoomToCoordinates(x, y, scale);
      } else {
        this.resetZoom();
      }
    }
    /**
     * Completely remove the zoom utility from the DOM.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (this.zoomButtonContainer) {
        this.zoomButtonContainer.remove();
      }
    }
  }]);

  return ZoomHandler;
}();

/**
 * The context menu class governs the custom context menu (right click menu)
 */

var ContextMenu = /*#__PURE__*/function () {
  function ContextMenu(graphContainerElement, eventEmitter, options) {
    var _this = this;

    _classCallCheck(this, ContextMenu);

    this.showContextMenu = options.enableContextMenu !== undefined ? options.enableContextMenu : Env.SHOW_CONTEXT_MENU;
    this.customContextMenuAddons = options.customContextMenuAddons !== undefined ? options.customContextMenuAddons : Env.DEFAULT_CUSTOM_CONTEXT_MENU;
    this.graphContainerElement = graphContainerElement;
    this.ee = eventEmitter;

    if (this.showContextMenu) {
      this.ee.on(EVENTS.RIGHT_CLICK_ENTITY, function (clickedItem) {
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _this.buildMenu(clickedItem, direction);
      });
      this.ee.on(EVENTS.CLICK_ENTITY, function () {
        _this.removeContextmenu();
      });
      this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
        return _this.removeContextmenu();
      });
    }

    this.InitializeMenuSections();
  }
  /**
   * Generates and positions a context menu.
   * @param {object|null} item - Node, Edge, or "null" (canvas) that has been clicked
   * @param {string?} direction - The direction of the edge clicked (if applicable)
   */


  _createClass(ContextMenu, [{
    key: "buildMenu",
    value: function buildMenu(item, direction) {
      var coordinates = mouse(document.body);
      var mouseX = coordinates[0];
      var mouseY = coordinates[1];

      if (item === null) {
        this.createCanvasContextMenu(null, mouseX, mouseY);
      } else if (!direction) {
        this.createNodeContextMenu(item, mouseX, mouseY);
      } else {
        this.createEdgeContextMenu(item, mouseX, mouseY, direction);
      }
    }
    /**
     * Creates a custom floating menu on the screen using the given input
     * @param {object|null} clickedItem - Node, Edge, or "null" (canvas) that has been clicked
     * @param {object[]} contextSectionsArray - Default menu items
     * @param {object[]} customSectionsArray - User provided menu items
     * @param {number} mouseX - Mouse X coordinate
     * @param {number} mouseY - Mouse Y coordinate
     * @param {string?} direction The direction of the edge clicked (if applicable)
     */

  }, {
    key: "createContextMenu",
    value: function createContextMenu(clickedItem, contextSectionsArray, customSectionsArray, mouseX, mouseY) {
      var _this2 = this;

      var direction = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
      this.removeContextmenu();
      var ulElement = select(this.graphContainerElement).append("div").attr("id", "nyang-context-menu-container").attr("class", "nyang-context-menu").style("position", "fixed").style("left", mouseX + "px").style("top", mouseY + "px").style("display", "block").append("ul").attr("class", "nyang-context-menu-options");
      contextSectionsArray.forEach(function (section, index) {
        if (index === 0) {
          _this2.processSection(ulElement, section, false, clickedItem, direction);
        } else {
          _this2.processSection(ulElement, section, true, clickedItem, direction);
        }
      });
      customSectionsArray.forEach(function (section) {
        _this2.processSection(ulElement, section, true, clickedItem, direction);
      });
    }
    /**
     * Processes and creates a specific section of the context menu.
     * @param {HTMLElement} ul - The entire menu
     * @param {object[]} section - Array of menu items to be added
     * @param {boolean} shouldAddSeparatorBefore - Add a separating line before this new section?
     * @param {object|null} clickedItem - Item that was clicked
     * @param {string?} direction - Direction of the clicked edge, if applicable.
     */

  }, {
    key: "processSection",
    value: function processSection(ul, section, shouldAddSeparatorBefore, clickedItem) {
      var _this3 = this;

      var direction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

      if (shouldAddSeparatorBefore) {
        ul.append("li").append("div").attr("class", "nyang-context-menu-divider");
      }

      section.forEach(function (menuItem) {
        ul.append("li").append("div").attr("class", "nyang-context-menu-option").text(function () {
          return menuItem.label;
        }).on("click", function () {
          _this3.removeContextmenu();

          var data = clickedItem && clickedItem.data || null;
          var id = clickedItem && clickedItem.id || null;
          var edgeDirection = direction;
          return menuItem.action(data, id, edgeDirection);
        });
      });
    }
    /**
     * Create a node context menu
     * @param {object} clickedItem - Clicked node
     * @param {number} mouseX - Mouse X coordinate
     * @param {number} mouseY - Mouse Y coordinate
     */

  }, {
    key: "createNodeContextMenu",
    value: function createNodeContextMenu(clickedItem, mouseX, mouseY) {
      var sections = [this.NodeMenu, this.UniversalMenu];
      var customSections = [];

      if (this.customContextMenuAddons.node) {
        customSections = _toConsumableArray(this.customContextMenuAddons.node);
      }

      this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY);
    }
    /**
     * Create an edge context menu
     * @param {object|null} clickedItem - Clicked edge
     * @param {number} mouseX - Mouse X coordinate
     * @param {number} mouseY - Mouse Y coordinate
     * @param {string} direction - Direction of the edge
     */

  }, {
    key: "createEdgeContextMenu",
    value: function createEdgeContextMenu(clickedItem, mouseX, mouseY, direction) {
      var sections = [this.EdgeMenu, this.UniversalMenu];
      var customSections = [];

      if (this.customContextMenuAddons.edge) {
        customSections = _toConsumableArray(this.customContextMenuAddons.edge);
      }

      this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY, direction);
    }
    /**
     * Create a canvas context menu
     * @param {null} clickedItem - Clicked canvas
     * @param {number} mouseX - Mouse X coordinate
     * @param {number} mouseY - Mouse Y coordinate
     */

  }, {
    key: "createCanvasContextMenu",
    value: function createCanvasContextMenu(clickedItem, mouseX, mouseY) {
      var sections = [this.UniversalMenu];
      var customSections = [];

      if (this.customContextMenuAddons.canvas) {
        customSections = _toConsumableArray(this.customContextMenuAddons.canvas);
      }

      this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY);
    }
    /**
     * Removes the current floating menu
     */

  }, {
    key: "removeContextmenu",
    value: function removeContextmenu() {
      select(this.graphContainerElement).select("#nyang-context-menu-container").remove();
    }
    /**
     * Initializes the menu sections
     */

  }, {
    key: "InitializeMenuSections",
    value: function InitializeMenuSections() {
      var _this4 = this;

      this.NodeMenu = [{
        label: "Select Node",
        action: function action(data, id) {
          _this4.ee.trigger(EVENTS.CLICK_ENTITY, {
            id,
            data
          });
        }
      }];
      this.EdgeMenu = [{
        label: "Select Edge",
        action: function action(data, id, edgeDirection) {
          _this4.ee.trigger(EVENTS.CLICK_ENTITY, {
            id,
            data,
            direction: edgeDirection
          });
        }
      }];
      this.UniversalMenu = [{
        label: "Reset Zoom",
        action: function action() {
          _this4.ee.trigger(EVENTS.ZOOM_REQUESTED);
        }
      }];
    }
  }]);

  return ContextMenu;
}();

/**
 * Writes user defined styles as CSS classes to the DOM dynamically.
 * @param {object} style - User provided styles parameters
 * @param {string} id - ID of the UI-class of this NYANG instance
 */

var initializeGraphStyles = function initializeGraphStyles(style, id) {
  var cssString = "";
  cssString =
  /*css*/
  "\n                /* Global Transitions */\n                .nyang * {\n                    transition: fill 0.1s, opacity 0.1s;\n                }\n\n                /* Text */\n                .nyang .multiplicity {\n                    font-size: ".concat(Env.DEFAULT_MULTIPLICITY_FONT_SIZE, ";\n                }     \n\n                /* Tooltip */\n                #nyang-tooltip {\n                  position: absolute;\n                  display: none;\n                  min-width: ").concat(Env.TOOLTIP_MIN_WIDTH, ";\n                  background: ").concat(Env.TOOLTIP_BACKGROUND, ";\n                  opacity: 0.8;\n                  color: ").concat(Env.TOOLTIP_COLOR, ";\n                  padding: 10px;\n                  text-align: center;\n                  max-width: ").concat(Env.TOOLTIP_MAX_WIDTH, ";\n                  word-wrap: break-word;\n                  font-size: 14px;\n                  border-radius: ").concat(Env.TOOLTIP_BORDER_RADIUS, ";\n                }\n\n                /* Context Menu Styles */\n                /* This is a rule for all paths unless specified otherwise */\n                .nyang path {\n                  stroke: #000;\n                  stroke-width: 2px;\n                }\n                \n                .nyang-context-menu {\n                  box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);\n                  position: relative;\n                  display: block;\n                  background: #FFFFFF;\n                }\n                \n                .nyang-context-menu-options {\n                  min-width: 150px;\n                  list-style: none;\n                  padding: 0px;\n                  margin-top: 10px;\n                  margin-bottom: 10px;\n                }\n                \n                .nyang-context-menu-option {\n                  font-size: 14px;\n                  padding: 7px 20px 7px 20px;\n                  cursor: pointer;\n                }\n                \n                .nyang-context-menu-divider {\n                  width: 90%;\n                  height: 1px;\n                  margin-right: 5%;\n                  margin-left: 5%;\n                  margin-top: 8px;\n                  margin-bottom: 8px;\n                  background: #d5d5d5;\n                }\n                \n                .nyang-context-menu-option:hover {\n                  background: rgba(0, 0, 0, 0.2);\n                }\n                \n                .nyang-node-edge-counter-badge {\n                  fill: #505759;\n                  stroke: none !important;\n                }\n                \n                .nyang-node-edge-counter-badge-text {\n                  dominant-baseline: central;\n                  text-anchor: middle;\n                  fill: white;\n                }\n                \n                /* Search Highlighting */\n                .nyang .highlighted-node {\n                  stroke-width: ").concat(Env.HIGHLIGHTING_BORDER_WIDTH, ";\n                  stroke: ").concat(Env.HIGHLIGHTING_BORDER_COLOR, ";\n                  fill: ").concat(Env.HIGHLIGHTING_COLOR, ";\n                  opacity: 0.3;\n                  pointer-events: none;\n                }\n\n                .nyang .disabled {\n                    opacity: ").concat(Env.DEFAULT_FADE_OPACITY, ";\n                    pointer-events: none;\n                }\n\n                /* Default edge style */\n                .edge-path-default{\n                    fill: none;\n                    stroke-width: ").concat(Env.DEFAULT_STROKE_WIDTH, " !important;\n                    stroke-dasharray: ").concat(Env.DEFAULT_EDGE_DASHARRAY, " !important;\n                    stroke: ").concat(Env.DEFAULT_EDGE_COLOR, " !important;\n                }\n                .edge-path-default.hovered{\n                    stroke: ").concat(Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, " !important;\n                }\n                .edge-path-default.focused{\n                    stroke: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                }\n                \n                .label-rect-default{\n                    cursor: pointer;\n                    fill: ").concat(Env.DEFAULT_LABEL_BACKGROUND_COLOR, ";\n                    rx: ").concat(Env.DEFAULT_LABEL_BORDER_RADIUS_X, ";\n                    ry: ").concat(Env.DEFAULT_LABEL_BORDER_RADIUS_Y, ";\n                    stroke: ").concat(Env.DEFAULT_LABEL_BORDER_COLOR, " !important;\n                    stroke-width: ").concat(Env.DEFAULT_LABEL_BORDER_WIDTH, " !important; \n                }\n                .label-rect-default:hover{\n                    fill: ").concat(Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, ";\n                    cursor: pointer;\n                }\n                .label g .label-rect-default.focused {\n                    stroke-width: ").concat(Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH, " !important;\n                    stroke: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                }\n\n                .label-text-default{\n                    fill: ").concat(Env.DEFAULT_LABEL_TEXT_COLOR, ";\n                    dominant-baseline: central;\n                    pointer-events: none;\n                    font-family: ").concat(Env.DEFAULT_FONT_FAMILY, ";\n                    font-size: ").concat(Env.DEFAULT_FONT_SIZE, ";\n                }\n                .to:hover .label-text-default,\n                .from:hover .label-text-default{\n                    fill: ").concat(Env.DEFAULT_LABEL_TEXT_HOVER_COLOR, "\n                }\n                \n                .marker-default path{\n                    fill: ").concat(Env.DEFAULT_EDGE_COLOR, ";\n                }\n                .marker-default path.hovered{\n                    stroke: ").concat(Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, " !important;\n                    fill: ").concat(Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, " !important;\n                    cursor: pointer;\n                }\n                .marker-default path.focused{\n                    fill: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                    stroke: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                }\n\n                .node, .edge, .multiplicity {\n                    animation: fadeInFromNone 0.2s ease-out;\n                }\n\n                @keyframes fadeInFromNone {\n                    0% {\n                        opacity: 0;\n                    }\n                    100% {\n                        opacity: 1;\n                    }\n                }\n\n                /* Default node values */\n                .node-default {\n                    cursor: pointer;\n                    stroke-width: ").concat(Env.DEFAULT_STROKE_WIDTH, ";\n                    stroke: ").concat(Env.DEFAULT_NODE_STROKE_COLOR, ";\n                    fill: ").concat(Env.DEFAULT_NODE_COLOR, ";\n                    stroke-dasharray: 0;\n                    rx: ").concat(Env.DEFAULT_NODE_BORDER_RADIUS_X, ";\n                    ry: ").concat(Env.DEFAULT_NODE_BORDER_RADIUS_Y, ";\n                }\n                .node-default:hover {\n                    fill: ").concat(Env.DEFAULT_NODE_HOVER_COLOR, ";\n                }\n                .node-text-default {\n                    dominant-baseline: hanging;\n                    pointer-events: none;\n                    font-family: ").concat(Env.DEFAULT_FONT_FAMILY, ";\n                    font-size: ").concat(Env.DEFAULT_FONT_SIZE, ";\n                    fill: ").concat(Env.DEFAULT_NODE_TEXT_COLOR, ";\n                }\n                .node:hover .node-text-default {\n                    fill: ").concat(Env.DEFAULT_NODE_TEXT_HOVER_COLOR, ";\n                }\n                .nyang .node-default.focused {\n                    stroke: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                    stroke-width: ").concat(Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH, " !important;\n                }\n                ");

  if (style && style.nodes) {
    style.nodes.forEach(function (nodeType) {
      cssString = "\n                ".concat(cssString, "\n                .node-").concat(nodeType.id, " {\n                    cursor: pointer;\n                    ").concat(nodeType.borderWidth ? "stroke-width:".concat(nodeType.borderWidth, ";") : "", "\n                    ").concat(nodeType.borderColor ? "stroke:".concat(nodeType.borderColor, ";") : "", "\n                    ").concat(nodeType.backgroundColor ? "fill:".concat(nodeType.backgroundColor, ";") : "", "\n                    ").concat(nodeType.dotted ? "stroke-dasharray:".concat(Env.DEFAULT_NODE_DOTTED_DASHARRAY, ";") : "", "\n                    ").concat(nodeType.borderRadiusX ? "rx:".concat(nodeType.borderRadiusX, ";") : "", "\n                    ").concat(nodeType.borderRadiusY ? "ry:".concat(nodeType.borderRadiusY, ";") : "", "\n                    ").concat(nodeType.filter ? "filter:".concat(nodeType.filter, ";") : "", "\n                }\n                .node-").concat(nodeType.id, ":hover {\n                    ").concat(nodeType.borderHoverWidth ? "stroke-width:".concat(nodeType.borderHoverWidth, ";") : "", "\n                    ").concat(nodeType.borderHoverColor ? "stroke:".concat(nodeType.borderHoverColor, ";") : "", "\n                    ").concat(nodeType.backgroundHoverColor ? "fill:".concat(nodeType.backgroundHoverColor, ";") : "", "\n                    ").concat(nodeType.hoverFilter ? "filter:".concat(nodeType.hoverFilter, ";") : "", "                    \n                }\n                .node-text-").concat(nodeType.id, " {\n                    font-family: ").concat(Env.DEFAULT_FONT_FAMILY, ";\n                    font-size: ").concat(Env.DEFAULT_FONT_SIZE, ";\n                    dominant-baseline: hanging;\n                    pointer-events: none;\n                    ").concat(nodeType.textColor ? "fill:".concat(nodeType.textColor, ";") : "", ";\n                }\n                .node:hover .node-text-").concat(nodeType.id, " {\n                    ").concat(nodeType.textHoverColor ? "fill:".concat(nodeType.textHoverColor, ";") : "", "\n                }\n                .nyang .node-").concat(nodeType.id, ".focused {\n                    ").concat(nodeType.borderFocusedWidth ? "stroke-width:".concat(nodeType.borderFocusedWidth, ";") : "", "\n                    ").concat(nodeType.borderFocusedColor ? "stroke:".concat(nodeType.borderFocusedColor, " !important") : "", "\n                    ").concat(nodeType.backgroundFocusedColor ? "fill:".concat(nodeType.backgroundFocusedColor, ";") : "", "\n                    ").concat(nodeType.focusedFilter ? "filter:".concat(nodeType.focusedFilter, " !important;") : "", "\n                }\n                .nyang .node-").concat(nodeType.id, ".focused .node-text-").concat(nodeType.id, " {\n                    ").concat(nodeType.textFocusedColor ? "fill:".concat(nodeType.textFocusedColor, ";") : "", "\n                }\n                ");
    });
  }

  if (style && style.edges) {
    style.edges.forEach(function (edgeType) {
      cssString = "\n                ".concat(cssString, "\n                .edge-path-").concat(edgeType.id, "{\n                    fill: none !important;\n                    stroke-width: ").concat(Env.DEFAULT_STROKE_WIDTH, " !important;\n                    stroke-dasharray: ").concat(edgeType.dotted ? Env.DEFAULT_EDGE_DOTTED_DASHARRAY : Env.DEFAULT_EDGE_DASHARRAY, " !important;\n                    ").concat(edgeType.color ? "stroke:".concat(edgeType.color, " !important;") : "", "\n                }\n                .edge-path-").concat(edgeType.id, ".hovered{\n                    ").concat(edgeType.hoverColor ? "stroke:".concat(edgeType.hoverColor, " !important;") : "", "\n                }\n                .edge-path-").concat(edgeType.id, ".focused{\n                    ").concat(edgeType.focusedColor ? "stroke:".concat(edgeType.focusedColor, " !important;") : "", "\n                } \n                .label-rect-").concat(edgeType.id, "{\n                    cursor: pointer;\n                    ").concat(edgeType.labelBackgroundColor ? "fill:".concat(edgeType.labelBackgroundColor, ";") : "", "\n                    ").concat(edgeType.borderRadiusX ? "rx:".concat(edgeType.borderRadiusX, ";") : "", "\n                    ").concat(edgeType.borderRadiusY ? "ry:".concat(edgeType.borderRadiusY, ";") : "", "\n                    ").concat(edgeType.labelBorderColor ? "stroke:".concat(edgeType.labelBorderColor, ";") : "", "\n                    ").concat(edgeType.labelBorderWidth ? "stroke-width: ".concat(edgeType.labelBorderWidth, ";") : "", " \n                    ").concat(edgeType.filter ? "filter:".concat(edgeType.filter, ";") : "", "\n                }\n                .label-rect-").concat(edgeType.id, ":hover{\n                    ").concat(edgeType.hoverColor ? "fill:".concat(edgeType.hoverColor, ";") : "", "\n                    ").concat(edgeType.labelHoverBorderColor ? "stroke:".concat(edgeType.labelHoverBorderColor, " !important;") : "", "\n                    ").concat(edgeType.labelHoverBorderWidth ? "stroke-width:".concat(edgeType.labelHoverBorderWidth, " !important;") : "", "\n                    ").concat(edgeType.hoverFilter ? "filter:".concat(edgeType.hoverFilter, ";") : "", "\n                }\n                .label g .label-rect-").concat(edgeType.id, ".focused {\n                    ").concat(edgeType.labelFocusedBorderWidth ? "stroke-width:".concat(edgeType.labelFocusedBorderWidth, " !important;") : "", "\n                    ").concat(edgeType.focusedColor ? "stroke:".concat(edgeType.focusedColor, ";") : "", "\n                    ").concat(edgeType.focusedFilter ? "filter:".concat(edgeType.focusedFilter, " !important;") : "", "\n                    ").concat(edgeType.labelFocusedBorderColor ? "stroke:".concat(edgeType.labelFocusedBorderColor, " !important;") : "", "\n                }\n                .label-text-").concat(edgeType.id, "{\n                    ").concat(edgeType.labelTextColor ? "fill:".concat(edgeType.labelTextColor, ";") : "", ";\n                    dominant-baseline: central;\n                    pointer-events: none;\n                    font-family: ").concat(Env.DEFAULT_FONT_FAMILY, ";\n                    font-size: ").concat(Env.DEFAULT_FONT_SIZE, ";\n                }\n                .to:hover .label-text-").concat(edgeType.id, ",\n                .from:hover .label-text-").concat(edgeType.id, "{\n                    ").concat(edgeType.labelTextHoverColor ? "fill:".concat(edgeType.labelTextHoverColor, ";") : "", "\n                }\n                .marker-").concat(edgeType.id, " path.hovered{\n                    ").concat(edgeType.hoverColor ? "stroke:".concat(edgeType.hoverColor, ";") : "", "\n                    ").concat(edgeType.hoverColor ? "fill:".concat(edgeType.hoverColor, ";") : "", "\n                    cursor: pointer;\n                }\n                .marker-").concat(edgeType.id, " path{\n                    ").concat(edgeType.arrowColor ? "fill:".concat(edgeType.arrowColor, ";") : "", "\n                }\n                .marker-").concat(edgeType.id, " path.focused{\n                    ").concat(edgeType.focusedColor ? "fill:".concat(edgeType.focusedColor, ";") : "", "\n                    ").concat(edgeType.focusedColor ? "stroke:".concat(edgeType.focusedColor, ";") : "", "\n                }\n                ");
    });
  }

  var css = document.createElement("style");
  css.type = "text/css";
  css.id = id;
  css.appendChild(document.createTextNode(cssString));
  document.getElementsByTagName("head")[0].appendChild(css);
};

var tween = function tween(element, property, initialValue, target, startTime, animationTime, setter) {
  var deltaTime = Date.now() - startTime;

  if (deltaTime > animationTime) {
    element.style.removeProperty(property);
    return;
  }

  var percentOfAnimation = deltaTime / animationTime;
  var tweenedValue = initialValue + (target - initialValue) * percentOfAnimation;
  var newValue = setter ? setter(tweenedValue) : tweenedValue;
  element.style[property] = newValue;
  setTimeout(function () {
    return tween(element, property, initialValue, target, startTime, animationTime, setter);
  }, 1);
};

var CSSUtil = {
  initializeGraphStyles,
  tween
};

/**
 * The Highlighter class handles highlighting of nodes in the graph.
 * This includes both highlighting on selections as well as highlighting on search.
 */

var Highlighter = /*#__PURE__*/function () {
  function Highlighter(graphContainerElement, eventEmitter, userDefinedOptions) {
    var _this = this;

    _classCallCheck(this, Highlighter);

    this.graphContainerElement = graphContainerElement;
    this.ee = eventEmitter;
    this.ee.on(EVENTS.CLICK_ENTITY, function (data) {
      data && _this.setElementFocus(data.id, data.direction);
    });
    this.ee.on(EVENTS.CLICK_ENTITY, function (data) {
      data || _this.removeAllEntityFocus();
    });
    this.ee.on(EVENTS.HIGHLIGHT_NODE_REQUESTED, function (nodes) {
      _this.highlightNode(nodes.map(function (node) {
        return node.id;
      }));
    });
    this.ee.on(EVENTS.DISABLE_NODES_REQUESTED, function (nodeIDs) {
      _this.disableNodes(nodeIDs);
    });
    this.ee.on(EVENTS.CLEAR_DISABLE_NODES_REQUESTED, function () {
      _this.clearDisabled();
    });
    this.enableOnionOnFocus = typeof userDefinedOptions.enableOnionOnFocus === "boolean" ? userDefinedOptions.enableOnionOnFocus : Env.ENABLE_ONION_ON_FOCUS;
    this.focusedOnionNumberOfLayers = userDefinedOptions.focusedOnionNumberOfLayers ? userDefinedOptions.focusedOnionNumberOfLayers : Env.DEFAULT_ONION_FOCUSED_LAYERS;
    this.focusedOnionBaseColor = userDefinedOptions.focusedOnionBaseColor ? userDefinedOptions.focusedOnionBaseColor : Env.DEFAULT_ONION_FOCUSED_COLOR;
    this.focusedOnionLayerSize = userDefinedOptions.focusedOnionLayerSize ? userDefinedOptions.focusedOnionLayerSize : Env.DEFAULT_ONION_FOCUSED_SIZE;
    this.writeHighlightFilters();
  }
  /**
   * Adds default filter definitions for node
   */


  _createClass(Highlighter, [{
    key: "writeHighlightFilters",
    value: function writeHighlightFilters() {
      var _this2 = this;

      var shadowFilter = function shadowFilter(id, deviation, opacity) {
        select(_this2.graphContainerElement).select("defs").append("filter").attr("id", id).append("feDropShadow").attr("dx", "0").attr("dy", "0").attr("stdDeviation", deviation).attr("flood-opacity", opacity);
      };

      shadowFilter("shadow-filter", 3, 0.5);
      shadowFilter("shadow-dark-filter", 5, 0.5);
    }
    /**
     * This function sets the exclusive focus on a given entity
     * @param {string} entityID - ID of the entity to be focused
     * @param {boolean?} isFromDirection - Is the edge in the from direction? If applicable
     */

  }, {
    key: "setElementFocus",
    value: function setElementFocus(entityID) {
      var isFromDirection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (entityID) {
        var isFrom;

        if (isFromDirection === "from") {
          isFrom = true;
        } else if (isFromDirection === "to") {
          isFrom = false;
        }

        this.removeAllEntityFocus();
        this.toggleEntityFocusByID(entityID, isFrom);
      }
    }
    /**
     * Removes focus from all nodes and edges
     */

  }, {
    key: "removeAllEntityFocus",
    value: function removeAllEntityFocus() {
      selectAll(".focused").classed("focused", false);

      if (this.enableOnionOnFocus) {
        selectAll(".onion-clone").attr("class", "removing").transition().duration(Env.DEFAULT_ONION_ANIMATION_TIME).style("transform", "scale(0.8)").remove();
      }
    }
    /**
     * Toggles the highlighting of a given node
     * @param {string} entityID - ID of the entity to toggle
     * @param {boolean?} isFrom - Is the edge in the from direction? If applicable
     */

  }, {
    key: "toggleEntityFocusByID",
    value: function toggleEntityFocusByID(entityID) {
      var isFrom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return this.toggleNodeEntityFocus(entityID) || this.toggleEdgeEntityFocus(entityID, isFrom);
    }
    /**
     * Toggles focus on nodes
     * @param {string} entityID - ID of the node to toggle focus for
     */

  }, {
    key: "toggleNodeEntityFocus",
    value: function toggleNodeEntityFocus(entityID) {
      var nodeElement = select("[id='".concat(entityID, "']")); //html4 support

      if (nodeElement.node()) {
        var DOMElement = nodeElement.node();
        var DOMNeighborhood = DOMElement.parentElement.children;
        selectAll(_toConsumableArray(DOMNeighborhood)).classed("focused", !nodeElement.classed("focused"));

        if (this.enableOnionOnFocus) {
          this.toggleOnionBorder(DOMElement, this.focusedOnionLayerSize, this.focusedOnionBaseColor, this.focusedOnionNumberOfLayers);
        }

        return true;
      }

      return false;
    }
    /**
     * Creates an onion border around a given svg node by cloning it a given amount of times
     * @param {HTMLElement} DOMElement - Element to add the border to
     * @param {number} size - Size of the onion layers
     * @param {string} color - Base color of the layers
     * @param {number} layers - number of layers
     * @param {boolean} wasTurnedOn - Returns true if the onion border was toggled on, and false if it was toggled off
     */

  }, {
    key: "toggleOnionBorder",
    value: function toggleOnionBorder(DOMElement, size, color) {
      var layers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
      var DOMNeighborhood = DOMElement.parentElement.children;
      var found = false;
      Array.from(DOMNeighborhood).forEach(function (node) {
        if (node.classList.contains("onion-clone")) {
          found = true;
          select(node).attr("class", null).transition().duration(Env.DEFAULT_ONION_ANIMATION_TIME).style("transform", "scale(0.8)").remove();
        }
      });

      if (!found) {
        var previousNode = DOMElement;
        var offset = 0;

        if (getComputedStyle(DOMElement).strokeWidth && getComputedStyle(DOMElement).stroke !== "rgba(0, 0, 0, 0)") {
          offset += parseInt(getComputedStyle(DOMElement).strokeWidth.substring(0, getComputedStyle(DOMElement).strokeWidth.length - 2)) / 2;
        }

        for (var i = 1; i < layers + 1; i++) {
          var clone = DOMElement.cloneNode();
          clone.removeAttribute("class");
          clone.removeAttribute("id");
          clone.removeAttribute("style");

          if (DOMElement.hasAttribute("r")) {
            clone.setAttribute("r", parseInt(DOMElement.getAttribute("r")) + i * size + offset);
          }

          if (DOMElement.hasAttribute("width")) {
            clone.setAttribute("width", parseInt(DOMElement.getAttribute("width")) + i * (size * 2) + offset);
            clone.setAttribute("height", parseInt(DOMElement.getAttribute("height")) + i * (size * 2) + offset);
            clone.setAttribute("x", parseInt(DOMElement.getAttribute("x")) - i * size - offset / 2);
            clone.setAttribute("y", parseInt(DOMElement.getAttribute("y")) - i * size - offset / 2);

            if (getComputedStyle(DOMElement).rx) {
              clone.style.rx = parseInt(getComputedStyle(DOMElement).rx.substring(0, getComputedStyle(DOMElement).rx.length - 2)) * (i + 1) + "px";
            }

            if (getComputedStyle(DOMElement).ry) {
              clone.style.ry = parseInt(getComputedStyle(DOMElement).ry.substring(0, getComputedStyle(DOMElement).ry.length - 2)) * (i + 1) + "px";
            }
          }

          clone.style.pointerEvents = "none";
          clone.style.fill = color;
          clone.setAttribute("opacity", 0.5 / i);
          clone.setAttribute("class", "onion-clone");
          DOMElement.parentElement.insertBefore(clone, previousNode);
          CSSUtil.tween(clone, "transform", DOMElement.getBoundingClientRect().width / clone.getBoundingClientRect().width, 1, Date.now(), Env.DEFAULT_ONION_ANIMATION_TIME * i, function (newValue) {
            return "scale(".concat(newValue, ")");
          });
          previousNode = clone;
        }

        return true;
      }

      return false;
    }
    /**
     * Toggles focus on edges
     * @param {string} entityID - ID of the entity to toggle
     * @param {boolean} isFrom - Is the edge in the from direction?
     */

  }, {
    key: "toggleEdgeEntityFocus",
    value: function toggleEdgeEntityFocus(entityID, isFrom) {
      var labelGroup = select("#label".concat(entityID).concat(isFrom ? "from" : "to"));

      if (labelGroup) {
        var label = labelGroup.select("rect:not(.removing)");
        var focusedState = label.classed("focused");
        label.classed("focused", !focusedState);

        if (this.enableOnionOnFocus) {
          this.toggleOnionBorder(label.node(), this.focusedOnionLayerSize, this.focusedOnionBaseColor, this.focusedOnionNumberOfLayers);
        }

        selectAll("marker[id$=\"".concat(entityID).concat(isFrom ? "inverse" : "", "\"]")).select("path").classed("focused", !focusedState);
        selectAll("[class*=\"".concat(entityID).concat(isFrom ? "inverse " : " ", "\"]")).selectAll("path, text").classed("focused", !focusedState);
        return true;
      }

      return false;
    }
    /**
     * Highlights multiple nodes with an expanding circle that disappears after a given time frame.
     * @param {string[]} nodes - Array of node IDs to highlight
     */

  }, {
    key: "highlightNode",
    value: function highlightNode(nodes) {
      selectAll(".node").filter(function (d) {
        return nodes.includes(d.id);
      }).append("circle").attr("r", 50).classed("highlighted-node", true).transition().duration(Env.HIGHLIGHT_TIME).ease(easeBounce).style("transform", "scale(5)").transition().duration(Env.HIGHLIGHT_TIME_REMOVE).remove();
    }
    /**
     * Disables (dims) nodes and their connected edges.
     * @param {string[]} nodes - Array of node IDs to fade
     */

  }, {
    key: "disableNodes",
    value: function disableNodes(nodeIDsToDisable) {
      selectAll(".node").filter(function (d) {
        return nodeIDsToDisable.includes(d.id);
      }).classed("disabled", true);
      selectAll(".edge").filter(function (d) {
        return nodeIDsToDisable.includes(d.sourceNode) || nodeIDsToDisable.includes(d.targetNode);
      }).classed("disabled", true);
      selectAll(".label").filter(function (d) {
        return nodeIDsToDisable.includes(d.sourceNode) || nodeIDsToDisable.includes(d.targetNode);
      }).classed("disabled", true);
    }
    /**
     * Clears all disabling for nodes and connected edges set by "disableNodes".
     * @param {string[]} nodes - Array of node IDs to fade
     */

  }, {
    key: "clearDisabled",
    value: function clearDisabled() {
      selectAll(".disabled").classed("disabled", false);
    }
  }]);

  return Highlighter;
}();

/**
 * The tooltip class handles generating and positioning the tooltip in the graph.
 */

var Tooltip = /*#__PURE__*/function () {
  function Tooltip(graphContainerElement, eventEmitter) {
    var _this = this;

    _classCallCheck(this, Tooltip);

    this.graphContainerElement = graphContainerElement;
    this.ee = eventEmitter;
    this.tooltip = this.initializeTooltip();
    this.ee.on(EVENTS.MOUSE_OVER_NODE, function (node) {
      _this.showTooltip(node);
    });
    this.ee.on(EVENTS.MOUSE_LEFT_NODE, function () {
      _this.hideTooltip();
    });
    this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
      return _this.destroy();
    });
  }
  /**
   * Initializes the tooltip
   */


  _createClass(Tooltip, [{
    key: "initializeTooltip",
    value: function initializeTooltip() {
      return select(this.graphContainerElement).append("div").attr("id", "nyang-tooltip");
    }
    /**
     * Displays the tooltip with a text at coordinates x and y
     * @param {object} node - The node object where the tooltip should be
     */

  }, {
    key: "showTooltip",
    value: function showTooltip(node) {
      var coordinates = mouse(document.documentElement);
      this.tooltip.style("left", coordinates[0] - window.pageXOffset + "px").style("top", coordinates[1] + 20 - window.pageYOffset + "px").style("display", "inline-block").style("position", "fixed").html(node.name);
    }
    /**
     * Hides the tooltip
     */

  }, {
    key: "hideTooltip",
    value: function hideTooltip() {
      this.tooltip.style("display", "none");
    }
    /**
     * Unmounts the tooltip from the DOM
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.tooltip.remove();
    }
  }]);

  return Tooltip;
}();

/**
 * The Grid class is responsible for drawing the background grid pattern to the canvas (if applicable)
 */

var Grid = /*#__PURE__*/function () {
  function Grid(graphContainerElement, eventEmitter, options) {
    _classCallCheck(this, Grid);

    this.graphContainerElement = graphContainerElement;
    this.enableGrid = options.enableGrid !== undefined ? options.enableGrid : Env.ENABLE_GRID;
    this.enableSecondaryGrid = options.enableSecondaryGrid !== undefined ? options.enableSecondaryGrid : false;
    this.ee = eventEmitter;

    if (this.enableGrid) {
      this.initializeGrid();
    } else if (this.enableSecondaryGrid) {
      this.initializeAlternativeGrid();
    }
  }
  /**
   * Initialize the background grid
   */


  _createClass(Grid, [{
    key: "initializeGrid",
    value: function initializeGrid() {
      var defs = select(this.graphContainerElement).select("svg").select("g").select("defs");
      var gridPattern = defs.append("pattern").attr("id", "grid").attr("width", 60).attr("height", 60).attr("patternUnits", "userSpaceOnUse");
      gridPattern.append("path").attr("d", "M 60 0 L 0 0 0 60").attr("style", "fill: none; stroke: #dedede; stroke-width: 1; stroke-dasharray: 2;");
      this.createLine(gridPattern, 0, 0, 0, 2);
      this.createLine(gridPattern, 0, 0, 2, 0);
      this.createLine(gridPattern, 60, 60, 58, 60);
      this.createLine(gridPattern, 60, 60, 60, 58);
      this.createLine(gridPattern, 0, 58, 0, 60);
      this.createLine(gridPattern, 0, 60, 2, 60);
      this.createLine(gridPattern, 58, 0, 60, 0);
      this.createLine(gridPattern, 60, 0, 60, 2);
      select(this.graphContainerElement).select("svg").insert("rect", ":first-child").attr("width", "100%").attr("height", "100%").attr("fill", "url(#grid)");
    }
    /**
     * Initialize the secondary grid
     */

  }, {
    key: "initializeAlternativeGrid",
    value: function initializeAlternativeGrid() {
      var defs = select(this.graphContainerElement).select("svg").select("g").select("defs");
      var gridPattern = defs.append("pattern").attr("id", "grid").attr("width", 60).attr("height", 60).attr("patternUnits", "userSpaceOnUse");
      gridPattern.append("path").attr("d", "M 60 0 L 0 0 0 60").attr("style", "fill: none; stroke: #a0a0a0; stroke-width: 1; stroke-dasharray: 2;");
      select(this.graphContainerElement).select("svg").insert("rect", ":first-child").attr("width", "100%").attr("height", "100%").attr("fill", "url(#grid)");
    }
    /**
     * @param {D3Selection} container - D3 selection of the container we are drawing inside of
     * @param {*} startX - Start X coordinate of the line
     * @param {*} startY - Start Y coordinate of the line
     * @param {*} endX - End X coordinate of the line
     * @param {*} endY - End Y coordinate of the line
     */

  }, {
    key: "createLine",
    value: function createLine(container, startX, startY, endX, endY) {
      container.append("line").attr("style", "stroke: #a0a0a0;stroke-width:0.5;").attr("x1", startX).attr("y1", startY).attr("x2", endX).attr("y2", endY);
    }
  }]);

  return Grid;
}();

/**
 * Creates a D3 curve function.
 */

var curveFunction = line().x(function (d) {
  return d.x;
}).y(function (d) {
  return d.y;
}).curve(curveCardinal);
/**
 * Creates a d3 loop function.
 */

var loopFunction = line().x(function (d) {
  return d.x;
}).y(function (d) {
  return d.y;
}).curve(curveCardinal.tension(-1));
/**
 * Calculates the radian of an angle.
 * @param {number} angle
 */

var calculateRadian = function calculateRadian(angle) {
  angle = angle % 360;

  if (angle < 0) {
    angle = angle + 360;
  }

  var arc = 2 * Math.PI * angle / 360;

  if (arc < 0) {
    arc = arc + 2 * Math.PI;
  }

  return arc;
};
/**
 * Calculates the point where the edge between the source and target node intersects the border of the target node.
 * @param {object} source - source node of the edge
 * @param {object} target - target node of the edge
 * @param {number} additionalDistance - additional distance, or what is essentially a padding.
 */


var calculateIntersection = function calculateIntersection(source, target, additionalDistance) {
  var dx = target.x - source.x;
  var dy = target.y - source.y;
  var innerDistance = target.radius; //Rectangles require some more work...

  if (target.shape === "rectangle") {
    var m_edge = Math.abs(dy / dx);
    var m_rect = target.height / target.width;

    if (m_edge <= m_rect) {
      var timesX = dx / (target.width / 2);
      var rectY = dy / timesX;
      innerDistance = Math.sqrt(Math.pow(target.width / 2, 2) + rectY * rectY);
    } else {
      var timesY = dy / (target.height / 2);
      var rectX = dx / timesY;
      innerDistance = Math.sqrt(Math.pow(target.height / 2, 2) + rectX * rectX);
    }
  }

  var length = Math.sqrt(dx * dx + dy * dy);
  var ratio = (length - (innerDistance + additionalDistance)) / length;
  var x = dx * ratio + source.x;
  var y = dy * ratio + source.y;
  return {
    x,
    y
  };
};
/**
 * Calculates the angle for a label in the graph
 * @param {number} point1 - First vector of the edge
 * @param {number} point2 - Second vector of the edge
 */


var calculateLabelAngle = function calculateLabelAngle(point1, point2) {
  //Get the angle in degrees
  var dx = point1.x - point2.x;
  var dy = point1.y - point2.y;
  var theta = Math.atan2(dy, dx);
  var angle = theta * (180 / Math.PI); //Convert to a 360 scale

  angle += 180; //Make sure the label is never upside-down

  if (angle > 90 && angle < 270) {
    angle -= 180;
  }

  return angle;
};
/**
 * Calculates a point between two points for creating a curved line.
 * @param {object} source - Point where the source node is intersected by the edge
 * @param {object} target - Point where the target node is intersected by the edge
 * @param {object} l - Edge itself
 */


var calculateCurvePoint = function calculateCurvePoint(source, target, l) {
  var distance = calculateMultiEdgeDistance(l);
  var dx = target.x - source.x;
  var dy = target.y - source.y;
  var cx = source.x + dx / 2;
  var cy = source.y + dy / 2;
  var n = calculateNormalVector(source, target, distance);

  if (l.source.index < l.target.index) {
    n.x = -n.x;
    n.y = -n.y;
  }

  if (l.multiEdgeIndex % 2 !== 0) {
    n.x = -n.x;
    n.y = -n.y;
  }

  return {
    x: cx + n.x,
    y: cy + n.y
  };
};
/**
 * Calculate the optimal Multi Edge distance. This is typically used to ensure edges don't overlap.
 * @param {object} l - Edge to be evaluated
 */


var calculateMultiEdgeDistance = function calculateMultiEdgeDistance(l) {
  var level = Math.floor((l.multiEdgeIndex - l.multiEdgeCount % 2) / 2) + 1;
  var oddConstant = l.multiEdgeCount % 2 * 15;
  var distance = 0;

  switch (level) {
    case 1:
      distance = 20 + oddConstant;
      break;

    case 2:
      distance = 45 + oddConstant;
      break;
  }

  return distance;
};
/**
 * Calculates the normal vector between two points.
 * @param {object} source - Source point
 * @param {object} target - Target point
 * @param {number} length - Distance
 */


var calculateNormalVector = function calculateNormalVector(source, target, length) {
  var dx = target.x - source.x;
  var dy = target.y - source.y;
  var nx = -dy;
  var ny = dx;
  var vlength = Math.sqrt(nx * nx + ny * ny);
  var ratio = length / vlength;
  return {
    x: nx * ratio,
    y: ny * ratio
  };
};
/**
 * Calculates edges to its input and stores the point for the labels. Only for circle shaped nodes!
 * @param {object} l - Edge to be processed
 */


var calculateSelfEdgePath = function calculateSelfEdgePath(l) {
  var node = l.source;
  var loopShiftAngle = 360 / l.selfEdgeCount;
  var loopAngle = Math.min(60, loopShiftAngle * 0.8);
  var arcFrom = calculateRadian(loopShiftAngle * l.selfEdgeIndex);
  var arcTo = calculateRadian(loopShiftAngle * l.selfEdgeIndex + loopAngle);
  var x1 = Math.cos(arcFrom) * node.radius;
  var y1 = Math.sin(arcFrom) * node.radius;
  var x2 = Math.cos(arcTo) * node.radius;
  var y2 = Math.sin(arcTo) * node.radius;
  var fixPoint1 = {
    x: node.x + x1,
    y: node.y + y1
  };
  var fixPoint2 = {
    x: node.x + x2,
    y: node.y + y2
  };
  var distanceMultiplier = 2.5;
  var dx = (x1 + x2) / 2 * distanceMultiplier;
  var dy = (y1 + y2) / 2 * distanceMultiplier;
  var curvePoint = {
    x: node.x + dx,
    y: node.y + dy
  };
  l.curvePoint = curvePoint;
  return loopFunction([fixPoint1, curvePoint, fixPoint2]);
};

var MathUtil = {
  calculateCurvePoint,
  calculateIntersection,
  calculateMultiEdgeDistance,
  calculateNormalVector,
  calculateRadian,
  curveFunction,
  loopFunction,
  calculateSelfEdgePath,
  calculateLabelAngle
};

/**
 * The DOM Processor class is responsible for managing the DOM using the provided node and edge data, as well as provided configuration.
 */

var DOMProcessor = /*#__PURE__*/function () {
  function DOMProcessor(rootG, eventEmitter, userDefinedOptions) {
    var _this = this;

    _classCallCheck(this, DOMProcessor);

    this.enableFadeOnHover = userDefinedOptions.enableFadeOnHover !== undefined ? userDefinedOptions.enableFadeOnHover : Env.DEFAULT_FADE_ON_HOVER;
    this.showMultiplicity = true;
    this.enableMultiLineNodeLabels = userDefinedOptions.enableMultiLineNodeLabels !== undefined ? userDefinedOptions.enableMultiLineNodeLabels : Env.DEFAULT_NODE_TEXT_MULTILINE;
    this.rotateLabels = userDefinedOptions.rotateLabels !== undefined ? userDefinedOptions.rotateLabels : Env.ROTATE_LABELS;
    this.rootG = rootG;
    this.nodes = [];
    this.edges = [];
    this.listeningForTick = false;
    this.ee = eventEmitter;
    this.ee.on(EVENTS.TOGGLE_MULTIPLICITY_REQUESTED, function () {
      _this.showMultiplicity = !_this.showMultiplicity;

      _this.updateMultiplicityCounters(_this.edges);
    });
    this.ee.on(EVENTS.DATASTORE_UPDATED, function (nodes, edges) {
      _this.nodes = nodes;
      _this.edges = edges; //The order of these matters, don't rearrange

      _this.updateMarkers(edges);

      _this.updateEdges(edges);

      _this.updateLabels(edges);

      _this.updateMultiplicityCounters(edges);

      _this.updateNodes(nodes);

      _this.attachEntityClickListeners();

      _this.ee.trigger(EVENTS.DOM_PROCESSOR_FINISHED, nodes, edges);
    });
    this.ee.on(EVENTS.ENGINE_TICK, function () {
      if (_this.listeningForTick) {
        _this.tick();
      }
    });
    this.ee.on(EVENTS.GRAPH_HAS_MOUNTED, function () {
      _this.listeningForTick = true;
    });
  }
  /**
   * Updates all markers (arrows for edges)
   * @param {object[]} edges - All edges
   */


  _createClass(DOMProcessor, [{
    key: "updateMarkers",
    value: function updateMarkers(edges) {
      var _this2 = this;

      var defs = this.rootG.select("defs");
      defs.selectAll("marker").remove();
      edges.forEach(function (l) {
        _this2.drawMarker(defs, l, false);

        if (l.nameFrom) {
          _this2.drawMarker(defs, l, true);
        }
      });
    }
    /**
     * Updates all edges in the DOM, including enter and exit operations.
     * @param {object[]} edges - edges to be present in the DOM
     */

  }, {
    key: "updateEdges",
    value: function updateEdges(edges) {
      var _this3 = this;

      var selector = this.rootG.select("#edge-container").selectAll(".edge").data(edges, function (d) {
        return d.id;
      });
      selector.exit().remove();
      selector.enter().append("g").attr("class", function (d) {
        return _this3.getMarkerId(d, true) + " " + _this3.getMarkerId(d, false);
      }).classed("edge", true).append("path").attr("class", function (d) {
        return "edge-path-".concat(d.type ? d.type : "default");
      }).attr("marker-end", function (l) {
        return "url(#" + _this3.getMarkerId(l, false) + ")";
      }).attr("marker-start", function (l) {
        if (l.nameFrom) {
          return "url(#" + _this3.getMarkerId(l, true) + ")";
        }

        return "";
      });
      this.edgePath = this.rootG.select("#edge-container").selectAll(".edge path");
    }
    /**
     * Updates all multiplicity counters on edges.
     * @param {object[]} edges - List of all edges
     */

  }, {
    key: "updateMultiplicityCounters",
    value: function updateMultiplicityCounters(edges) {
      var _this4 = this;

      if (this.showMultiplicity) {
        var selector = this.rootG.select("#multiplicity-container").selectAll(".multiplicity").data(edges, function (d) {
          return d.id;
        });
        selector.exit().remove();
        selector.enter().append("g").classed("multiplicity", true).filter(function (l) {
          return l.multiplicityTo || l.multiplicityFrom;
        }).each(function (d, i, c) {
          if (d.multiplicityFrom) {
            _this4.drawMultiplicity(select(c[i]), "from");
          }

          if (d.multiplicityTo) {
            _this4.drawMultiplicity(select(c[i]), "to");
          }
        });
      } else {
        this.rootG.select("#multiplicity-container").selectAll(".multiplicity").remove();
      }

      this.activeMultiplicities = this.rootG.select("#multiplicity-container").selectAll(".multiplicity").selectAll("g");
    }
    /**
     * Updates all nodes in the DOM, including enter and exit operations.
     * @param {object[]} nodes - List of all nodes
     */

  }, {
    key: "updateNodes",
    value: function updateNodes(nodes) {
      var _this5 = this;

      var selector = this.rootG.select("#node-container").selectAll(".node").data(nodes, function (d) {
        return d.id;
      });
      selector.exit().remove();
      selector.enter().append("g").attr("class", "node").call(drag().on("start", function (d) {
        //Stop force on start in case it was just a simple click
        _this5.ee.trigger(EVENTS.NODE_DRAG_START, d);

        d.fx = d.x;
        d.fy = d.y;
      }).on("drag", function (d) {
        //Restart force on drag
        _this5.ee.trigger(EVENTS.NODE_DRAG_DRAGGED, d);

        d.fx = event.x;
        d.fy = event.y;
      }).on("end", function (d) {
        d.fx = null;
        d.fy = null;

        _this5.ee.trigger(EVENTS.NODE_DRAG_ENDED, d);
      })).each(function (d, i, c) {
        var element = select(c[i]);

        _this5.drawNode(element, d);
      }); //Draw counter badges for imploded edges

      nodes.forEach(function (node) {
        select("[id='badge-".concat(node.id, "-hidden-edge-counter']")).remove();

        if (node.hiddenEdgeCount) {
          var element = select("[id='".concat(node.id, "']")).select(function () {
            return this.parentNode;
          });

          _this5.drawNodeCollapsedEdgeCounter(element, node);
        }
      });
      this.nodeElements = this.rootG.select("#node-container").selectAll(".node");
    }
    /**
     * Updates all labels on edges.
     * @param {object[]} edges - List of all edges
     */

  }, {
    key: "updateLabels",
    value: function updateLabels(edges) {
      var _this6 = this;

      var selector = this.rootG.select("#label-container").selectAll(".label").data(edges, function (d) {
        return d.id;
      });
      selector.exit().remove();
      selector.enter().append("g").classed("label", true)
      /* Create labels, exclude edges without labels */
      .filter(function (d) {
        var needsLabel = d.nameTo || d.nameFrom;
        return needsLabel;
      }).each(function (d, i, c) {
        if (d.nameFrom) {
          _this6.drawLabel(select(c[i]), d, "from");
        }

        if (d.nameTo) {
          _this6.drawLabel(select(c[i]), d, "to");
        }
      });
      this.labels = this.rootG.select("#label-container").selectAll(".label").selectAll("g");
    }
    /**
     * Returns the distance (length) of the passed edge.
     * @param {object} l - Edge object
     */

  }, {
    key: "getEdgeDistance",
    value: function getEdgeDistance(l) {
      var targetRadius = l.target.radius !== undefined ? l.target.radius : 0;
      var sourceRadius = l.source.radius !== undefined ? l.source.radius : 0;
      var distance = targetRadius + sourceRadius;
      return distance + l.edgeDistance;
    }
    /**
     * Retrieves marker ID.
     * @param {object} l - Edge object
     * @param {boolean} inverse - Is the edge inverse?
     */

  }, {
    key: "getMarkerId",
    value: function getMarkerId(l, inverse) {
      return (l.type ? l.type : "normal") + l.id + (inverse ? "inverse" : "");
    }
    /**
     * Draws a marker.
     * @param {D3Selection} defs - Definitions selection by D3
     * @param {object} edge - Edge object
     * @param {boolean} inverse - Is the edge inverse?
     */

  }, {
    key: "drawMarker",
    value: function drawMarker(defs, edge, inverse) {
      defs.append("marker").attr("id", this.getMarkerId(edge, inverse)).attr("viewBox", "0 -8 14 16").attr("refX", inverse ? 0 : 12).attr("refY", 0).attr("markerWidth", 12).attr("markerHeight", 12).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").attr("class", (edge.type ? edge.type : "normal") + "Marker").attr("class", "marker-" + (edge.type ? edge.type : "default")).append("path").attr("d", function () {
        return inverse ? "M12,-8L0,0L12,8Z" : "M0,-8L12,0L0,8Z";
      });
    }
    /**
     * Draws a label to a edge in direction X.
     * @param {D3Selection} edge - Edge HTMLElement selection by D3
     * @param {object} data - Edge object
     * @param {"to"|"from"} direction - Direction of the edge
     */

  }, {
    key: "drawLabel",
    value: function drawLabel(edge, data, direction) {
      var label = edge.append("g").attr("id", "label" + data.id + direction).classed(direction, true);
      this.drawLabelRect(label, data, direction);
      var labelText = label.append("text").attr("class", function () {
        return "label-text-".concat(data.type ? data.type : "default");
      }).attr("text-anchor", "middle");
      this.drawLabelText(labelText, data, direction);
    }
    /**
     * Draws a rectangle as a label background.
     * @param {D3Selection} label - D3 selection of the label parent HTMLElement
     * @param {object} data - Edge object
     * @param {"to"|"from"} direction - Direction of the edge
     */

  }, {
    key: "drawLabelRect",
    value: function drawLabelRect(label, data, direction) {
      var _this7 = this;

      var width = direction === "to" ? data.nameToWidth : data.nameFromWidth;
      label.append("rect").attr("class", function () {
        return "label-rect-".concat(data.type ? data.type : "default");
      }).attr("x", -width / 2).attr("y", -Env.LABEL_HEIGHT / 2).attr("width", width).attr("height", Env.LABEL_HEIGHT).on("mouseenter", function (edgeData) {
        _this7.labelMouseEnter(edgeData, direction);
      }).on("mouseleave", function (edgeData) {
        _this7.labelMouseLeave(edgeData, direction);
      });
    }
    /**
     * Draws a new <tspan> to a supplied label.
     * @param {D3Selection} element - Label HTMLElement selection by D3
     * @param {object} d - Edge object
     * @param {"to"|"from"} direction - Direction of the edge
     */

  }, {
    key: "drawLabelText",
    value: function drawLabelText(element, d, direction) {
      element.append("tspan").text(function () {
        var width = direction === "to" ? d.nameToWidth : d.nameFromWidth;
        var value;

        if (direction === "to") {
          value = d.nameTo;
        } else if (direction === "from") {
          value = d.nameFrom;
        } else {
          value = d.nameTo ? d.nameTo : d.nameFrom;
        }

        return value.toString().truncate(width);
      });
    }
    /**
     * Highlights the marker and edge for the given label and direction.
     * @param {object} edgeData - Edge object
     * @param {"to"|"from"} direction - Direction of the edge
     */

  }, {
    key: "labelMouseEnter",
    value: function labelMouseEnter(edgeData, direction) {
      var _this8 = this;

      var inverse = direction === "from";
      selectAll("marker#" + this.getMarkerId(edgeData, inverse)).select("path").classed("hovered", true);
      selectAll("." + this.getMarkerId(edgeData, inverse)).selectAll("path, text").classed("hovered", true); //Timeout the sorting to save CPU cycles, and stop a sorting from taking place if the mouse just passed by

      setTimeout(function () {
        var marker = selectAll("marker#" + _this8.getMarkerId(edgeData, inverse)).select("path");

        if (marker._groups[0].length > 0 && marker.classed("hovered")) {
          _this8.handleHoverEvent(edgeData, "enter"); //Sort the labels which brings the hovered one to the foreground


          _this8.rootG.selectAll(".label").sort(function (a, b) {
            if (a.id === edgeData.id && b.id !== edgeData.id) {
              return 1; // a is hovered
            } else if (a.id !== edgeData.id && b.id === edgeData.id) {
              return -1; // b is hovered
            } else {
              // workaround to make sorting in chrome for these elements stable
              return a.id - b.id;
            }
          });
        }
      }, 250);
    }
    /**
     * Removes highlighting of marker and edge for the given label and direction
     * @param {object} edgeData - Edge object
     * @param {"to"|"from"} direction - Direction of the edge
     */

  }, {
    key: "labelMouseLeave",
    value: function labelMouseLeave(edgeData, direction) {
      this.handleHoverEvent(edgeData, "leave");
      var inverse = direction === "from";
      selectAll("marker#" + this.getMarkerId(edgeData, inverse)).select("path").classed("hovered", false);
      selectAll("." + this.getMarkerId(edgeData, inverse)).selectAll("path, text").classed("hovered", false);
    }
    /**
     * Draws multiplicity notation
     * @param {object} edge - Edge object
     * @param {"to"|"from"} direction - Direction of the edge
     */

  }, {
    key: "drawMultiplicity",
    value: function drawMultiplicity(edge, direction) {
      var _this9 = this;

      var card = edge.append("g").attr("class", function (l) {
        return _this9.getMarkerId(l, direction === "to");
      }).classed(direction, true);
      card.append("text").attr("text-anchor", "middle").text(function (d) {
        return direction === "to" ? d.multiplicityTo : d.multiplicityFrom;
      });
    }
    /**
     * Draws a node
     * @param {D3Selection} element - D3 selection of the node html element.
     * @param {object} data - Node object
     */

  }, {
    key: "drawNode",
    value: function drawNode(element, data) {
      var _this10 = this;

      var contentGroupElement = element.append("g");
      var contentGroupOffsetX = 0;
      var textOffsetY = 0;
      var textAnchor = "middle";

      switch (data.shape) {
        case "circle":
          element.insert("circle", "g").attr("r", function (d) {
            return d.radius;
          }).attr("class", "node-".concat(data.type ? data.type : "default")).attr("id", data.id);

          if (data.icon) {
            this.drawIcon(contentGroupElement, data.icon);
            textOffsetY = Env.DEFAULT_NODE_ICON_PADDING;
          }

          break;

        case "layeredCircle":
          element.insert("circle", "g").attr("r", function (d) {
            return d.radius;
          }).attr("style", "stroke-width:2;fill:#fff;stroke:#000;stroke-dasharray:0;pointer-events:none;").attr("id", data.id);
          element.insert("circle", "g").attr("r", function (d) {
            return d.radius - 4;
          }).attr("class", "node-".concat(data.type ? data.type : "default"));

          if (data.icon) {
            this.drawIcon(contentGroupElement, data.icon);
            textOffsetY = Env.DEFAULT_NODE_ICON_PADDING;
          }

          break;

        case "rectangle":
          element.insert("rect", "g").attr("x", function (d) {
            return -d.width / 2;
          }).attr("y", function (d) {
            return -d.height / 2;
          }).attr("width", function (d) {
            return d.width;
          }).attr("height", function (d) {
            return d.height;
          }).attr("class", "node-".concat(data.type ? data.type : "default")).attr("id", data.id);

          if (data.icon) {
            var icon = this.drawIcon(element, data.icon);
            icon.attr("y", -Env.DEFAULT_NODE_ICON_SIZE / 2);
            icon.attr("x", -element.node().getBBox().width / 2 + Env.ADDITIONAL_TEXT_SPACE);
            contentGroupOffsetX += -element.node().getBBox().width / 2 + Env.ADDITIONAL_TEXT_SPACE + Env.DEFAULT_NODE_ICON_SIZE + Env.DEFAULT_NODE_ICON_PADDING;
            textAnchor = "start";
          }

          break;

        default:
          console.error("NO SHAPE FOUND FOR NODE");
      }

      element.on("mouseenter", function (d) {
        _this10.handleHoverEvent(d, "enter");
      }).on("mouseleave", function (d) {
        _this10.handleHoverEvent(d, "leave");
      }).on("mousemove", function (d) {
        _this10.ee.trigger(EVENTS.MOUSE_OVER_NODE, d);
      }).on("mouseout", function (d) {
        _this10.ee.trigger(EVENTS.MOUSE_LEFT_NODE, d);
      });
      this.drawTextBlock(contentGroupElement, textAnchor); //Draw the text inside the block

      if (!this.enableMultiLineNodeLabels) {
        this.drawTextline(contentGroupElement.select("text"), data.name.truncate(data.maxTextWidth), data.type ? data.type : "default", contentGroupElement.node().getBBox().height + textOffsetY);
      } else {
        var text = data.name;
        var truncatedText = text.truncate(data.maxTextWidth);

        if (truncatedText.length < text.length && truncatedText.lastIndexOf(" ") > -1) {
          truncatedText = truncatedText.substring(0, truncatedText.lastIndexOf(" "));
          var otherStringTruncated = text.substring(truncatedText.length + 1).truncate(data.maxTextWidth);

          if (otherStringTruncated.length + truncatedText.length + 1 < text.length) {
            otherStringTruncated = otherStringTruncated.substring(0, otherStringTruncated.length - 3) + "...";
          }

          this.drawTextline(contentGroupElement.select("text"), truncatedText, data.type ? data.type : "default", contentGroupElement.node().getBBox().height + textOffsetY);
          this.drawTextline(contentGroupElement.select("text"), otherStringTruncated, data.type ? data.type : "default", contentGroupElement.node().getBBox().height);
        } else {
          if (truncatedText.length < text.length) {
            truncatedText = truncatedText.substring(0, truncatedText.length - 3) + "...";
          }

          this.drawTextline(contentGroupElement.select("text"), truncatedText, data.type ? data.type : "default", contentGroupElement.node().getBBox().height + textOffsetY);
        }
      }

      contentGroupElement.attr("transform", "translate(".concat(contentGroupOffsetX, ", ").concat(-contentGroupElement.node().getBBox().height / 2 - contentGroupElement.node().getBBox().y, ")"));
    }
    /**
     * Draws an <image> block to a given element with an icon in it
     * @param {D3Selection} element - The element that the text block should be written to
     * @param {string} icon - The source icon
     */

  }, {
    key: "drawIcon",
    value: function drawIcon(element, icon) {
      return element.append("image").attr("href", icon).attr("width", Env.DEFAULT_NODE_ICON_SIZE).attr("height", Env.DEFAULT_NODE_ICON_SIZE).attr("x", -Env.DEFAULT_NODE_ICON_SIZE / 2).attr("style", "pointer-events: none;");
    }
    /**
     * Draws a <text> block to a given element
     * @param {D3Selection} element - The element that the text block should be written to
     */

  }, {
    key: "drawTextBlock",
    value: function drawTextBlock(element, anchor) {
      element.append("text").attr("text-anchor", anchor ? anchor : "middle");
    }
    /**
     * Draws a new line of text to a given element.
     * @param {D3Selection} element - D3 Selection of the element that the text should be drawn in.
     * @param {*} word - Text to be written
     * @param {*} type - Type of node
     * @param {*} y - Y position padding
     */

  }, {
    key: "drawTextline",
    value: function drawTextline(element, word, type, y) {
      element.append("tspan").attr("class", "node-text-".concat(type)).attr("x", 0).attr("y", y).text(word);
    }
    /**
     * Draws a badge in the top right corner of nodes with a number of a hidden edge count in it.
     * @param {D3Selecton} element - Node element selection by D3
     * @param {Object} data - Node data
     */

  }, {
    key: "drawNodeCollapsedEdgeCounter",
    value: function drawNodeCollapsedEdgeCounter(element, data) {
      var count = "".concat(data.hiddenEdgeCount);
      var textWidth = count.width();
      var fontSize = 14;
      var areaHeight = data.radius ? data.radius * 2 : data.height;
      var areaWidth = data.radius ? data.radius * 2 : data.width;
      var paddingX = 16;
      var paddingY = 16;
      var translateY = areaHeight / 2; //(make this number negative to switch between top and bottom quadrant)

      var translateX = areaWidth / 2;
      var rectHeight = fontSize + paddingY;
      var rectWidth = textWidth + paddingX;

      var rightTopRoundedRect = function rightTopRoundedRect(x, y, width, height, radius) {
        return "M".concat(x, ",").concat(y, "\n\t\t\t\th").concat(width - radius, "\n\t\t\t\tq").concat(radius, ",0 ").concat(radius, ",").concat(radius, "\n\t\t\t\tv").concat(height - 2 * radius, "\n\t\t\t\tq0,").concat(radius, " ").concat(-radius, ",").concat(radius, "\n\t\t\t\th").concat(radius * 2 - width, "\n\t\t\t\tq").concat(-radius, ",0 ").concat(-radius, ",").concat(-radius, "\n\t\t\t\tz");
      };

      element.append("g").attr("id", "badge-" + data.id + "-hidden-edge-counter").attr("style", "pointer-events:none;").attr("transform", "translate(".concat(translateX, " ").concat(translateY, ")")).append("path").attr("d", rightTopRoundedRect(-(rectWidth / 2), -(rectHeight / 2), rectWidth, rectHeight, 10)).attr("class", "nyang-node-edge-counter-badge").select(function () {
        return this.parentNode;
      }).append("text").attr("class", "nyang-node-edge-counter-badge-text").append("tspan").attr("style", "font-size:".concat(fontSize, ";")).text("".concat(count));
    }
    /**
     * Creates event listener for onClick events for nodes and edges
     */

  }, {
    key: "attachEntityClickListeners",
    value: function attachEntityClickListeners() {
      var _this11 = this;

      //We need to stop the click event if it is a double click event
      //We do this using a timeout that starts on click and cancels on double click.
      var timeout = null;
      this.rootG.selectAll(".node").on("click", function (d) {
        event.stopPropagation();
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          _this11.ee.trigger(EVENTS.CLICK_ENTITY, {
            id: d.id,
            data: d.data
          });
        }, Env.DOUBLE_CLICK_THRESHOLD);
      }).on("dblclick", function (d) {
        event.stopPropagation();
        clearTimeout(timeout);

        _this11.ee.trigger(EVENTS.DBL_CLICK_ENTITY, {
          id: d.id,
          data: d.data
        });
      }).on("contextmenu", function (d) {
        event.preventDefault();
        event.stopPropagation();

        _this11.ee.trigger(EVENTS.RIGHT_CLICK_ENTITY, d);
      });
      this.rootG.selectAll(".label .from").on("click", function (d) {
        event.stopPropagation();
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          _this11.ee.trigger(EVENTS.CLICK_ENTITY, {
            id: d.id,
            data: d.data,
            direction: "from"
          });
        }, Env.DOUBLE_CLICK_THRESHOLD);
      }).on("dblclick", function (d) {
        event.stopPropagation();

        _this11.ee.trigger(EVENTS.DBL_CLICK_ENTITY, {
          id: d.id,
          data: d.data,
          direction: "from"
        });
      }).on("contextmenu", function (d) {
        event.preventDefault();
        event.stopPropagation();

        _this11.ee.trigger(EVENTS.RIGHT_CLICK_ENTITY, d, "from");
      });
      this.rootG.selectAll(".label .to").on("click", function (d) {
        event.stopPropagation();
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          _this11.ee.trigger(EVENTS.CLICK_ENTITY, {
            id: d.id,
            data: d.data,
            direction: "to"
          });
        }, Env.DOUBLE_CLICK_THRESHOLD);
      }).on("dblclick", function (d) {
        event.stopPropagation();

        _this11.ee.trigger(EVENTS.DBL_CLICK_ENTITY, {
          id: d.id,
          data: d.data,
          direction: "from"
        });
      }).on("contextmenu", function (d) {
        event.preventDefault();
        event.stopPropagation();

        _this11.ee.trigger(EVENTS.RIGHT_CLICK_ENTITY, d, "to");
      });
    }
    /**
     * Handles what happens when an item is hovered
     * @param {object} hoveredData - Object that has been hovered
     * @param {"enter"|"exit"} eventType - What type of event it is.
     */

  }, {
    key: "handleHoverEvent",
    value: function handleHoverEvent(hoveredData, eventType) {
      this.ee.trigger(EVENTS.HOVER_ENTITY, {
        eventType,
        id: hoveredData.id,
        data: hoveredData.data
      });

      if (this.enableFadeOnHover) {
        if (!hoveredData.sourceNode) {
          var filteredEdges = this.edges.filter(function (edge) {
            return edge.sourceNode === hoveredData.id || edge.targetNode === hoveredData.id;
          });
          var validNodes = filteredEdges.reduce(function (acc, edge) {
            acc.push(edge.targetNode);
            acc.push(edge.sourceNode);
            return acc;
          }, []);
          validNodes.push(hoveredData.id);
          var opacity = eventType === "enter" ? "" + Env.DEFAULT_FADE_OPACITY : "" + 1;
          selectAll(".node").filter(function (d) {
            return validNodes.find(function (node) {
              return node === d.id;
            }) === undefined;
          }).transition().duration(Env.FADE_TIME).ease(easeLinear).style("opacity", opacity);
          selectAll(".edge").filter(function (d) {
            return filteredEdges.find(function (edge) {
              return edge.id === d.id;
            }) === undefined;
          }).transition().duration(Env.FADE_TIME).ease(easeLinear).style("opacity", opacity);
          selectAll(".label").filter(function (d) {
            return filteredEdges.find(function (edge) {
              return edge.id === d.id;
            }) === undefined;
          }).transition().duration(Env.FADE_TIME).ease(easeLinear).style("opacity", opacity);
        }
      }
    }
    /**
     * Animation tick
     */

  }, {
    key: "tick",
    value: function tick() {
      var _this12 = this;

      //Nodes
      this.nodeElements.attr("transform", function (node) {
        return "translate(" + node.x + "," + node.y + ")";
      }); //Edges

      this.edgePath.attr("d", function (l) {
        if (l.source.x === l.target.x && l.source.y === l.target.y && l.source.id !== l.target.id) {
          //The two nodes are at the exact same position
          return "";
        }

        if (l.source === l.target) {
          return MathUtil.calculateSelfEdgePath(l);
        }

        if (_this12.rotateLabels) {
          l.angle = MathUtil.calculateLabelAngle(l.source, l.target);
        }

        var pathStart = MathUtil.calculateIntersection(l.target, l.source, 1);
        var pathEnd = MathUtil.calculateIntersection(l.source, l.target, 1);
        var curvePoint = MathUtil.calculateCurvePoint(pathStart, pathEnd, l);
        l.curvePoint = curvePoint;
        return MathUtil.curveFunction([MathUtil.calculateIntersection(l.curvePoint, l.source, 1), curvePoint, MathUtil.calculateIntersection(l.curvePoint, l.target, 1)]);
      }); //Multiplicities

      this.activeMultiplicities.attr("transform", function (l) {
        var group = select(this);
        var pos;

        if (group.classed("to")) {
          pos = MathUtil.calculateIntersection(l.curvePoint, l.source, Env.MULTIPLICITY_HDISTANCE);
        } else {
          pos = MathUtil.calculateIntersection(l.curvePoint, l.target, Env.MULTIPLICITY_HDISTANCE);
        }

        var n = MathUtil.calculateNormalVector(l.curvePoint, l.source, Env.MULTIPLICITY_VDISTANCE);

        if (l.source.index < l.target.index) {
          n.x = -n.x;
          n.y = -n.y;
        }

        return "translate(" + (pos.x + n.x) + "," + (pos.y + n.y) + ")";
      }); //Labels

      this.labels.attr("transform", function (l) {
        if (l.source.x === l.target.x && l.source.y === l.target.y && l.source.id !== l.target.id) {
          return "";
        }

        var group = select(this);
        var midX = l.curvePoint.x;
        var midY = l.curvePoint.y;

        if (l.nameFrom) {
          if (group.classed("to")) {
            midY += Env.LABEL_HEIGHT / 2 + 1;
          } else if (group.classed("from")) {
            midY -= Env.LABEL_HEIGHT / 2 + 1;
          }
        }

        if (l.angle) {
          return "translate(" + midX + "," + midY + ") rotate(" + l.angle + ")";
        } else {
          return "translate(" + midX + "," + midY + ")";
        }
      });
    }
  }]);

  return DOMProcessor;
}();

/**
 * The UI class manages all different UI addons.
 */

var UI = /*#__PURE__*/function () {
  function UI(graphContainerElement, eventEmitter, styles, userDefinedOptions) {
    var _this = this;

    _classCallCheck(this, UI);

    this.graphContainerElement = graphContainerElement;
    this.style = styles;
    this.ee = eventEmitter;
    this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
      return _this.destroy();
    });
    this.zoomHandler = new ZoomHandler(this.graphContainerElement, this.ee, userDefinedOptions);
    this.contextMenu = new ContextMenu(this.graphContainerElement, this.ee, userDefinedOptions);
    this.tooltip = new Tooltip(this.graphContainerElement, this.ee);
    this.stylesID = ("A" + Math.random()).replace(".", "").replace(",", "");
    CSSUtil.initializeGraphStyles(this.style, this.stylesID);
    this.rootG = this.initializeDOM();
    this.highlighter = new Highlighter(this.graphContainerElement, this.ee, userDefinedOptions);
    this.grid = new Grid(this.graphContainerElement, this.ee, userDefinedOptions);
    this.DOMProcessor = new DOMProcessor(this.rootG, this.ee, userDefinedOptions);
  }

  _createClass(UI, [{
    key: "initializeDOM",
    value: function initializeDOM() {
      var _this2 = this;

      var rootG = select(this.graphContainerElement).insert("svg", "*").attr("class", "nyang").classed("svgGraph", true).attr("width", "100%").attr("height", "100%").on("click", function () {
        //Do not bubble the event
        event.stopPropagation();

        _this2.ee.trigger(EVENTS.CLICK_ENTITY, null);
      }).on("contextmenu", function () {
        event.preventDefault();
        event.stopPropagation();

        _this2.ee.trigger(EVENTS.RIGHT_CLICK_ENTITY, null);
      }).call(this.zoom).on("dblclick.zoom", null).append("g");
      rootG.append("defs");
      rootG.append("g").attr("id", "edge-container");
      rootG.append("g").attr("id", "label-container");
      rootG.append("g").attr("id", "multiplicity-container");
      rootG.append("g").attr("id", "node-container");
      return rootG;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.rootG.select("#edge-container").selectAll(".edge").remove();
      this.rootG.select("#multiplicity-container").selectAll(".multiplicity").remove();
      this.rootG.select("#node-container").selectAll(".node").remove();
      this.rootG.select("#label-container").selectAll(".label").remove();
      select(this.graphContainerElement).select("svg").remove();
      select("#".concat(this.stylesID)).remove();
    }
  }, {
    key: "zoom",
    get: function get() {
      return this.zoomHandler.zoom;
    }
  }, {
    key: "context",
    get: function get() {
      return this.contextMenu;
    }
  }, {
    key: "width",
    get: function get() {
      return this.graphContainerElement.offsetWidth;
    }
  }, {
    key: "height",
    get: function get() {
      return this.graphContainerElement.offsetHeight;
    }
  }]);

  return UI;
}();

/**
 * The Engine class is responsible for running the physics simulation of the graph.
 */

var Engine = /*#__PURE__*/function () {
  function Engine(forceCenterX, forceCenterY, eventEmitter) {
    var _this = this;

    _classCallCheck(this, Engine);

    this.ee = eventEmitter;
    this.ee.on(EVENTS.DOM_PROCESSOR_FINISHED, function (nodes, edges) {
      _this.updateSimulation(nodes, edges);

      _this.ee.trigger(EVENTS.ENGINE_UPDATE_FINISHED, nodes, edges);
    });
    this.ee.on(EVENTS.NODE_DRAG_START, function () {
      _this.stop();

      _this.target(0.5);
    });
    this.ee.on(EVENTS.NODE_DRAG_DRAGGED, function () {
      _this.restart();
    });
    this.ee.on(EVENTS.NODE_DRAG_ENDED, function () {
      _this.target(0);
    });
    this.ee.on(EVENTS.CLICK_ENTITY, function () {
      _this.alpha(0);
    });
    this.ee.on(EVENTS.NODE_FIXATION_REQUESTED, function () {
      _this.alpha(1);

      _this.restart();
    });
    this.ee.on(EVENTS.ENGINE_LAYOUT_REQUESTED, function (nodes, edges, attribute, filterFunction, sortFunction) {
      _this.createLayout(nodes, edges, attribute, filterFunction, sortFunction);
    });
    this.ee.on(EVENTS.ENGINE_LAYOUT_RESET_REQUESTED, function (nodes, edges) {
      _this.resetLayout(nodes, edges);

      _this.alpha(2);

      _this.restart();
    });
    this.ee.on(EVENTS.IMPLODE_EXPLODE_REQUESTED, function () {
      _this.alpha(0.5);

      _this.restart();
    });
    this.ee.on(EVENTS.IMPLODE_EXPLODE_LEAFS_REQUESTED, function () {
      _this.alpha(0.5);

      _this.restart();
    });
    this.ee.on(EVENTS.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, function () {
      _this.alpha(0.5);

      _this.restart();
    });
    this.ee.on(EVENTS.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, function () {
      _this.alpha(0.5);

      _this.restart();
    });
    this.ee.on(EVENTS.TOGGLE_MULTIPLICITY_REQUESTED, function () {
      _this.alpha(0.01);

      _this.restart();
    });
    this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
      return _this.stop();
    });
    this.forceCenterX = forceCenterX;
    this.forceCenterY = forceCenterY;
    this.simulation = this.initializeSimulation();
  }
  /**
   * Start the simulation engine
   */


  _createClass(Engine, [{
    key: "initializeSimulation",
    value: function initializeSimulation() {
      var _this2 = this;

      return forceSimulation().force("charge", forceManyBody().strength(Env.CHARGE)).force("center", forceCenter(this.forceCenterX, this.forceCenterY)).force("y", forceY(0).strength(Env.GRAVITY)).force("x", forceX(0).strength(Env.GRAVITY)).nodes([]).force("link", forceLink().links([]).distance(function (l) {
        return _this2.getEdgeDistance(l);
      }).strength(Env.EDGE_STRENGTH)).on("tick", function () {
        _this2.ee.trigger(EVENTS.ENGINE_TICK);
      });
    }
    /**
     * Update the simulation with a new data set
     * @param {object[]} nodes
     * @param {edges[]} edges
     */

  }, {
    key: "updateSimulation",
    value: function updateSimulation(nodes, edges) {
      var _this3 = this;

      this.simulation.nodes(nodes);
      this.simulation.force("link", forceLink().links(edges).distance(function (l) {
        return _this3.getEdgeDistance(l);
      }).strength(Env.EDGE_STRENGTH));
      this.simulation.alpha(1).restart();
    }
    /**
     * Stop the simulation
     */

  }, {
    key: "stop",
    value: function stop() {
      this.simulation.stop();
    }
    /**
     * Restart the simulation
     */

  }, {
    key: "restart",
    value: function restart() {
      this.simulation.restart();
    }
    /**
     * Set the current alpha value of the simulation
     * @param {number} target - Alpha value
     */

  }, {
    key: "alpha",
    value: function alpha(target) {
      this.simulation.alpha(target);
    }
    /**
     * Set the target alpha value for the simulation
     * @param {number} target - Alpha value
     */

  }, {
    key: "target",
    value: function target(_target) {
      this.simulation.alphaTarget(_target);
    }
    /**
     * Set the alpha decay value of the simulation.
     * @param {number} target - Alpha decay value
     */

  }, {
    key: "decay",
    value: function decay(target) {
      this.simulation.alphaDecay(target);
    }
    /**
     * Creates a force group layout and positions nodes in the different groups depending on given input.
     * @param {object[]} nodes - All nodes to be affected
     * @param {object[]} edges - All edges to be affected
     * @param {string} attribute - Attribute to be used to determine the group of a node
     * @param {Function} filterFunction - Optional filter function that can be used instead of the attribute. Should return a string that determines the group of the provided node.
     * @param {Function} sortFunction - Optional sort function that will determine the order of the groups in the layout. Starting from left to right, top to bottom.
     */

  }, {
    key: "createLayout",
    value: function createLayout(nodes, edges, attribute, filterFunction, sortFunction) {
      var _this4 = this;

      if (sortFunction) {
        nodes = nodes.sort(function (a, b) {
          return sortFunction(a, b);
        });
      }

      var allGroups;

      if (filterFunction) {
        allGroups = nodes.map(function (node) {
          return filterFunction(node.data);
        });
      } else {
        allGroups = nodes.map(function (node) {
          return node[attribute];
        });
      }

      var xGroups = _toConsumableArray(new Set(allGroups));

      var numberOfRowsAndColumns = Math.ceil(Math.sqrt(xGroups.length));
      var currentRow = 0;
      var currentColumn = 0;
      var matrix = xGroups.map(function () {
        if (currentColumn === numberOfRowsAndColumns) {
          currentColumn = 0;
          currentRow += 1;
        }

        currentColumn += 1;
        return [currentRow, currentColumn - 1];
      });
      var columnScale = scalePoint().domain(_toConsumableArray(Array(numberOfRowsAndColumns).keys())).range([30, 2000]);
      var rowScale = scalePoint().domain(_toConsumableArray(Array(numberOfRowsAndColumns).keys())).range([30, 2000]);
      this.simulation.force("x", forceX(function (d) {
        var value;

        if (filterFunction) {
          value = filterFunction(d.data);
        } else {
          value = d[attribute];
        }

        return columnScale(matrix[xGroups.indexOf(value)][1]);
      })).force("y", forceY(function (d) {
        var value;

        if (filterFunction) {
          value = filterFunction(d.data);
        } else {
          value = d[attribute];
        }

        return rowScale(matrix[xGroups.indexOf(value)][0]);
      })).force("link", forceLink().links(edges).distance(function (l) {
        return _this4.getEdgeDistance(l);
      }).strength(0)).force("charge", forceManyBody().strength(-800)).alpha(1).restart();
    }
    /**
     * Resets the force layout to its default mode and removes any existing groups.
     * @param {object[]} nodes - Nodes affected
     * @param {object[]} edges - Edges affected
     */

  }, {
    key: "resetLayout",
    value: function resetLayout(nodes, edges) {
      var _this5 = this;

      this.simulation.force("y", forceY(0).strength(Env.GRAVITY)).force("x", forceX(0).strength(Env.GRAVITY)).force("link", forceLink().links(edges).distance(function (l) {
        return _this5.getEdgeDistance(l);
      }).strength(Env.EDGE_STRENGTH)).force("charge", forceManyBody().strength(Env.CHARGE));
    }
    /**
     * Returns the distance (length) of the passed edge
     * @param {object} l - Edge
     */

  }, {
    key: "getEdgeDistance",
    value: function getEdgeDistance(l) {
      var targetRadius = l.target.radius !== undefined ? l.target.radius : 0;
      var sourceRadius = l.source.radius !== undefined ? l.source.radius : 0;
      var distance = targetRadius + sourceRadius;
      return distance + l.edgeDistance;
    }
  }]);

  return Engine;
}();

/**
 * The main graph class
 */

var NYANG = /*#__PURE__*/function () {
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
  function NYANG(graphContainerElement, inputData, options) {
    var _this = this;

    _classCallCheck(this, NYANG);

    /* Init user input */
    this._options = Object.assign.apply(Object, [{}].concat(options));
    this._style = inputData.style ? JSON.parse(JSON.stringify(inputData.style)) : {};
    /* Init EventEmitter */

    this._ee = new EventEmitter(); //If the user specified listeners in options then add them

    this._options.entityClickedListener && this._ee.on(EVENTS.CLICK_ENTITY, this._options.entityClickedListener);
    this._options.entityDoubleClickedListener && this._ee.on(EVENTS.DBL_CLICK_ENTITY, this._options.entityDoubleClickedListener);
    this._options.entityHoveredListener && this._ee.on(EVENTS.HOVER_ENTITY, this._options.entityHoveredListener);
    /* Init UI */

    this._UI = new UI(graphContainerElement, this._ee, this._style, options);
    /* Init Datastore */

    this._datastore = new Datastore(inputData.nodes, inputData.edges, this._ee, this._style, this._options);
    /* Init Engine */

    this._engine = new Engine(this._UI.width / 2, this._UI.height / 2, this._ee);
    /* Graph has mounted! */

    this._ee.on(EVENTS.GRAPH_HAS_MOUNTED, function () {
      _this._UI.zoomHandler.scaleTo(Env.INITIAL_SCALE);
    });

    this._ee.trigger(EVENTS.GRAPH_HAS_MOUNTED);
  }
  /**
   * Sets and applies new filters, overwriting any existing.
   * @param {object[]} filters
   * @return {void}
   */


  _createClass(NYANG, [{
    key: "setFilters",
    value: function setFilters(filters) {
      this._ee.trigger(EVENTS.DATA_FILTER_REQUESTED, filters);
    }
    /**
     * Returns all current filters.
     * @return {object[]} - The filters
     */

  }, {
    key: "getFilters",
    value: function getFilters() {
      return this._datastore.filters;
    }
    /**
     * Removes all current filters.
     * @return {void}
     */

  }, {
    key: "resetAllFilters",
    value: function resetAllFilters() {
      this._ee.trigger(EVENTS.DATA_FILTER_RESET_REQUESTED);
    }
    /**
     * Toggles multiplicity on and off in the graph.
     * @return {void}
     */

  }, {
    key: "toggleMultiplicity",
    value: function toggleMultiplicity() {
      this._ee.trigger(EVENTS.TOGGLE_MULTIPLICITY_REQUESTED);
    }
    /**
     * Highlights nodes in the graph based on input criteria.
     * @param {string} attribute - Attribute name to look for
     * @param {string} value - Value that the attribute should start with
     * @param {Function} filterFunction  - Optional filter function that can be used instead of an attribute. Should return true if the node is to be highlighted
     * @return {void}
     */

  }, {
    key: "highlight",
    value: function highlight(attribute, value, filterFunction) {
      if (attribute && value || filterFunction) {
        var nodesToHighlight = this._datastore.nodes.filter(function (node) {
          if (filterFunction) {
            return filterFunction(node.data);
          }

          return node[attribute].toUpperCase().includes(value.toUpperCase());
        });

        this._ee.trigger(EVENTS.HIGHLIGHT_NODE_REQUESTED, nodesToHighlight);
      } else {
        throw new Error("No attribute, value or filterfunction provided");
      }
    }
    /**
     * Disables (dims) nodes in the graph based on input criteria.
     * @param {string} attribute - Attribute name to look for
     * @param {string} value - Value that the attribute should start with
     * @param {Function} filterFunction  - Optional filter function that can be used instead of an attribute. Should return true if the node is to be disabled
     * @return {void}
     */

  }, {
    key: "disable",
    value: function disable(attribute, value, filterFunction) {
      if (attribute && value || filterFunction) {
        var nodesToDisable = this._datastore.nodes.filter(function (node) {
          if (filterFunction) {
            return filterFunction(node.data);
          }

          return node[attribute].toUpperCase().includes(value.toUpperCase());
        }).map(function (node) {
          return node.id;
        });

        this._ee.trigger(EVENTS.DISABLE_NODES_REQUESTED, nodesToDisable);
      } else {
        throw new Error("No attribute, value or filterfunction provided");
      }
    }
    /**
     * Resets the disabling of nodes set by the "disable" function.
     * @return {void}
     */

  }, {
    key: "clearDisable",
    value: function clearDisable() {
      this._ee.trigger(EVENTS.CLEAR_DISABLE_NODES_REQUESTED);
    }
    /**
     * Resets the zoom (Zoom to fit).
     * @return {void}
     */

  }, {
    key: "resetZoom",
    value: function resetZoom() {
      this._ee.trigger(EVENTS.ZOOM_REQUESTED, null, null, null);
    }
    /**
     * Zooms in on a specific node.
     * @param {string} nodeID - ID of the node to zoom to
     * @return {void}
     */

  }, {
    key: "zoomToNode",
    value: function zoomToNode(nodeID) {
      var node = this._datastore.nodes.find(function (node) {
        return node.id === nodeID;
      });

      if (node) {
        var width = this._UI.graphContainerElement.offsetWidth / 2;
        var height = this._UI.graphContainerElement.offsetHeight / 2;
        var scale = 1.5;
        var x = -node.x * scale + width;
        var y = -node.y * scale + height;

        this._ee.trigger(EVENTS.ZOOM_REQUESTED, x, y, scale);
      } else {
        throw new Error("No such node: " + nodeID);
      }
    }
    /**
     * Sets a matrix layout for the simulation.
     * @param {string} attribute - Property name on the nodes to group by
     * @param {Function} filterFunction  - Optional filter function that can be used instead of attribute. Should return a string that represents the group that the node belongs to.
     * @param {Function} sortFunction  - Optional sort function that will be applied to nodes before the layout is created. Use this to ensure correct positioning of groups on the screen
     * @return {void}
     */

  }, {
    key: "setMatrixLayout",
    value: function setMatrixLayout(attribute, filterFunction, sortFunction) {
      this._ee.trigger(EVENTS.ENGINE_LAYOUT_REQUESTED, this._datastore.nodes, this._datastore.edges, attribute, filterFunction, sortFunction);
    }
    /**
     * Resets the layout to the default mode.
     * @return {void}
     */

  }, {
    key: "resetLayout",
    value: function resetLayout() {
      this._ee.trigger(EVENTS.ENGINE_LAYOUT_RESET_REQUESTED, this._datastore.nodes, this._datastore.edges);
    }
    /**
     * Fixates a node to the center of the graph.
     * @param {string} nodeID - ID of the node to center
     * @return {void}
     */

  }, {
    key: "centerNode",
    value: function centerNode(nodeID) {
      var node = this._datastore.nodes.find(function (potentialNode) {
        return potentialNode.id === nodeID;
      });

      if (node) {
        var width = this._UI.rootG.node().getBBox().width / 4;
        var height = this._UI.rootG.node().getBBox().height / 4;

        this._ee.trigger(EVENTS.NODE_FIXATION_REQUESTED, node, width, height);
      }
    }
    /**
     * Implodes/explodes all nodes one step out from the provided node.
     * @param {string} nodeID - ID of the node
     * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
     * @return {void}
     */

  }, {
    key: "implodeOrExplodeNode",
    value: function implodeOrExplodeNode(nodeID, isImplode) {
      this._ee.trigger(EVENTS.IMPLODE_EXPLODE_REQUESTED, nodeID, isImplode);
    }
    /**
     * Implodes/explodes all leaf nodes one step out from the provided node. I.e. nodes that have no further connections.
     * @param {string} nodeID - ID of the node
     * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
     * @return {void}
     */

  }, {
    key: "implodeOrExplodeNodeLeafs",
    value: function implodeOrExplodeNodeLeafs(nodeID, isImplode) {
      this._ee.trigger(EVENTS.IMPLODE_EXPLODE_LEAFS_REQUESTED, nodeID, isImplode);
    }
    /**
     * Implodes/explodes all branching nodes from the provided node recursively.
     * @param {string} nodeID - ID of the node
     * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
     * @return {void}
     */

  }, {
    key: "implodeOrExplodeNodeRecursive",
    value: function implodeOrExplodeNodeRecursive(nodeID, isImplode) {
      this._ee.trigger(EVENTS.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, nodeID, isImplode);
    }
    /**
     * Implodes/explodes all branching nodes from the provided node recursively, but only ones that are not circular. I.e. branches that do not lead back to the provided node.
     * @param {string} nodeID - ID of the node
     * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
     * @return {void}
     */

  }, {
    key: "implodeOrExplodeNodeNonCircular",
    value: function implodeOrExplodeNodeNonCircular(nodeID, isImplode) {
      this._ee.trigger(EVENTS.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, nodeID, isImplode);
    }
    /**
     * Updates the data in the graph. This is commonly used for reflecting changes in the outer application
     * @param {object} newDataset - New data set
     * @return {void}
     */

  }, {
    key: "updateDataset",
    value: function updateDataset(newDataset) {
      this._ee.trigger(EVENTS.DATA_UPDATE_REQUESTED, newDataset.nodes, newDataset.edges);
    }
    /**
     * Exports the graph dataset into a JSON file that can be loaded into the graph at a later time
     * @param {boolean} includeOnlyLiveData - Should only live data be included in the export, or the entire dataset?
     */

  }, {
    key: "saveGraphAsJSON",
    value: function saveGraphAsJSON(includeOnlyLiveData) {
      if (!this._datastore.allNodes && !this._datastore.allEdges) {
        return;
      }

      var filename = "nyang.json";
      var data = {
        style: this._style,
        nodes: includeOnlyLiveData ? this._datastore.liveNodes : this._datastore.allNodes,
        edges: includeOnlyLiveData ? this._datastore.liveEdges : this._datastore.allEdges
      };
      var blob = new Blob([JSON.stringify(data, null, null)], {
        type: "text/json"
      });
      var aElement = document.createElement("a");
      aElement.download = filename;
      aElement.href = window.URL.createObjectURL(blob);
      aElement.dataset.downloadurl = ["text/json", aElement.download, aElement.href].join(":");
      aElement.click();
    }
    /**
     * Completely dismount and remove the graph
     * @return {void}
     */

  }, {
    key: "destroyGraph",
    value: function destroyGraph() {
      var _this2 = this;

      //All unmount listeners must be synchronous!!
      this._ee.trigger(EVENTS.GRAPH_WILL_UNMOUNT);

      Object.keys(this).forEach(function (key) {
        delete _this2[key];
      });
    }
  }]);

  return NYANG;
}();

export default NYANG;
