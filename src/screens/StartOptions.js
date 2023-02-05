import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Heading, HStack, ScrollView,  VStack ,IconButton,Icon} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import OptionCard from './OptionCard'
import {useSetRecoilState} from 'recoil'
import { tabIndex } from '../Recoil/Atoms'

const categories=['Business','Entertainment', 'Health',  'Science', 'Sports', 'Technology']
// const sourcesArr=['cnn','bbc-news','fox-news','reuter','vice-news','business-insider','bbc-sport','bloomberg','buzzfeed','cnbc','engadget','entertainment-weekly','espn','espn-cric-info']

//type parameter is not undefined if this comp is called by EditSavedCat
const StartOptions = ({type}) => {
let setIndex=useSetRecoilState(tabIndex)

  //false -> button
  //true -> checkbox


  return (
    <View>
      <Center m={'5'} >
        {/* if type == undefined or type==false then else block will be executed below */}
    <Heading >{type ? 'Saved Categories': 'Select a Category'}</Heading>
      <HStack  mt={'10'} >
        <VStack  bg='red.600' pl='2' py='2' roundedLeft={5}>
        <OptionCard cat={categories[0]} type={type ? true : false} color='white' ></OptionCard>
        <OptionCard cat={categories[1]} type={type ? true : false} color='orange.400'></OptionCard>
        <OptionCard cat={categories[2]} type={type ? true : false} color='purple.400'></OptionCard>
        </VStack>
        <VStack bg='red.600' py='2' pr='2' roundedRight={5}>
        <OptionCard cat={categories[3]} type={type ? true : false} color='yellow.400'></OptionCard>
        <OptionCard cat={categories[4]} type={type ? true : false} color='blue.400'></OptionCard>
        <OptionCard cat={categories[5]} type={type ? true : false} color='green.400'></OptionCard>
        </VStack>
      </HStack>
      {/* <Button mt='5' width={'3/4'} onPress={()=>navigation.navigate('Home',{text:'General',color:'indigo.200'})}>
        next
      </Button> */}
      <Button mt='5' width={'3/4'} onPress={()=>setIndex(1)}>
        next
      </Button>
      </Center>
        </View>
  )
}

export default StartOptions
export {categories}