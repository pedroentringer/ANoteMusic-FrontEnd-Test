import React from 'react'

import { Box, BoxProps } from '@chakra-ui/react'

const Card = ({ children, ...props }: BoxProps) => {
  return (
    <Box
    backgroundColor="white"
    boxShadow="lg"
    borderRadius={4}
    padding={4}
    {...props}
  >
    {children}
  </Box>
  )
}

export default Card
