import { useState, useEffect } from 'react';
import { Box, Heading, Textarea, Button, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

export default function Notes() {
  const [note, setNote] = useState('');

  useEffect(() => {
    const savedNote = localStorage.getItem('edgenos-note');
    if (savedNote) setNote(savedNote);
  }, []);

  const handleSave = () => {
    localStorage.setItem('edgenos-note', note);
    alert('Note saved!');
  };

  return (
    <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} p={4}>
      <Heading mb={4} fontSize="3xl" textShadow="0 0 10px #8B00FF">
        EdgenOS Notes
      </Heading>
      <VStack spacing={4}>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Jot down your thoughts about EdgenOS..."
          bg="neon.dark"
          borderColor="neon.blue"
          h="300px"
          _focus={{ borderColor: 'neon.blue', boxShadow: '0 0 5px neon.blue' }}
        />
        <Button
          onClick={handleSave}
          bg="neon.purple"
          as={motion.button}
          whileHover={{ scale: 1.1 }}
        >
          Save Note
        </Button>
      </VStack>
    </MotionBox>
  );
}