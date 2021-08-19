import React from 'react'

import { Button, ButtonProps } from '@chakra-ui/react'

const ButtonGradient = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      color="white"
      backgroundImage="linear-gradient(200deg,#0e7aba,#000)"
      _hover={{
        backgroundImage: 'linear-gradient(200deg,#036aa9,#000)'
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default ButtonGradient
