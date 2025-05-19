import NavMenu from './NavMenu';
import { Box, Text, Link } from '@chakra-ui/react'; // Ajout de Box ici
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box minH="100vh" display="flex" flexDir="column">
      <Box display="flex" flex="1">
        <NavMenu />
        <Box ml="200px" p={4} flex="1">
          {children}
        </Box>
      </Box>
      <MotionBox
        as="footer"
        p={4}
        bg="neon.dark"
        borderTop="1px solid"
        borderColor="neon.blue"
        textAlign="center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Text fontSize="sm" color="gray.300">
          Created by Karol | Follow me on{' '}
          <Link
            href="https://x.com/iveobod"
            isExternal
            color="neon.blue"
            _hover={{ textDecoration: 'underline' }}
          >
            @iveobod
          </Link>
        </Text>
      </MotionBox>
    </Box>
  );
}