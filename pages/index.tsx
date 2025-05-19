import { Box, Heading, Button, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

const MotionBox = motion.create(Box); // Changement ici : motion() -> motion.create()

export default function Home() {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, neon.blue, neon.purple)"
    >
      <VStack spacing={6}>
        <Heading fontSize="5xl" textShadow="0 0 10px #00D1FF">
          EdgenOS: Verify the Future
        </Heading>
        <NextLink href="/simulation" passHref>
          <Button
            as={motion.button}
            whileHover={{ scale: 1.1, boxShadow: '0 0 15px #8B00FF' }}
            bg="neon.purple"
            color="white"
            size="lg"
          >
            Explore EdgenOS
          </Button>
        </NextLink>
      </VStack>
    </MotionBox>
  );
}