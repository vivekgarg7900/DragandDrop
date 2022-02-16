// import ReactFlowStart from './ReactFlow/ReactFlowStart';
import { useCallback, useState } from "react";
import DragAndDrop from "./ReactFlow/DragAndDrop";
// import Second from './ReactFlow/Second';
// import Sidebar from './ReactFlow/Sidebar';

function App() {
  const [elements, setElements] = useState([]);

  return (
    <div>
      {/* <ReactFlowStart/> */}
      {/* <Second/> */}
      {/* <Sidebar/> */}
      <DragAndDrop elements={elements} setElements={setElements} />
    </div>
  );
}

export default App;
