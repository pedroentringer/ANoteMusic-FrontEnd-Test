import React, { useEffect, useState } from 'react'
import { useToast, Flex, Avatar, Text, Grid, Spinner } from '@chakra-ui/react'

import Container from '../../components/Container'
import Card from '../../components/Card'
import Header from '../../components/Header'

import api from '../../services/api'
import { useAuth } from '../../hook/useAuth'
import CardGradient from '../../components/CardGradient'

export interface Balance {
  currency: string;
  balance: number;
  stockedBalance: number;
  ewalletWalletId?: any;
  ewalletIbanId?: any;
  ewalletIbanIban?: any;
}

export interface UserDetail {
  id: string;
  updatedOn: Date;
  puzzle?: any;
  multiFactorLogin: boolean;
  notificationsOptOuts: string;
  statsIndex: number;
  premiumUntil: Date;
  tcAccepted?: any;
  lang: number;
  tcAcceptedVersion?: any;
  referralAmountLoaded: number;
  preferences: string;
  pcgEntryFee: number;
  pcgDividendFee: number;
  usableCodes: string;
  referralBonusStandard: number;
  referralBonusPro: number;
  createdOn: Date;
  accredReferrer: boolean;
  imageUrl?: any;
  pcgExitFee: number;
  algoPublicKey: string;
  platformEndpointArn?: any;
  currency: string;
  balance: string;
  stockedBalance: string;
  ewalletWalletId?: any;
  ewalletIbanId?: any;
  ewalletIbanIban?: any;
  provider: string;
  bankAccount?: any;
  bankName?: any;
  bankCountry?: any;
  bankCurrency?: any;
  bankDepositAccountTypeUS?: any;
  bankBranchCodeCA?: any;
  bankInstitutionNumberCA?: any;
  ewalletAccountId?: any;
  ewalletBankAccountId?: any;
  ewalletMandateId?: any;
  ewalletKycId?: any;
  ewalletKycUploadState: number;
  ewalletUboDeclarationId?: any;
  ewalletUboUploadState: number;
  balances: Balance[];
}

const formatMoney = (money:number, currency:string) => {
  const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  })

  return moneyFormatter.format(money)
}

const Home = () => {
  const [userDetails, setUserDetails] = useState<UserDetail | null>(null)

  const toast = useToast()
  const { user } = useAuth()

  useEffect(() => {
    fetchUserDeatils()
  }, [])

  const fetchUserDeatils = async () => {
    try {
      const response = await api.get('/users/info')

      setUserDetails(response.data.result.anote as UserDetail)
    } catch (err) {
      const message = err.response ? err.response.data.mensagem : err.message

      toast({
        title: 'Failed to feetch page',
        description: message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
        variant: 'left-accent'
      })
    }
  }

  return (
    <>
      <Header />
      <Container paddingY={6}>

      <Text fontSize="l" fontWeight="bold" mt={4} mb={2}>Profile</Text>
        {!userDetails && (
          <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        )}

        {userDetails && (
          <Card w="100%" borderRadius={10} boxShadow="xl">
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Flex alignItems="center">
                  <Avatar
                    name={user?.fullName}
                    backgroundImage="linear-gradient(200deg,#0e7aba,#000)"
                    color="white"
                    border=".5px solid"
                    borderColor="white"
                  />
                  <Flex ml={4} direction="column">
                    <Text fontSize={18} color="#0c7ab9" fontWeight="bold">{user?.fullName}</Text>
                    <Text fontSize={12}>{user?.email}</Text>
                  </Flex>
                </Flex>
                <Flex alignItems="center" justifyContent="flex-end">
                  <Text fontSize={18} color="#0c7ab9" fontWeight="bold">{userDetails.currency}</Text>
                  <Text ml={2} fontSize={18}>{formatMoney(parseFloat(userDetails.balance), userDetails.currency)}</Text>
                </Flex>
            </Grid>

            <Text mt={10} fontSize={14} fontWeight="bold" mb={2}>Financial</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {userDetails.balances.map(balance => (
                <CardGradient key={`balance-${balance.currency}`}>
                  <Flex alignItems="center" justifyContent="center">
                    <Text fontSize={18} color="white" fontWeight="bold">{balance.currency}</Text>
                    <Text ml={2} color="white" fontSize={18}>{formatMoney(balance.balance, balance.currency)}</Text>
                  </Flex>
                </CardGradient>
              ))}
            </Grid>
          </Card>
        )}
      </Container>
    </>
  )
}

export default Home
