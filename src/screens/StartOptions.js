import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Button, Center, HStack, VStack } from 'native-base'
import OptionCard from './OptionCard'
import { navToHome } from '../Recoil/Atoms'
import {useSetRecoilState} from 'recoil'

const StartOptions = ({navigation}) => {
    const setNavToHome = useSetRecoilState(navToHome)
    useEffect(()=>{
        setNavToHome(navigation)
    },[])
  return (
      <Center m='5' >
      <HStack  mt='20' >
        <VStack  bg='blue.400'>
        <OptionCard text='Sports' color='white' ></OptionCard>
        <OptionCard text='Politics' color='orange.400'></OptionCard>
        </VStack>
        <VStack bg='red.600'>
        <OptionCard text='Economy' color='yellow.400'></OptionCard>
        <OptionCard text='Technology' color='blue.400'></OptionCard>
        </VStack>
      </HStack>
      <Button mt='5' width={'3/4'} onPress={()=>navigation.navigate('Home',{text:' All '})}>
        next
      </Button>
      </Center>
  )
}

export default StartOptions