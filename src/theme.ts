import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        black: { value: '#333' }, // $color-black
        white: { value: '#fff' }, // $color-white
        green: { value: '#495e57' }, // $color-green
        yellow: { value: '#f4ce14' }, // $color-yellow
        gray: { value: '#edefee' }, // $color-gray
        brand: {
          400: { value: '#f4ce14' }, // main brand
          600: { value: '#495e57' } // darker companion
        }
      }
    },
    semanticTokens: {
      colors: {
        bg: { value: '{colors.white}' }, // page background
        fg: { value: '{colors.black}' }, // body text
        card: { value: '{colors.gray}' }, // subtle surfaces
        brand: { value: '{colors.brand.400}' } // convenience alias
      }
    }
  }
});

export const system = createSystem(defaultConfig, config);
