import React, { ReactNode } from 'react'

import { Box, FlexProps } from '@chakra-ui/react'

interface ContainerProps extends FlexProps {
  children?: ReactNode
}

const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <Box
      as="main"
      maxWidth="1000px"
      margin="0 auto"
      {...props}
    >
      {children}
    </Box>
  )
}

export default Container
