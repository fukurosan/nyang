import Env from "../Config/Env.js"

/**
 * Writes user defined styles as CSS classes to the DOM dynamically.
 * @param {object} style - User provided styles parameters
 * @param {string} id - ID of the UI-class of this NYANG instance
 */
const initializeGraphStyles = (style, id) => {
	let cssString = ""
	cssString = /*css*/ `
                /* Global Transitions */
                .nyang * {
                    transition: fill 0.1s, opacity 0.1s;
                }

                /* Text */
                .nyang .multiplicity {
                    font-size: ${Env.DEFAULT_MULTIPLICITY_FONT_SIZE};
                }     

                /* Tooltip */
                #nyang-tooltip {
                  position: absolute;
                  display: none;
                  min-width: ${Env.TOOLTIP_MIN_WIDTH};
                  background: ${Env.TOOLTIP_BACKGROUND};
                  opacity: 0.8;
                  color: ${Env.TOOLTIP_COLOR};
                  padding: 10px;
                  text-align: center;
                  max-width: ${Env.TOOLTIP_MAX_WIDTH};
                  word-wrap: break-word;
                  font-size: 14px;
                  border-radius: ${Env.TOOLTIP_BORDER_RADIUS};
                }

                /* Context Menu Styles */
                /* This is a rule for all paths unless specified otherwise */
                .nyang path {
                  stroke: #000;
                  stroke-width: 2px;
                }
                
                .nyang-context-menu {
                  box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);
                  position: relative;
                  display: block;
                  background: #FFFFFF;
                }
                
                .nyang-context-menu-options {
                  min-width: 150px;
                  list-style: none;
                  padding: 0px;
                  margin-top: 10px;
                  margin-bottom: 10px;
                }
                
                .nyang-context-menu-option {
                  font-size: 14px;
                  padding: 7px 20px 7px 20px;
                  cursor: pointer;
                }
                
                .nyang-context-menu-divider {
                  width: 90%;
                  height: 1px;
                  margin-right: 5%;
                  margin-left: 5%;
                  margin-top: 8px;
                  margin-bottom: 8px;
                  background: #d5d5d5;
                }
                
                .nyang-context-menu-option:hover {
                  background: rgba(0, 0, 0, 0.2);
                }
                
                .nyang-node-badge {
                  fill: #505759;
                  stroke: none !important;
                }
                
                .nyang-node-edge-counter-badge-text {
                  dominant-baseline: central;
                  text-anchor: middle;
                  fill: white;
                }
                
                /* Search Highlighting */
                .nyang .highlighted-node {
                  stroke-width: ${Env.HIGHLIGHTING_BORDER_WIDTH};
                  stroke: ${Env.HIGHLIGHTING_BORDER_COLOR};
                  fill: ${Env.HIGHLIGHTING_COLOR};
                  opacity: 0.3;
                  pointer-events: none;
                }

                .nyang .disabled {
                    opacity: ${Env.DEFAULT_FADE_OPACITY};
                    pointer-events: none;
                }

                /* Default edge style */
                .edge-path-default{
                    fill: none;
                    stroke-width: ${Env.DEFAULT_STROKE_WIDTH} !important;
                    stroke-dasharray: ${Env.DEFAULT_EDGE_DASHARRAY} !important;
                    stroke: ${Env.DEFAULT_EDGE_COLOR} !important;
                }
                .edge-path-default.hovered{
                    stroke: ${Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR} !important;
                }
                .edge-path-default.focused{
                    stroke: ${Env.DEFAULT_FOCUS_COLOR} !important;
                }
                
                .label-rect-default{
                    cursor: pointer;
                    fill: ${Env.DEFAULT_LABEL_BACKGROUND_COLOR};
                    rx: ${Env.DEFAULT_LABEL_BORDER_RADIUS_X};
                    ry: ${Env.DEFAULT_LABEL_BORDER_RADIUS_Y};
                    stroke: ${Env.DEFAULT_LABEL_BORDER_COLOR} !important;
                    stroke-width: ${Env.DEFAULT_LABEL_BORDER_WIDTH} !important; 
                }
                .label-rect-default:hover{
                    fill: ${Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR};
                    cursor: pointer;
                }
                .label g .label-rect-default.focused {
                    stroke-width: ${Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH} !important;
                    stroke: ${Env.DEFAULT_FOCUS_COLOR} !important;
                }

                .label-text-default{
                    fill: ${Env.DEFAULT_LABEL_TEXT_COLOR};
                    dominant-baseline: central;
                    pointer-events: none;
                    font-family: ${Env.DEFAULT_FONT_FAMILY};
                    font-size: ${Env.DEFAULT_FONT_SIZE};
                }
                .to:hover .label-text-default,
                .from:hover .label-text-default{
                    fill: ${Env.DEFAULT_LABEL_TEXT_HOVER_COLOR}
                }
                
                .marker-default path{
                    fill: ${Env.DEFAULT_EDGE_COLOR};
                }
                .marker-default path.hovered{
                    stroke: ${Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR} !important;
                    fill: ${Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR} !important;
                    cursor: pointer;
                }
                .marker-default path.focused{
                    fill: ${Env.DEFAULT_FOCUS_COLOR} !important;
                    stroke: ${Env.DEFAULT_FOCUS_COLOR} !important;
                }

                .node, .edge, .multiplicity {
                    animation: fadeInFromNone 0.2s ease-out;
                }

                @keyframes fadeInFromNone {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }

                /* Default node values */
                .node-default {
                    cursor: pointer;
                    stroke-width: ${Env.DEFAULT_STROKE_WIDTH};
                    stroke: ${Env.DEFAULT_NODE_STROKE_COLOR};
                    fill: ${Env.DEFAULT_NODE_COLOR};
                    stroke-dasharray: 0;
                    rx: ${Env.DEFAULT_NODE_BORDER_RADIUS_X};
                    ry: ${Env.DEFAULT_NODE_BORDER_RADIUS_Y};
                }
                .node-default:hover {
                    fill: ${Env.DEFAULT_NODE_HOVER_COLOR};
                }
                .node-text-default {
                    dominant-baseline: hanging;
                    pointer-events: none;
                    font-family: ${Env.DEFAULT_FONT_FAMILY};
                    font-size: ${Env.DEFAULT_FONT_SIZE};
                    fill: ${Env.DEFAULT_NODE_TEXT_COLOR};
                }
                .node:hover .node-text-default {
                    fill: ${Env.DEFAULT_NODE_TEXT_HOVER_COLOR};
                }
                .nyang .node-default.focused {
                    stroke: ${Env.DEFAULT_FOCUS_COLOR} !important;
                    stroke-width: ${Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH} !important;
                }
                `

	if (style && style.nodes) {
		style.nodes.forEach(nodeType => {
			cssString = `
                ${cssString}
                .node-${nodeType.id} {
                    cursor: pointer;
                    ${nodeType.borderWidth ? `stroke-width:${nodeType.borderWidth};` : ""}
                    ${nodeType.borderColor ? `stroke:${nodeType.borderColor};` : ""}
                    ${nodeType.backgroundColor ? `fill:${nodeType.backgroundColor};` : ""}
                    ${nodeType.dotted ? `stroke-dasharray:${Env.DEFAULT_NODE_DOTTED_DASHARRAY};` : ""}
                    ${nodeType.borderRadiusX ? `rx:${nodeType.borderRadiusX};` : ""}
                    ${nodeType.borderRadiusY ? `ry:${nodeType.borderRadiusY};` : ""}
                    ${nodeType.filter ? `filter:${nodeType.filter};` : ""}
                }
                .node-${nodeType.id}:hover {
                    ${nodeType.borderHoverWidth ? `stroke-width:${nodeType.borderHoverWidth};` : ""}
                    ${nodeType.borderHoverColor ? `stroke:${nodeType.borderHoverColor};` : ""}
                    ${nodeType.backgroundHoverColor ? `fill:${nodeType.backgroundHoverColor};` : ""}
                    ${nodeType.hoverFilter ? `filter:${nodeType.hoverFilter};` : ""}                    
                }
                .node-text-${nodeType.id} {
                    font-family: ${Env.DEFAULT_FONT_FAMILY};
                    font-size: ${Env.DEFAULT_FONT_SIZE};
                    dominant-baseline: hanging;
                    pointer-events: none;
                    ${nodeType.textColor ? `fill:${nodeType.textColor};` : ""};
                }
                .node:hover .node-text-${nodeType.id} {
                    ${nodeType.textHoverColor ? `fill:${nodeType.textHoverColor};` : ""}
                }
                .nyang .node-${nodeType.id}.focused {
                    ${nodeType.borderFocusedWidth ? `stroke-width:${nodeType.borderFocusedWidth};` : ""}
                    ${nodeType.borderFocusedColor ? `stroke:${nodeType.borderFocusedColor} !important` : ""}
                    ${nodeType.backgroundFocusedColor ? `fill:${nodeType.backgroundFocusedColor};` : ""}
                    ${nodeType.focusedFilter ? `filter:${nodeType.focusedFilter} !important;` : ""}
                }
                .nyang .node-${nodeType.id}.focused .node-text-${nodeType.id} {
                    ${nodeType.textFocusedColor ? `fill:${nodeType.textFocusedColor};` : ""}
                }
                `
		})
	}

	if (style && style.edges) {
		style.edges.forEach(edgeType => {
			cssString = `
                ${cssString}
                .edge-path-${edgeType.id}{
                    fill: none !important;
                    stroke-width: ${Env.DEFAULT_STROKE_WIDTH} !important;
                    stroke-dasharray: ${edgeType.dotted ? Env.DEFAULT_EDGE_DOTTED_DASHARRAY : Env.DEFAULT_EDGE_DASHARRAY} !important;
                    ${edgeType.color ? `stroke:${edgeType.color} !important;` : ""}
                }
                .edge-path-${edgeType.id}.hovered{
                    ${edgeType.hoverColor ? `stroke:${edgeType.hoverColor} !important;` : ""}
                }
                .edge-path-${edgeType.id}.focused{
                    ${edgeType.focusedColor ? `stroke:${edgeType.focusedColor} !important;` : ""}
                } 
                .label-rect-${edgeType.id}{
                    cursor: pointer;
                    ${edgeType.labelBackgroundColor ? `fill:${edgeType.labelBackgroundColor};` : ""}
                    ${edgeType.borderRadiusX ? `rx:${edgeType.borderRadiusX};` : ""}
                    ${edgeType.borderRadiusY ? `ry:${edgeType.borderRadiusY};` : ""}
                    ${edgeType.labelBorderColor ? `stroke:${edgeType.labelBorderColor};` : ""}
                    ${edgeType.labelBorderWidth ? `stroke-width: ${edgeType.labelBorderWidth};` : ""} 
                    ${edgeType.filter ? `filter:${edgeType.filter};` : ""}
                }
                .label-rect-${edgeType.id}:hover{
                    ${edgeType.hoverColor ? `fill:${edgeType.hoverColor};` : ""}
                    ${edgeType.labelHoverBorderColor ? `stroke:${edgeType.labelHoverBorderColor} !important;` : ""}
                    ${edgeType.labelHoverBorderWidth ? `stroke-width:${edgeType.labelHoverBorderWidth} !important;` : ""}
                    ${edgeType.hoverFilter ? `filter:${edgeType.hoverFilter};` : ""}
                }
                .label g .label-rect-${edgeType.id}.focused {
                    ${edgeType.labelFocusedBorderWidth ? `stroke-width:${edgeType.labelFocusedBorderWidth} !important;` : ""}
                    ${edgeType.focusedColor ? `stroke:${edgeType.focusedColor};` : ""}
                    ${edgeType.focusedFilter ? `filter:${edgeType.focusedFilter} !important;` : ""}
                    ${edgeType.labelFocusedBorderColor ? `stroke:${edgeType.labelFocusedBorderColor} !important;` : ""}
                }
                .label-text-${edgeType.id}{
                    ${edgeType.labelTextColor ? `fill:${edgeType.labelTextColor};` : ""};
                    dominant-baseline: central;
                    pointer-events: none;
                    font-family: ${Env.DEFAULT_FONT_FAMILY};
                    font-size: ${Env.DEFAULT_FONT_SIZE};
                }
                .to:hover .label-text-${edgeType.id},
                .from:hover .label-text-${edgeType.id}{
                    ${edgeType.labelTextHoverColor ? `fill:${edgeType.labelTextHoverColor};` : ""}
                }
                .marker-${edgeType.id} path.hovered{
                    ${edgeType.hoverColor ? `stroke:${edgeType.hoverColor};` : ""}
                    ${edgeType.hoverColor ? `fill:${edgeType.hoverColor};` : ""}
                    cursor: pointer;
                }
                .marker-${edgeType.id} path{
                    ${edgeType.arrowColor ? `fill:${edgeType.arrowColor};` : ""}
                }
                .marker-${edgeType.id} path.focused{
                    ${edgeType.focusedColor ? `fill:${edgeType.focusedColor};` : ""}
                    ${edgeType.focusedColor ? `stroke:${edgeType.focusedColor};` : ""}
                }
                `
		})
	}

	const css = document.createElement("style")
	css.type = "text/css"
	css.id = id
	css.appendChild(document.createTextNode(cssString))
	document.getElementsByTagName("head")[0].appendChild(css)
}

const tween = (element, property, initialValue, target, startTime, animationTime, setter) => {
	const deltaTime = Date.now() - startTime
	if (deltaTime > animationTime) {
		element.style.removeProperty(property)
		return
	}
	const percentOfAnimation = deltaTime / animationTime
	const tweenedValue = initialValue + (target - initialValue) * percentOfAnimation
	const newValue = setter ? setter(tweenedValue) : tweenedValue
	element.style[property] = newValue
	setTimeout(() => tween(element, property, initialValue, target, startTime, animationTime, setter), 1)
}

export default {
	initializeGraphStyles,
	tween
}
