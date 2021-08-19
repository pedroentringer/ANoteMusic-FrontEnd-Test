import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  FormControl
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name: string
  type: string
  placeholder?: string
}

const Input = ({ name, type, placeholder, ...props }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      }
    })
  }, [fieldName, registerField])
  return (
    <FormControl isInvalid={!!error}>
      <ChakraInput
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        width="100%"
        {...props}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

export default Input
