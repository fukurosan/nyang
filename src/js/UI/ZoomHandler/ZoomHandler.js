import * as d3 from "d3"
import Env from "../../Config/Env"
import EventEnum from "../../Events/EventEnum"

export default class ZoomHandler {
    constructor(graphContainerElement, eventEmitter, options) {
        this.graphContainerElement = graphContainerElement
        this.enableZoomButtons = options.enableZoomButtons !== undefined ? options.enableZoomButtons : Env.ENABLE_ZOOM_BUTTONS
        this.ee = eventEmitter
        this.ee.on(EventEnum.ZOOM_REQUESTED, (x, y, scale) => { this.handleZoomRequest(x, y, scale) })
        this.zoom = d3.zoom()
            .scaleExtent(Env.SCALE_EXTENT)
            .on("zoom", () => {
                const rootG = d3.select(this.graphContainerElement).select("g")
                rootG.attr("transform", d3.event.transform)
            })
        if (this.enableZoomButtons) {
            this.initializeZoomButtons()
        }
    }

    initializeZoomButtons() {
        const zoomButtons = d3.select(this.graphContainerElement)
            .append("div")
            .attr("style", "position:relative;")
            .append("svg")
            .attr("style", "position:absolute;height:60px;width:30px;right:15px;bottom:15px;")
            .append("g")
            .attr("class", "NYANG-zoom-controls")
            .attr("style", "cursor:pointer;")

        zoomButtons
            .append("g")
            .on('click', () => {
                this.scaleBy(1.5);
            })
            .attr("class", "NYANG-zoom-in")
            .attr("transform", "translate(0, 0)")
            .append("rect")
            .attr("style", "fill: white;stroke: #596877;stroke-width:1;")
            .attr("width", "30")
            .attr("height", "30")
            .select(function () {
                return this.parentNode;
            })
            .append("line")
            .attr("style", "stroke: #596877;stroke-width: 2;")
            .attr("x1", "5")
            .attr("y1", "15")
            .attr("x2", "25")
            .attr("y2", "15")
            .select(function () {
                return this.parentNode;
            })
            .append("line")
            .attr("style", "stroke: #596877;stroke-width: 2;")
            .attr("x1", "15")
            .attr("y1", "5")
            .attr("x2", "15")
            .attr("y2", "25")

        zoomButtons
            .append("g")
            .on('click', () => {
                this.scaleBy(1 / 1.5);
            })
            .attr("class", "NYANG-zoom-out")
            .attr("transform", "translate(0, 30)")
            .append("rect")
            .attr("style", "fill: white;stroke: #596877;stroke-width: 1;")
            .attr("width", "30")
            .attr("height", "30")
            .select(function () {
                return this.parentNode;
            })
            .append("line")
            .attr("style", "stroke: #596877;stroke-width: 2;")
            .attr("x1", "5")
            .attr("y1", "15")
            .attr("x2", "25")
            .attr("y2", "15")
    }

    scaleTo(scale) {
        this.zoom.scaleTo(d3.select(this.graphContainerElement).select("svg"), scale)
    }

    scaleBy(ratio) {
        this.zoom.scaleBy(d3.select(this.graphContainerElement).select("svg").transition().duration(Env.ZOOM_TIME / 2), ratio);
    }

    /* This function resets the zoom to the initial position */
    resetZoom() {
        //TODO: This is broken. If the SVG changes shape this will fail to center the group correctly.
        //It works so-so, though. The group will at the very least have the correct scale.
        const rootG = d3.select(this.graphContainerElement).select("g")
        const currentTransformStr = rootG.attr("transform")
        let currentScale = currentTransformStr.substring(currentTransformStr.indexOf("scale(") + 6, currentTransformStr.lastIndexOf(")"))
        currentScale = parseFloat(currentScale)

        const width = this.graphContainerElement.offsetWidth
        const height = this.graphContainerElement.offsetHeight

        const groupWidth = rootG.node().getBBox().width * currentScale
        const groupHeight = rootG.node().getBBox().height * currentScale
        const widthRatio = width / groupWidth
        const heightRatio = height / groupHeight
        const ratio = Math.min(widthRatio, heightRatio)

        d3.select(this.graphContainerElement)
            .select("svg")
            .transition()
            .duration(Env.ZOOM_TIME / 2)
            .call(this.zoom.scaleBy, ratio)
            .transition()
            .call(this.zoom.translateTo, width / 2, height / 2)
    }

    /* This function transforms the svg>g element to a specific translation and scale */
    zoomToCoordinates(x, y, scale) {
        d3.select(this.graphContainerElement)
            .select("svg")
            .transition()
            .duration(Env.ZOOM_TIME)
            .call(this.zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale))
            .select("g")
            .attr("transform", `translate(${x},${y})scale(${scale})`)
    }

    handleZoomRequest(x, y, scale) {
        if ((x || x === 0) && (y || y === 0) && scale) {
            this.zoomToCoordinates(x, y, scale)
        }
        else {
            this.resetZoom()
        }
    }
}
