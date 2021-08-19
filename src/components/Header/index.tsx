import React from 'react'
import Image from 'next/image'

import {
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Box
} from '@chakra-ui/react'

import logoImg from '../../assets/images/logo_standard_negative.svg'
import Container from '../../components/Container'
import { useAuth } from '../../hook/useAuth'

const Header = () => {
  const { user, logoutAuth } = useAuth()

  return (
      <Box
        padding={4}
        background="#0c7ab9"
      >
        <Container>

        <Flex
          width="100%"
          maxWidth="1200px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image src={logoImg} alt="ANote Music" width="200" height="55px" />

          <Menu>
            <MenuButton
              cursor="pointer"
              _hover={{
                opacity: '0.7'
              }}
              transition="opacity 0.2s ease-out"
            >
              <Avatar
                name={user?.fullName}
                backgroundImage="linear-gradient(200deg,#0e7aba,#000)"
                color="white"
                border=".5px solid"
                borderColor="white"
              />
            </MenuButton>
            <MenuList p={4}>

              <Text fontWeight="bold" color="gray.600">{user?.fullName}</Text>
              <Text color="gray.600">{user?.email}</Text>

              <MenuDivider />

              <MenuItem onClick={logoutAuth}>Log-Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        </Container>
      </Box>
  )
}

export default Header
