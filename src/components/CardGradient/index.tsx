import React from 'react'

import { Box, BoxProps } from '@chakra-ui/react'

const CardGradient = ({ children, ...props }: BoxProps) => {
  return (
    <Box
    color="white"
    backgroundImage="linear-gradient(200deg,#0e7aba,#000)"
    _hover={{
      backgroundImage: 'linear-gradient(200deg,#036aa9,#000)'
    }}
    boxShadow="lg"
    borderRadius={4}
    padding={4}
    {...props}
  >
    {children}
  </Box>
  )
}

export default CardGradient
