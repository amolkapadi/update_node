import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, } from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './index.css';


const initialNodes = [
  {
    id: '1',
    type: 'input',
    class:"",
    data: { label: 'Start' },
    position: { x: 250, y: 5 },
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // const [nodeHidden, setNodeHidden] = useState(false);
  const [editValue, setEditValue] = useState()
  const [id, setId] = useState()

//offcanvas
const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onNodeClick = (e, val) => {
    setEditValue(val.data.label)
    setId(val.id)
    setShow(true)

  }

  const handleEdit = () => {
    const res = nodes.map((item) => {
      if (item.id === id) {
        return { ...item, data: { label: editValue } }
      }
      return item
    })
    setNodes(res)
    setShow(true)
  }

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);



  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

  }, []);


  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid

      if (typeof type === 'undefined' || !type) {
        return;
      }



      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
 


  return (

    <div className="dndflow">
       {/* <Button variant="primary" onClick={handleShow}>
        Launch
      </Button> */}

      <Offcanvas show={show} onHide={handleClose} placement='end' >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Update Node</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div >
          <div >
            <label>label:</label><br/>
            <input value={editValue} onChange={(e) => setEditValue(e.target.value)} /> <br/>
            <button onClick={handleEdit} className="btn">Update</button>
          </div>
        </div>
        </Offcanvas.Body>
      </Offcanvas>
      <ReactFlowProvider>

       

        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            onNodeClick={(e, val) => onNodeClick(e, val)}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>

        </div>
        <Sidebar />


      </ReactFlowProvider>
    </div>

  );

};



export default DnDFlow;