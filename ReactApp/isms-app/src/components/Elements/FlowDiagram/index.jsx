import React, { useCallback, use } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from "reactflow";

import "reactflow/dist/style.css";

const FlowDiagram = ({ data }) => {
  let i = 0;
  const initialNodes = data.map((node) => {
    // Tạo đối tượng Node cho mỗi node trong mảng dữ liệu
    const nodeElement = {
      id: node.id.toString(),
      data: { label: node.activityName },
      position: { x: 0, y: i }, // Bạn có thể chuyển đối tượng node này đến vị trí khác tùy ý
    };
    i += 50;
    return nodeElement;
  });

  const initialEdges = data.flatMap((node) => {
    if (node.listStatusTrans && node.listStatusTrans.length > 0) {
      const edgeElements = node.listStatusTrans.map((connect) => {
        return {
          id: `e${node.id}-${connect.destination}`,
          source: node.id.toString(),
          target: connect.destination.toString(),
          animated: true,
          label: connect.statusTran,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        };
      });
      return edgeElements;
    } else {
      return []; // Trả về một mảng rỗng nếu không có listStatusTrans hoặc listStatusTrans rỗng
    }
  });
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  return (
    <div style={{ width: "70vw", height: "70vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;
