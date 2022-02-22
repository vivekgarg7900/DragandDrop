import React, { useState, useRef, useEffect, useCallback } from "react";
import "./main.css";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Handle,
  Position,
  isNode,
} from "react-flow-renderer";
import dagre from "dagre";

import Sidebar from "./Sidebar";
import CustomNode from "./CustomNode";
import ButtonEdge from "./ButtonEdge";
import HandleCss from "./HandleCss";

let nodeId = 0;
const getNodeId = () => {
  return `node_${nodeId++}`;
};

const nodeTypes = {
  send_sms: CustomNode,
  send_email: CustomNode,
  send_push: CustomNode,
  enter_exit: CustomNode,
  specific_users: CustomNode,
};

const edgeTypes = {
  buttonedge: ButtonEdge,
};


const DragAndDrop = ({ elements = [], setElements = () => {} }) => {
  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [deleteNodeId, setDeleteNodeId] = useState(null);
  const [deleteEdgeId, setDeleteEdgeId] = useState(null);

  const [copyNodeId, setCopyNodeId] = useState(null);

  useEffect(() => deleteNode(), [deleteNodeId]);

  useEffect(() => deleteEdge(), [deleteEdgeId]);

  useEffect(() => copyNode(), [copyNodeId]);

  useEffect(() => {
    if (reactFlowInstance && elements.length > 0) {
      reactFlowInstance.fitView();
    }
  }, [reactFlowInstance, elements.length]);

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  // edge connection
  const onConnect = (params) => {
    setElements(() =>
      addEdge(
        {
          ...params,
          type: "buttonedge",
          animated: true,
          data: {
            label: params?.sourceHandle,
            elementType: "edge",
            setDeleteEdgeId: setDeleteEdgeId,
            
          },
        },
        elements
      )
    );
  };

  // on drop over event from sidebar
  const onDragOver = (event) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = "move";
  };

  // on drop event from sidebar
  const onDrop = (event, data = {}) => {
    event.preventDefault();

    createNode(event);
  };

  const createNode = (event) => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const nodeId = getNodeId();
    const newNode = {
      id: nodeId,
      type,
      position,
      data: {
        elementType: "node",
        label: type,
        type: type,
        id: nodeId,
        positionCoordinates: position,
        Handle,
        Position,
        icon: type,
        nodeHeight:nodeHeight,
        nodeWidth:nodeWidth,
        setDeleteNodeId: setDeleteNodeId,
        setCopyNodeId: setCopyNodeId,
        onDrop: onDrop,
      },
    };

    setElements((previousElements) => [...previousElements, { ...newNode }]);
  };

  const deleteNode = () => {
    if (!deleteNodeId) return;

    const confirmDelete = window.confirm("delete this????");
    if (confirmDelete) {
      setElements((previousElements) =>
        previousElements?.filter((element) => element?.id !== deleteNodeId)
      );
      setDeleteNodeId(null);
    }
  };

  const deleteEdge = () => {
    if (!deleteEdgeId) return;

    const confirmDelete = window.confirm("delete this????");
    if (confirmDelete) {
      setElements((previousElements) =>
        previousElements?.filter((element) => element?.id !== deleteEdgeId)
      );
      setDeleteEdgeId(null);
    }
  };

  const copyNode = () => {
    if (!copyNodeId) return;

    const data = elements?.find((element) => element?.id === copyNodeId);

    const position = {
      x: data?.position?.x + 50,
      y: data?.position?.y + 50,
    };

    const nodeId = getNodeId();
    const newNode = {
      id: nodeId,
      type: data?.data?.label,
      position: position,
      data: {
        elementType: "node",
        label: data?.data?.label,
        id: nodeId,
        positionCoordinates: position,
        Handle,
        Position,
        icon: data?.data?.icon,
        type: data?.data?.type,
        setDeleteNodeId: setDeleteNodeId,
        setCopyNodeId: setCopyNodeId,
        onDrop: onDrop,
      },
    };

    setElements((previousElements) => [...previousElements, { ...newNode }]);
    setCopyNodeId(null);
  };

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 200;
  const nodeHeight = 30;

  const getLayoutedElements = (elements, direction = "TB") => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    elements.forEach((el) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);

    return elements.map((el) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);
        el.targetPosition = isHorizontal ? "left" : "top";
        el.sourcePosition = isHorizontal ? "right" : "bottom";
        el.position = {
          // x: 300+ nodeWithPosition.x - nodeWidth / 2 ,
          // y: nodeWithPosition.y - nodeHeight / 2,
          x: 300 + nodeWithPosition.x - nodeWithPosition.width / 2,
          y: nodeWithPosition.y - nodeWithPosition.height / 2,
        };
      }

      return el;
    });
  };

  const layoutedElements = getLayoutedElements([]);

  const onLayout = useCallback(
    (direction) => {
      const layoutedElements = getLayoutedElements(elements, direction);
      setElements([...layoutedElements]);
    },
    [elements]
  );

  const onNodeDragStop = (event, node) => {
    event.preventDefault();

    const newElements = [...elements];

    const nodeIndex = newElements?.findIndex(({ id }) => id === node?.id);

    newElements[nodeIndex] = {
      ...(newElements?.[nodeIndex] || {}),
      position: { ...node?.position },
      data: {
        ...(newElements?.[nodeIndex]?.data || {}),
        positionCoordinates: { ...node?.position },
      },
    };

    setElements([...newElements]);
  };

  return (
    <div className="dndflow" style={{ display: "flex" }}>
      <Sidebar onDrop={onDrop} />

      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodeTypes={nodeTypes}
            elements={elements}
            onConnect={onConnect}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            connectionLineType="smoothstep"
            onNodeDragStop={onNodeDragStop}
            edgeTypes={edgeTypes}
            key="edge-with-button"
          />
        </div>

        <div className="control">
          <button
            type="submit"
            style={{ margin: "10px" }}
            onClick={() => onLayout("TB")}
          >
            HORIZONTAL Layout
          </button>
          <button type="submit" onClick={() => onLayout("LR")}>
            VERTICAL Layout
          </button>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DragAndDrop;
