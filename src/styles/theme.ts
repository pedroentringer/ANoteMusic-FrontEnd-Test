import { extendTheme } from '@chakra-ui/react'
import { ChakraTheme } from '@chakra-ui/theme'

const customTheme = extendTheme<ChakraTheme>({
  sizes: {
    max: '1200px'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: '#323131'
      }
    }
  },
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
    mono: 'Menlo, monospace',
    h1: '"Poppins", Sans-serif'
  }
})
export default customTheme
