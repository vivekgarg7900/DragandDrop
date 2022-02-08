import React, { useState, useRef, useEffect } from 'react';
import './main.css';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  MiniMap,
  Background,
  Handle,
  Position
} from 'react-flow-renderer';

import Sidebar from './Sidebar';
import CustomNode from './CustomNode';


const initialElements = [

];

let id = 0;
function getId() {
  return `State ${id++}`;
}

const nodeTypes = {
  send_sms: CustomNode,
  send_email: CustomNode,
  send_push: CustomNode,
  enter_exit: CustomNode,
  specific_users: CustomNode

};


const DragAndDrop = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => {

    params.label = params.sourceHandle
    setElements((els) => addEdge(params, els));
  }

  useEffect(() => console.log('elements :: ', elements), [elements]);


  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const id = getId();
    const newNode = {
      id: id,
      type,
      position,
      data: {
        label: type,
        type: type,
        id: id,
        positionCoordinates: position,
        Handle,
        Position,
        icon: type,
        removeElements: onElementsRemove,
        copyElement: onCopyElement
      }
    };

    setElements((es) => es.concat(newNode));
  };

  const onElementsRemove = (data) => {
    console.log('data :: ', data);
    const vv = window.confirm("delete this");
    if (vv) {
      setElements((els) => removeElements(data, els));
    }
  }

  const onCopyElement = (data) => {


    const position = reactFlowInstance.project({
      x: data?.positionCoordinates?.x + 50,
      y: data?.positionCoordinates?.y + 50,

    });

    const id = getId();
    const newNode = {
      id,
      type: data?.label,
      position: position,
      data: {
        label: data?.label,
        id: id,
        positionCoordinates: position,
        Handle,
        Position,
        icon: data?.type,
        removeElements: data?.removeElements,
        copyElement: data?.copyElement,
      }

    };

    console.log(newNode);

    // console.log('newNode :: ', newNode);

    setElements((es) => es.concat(newNode));
  };


  return (
    <div className="dndflow" style={{ display: 'flex' }}>
      <Sidebar onDrop={onDrop} />

      <ReactFlowProvider>

        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodeTypes={nodeTypes}
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}


          >

            <Controls />
            <MiniMap
              nodeColor={(node) => {
                switch (node.type) {
                  case 'input':
                    return 'red';
                  case 'default':
                    return '#00ff00';
                  case 'output':
                    return 'rgb(0,0,255)';
                  default:
                    return '#eee';

                }
              }}
              nodeStrokeWidth={3}
            />
            <div>
              <Background
                variant="dots"
                gap={15}
                size={0.5}
                color=''

              />
            </div>

          </ReactFlow>
        </div>

      </ReactFlowProvider>
    </div>
  );
};

export default DragAndDrop;