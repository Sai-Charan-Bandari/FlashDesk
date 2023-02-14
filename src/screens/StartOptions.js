import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Heading, HStack, ScrollView,  VStack ,IconButton,Icon} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import OptionCard from './OptionCard'
import {useSetRecoilState,useRecoilState,useRecoilValue} from 'recoil'
import { tabIndex,orderOfStartOptions } from '../Recoil/Atoms'

const categories=['Business','Entertainment', 'Health',  'Science', 'Sports', 'Technology']
// const sourcesArr=['cnn','bbc-news','fox-news','reuter','vice-news','business-insider','bbc-sport','bloomberg','buzzfeed','cnbc','engadget','entertainment-weekly','espn','espn-cric-info']

const StartOptions = () => {
let revertOrder=useRecoilValue(orderOfStartOptions)

  return (
    <ScrollView>
      {revertOrder
      ?
<Center >
  <Options2 />
  {/* <Options1 /> */}
      </Center>
      :
<Center m='5'>
  <Options1 />
  <Options2 />
      </Center>
      }
        </ScrollView>
  )
}

const Options1=()=>{
  let setIndex=useSetRecoilState(tabIndex)
  return(
    <Center m='5'>
    <Heading >
      Checkout a category
    </Heading>
    <HStack  my={'9'} >
      <VStack  bg='red.600' pl='2' py='2' roundedLeft={5}>
      <OptionCard cat={categories[0]} type={true} color='white' ></OptionCard>
      <OptionCard cat={categories[1]} type={true} color='orange.400'></OptionCard>
      <OptionCard cat={categories[2]} type={true} color='purple.400'></OptionCard>
      </VStack>
      <VStack bg='red.600' py='2' pr='2' roundedRight={5}>
      <OptionCard cat={categories[3]} type={true} color='yellow.400'></OptionCard>
      <OptionCard cat={categories[4]} type={true} color='blue.400'></OptionCard>
      <OptionCard cat={categories[5]} type={true} color='green.400'></OptionCard>
      </VStack>
    </HStack>
    <Button my='2' _text={{fontSize:'18',fontWeight:'bold', color:'white'}}  onPress={()=>setIndex(1)}>next</Button>
    </Center>
  )
}

const Options2=()=>{
  let setIndex=useSetRecoilState(tabIndex)
  let [revertOrder,setRevertOrder]=useRecoilState(orderOfStartOptions)
  return(
    <Center m='5'>
    <Heading mt='10'>Edit Saved Categories</Heading>
      <HStack  mt={'10'} >
        <VStack  bg='red.600' pl='2' py='2' roundedLeft={5}>
        <OptionCard cat={categories[0]} type={false} color='white' ></OptionCard>
        <OptionCard cat={categories[1]} type={false} color='orange.400'></OptionCard>
        <OptionCard cat={categories[2]} type={false} color='purple.400'></OptionCard>
        </VStack>
        <VStack bg='red.600' py='2' pr='2' roundedRight={5}>
        <OptionCard cat={categories[3]} type={false} color='yellow.400'></OptionCard>
        <OptionCard cat={categories[4]} type={false} color='blue.400'></OptionCard>
        <OptionCard cat={categories[5]} type={false} color='green.400'></OptionCard>
        </VStack>
      </HStack>
      <Button mt='5'  _text={{fontSize:'18',fontWeight:'bold', color:'white'}}  onPress={()=>{
        if(revertOrder==true)
        setRevertOrder(false)
        setIndex(1)
      }}>
        next
      </Button>
      </Center>
  )
}

export default StartOptions
export {categories}