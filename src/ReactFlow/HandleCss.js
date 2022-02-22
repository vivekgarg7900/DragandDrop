import React from "react";

const HandleCss = ({ nodeWidth = 200, nodeHeight = 30, handles: slices = 0 }) => {
    const RADIUS = nodeHeight / 2;
    const PADDING = 20;

    const svgPaths = Array(slices)?.fill('')?.map((handle, index) => {
        // const fromAngle = (index * 180) / slices;
        // const toAngle = ((index + 1) * 180) / slices;

        // const fromCoordX = nodeWidth + RADIUS * Math.cos((fromAngle * Math.PI) / 180);
        // const fromCoordY = nodeHeight + RADIUS * Math.sin((fromAngle * Math.PI) / 180);

        // const toCoordX = nodeWidth + RADIUS * Math.cos((toAngle * Math.PI) / 180);
        // const toCoordY = nodeHeight + RADIUS * Math.sin((toAngle * Math.PI) / 180);

        // const d = `M ${nodeWidth},${nodeHeight} L ${fromCoordX},${fromCoordY} A ${RADIUS},${RADIUS} 0 0,1 ${toCoordX},${toCoordY}z
        // `.trim();

        const p1 = {
            x : Math.cos(Math.PI*2/slices * index) * RADIUS + RADIUS + PADDING,
            y : Math.sin(Math.PI*2/slices * index) * RADIUS + RADIUS + PADDING
        };

        const p2 = {
            x : Math.cos(Math.PI*2/slices * (index + 1)) * RADIUS + RADIUS + PADDING,
            y : Math.sin(Math.PI*2/slices * (index + 1)) * RADIUS + RADIUS + PADDING
        };

        const p3 = {
            x : Math.cos(Math.PI*2/slices * (index + 1)) * (RADIUS / 2) + RADIUS + PADDING,
            y : Math.sin(Math.PI*2/slices * (index + 1)) * (RADIUS /2) + RADIUS + PADDING
        };

        const p4 = {
            x : Math.cos(Math.PI*2/slices * index) * (RADIUS / 2) + RADIUS + PADDING,
            y : Math.sin(Math.PI*2/slices * index) * (RADIUS / 2) + RADIUS + PADDING
        };

        const d = `M ${p1.x} ${p1.y} A ${RADIUS} ${RADIUS} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${RADIUS} ${RADIUS} 0 0 0 ${p4.x} ${p4.y} z`;

        return <path fill="red" stroke="white" d={d} />
    });
  
  return (
    <svg height={`${RADIUS * 2 + PADDING * 2}px`} width={`${RADIUS * 2 + PADDING * 2}px`}>
          {svgPaths}
      </svg>
  );
};

export default HandleCss;
