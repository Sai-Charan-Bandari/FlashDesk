import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Heading, HStack, ScrollView,  VStack } from 'native-base'
import {OptionCard1,OptionCard2} from './OptionCard'
import { navToHome } from '../Recoil/Atoms'
import {useSetRecoilState} from 'recoil'

const categories=['Business','Entertainment', 'Health',  'Science', 'Sports', 'Technology']
// const sourcesArr=['cnn','bbc-news','fox-news','reuter','vice-news','business-insider','bbc-sport','bloomberg','buzzfeed','cnbc','engadget','entertainment-weekly','espn','espn-cric-info']
const StartOptions = () => {
    useEffect(()=>{
      
    },[])

  return (
    <ScrollView>

      <Center m='5' >
        <Heading mt='3'>Categories</Heading>
      <HStack  mt='10' >
        <VStack  bg='red.600' pl='2' py='2' roundedLeft={5}>
        <OptionCard1 cat={categories[0]} color='white' ></OptionCard1>
        <OptionCard1 cat={categories[1]} color='orange.400'></OptionCard1>
        <OptionCard1 cat={categories[2]} color='purple.400'></OptionCard1>
        </VStack>
        <VStack bg='red.600' py='2' pr='2' roundedRight={5}>
        <OptionCard1 cat={categories[3]} color='yellow.400'></OptionCard1>
        <OptionCard1 cat={categories[4]} color='blue.400'></OptionCard1>
        <OptionCard1 cat={categories[5]} color='green.400'></OptionCard1>
        </VStack>
      </HStack>
      <Button mt='5' width={'3/4'} onPress={()=>navigation.navigate('Home',{text:'General',color:'indigo.200'})}>
        next
      </Button>
      </Center>
        </ScrollView>
  )
}

export default StartOptions
export {categories}