declare namespace _default {
    export { calculateCurvePoint };
    export { calculateIntersection };
    export { calculateMultiEdgeDistance };
    export { calculateNormalVector };
    export { calculateRadian };
    export { curveFunction };
    export { loopFunction };
    export { calculateSelfEdgePath };
    export { calculateLabelAngle };
}
export default _default;
/**
 * Calculates a point between two points for creating a curved line.
 * @param {object} source - Point where the source node is intersected by the edge
 * @param {object} target - Point where the target node is intersected by the edge
 * @param {object} l - Edge itself
 */
declare function calculateCurvePoint(source: object, target: object, l: object): {
    x: any;
    y: any;
};
/**
 * Calculates the point where the edge between the source and target node intersects the border of the target node.
 * @param {object} source - source node of the edge
 * @param {object} target - target node of the edge
 * @param {number} additionalDistance - additional distance, or what is essentially a padding.
 */
declare function calculateIntersection(source: object, target: object, additionalDistance: number): {
    x: any;
    y: any;
};
/**
 * Calculate the optimal Multi Edge distance. This is typically used to ensure edges don't overlap.
 * @param {object} l - Edge to be evaluated
 */
declare function calculateMultiEdgeDistance(l: object): number;
/**
 * Calculates the normal vector between two points.
 * @param {object} source - Source point
 * @param {object} target - Target point
 * @param {number} length - Distance
 */
declare function calculateNormalVector(source: object, target: object, length: number): {
    x: number;
    y: number;
};
/**
 * Calculates the radian of an angle.
 * @param {number} angle
 */
declare function calculateRadian(angle: number): number;
/**
 * Creates a D3 curve function.
 */
declare const curveFunction: any;
/**
 * Creates a d3 loop function.
 */
declare const loopFunction: any;
/**
 * Calculates edges to its input and stores the point for the labels. Only for circle shaped nodes!
 * @param {object} l - Edge to be processed
 */
declare function calculateSelfEdgePath(l: object): any;
/**
 * Calculates the angle for a label in the graph
 * @param {number} point1 - First vector of the edge
 * @param {number} point2 - Second vector of the edge
 */
declare function calculateLabelAngle(point1: number, point2: number): number;
