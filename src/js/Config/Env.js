/**
 * Default configuration for NYANG
 */
export default Object.freeze({
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
	DOUBLE_CLICK_THRESHOLD: 300, //ms
	FADE_TIME: 300, //ms
	ZOOM_TIME: 1000, //ms
	HIGHLIGHT_TIME: 1000, //ms
	HIGHLIGHT_TIME_REMOVE: 1000, //ms
	IMPLOSION_EXPLOSION_ANIMATION_TIME: 200, //ms

	//Force Layout
	EDGE_STRENGTH: 0.7,
	GRAVITY: 0.06,
	CHARGE: -2000,
	SCALE_EXTENT: [0.1, 4],
	INITIAL_SCALE: 0.3
})
