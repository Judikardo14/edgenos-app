// pages/crossword.tsx
import { useState, useEffect } from 'react';
import { Box, Flex, Grid, GridItem, Input, Button, Text, VStack, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Grille correcte avec mots : Across (EDGE, NFT), Down (ZKP, BLOCK, PROOF, NODE)
const correctGrid = [
  [' ', ' ', 'B', 'L', 'O', 'C', 'K', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', 'Z', ' '],
  [' ', ' ', 'P', ' ', ' ', ' ', 'K', ' '],
  [' ', ' ', 'R', ' ', ' ', ' ', 'P', ' '],
  [' ', ' ', 'O', ' ', ' ', ' ', ' ', 'N'],
  [' ', ' ', 'O', ' ', ' ', ' ', ' ', 'O'],
  [' ', 'N', 'F', 'T', ' ', ' ', ' ', 'D'],
  [' ', ' ', ' ', ' ', 'E', 'D', 'G', 'E'],
];

// Grille initiale : vide pour les cases actives, espaces pour les inactives
const initialGrid = correctGrid.map(row => row.map(cell => (cell === ' ' ? ' ' : '')));

// Numéros des indices
const clueNumbers = [
  { row: 0, col: 2, number: 4, direction: 'across' }, // BLOCK
  { row: 1, col: 6, number: 1, direction: 'down' }, // ZKP
  { row: 2, col: 2, number: 5, direction: 'down' }, // PROOF
  { row: 7, col: 4, number: 2, direction: 'across' }, // EDGE
  { row: 6, col: 1, number: 3, direction: 'across' }, // NFT
  { row: 4, col: 7, number: 6, direction: 'down' }, // NODE
];

// Indices affichés
const clues = {
  across: [
    { number: 2, clue: 'Boundary of the network (4 letters)', answer: 'EDGE' },
    { number: 4, clue: 'Blockchain unit (5 letters)', answer: 'BLOCK' },
    { number: 3, clue: 'Non-Fungible Token (3 letters)', answer: 'NFT' },
  ],
  down: [
    { number: 1, clue: 'Zero Knowledge Proof (3 letters)', answer: 'ZKP' },
    { number: 5, clue: 'Verification in zk (5 letters)', answer: 'PROOF' },
    { number: 6, clue: 'Network participant (4 letters)', answer: 'NODE' },
  ],
};

export default function Crossword() {
  const [grid, setGrid] = useState<string[][]>(JSON.parse(JSON.stringify(initialGrid)));
  const [showSolution, setShowSolution] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('Correct Grid:', correctGrid);
    console.log('Initial Grid:', initialGrid);
    console.log('Current Grid:', grid);
  }, [grid]);

  const handleInputChange = (row: number, col: number, value: string) => {
    if (showSolution || correctGrid[row][col] === ' ') return;
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = value.toUpperCase().slice(0, 1);
    setGrid(newGrid);
    console.log(`Updated Grid [${row},${col}]: ${newGrid[row][col]}`);
  };

  const checkAnswers = () => {
    const isCorrect = grid.every((row, i) =>
      row.every((cell, j) => cell === correctGrid[i][j])
    );
    setMessage(isCorrect ? 'Congratulations!' : 'Some answers are incorrect');
    console.log('Check Answers:', { isCorrect, grid });
  };

  const handleShowSolution = () => {
    if (showSolution) {
      setGrid(JSON.parse(JSON.stringify(initialGrid)));
      setShowSolution(false);
      setMessage('');
    } else {
      setGrid(correctGrid.map(row => [...row]));
      setShowSolution(true);
      setMessage('Solution displayed!');
    }
    console.log('Show Solution:', { showSolution: !showSolution, grid });
  };

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      bg="gray.900"
      minH="100vh"
      maxH="100vh"
      p={{ base: 3, md: 4 }}
      align="flex-start"
      overflow="hidden"
    >
      {/* Grille et boutons à gauche */}
      <VStack
        spacing={{ base: 3, md: 4 }}
        align="center"
        flexShrink={0}
        mr={{ base: 0, md: 4 }}
      >
        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          color="neon.blue"
          fontWeight="bold"
        >
          EdgenOS Crossword
        </Text>
        <Grid
          templateColumns="repeat(8, 50px)"
          templateRows="repeat(8, 50px)"
          gap="2px"
          bg="gray.800"
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isActive = correctGrid[rowIndex][colIndex] !== ' ';
              const clue = clueNumbers.find(
                c => c.row === rowIndex && c.col === colIndex
              );
              return (
                <GridItem
                  key={`${rowIndex}-${colIndex}`}
                  w="50px"
                  h="50px"
                  bg={isActive ? '#1A1A3D' : 'gray.900'}
                  border="1px"
                  borderColor="neon.blue"
                  position="relative"
                  as={motion.div}
                  whileHover={{ scale: 1.05 }}
                >
                  {clue && (
                    <Text
                      position="absolute"
                      top="2px"
                      left="2px"
                      fontSize="12px"
                      color="neon.purple"
                    >
                      {clue.number}
                    </Text>
                  )}
                  {isActive && (
                    <Input
                      value={cell}
                      onChange={e => handleInputChange(rowIndex, colIndex, e.target.value)}
                      maxLength={1}
                      textAlign="center"
                      fontSize="md"
                      color={showSolution ? 'magenta' : 'neon.blue'}
                      bg="transparent"
                      border="none"
                      h="100%"
                      w="100%"
                      _focus={{ outline: 'none' }}
                      readOnly={showSolution}
                      zIndex={2}
                    />
                  )}
                </GridItem>
              );
            })
          )}
        </Grid>
        <HStack spacing={2}>
          <Button
            onClick={checkAnswers}
            bg="neon.blue"
            color="gray.900"
            _hover={{ bg: 'neon.purple' }}
            size="sm"
            as={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            Check Answers
          </Button>
          <Button
            onClick={handleShowSolution}
            bg={showSolution ? 'gray.700' : 'neon.purple'}
            color="gray.100"
            _hover={{ bg: 'neon.blue' }}
            size="sm"
            as={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </Button>
        </HStack>
        {message && (
          <Text
            fontSize="sm"
            color={message.includes('Congratulations') ? 'green.400' : 'red.400'}
          >
            {message}
          </Text>
        )}
        <Text color="gray.400" fontSize="sm" mt={2}>
          Created by Karol |{' '}
          <a href="https://x.com/iveobod" style={{ color: '#00D1FF' }}>
            @iveobod
          </a>
        </Text>
      </VStack>
      {/* Indices à droite */}
      <Box flexGrow={1} overflowY="auto">
        <VStack align="start" spacing={3} p={3}>
          <Text fontSize="md" color="neon.blue" fontWeight="bold">
            Across
          </Text>
          {clues.across.map(clue => (
            <Text key={clue.number} fontSize="sm" color="gray.100">
              {clue.number}. {clue.clue}
            </Text>
          ))}
          <Text fontSize="md" color="neon.blue" fontWeight="bold">
            Down
          </Text>
          {clues.down.map(clue => (
            <Text key={clue.number} fontSize="sm" color="gray.100">
              {clue.number}. {clue.clue}
            </Text>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
}
