import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);

export default function ZKProofs() {
  return (
    <MotionBox
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      p={8}
    >
      <Heading mb={6} fontSize="3xl" textShadow="0 0 10px #8B00FF">
        Understanding Zero-Knowledge Proofs
      </Heading>
      <VStack align="start" spacing={4}>
        <MotionText
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Zero-Knowledge Proofs (zk-proofs) are cryptographic methods that allow one party (the
          prover) to prove to another (the verifier) that a statement is true, without revealing any
          additional information.
        </MotionText>
        <MotionText
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <strong>Key Properties:</strong>
          <List spacing={2} mt={2}>
            <ListItem><strong>Completeness:</strong> If the statement is true, an honest prover convinces the verifier.</ListItem>
            <ListItem><strong>Soundness:</strong> A dishonest prover cannot convince the verifier.</ListItem>
            <ListItem><strong>Zero-Knowledge:</strong> No information is leaked beyond the statement’s truth.</ListItem>
          </List>
        </MotionText>
        <MotionText
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <strong>Example:</strong> Imagine proving you’re over 18 without showing your ID. Using a
          zk-proof, you can generate a cryptographic proof that your age satisfies the condition,
          which EdgenOS nodes can verify without seeing your actual age.
        </MotionText>
        <MotionText
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <strong>Applications in EdgenOS:</strong> zk-proofs enable private transactions, scalable
          blockchain layers (e.g., zk-Rollups), and secure identity verification.
        </MotionText>
      </VStack>
    </MotionBox>
  );
}