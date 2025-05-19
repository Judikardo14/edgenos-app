import { Box, VStack, Text, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

const MotionBox = motion.create(Box); // Changement ici : motion() -> motion.create()
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Simulation', href: '/simulation' },
  { name: 'Education', href: '/education' },
  { name: 'Crossword', href: '/crossword' },
  { name: 'Notes', href: '/notes' },
];

export default function NavMenu() {
  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      h="100vh"
      p={4}
      bg="rgba(26, 26, 61, 0.8)"
      backdropFilter="blur(5px)"
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={4}>
        {navItems.map((item) => (
          <NextLink key={item.name} href={item.href} passHref>
            <Link>
              <MotionBox
                whileHover={{ scale: 1.1, color: 'neon.blue', textShadow: '0 0 8px #00D1FF' }}
                p={2}
                borderRadius="md"
              >
                <Text fontSize="lg" fontWeight="bold">
                  {item.name}
                </Text>
              </MotionBox>
            </Link>
          </NextLink>
        ))}
      </VStack>
    </MotionBox>
  );
}