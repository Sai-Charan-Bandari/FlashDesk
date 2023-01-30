import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Heading, HStack, ScrollView, SimpleGrid, VStack } from 'native-base'
import {OptionCard1,OptionCard2} from './OptionCard'
import { navToHome } from '../Recoil/Atoms'
import {useSetRecoilState} from 'recoil'

const categories=['Business','Entertainment', 'Health',  'Science', 'Sports', 'Technology']
const sourcesArr=['cnn','bbc-news','fox-news','reuter','vice-news','business-insider','bbc-sport','bloomberg','buzzfeed','cnbc','engadget','entertainment-weekly','espn','espn-cric-info']
const StartOptions = ({navigation}) => {
    const setNavToHome = useSetRecoilState(navToHome)
    useEffect(()=>{
        setNavToHome(navigation)
        // getSourcesData()
    },[])
    const [sources,setSources]=useState(sourcesArr)

    // const getSourcesData=async()=>{
    //     let d1=await fetch('https://saurav.tech/NewsAPI/sources.json')
    //     let d2=await d1.json()
    //     setSources(d2.sources)
    // }

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
        <Heading mt='20'>Sources</Heading>
      <SimpleGrid columns={2}  mt='10' 
         bg='red.600' p='2'  roundedLeft={5}>
            {sources.map((ele,i)=>
        <OptionCard2 key={i} src={ele} color={i%3==0 ? 'blue.500' :( i%5==0 ? 'yellow.300' : i%2==0 ? 'orange.500' : 'green.500')} ></OptionCard2>
        )}
      </SimpleGrid >
      <Button mt='5' width={'3/4'} onPress={()=>navigation.navigate('Home',{text:'General',color:'indigo.200'})}>
        next
      </Button>
      </Center>
        </ScrollView>
  )
}

export default StartOptions
export {categories,sourcesArr}