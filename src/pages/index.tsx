import React, { useRef, useState } from 'react'
import { useAuth } from '../hook/useAuth'

import Image from 'next/image'

import { Heading, Text, Box, Flex } from '@chakra-ui/react'

import Container from '../components/Container'
import Card from '../components/Card'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import Input from '../components/Input'
import ButtonGradient from '../components/ButtonGradient'

import logoImg from '../assets/images/logo_standard_negative.svg'
import bgImg from '../assets/images/Intro-old-V2.jpg'

interface FormDataProps {
  email: string
  password: string
}

const Login = () => {
  const { loginAuth } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<FormHandles>(null)

  const handleLogin = async ({ email, password }: FormDataProps) => {
    setIsLoading(true)
    await loginAuth({ email, password, redirectRouter: 'home' })
    setIsLoading(false)
  }

  return (
    <Box
      backgroundImage={`url(${bgImg.src})`}
      backgroundPosition="center center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      height='100vh'
    >
      <Container height="100%">
        <Flex height="100%" justifyContent="center" alignItems="center" flexDirection="column">

          <Image src={logoImg} alt="ANote Music" width="200" height="55px" />
          <Card
            maxWidth="20rem"
            marginTop="20px"
          >
            <Heading size="sm" fontWeight="bold" color="blue.500">Log In</Heading>
            <Text mb={4} size="xs" fontWeight="300">Please insert your accounts email and password to log into the platform</Text>

            <Form
              ref={formRef}
              onSubmit={handleLogin}
            >
              <Input type="email" name="email" placeholder="E-mail" />

              <Input
                type="password"
                name="password"
                placeholder="Password"
                margin="10px 0"
              />

              <ButtonGradient
                type="submit"
                isLoading={isLoading}
              >
                Log In
              </ButtonGradient>
            </Form>
          </Card>
        </Flex>

      </Container>
    </Box>
  )
}
export default Login
