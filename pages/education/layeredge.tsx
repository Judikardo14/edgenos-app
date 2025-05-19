import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);

export default function LayerEdge() {
  return (
    <MotionBox
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      p={8}
    >
      <Heading mb={6} fontSize="3xl" textShadow="0 0 10px #8B00FF">
        LayerEdge’s Vision
      </Heading>
      <VStack align="start" spacing={4}>
        <MotionText
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
        >
          LayerEdge is pioneering a decentralized internet where every device contributes to a
          global mesh network powered by EdgenOS. The goal is to eliminate reliance on centralized
          servers, ensuring privacy, scalability, and verifiability.
        </MotionText>
        <MotionText
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <strong>Mission:</strong>
          <List spacing={2} mt={2}>
            <ListItem>Build a scalable zk-proof verification network using light nodes.</ListItem>
            <ListItem>Enable privacy-preserving applications across blockchains and beyond.</ListItem>
            <ListItem>Foster a decentralized ecosystem for developers and users.</ListItem>
          </List>
        </MotionText>
        <MotionText
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <strong>Roadmap:</strong> LayerEdge aims to integrate EdgenOS with major blockchains
          (Ethereum, Polygon), launch a developer SDK, and expand to IoT devices by 2026.
        </MotionText>
      </VStack>
    </MotionBox>
  );
}