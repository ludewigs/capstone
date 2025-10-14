import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        yellow: {
          50: { value: '#fffef0' },
          100: { value: '#fff9cc' },
          200: { value: '#ffef80' },
          300: { value: '#fde452' },
          400: { value: '#f8d92d' },
          500: { value: '#f4ce14' },
          600: { value: '#d9b80f' },
          700: { value: '#bfa20c' },
          800: { value: '#9e860a' },
          900: { value: '#7a6607' }
        },
        black: { value: '#333' },
        green: { value: '#495e57' },
        gray: { value: '#edefee' },
        white: { value: '#fff' }
      },
      radii: {
        md: { value: '16px' }
      }
    }
  }
});

export const system = createSystem(defaultConfig, config);
