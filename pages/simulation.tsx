import { useState, useEffect, useCallback } from 'react';
import ReactFlow, { Background, Controls, Node, Edge, useNodesState, useEdgesState, MarkerType } from 'reactflow';
import { Box, Heading, Text, VStack, HStack, Button, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import 'reactflow/dist/style.css';

const MotionBox = motion.create(Box);

// Interface pour les données des nœuds
interface EdgenOSNodeData {
  label: string;
  deviceType: 'browser' | 'smartphone' | 'iot';
}

// Définition explicite de initialNodes
const initialNodes: Node<EdgenOSNodeData>[] = [
  {
    id: 'network',
    data: { label: 'EdgenOS Network', deviceType: 'browser' },
    position: { x: 400, y: 50 },
    type: 'input',
    style: {
      background: '#1A1A3D',
      color: '#00D1FF',
      border: '2px solid #00D1FF',
      borderRadius: '8px',
      padding: '10px',
    },
  },
];

const initialEdges: Edge[] = [];

export default function Simulation() {
  const [nodes, setNodes, onNodesChange] = useNodesState<EdgenOSNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCount, setNodeCount] = useState(1);
  const [proofsVerified, setProofsVerified] = useState(0);
  const [networkLoad, setNetworkLoad] = useState(0);

  // Log pour déboguer l'initialisation
  useEffect(() => {
    console.log('Initial Nodes:', initialNodes);
    console.log('Current Nodes:', nodes);
    console.log('Current Edges:', edges);
  }, [nodes, edges]);

  const deviceTypes: ('browser' | 'smartphone' | 'iot')[] = ['browser', 'smartphone', 'iot'];

  const addNode = useCallback(() => {
    const newNodeId = `device-${nodeCount + 1}`;
    // Vérifier l'unicité de l'ID
    if (nodes.some((node) => node.id === newNodeId)) {
      console.warn(`Node ID ${newNodeId} already exists`);
      return;
    }

    const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
    const newNode: Node<EdgenOSNodeData> = {
      id: newNodeId,
      data: { label: `${deviceType.charAt(0).toUpperCase() + deviceType.slice(1)} ${nodeCount + 1}`, deviceType },
      position: { x: Math.random() * 600 + 100, y: Math.random() * 400 + 150 },
      style: {
        background: '#1A1A3D',
        color: '#8B00FF',
        border: `2px solid ${deviceType === 'browser' ? '#00D1FF' : deviceType === 'smartphone' ? '#8B00FF' : '#FF00FF'}`,
        borderRadius: '8px',
        padding: '10px',
      },
    };

    // Connexion au nœud central
    const newEdge: Edge = {
      id: `e-${newNodeId}-network`,
      source: newNodeId,
      target: 'network',
      animated: true,
      style: { stroke: '#8B00FF', strokeWidth: 2, strokeDasharray: '5,5' },
      markerEnd: { type: MarkerType.Arrow, color: '#8B00FF' },
    };

    // Connexion peer-to-peer aléatoire (10% de chance)
    const peerEdge: Edge | null = Math.random() < 0.1 && nodes.length > 1
      ? {
          id: `e-${newNodeId}-${nodes[Math.floor(Math.random() * (nodes.length - 1)) + 1].id}`,
          source: newNodeId,
          target: nodes[Math.floor(Math.random() * (nodes.length - 1)) + 1].id,
          animated: true,
          style: { stroke: '#00D1FF', strokeWidth: 1, strokeDasharray: '3,3' },
          markerEnd: { type: MarkerType.Arrow, color: '#00D1FF' },
        }
      : null;

    setNodes((nds) => {
      const updatedNodes = [...nds, newNode];
      console.log('Added Node:', newNode);
      return updatedNodes;
    });
    setEdges((eds) => {
      const updatedEdges = peerEdge ? [...eds, newEdge, peerEdge] : [...eds, newEdge];
      console.log('Updated Edges:', updatedEdges);
      return updatedEdges;
    });
    setNodeCount((count) => count + 1);
    setNetworkLoad((load) => Math.min(load + 10, 100));
  }, [nodes, setNodes, setEdges, nodeCount]);

  const verifyProof = useCallback(() => {
    setProofsVerified((count) => count + 1);
    setNetworkLoad((load) => Math.max(load - 5, 0));

    if (edges.length === 0) {
      console.log('No edges to verify');
      return;
    }

    const randomEdgeIndex = Math.floor(Math.random() * edges.length);
    setEdges((eds) =>
      eds.map((edge, index) => ({
        ...edge,
        style: {
          stroke: index === randomEdgeIndex ? '#00D1FF' : '#8B00FF',
          strokeWidth: index === randomEdgeIndex ? 3 : 2,
          strokeDasharray: index === randomEdgeIndex ? '10,5' : '5,5',
        },
        markerEnd: {
          type: index === randomEdgeIndex ? MarkerType.ArrowClosed : MarkerType.Arrow,
          color: index === randomEdgeIndex ? '#00D1FF' : '#8B00FF',
        },
      }))
    );
    setTimeout(() => {
      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          style: { stroke: '#8B00FF', strokeWidth: 2, strokeDasharray: '5,5' },
          markerEnd: { type: MarkerType.Arrow, color: '#8B00FF' },
        }))
      );
    }, 1500);
  }, [setEdges, edges]);

  useEffect(() => {
    const interval = setInterval(verifyProof, 3000);
    return () => clearInterval(interval);
  }, [verifyProof]);

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      p={4}
      h="100vh"
    >
      <Heading mb={4} fontSize="3xl" textShadow="0 0 8px #8B00FF">
        EdgenOS Network Simulation
      </Heading>
      <Text mb={4} color="gray.300">
        Watch devices join the decentralized EdgenOS network, verifying zk-proofs with zero-knowledge privacy.
      </Text>
      <HStack spacing={4} mb={4}>
        <Tooltip label="Add a new device to the LayerEdge network" placement="top">
          <Button
            onClick={addNode}
            bg="neon.purple"
            color="white"
            _hover={{ boxShadow: '0 0 8px #8B00FF' }}
          >
            Add Device
          </Button>
        </Tooltip>
        <Text>Devices Connected: {nodeCount}</Text>
        <Text>zk-Proofs Verified: {proofsVerified}</Text>
        <Text>Network Load: {networkLoad}%</Text>
      </HStack>
      <Box
        height="70vh"
        border="2px solid"
        borderColor="neon.blue"
        borderRadius="md"
        boxShadow="0 0 12px rgba(0, 209, 255, 0.2)"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2, maxZoom: 1 }}
          style={{ background: '#1A1A3D' }}
        >
          <Background color="neon.blue" gap={16} />
          <Controls />
        </ReactFlow>
      </Box>
      {proofsVerified > 0 && (
        <MotionBox
          position="absolute"
          bottom="20px"
          right="20px"
          p={2}
          bg="neon.dark"
          borderRadius="md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Text color="neon.blue" fontSize="sm">
            Proof verified without data leakage!
          </Text>
        </MotionBox>
      )}
    </MotionBox>
  );
}