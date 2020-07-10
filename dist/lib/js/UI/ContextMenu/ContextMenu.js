"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _EventEnum = _interopRequireDefault(require("../../Events/EventEnum"));

var _Env = _interopRequireDefault(require("../../Config/Env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class ContextMenu {
  constructor(graphContainerElement, eventEmitter, options) {
    var _this = this;

    this.enableContextMenu = options.enableContextMenu !== undefined ? options.enableContextMenu : _Env.default.SHOW_CONTEXT_MENU;
    this.customContextMenuAddons = options.customContextMenuAddons !== undefined ? options.customContextMenuAddons : _Env.default.DEFAULT_CUSTOM_CONTEXT_MENU;
    this.graphContainerElement = graphContainerElement;
    this.ee = eventEmitter;

    if (this.enableContextMenu) {
      this.ee.on(_EventEnum.default.RIGHT_CLICK_ENTITY, function (clickedItem) {
        let direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _this.buildMenu(clickedItem, direction);
      });
      this.ee.on(_EventEnum.default.CLICK_ENTITY, () => {
        this.removeContextmenu();
      });
      this.ee.on(_EventEnum.default.GRAPH_WILL_UNMOUNT, () => this.removeContextmenu());
    }

    this.InitializeMenuSections();
  }

  buildMenu(item, direction) {
    const coordinates = d3.mouse(document.body);
    const mouseX = coordinates[0];
    const mouseY = coordinates[1];

    if (item === null) {
      this.createCanvasContextMenu(null, mouseX, mouseY);
    } else if (!direction) {
      this.createNodeContextMenu(item, mouseX, mouseY);
    } else {
      this.createEdgeContextMenu(item, mouseX, mouseY, direction);
    }
  }
  /* This function creates a custom floating menu on the screen (primarily used for right clicking) */


  createContextMenu(clickedItem, contextSectionsArray, mouseX, mouseY) {
    //Remove any old context menu
    this.removeContextmenu(); //Create a new menu

    const ulElement = d3.select(this.graphContainerElement).append("div").attr("id", "NYANG-context-menu-container").attr("class", "NYANG-context-menu").style('position', 'fixed').style('left', mouseX + "px").style('top', mouseY + "px").style('display', 'block').append("ul").attr("class", "NYANG-context-menu-options"); //Fill the menu with all provided sections

    contextSectionsArray.forEach((section, index) => {
      if (index !== 0) {
        ulElement.append("li").append("div").attr("class", "NYANG-context-menu-divider");
      }

      section.forEach(menuItem => {
        ulElement.append("li").append("div").attr("class", "NYANG-context-menu-option").text(() => menuItem.label).on("click", () => {
          this.removeContextmenu();
          const data = clickedItem && clickedItem.data || null;
          const id = clickedItem && clickedItem.id || null;
          return menuItem.action(data, id);
        });
      });
    });
  }

  createNodeContextMenu(clickedItem, mouseX, mouseY) {
    const sections = [this.NodeMenu, this.UniversalMenu];

    if (this.customContextMenuAddons.node) {
      this.customContextMenuAddons.node.forEach(sec => {
        sections.push(sec);
      });
    }

    this.createContextMenu(clickedItem, sections, mouseX, mouseY);
  }

  createEdgeContextMenu(clickedItem, mouseX, mouseY) {
    const sections = [this.EdgeMenu, this.UniversalMenu];

    if (this.customContextMenuAddons.edge) {
      this.customContextMenuAddons.edge.forEach(sec => {
        sections.push(sec);
      });
    }

    this.createContextMenu(clickedItem, sections, mouseX, mouseY);
  }

  createCanvasContextMenu(clickedItem, mouseX, mouseY) {
    const sections = [this.UniversalMenu];

    if (this.customContextMenuAddons.canvas) {
      this.customContextMenuAddons.canvas.forEach(sec => {
        sections.push(sec);
      });
    }

    this.createContextMenu(clickedItem, sections, mouseX, mouseY);
  }
  /* This function removes the current floating menu */


  removeContextmenu() {
    d3.select(this.graphContainerElement).select("#NYANG-context-menu-container").remove();
  }

  InitializeMenuSections() {
    this.NodeMenu = [{
      label: "Select Node",
      action: (data, id) => {
        this.ee.trigger(_EventEnum.default.CLICK_ENTITY, {
          id: id,
          data: data
        });
      }
    }];
    this.EdgeMenu = [{
      label: "Select Edge",
      action: (data, id) => {
        this.ee.trigger(_EventEnum.default.CLICK_ENTITY, {
          id: id,
          data: data,
          direction: "from"
        });
      }
    }];
    this.UniversalMenu = [{
      label: "Reset Zoom",
      action: () => {
        this.ee.trigger(_EventEnum.default.ZOOM_REQUESTED);
      }
    }];
  }

}

exports.default = ContextMenu;