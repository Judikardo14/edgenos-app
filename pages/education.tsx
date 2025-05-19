import { Box, Heading, Text, SimpleGrid, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

const MotionBox = motion.create(Box);

const sections = [
  {
    title: 'What is EdgenOS?',
    href: '/education/edgenos',
    description: 'Discover how EdgenOS turns devices into light nodes for zk-proof verification.',
  },
  {
    title: 'Understanding zk-Proofs',
    href: '/education/zkproofs',
    description: 'Learn the magic of zero-knowledge proofs and their role in privacy.',
  },
  {
    title: 'LayerEdge’s Vision',
    href: '/education/layeredge',
    description: 'Explore LayerEdge’s mission to build a decentralized, verifiable internet.',
  },
];

export default function Education() {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      p={8}
    >
      <Heading mb={6} fontSize="4xl" textShadow="0 0 10px #00D1FF">
        Learn About EdgenOS
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {sections.map((section) => (
          <NextLink key={section.title} href={section.href} passHref>
            <MotionBox
              as="a"
              p={6}
              bg="neon.dark"
              borderRadius="lg"
              border="1px solid"
              borderColor="neon.blue"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 15px #00D1FF',
                y: -5,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {section.title}
              </Text>
              <Text color="gray.300">{section.description}</Text>
            </MotionBox>
          </NextLink>
        ))}
      </SimpleGrid>
    </MotionBox>
  );
}