import React from "react";
import {
  getBezierPath,
  getEdgeCenter,
  getSmoothStepPath,
  getMarkerEnd,
} from "react-flow-renderer";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const foreignObjectSize = 40;

//creating a custom edge
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {stroke:"red"},
  data,
  arrowHeadType,
  markerEndId,
}) => {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  //edge delete function
 

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />

      <foreignObject
        width={foreignObjectSize + 100}
        height={foreignObjectSize + 100}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <body>
          <div>
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => data?.setDeleteEdgeId(id)}
              style={{
                height: "auto",
                width: "12px",
                color: "#ffff",
                padding: "5px",
                borderRadius: "50%",
                backgroundColor: "#ff4d4d",
              }}
            />
            <div>{data?.label}</div>
          </div>
        </body>
      </foreignObject>
    </>
  );
}

export default CustomEdge;