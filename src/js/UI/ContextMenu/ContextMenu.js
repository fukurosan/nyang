import * as d3 from "d3"
import EventEnum from "../../Events/EventEnum"
import Env from "../../Config/Env"

export default class ContextMenu {
    constructor(graphContainerElement, eventEmitter, options) {
        this.enableContextMenu = options.enableContextMenu !== undefined ? options.enableContextMenu : Env.SHOW_CONTEXT_MENU
        this.customContextMenuAddons = options.customContextMenuAddons !== undefined ? options.customContextMenuAddons : Env.DEFAULT_CUSTOM_CONTEXT_MENU
        this.graphContainerElement = graphContainerElement
        this.ee = eventEmitter
        if (this.enableContextMenu) {
            this.ee.on(EventEnum.RIGHT_CLICK_ENTITY, (clickedItem, direction = null) => { this.buildMenu(clickedItem, direction) })
            this.ee.on(EventEnum.CLICK_ENTITY, () => { this.removeContextmenu() })
            this.ee.on(EventEnum.GRAPH_WILL_UNMOUNT, () => this.removeContextmenu())
        }
        this.InitializeMenuSections()
    }

    buildMenu(item, direction) {
        const coordinates = d3.mouse(document.body)
        const mouseX = coordinates[0]
        const mouseY = coordinates[1]
        if (item === null) {
            this.createCanvasContextMenu(null, mouseX, mouseY)
        }
        else if (!direction) {
            this.createNodeContextMenu(item, mouseX, mouseY)
        }
        else {
            this.createEdgeContextMenu(item, mouseX, mouseY, direction)
        }
    }

    /* This function creates a custom floating menu on the screen (primarily used for right clicking) */
    createContextMenu(clickedItem, contextSectionsArray, mouseX, mouseY) {
        //Remove any old context menu
        this.removeContextmenu()

        //Create a new menu
        const ulElement = d3.select(this.graphContainerElement)
            .append("div")
            .attr("id", "NYANG-context-menu-container")
            .attr("class", "NYANG-context-menu")
            .style('position', 'fixed')
            .style('left', mouseX + "px")
            .style('top', mouseY + "px")
            .style('display', 'block')
            .append("ul")
            .attr("class", "NYANG-context-menu-options")

        //Fill the menu with all provided sections
        contextSectionsArray.forEach((section, index) => {
            if (index !== 0) {
                ulElement.append("li")
                    .append("div")
                    .attr("class", "NYANG-context-menu-divider")
            }
            section.forEach(menuItem => {
                ulElement.append("li")
                    .append("div")
                    .attr("class", "NYANG-context-menu-option")
                    .text(() => menuItem.label)
                    .on("click", () => {
                        this.removeContextmenu()
                        const data = clickedItem && clickedItem.data || null
                        const id = clickedItem && clickedItem.id || null
                        return menuItem.action(data, id)
                    })
            })
        })
    }

    createNodeContextMenu(clickedItem, mouseX, mouseY) {
        const sections = [
            this.NodeMenu,
            this.UniversalMenu
        ]
        if (this.customContextMenuAddons.node) {
            this.customContextMenuAddons.node.forEach(sec => {
                sections.push(sec)
            })
        }
        this.createContextMenu(clickedItem, sections, mouseX, mouseY)
    }

    createEdgeContextMenu(clickedItem, mouseX, mouseY) {
        const sections = [
            this.EdgeMenu,
            this.UniversalMenu
        ]
        if (this.customContextMenuAddons.edge) {
            this.customContextMenuAddons.edge.forEach(sec => {
                sections.push(sec)
            })
        }
        this.createContextMenu(clickedItem, sections, mouseX, mouseY)
    }

    createCanvasContextMenu(clickedItem, mouseX, mouseY) {
        const sections = [
            this.UniversalMenu
        ]
        if (this.customContextMenuAddons.canvas) {
            this.customContextMenuAddons.canvas.forEach(sec => {
                sections.push(sec)
            })
        }
        this.createContextMenu(clickedItem, sections, mouseX, mouseY)
    }

    /* This function removes the current floating menu */
    removeContextmenu() {
        d3.select(this.graphContainerElement)
            .select("#NYANG-context-menu-container")
            .remove()
    }

    InitializeMenuSections() {
        this.NodeMenu = [
            {
                label: "Select Node",
                action: (data, id) => {
                    this.ee.trigger(EventEnum.CLICK_ENTITY, {
                        id: id,
                        data: data,
                    })
                }
            }
        ]

        this.EdgeMenu = [
            {
                label: "Select Edge",
                action: (data, id) => {
                    this.ee.trigger(EventEnum.CLICK_ENTITY, {
                        id: id,
                        data: data,
                        direction: "from"
                    })
                }
            }
        ]

        this.UniversalMenu = [
            {
                label: "Reset Zoom",
                action: () => {
                    this.ee.trigger(EventEnum.ZOOM_REQUESTED)
                }
            }
        ]
    }

}