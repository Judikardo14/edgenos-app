import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    neon: {
      blue: '#00D1FF',
      purple: '#8B00FF',
      dark: '#1A1A3D',
    },
  },
  fonts: {
    heading: `'Orbitron', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'neon.dark',
        color: 'white',
      },
    },
  },
});

export default theme;