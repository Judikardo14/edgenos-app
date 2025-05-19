import { useEffect, useState } from 'react';
import { Box, Heading, VStack, HStack, Input, Button, Text, Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

// Définition de la grille 8x8
const GRID_SIZE = 8;
const initialGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));

// Mots et positions (6 mots, tous dans 8x8)
const words = [
  { word: 'ZKP', row: 2, col: 3, direction: 'horizontal' }, // 3 lettres
  { word: 'EDGE', row: 4, col: 2, direction: 'horizontal' }, // 4 lettres
  { word: 'NET', row: 5, col: 3, direction: 'horizontal' }, // 3 lettres
  { word: 'BLOCK', row: 2, col: 2, direction: 'vertical' }, // 5 lettres
  { word: 'PROOF', row: 3, col: 2, direction: 'vertical' }, // 5 lettres
  { word: 'NODE', row: 3, col: 4, direction: 'vertical' }, // 4 lettres
];

// Indices en anglais
const clues = {
  horizontal: [
    { number: 1, clue: 'Zero-knowledge proof (3 letters)', row: 2, col: 3 },
    { number: 2, clue: 'LayerEdge component (4 letters)', row: 4, col: 2 },
    { number: 3, clue: 'Network shorthand (3 letters)', row: 5, col: 3 },
  ],
  vertical: [
    { number: 4, clue: 'Blockchain unit (5 letters)', row: 2, col: 2 },
    { number: 5, clue: 'Verification method (5 letters)', row: 3, col: 2 },
    { number: 6, clue: 'Network participant (4 letters)', row: 3, col: 4 },
  ],
};

// Solution correcte
const correctGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
words.forEach(({ word, row, col, direction }) => {
  for (let i = 0; i < word.length; i++) {
    if (direction === 'horizontal' && col + i < GRID_SIZE) {
      correctGrid[row][col + i] = word[i];
    } else if (direction === 'vertical' && row + i < GRID_SIZE) {
      correctGrid[row + i][col] = word[i];
    }
  }
});

export default function Crossword() {
  const [grid, setGrid] = useState<string[][]>(initialGrid);
  const [message, setMessage] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  // Log pour déboguer l'initialisation
  useEffect(() => {
    console.log('Correct Grid:', correctGrid);
    console.log('Initial Grid:', grid);
  }, []);

  const handleInputChange = (row: number, col: number, value: string) => {
    if (showSolution) return; // Bloquer les modifications en mode solution
    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = value.toUpperCase().slice(0, 1);
    setGrid(newGrid);
    console.log(`Updated Grid [${row},${col}]: ${newGrid[row][col]}`);
  };

  const isCorrect = () => {
    let isValid = true;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (correctGrid[i][j] !== '') {
          if (grid[i][j] !== correctGrid[i][j]) {
            console.log(`Mismatch at [${i},${j}]: Expected ${correctGrid[i][j]}, got ${grid[i][j]}`);
            isValid = false;
          }
        }
      }
    }
    console.log('User Grid:', grid);
    return isValid;
  };

  const handleCheck = () => {
    if (showSolution) {
      setMessage('Solution is displayed!');
      return;
    }
    if (isCorrect()) {
      setMessage('Congratulations! Crossword solved!');
    } else {
      setMessage('Some answers are incorrect. Try again!');
    }
  };

  const handleShowSolution = () => {
    if (showSolution) {
      // Revenir à la grille utilisateur
      setGrid(grid.map((row) => [...row])); // Forcer un re-rendu
      setShowSolution(false);
      setMessage('');
    } else {
      // Afficher la solution
      setGrid(correctGrid.map((row) => [...row]));
      setShowSolution(true);
      setMessage('Solution displayed!');
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      p={4}
      minH="100vh"
      bg="gray.900"
    >
      <Heading mb={4} fontSize="3xl" textShadow="0 0 8px #8B00FF">
        EdgenOS Crossword
      </Heading>
      <Text mb={4} color="gray.300">
        Solve the crossword puzzle to test your knowledge of EdgenOS and LayerEdge.
      </Text>
      <HStack spacing={8} align="start">
        {/* Grille */}
        <Grid
          templateColumns="repeat(8, 60px)"
          templateRows="repeat(8, 60px)"
          gap="2px"
          bg="gray.800"
          p={2}
          borderRadius="md"
          boxShadow="0 0 12px rgba(0, 209, 255, 0.2)"
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isActive = correctGrid[rowIndex][colIndex] !== '';
              const clueNumber = clues.horizontal.find(
                (clue) => clue.row === rowIndex && clue.col === colIndex
              )?.number || clues.vertical.find(
                (clue) => clue.row === rowIndex && clue.col === colIndex
              )?.number;

              return (
                <GridItem
                  key={`${rowIndex}-${colIndex}`}
                  w="60px"
                  h="60px"
                  bg={isActive ? '#1A1A3D' : 'gray.900'}
                  border={isActive ? '2px solid #00D1FF' : '1px solid gray.700'}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  {clueNumber && (
                    <Text
                      position="absolute"
                      top="2px"
                      left="2px"
                      fontSize="xs"
                      color="#8B00FF"
                      fontWeight="bold"
                    >
                      {clueNumber}
                    </Text>
                  )}
                  {isActive && (
                    <Input
                      value={cell}
                      onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                      maxLength={1}
                      textAlign="center"
                      fontSize="xl"
                      fontWeight="bold"
                      color={showSolution ? '#FF00FF' : '#00D1FF'} // Magenta pour la solution
                      bg="transparent"
                      border="none"
                      w="100%"
                      h="100%"
                      _focus={{ boxShadow: '0 0 8px #8B00FF' }}
                      textTransform="uppercase"
                      readOnly={showSolution} // Lecture seule en mode solution
                      zIndex={1}
                    />
                  )}
                </GridItem>
              );
            })
          )}
        </Grid>

        {/* Indices */}
        <VStack align="start" spacing={4} minW="300px">
          <Box>
            <Heading size="md" mb={2} color="#00D1FF">
              Across
            </Heading>
            {clues.horizontal.map((clue) => (
              <Text key={clue.number} color="gray.300">
                {clue.number}. {clue.clue}
              </Text>
            ))}
          </Box>
          <Box>
            <Heading size="md" mb={2} color="#00D1FF">
              Down
            </Heading>
            {clues.vertical.map((clue) => (
              <Text key={clue.number} color="gray.300">
                {clue.number}. {clue.clue}
              </Text>
            ))}
          </Box>
        </VStack>
      </HStack>

      <HStack mt={4} spacing={4}>
        <Button
          bg="neon.purple"
          color="white"
          _hover={{ boxShadow: '0 0 8px #8B00FF' }}
          onClick={handleCheck}
        >
          Check Answers
        </Button>
        <Button
          bg={showSolution ? 'gray.600' : 'neon.blue'}
          color="white"
          _hover={{ boxShadow: `0 0 8px ${showSolution ? '#666' : '#00D1FF'}` }}
          onClick={handleShowSolution}
        >
          {showSolution ? 'Hide Solution' : 'Show Solution'}
        </Button>
      </HStack>

      {message && (
        <Text mt={4} color={message.includes('Congratulations') ? 'green.300' : 'red.300'}>
          {message}
        </Text>
      )}
    </MotionBox>
  );
}