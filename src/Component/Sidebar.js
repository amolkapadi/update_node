import React from 'react';



export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable >
        Start/End Node
      </div>

      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Def')} draggable>
        Default Node
      </div>

      <div className="dndnode processing_node mt-4 dmndshp" onDragStart={(event) => onDragStart(event, 'Processing')} draggable>
        <p className='precessing-text'>Processing Node</p>
      </div>

      <div className="dndnode " onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>

      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'team')} draggable>

        Teams

      </div>

      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'team')} draggable>
        Unit 4
      </div>
    </aside>

  );

};

