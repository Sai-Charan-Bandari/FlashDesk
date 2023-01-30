import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Button, Center, HStack, VStack } from 'native-base'
import OptionCard from './OptionCard'
import { navToHome } from '../Recoil/Atoms'
import {useSetRecoilState} from 'recoil'

const categories=['Business','Entertainment', 'Health',  'Science', 'Sports', 'Technology']

const StartOptions = ({navigation}) => {
    const setNavToHome = useSetRecoilState(navToHome)
    useEffect(()=>{
        setNavToHome(navigation)
    },[])
  return (
      <Center m='5' >
      <HStack  mt='20' >
        <VStack  bg='red.600' pl='2' py='2' roundedLeft={5}>
        <OptionCard text={categories[0]} color='white' ></OptionCard>
        <OptionCard text={categories[1]} color='orange.400'></OptionCard>
        <OptionCard text={categories[2]} color='purple.400'></OptionCard>
        </VStack>
        <VStack bg='red.600' py='2' pr='2' roundedRight={5}>
        <OptionCard text={categories[3]} color='yellow.400'></OptionCard>
        <OptionCard text={categories[4]} color='blue.400'></OptionCard>
        <OptionCard text={categories[5]} color='green.400'></OptionCard>
        </VStack>
      </HStack>
      <Button mt='5' width={'3/4'} onPress={()=>navigation.navigate('Home',{text:'general'})}>
        next
      </Button>
      </Center>
  )
}

export default StartOptions
export {categories}