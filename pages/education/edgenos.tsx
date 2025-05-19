import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);

export default function EdgenOS() {
  return (
    <MotionBox
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      p={8}
    >
      <Heading mb={6} fontSize="3xl" textShadow="0 0 10px #8B00FF">
        What is EdgenOS?
      </Heading>
      <VStack align="start" spacing={4}>
        <MotionText
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
        >
          EdgenOS, developed by LayerEdge, is a revolutionary technology that transforms everyday
          devices (browsers, smartphones, IoT) into light nodes within a decentralized network.
          These nodes verify zero-knowledge proofs (zk-proofs) to ensure scalable, secure, and
          private transactions.
        </MotionText>
        <MotionText
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <strong>Key Features:</strong>
          <List spacing={2} mt={2}>
            <ListItem>Light Node Architecture: Minimal resource usage for broad device compatibility.</ListItem>
            <ListItem>zk-Proof Verification: Validates proofs without revealing underlying data.</ListItem>
            <ListItem>Mesh Network: Devices form a global, decentralized network for resilience.</ListItem>
          </List>
        </MotionText>
        <MotionText
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <strong>Example:</strong> A user’s browser can join EdgenOS, verify a zk-proof for a
          blockchain transaction (e.g., Ethereum L2), and contribute to network scalability without
          needing high computational power.
        </MotionText>
      </VStack>
    </MotionBox>
  );
}