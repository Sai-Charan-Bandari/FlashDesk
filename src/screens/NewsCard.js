import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Center ,IconButton,Icon, HStack, Box,Image, Divider, Button,Pressable} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {savedNewsArticles,loadImg} from '../Recoil/Atoms'
import {useRecoilState, useRecoilValue} from 'recoil'

//saved tells whether we r referring to cards in home pg or saved cards
const NewsCard = ({data,saved}) => {
let [val,set]=useRecoilState(savedNewsArticles)
let isloadImg = useRecoilValue(loadImg)
useEffect(()=>{
    val.forEach((ele)=>
    console.log(ele.title)
    )
},[val])
// save option state
//if this data is already in savednewsarticles then it must be true else false
let [save,setSave]=useState(false)
console.log('the value of save is ',save)
  return (
    <Box my='5' rounded={10} mx='2' shadow='5' bg='white' p='3' >
    <HStack m='auto' >
      <Box bg='white' mr='50'  >
        <Text style={{fontWeight:'bold',fontSize:16}}>{data.title}</Text>
        </Box>
        {saved
        ?
        <IconButton ml='auto' height={10} mr='2' mt='2'variant="solid" bgColor={"red.700"}
        icon={<Icon size="md" as={MaterialCommunityIcons} name="delete" color={ "white"} />}
        onPress={()=>{
                let k=val.filter((e)=>e!=data)
                set(k)
        }}
      />
    :
      <IconButton ml='auto' height={10} mr='2' mt='2'variant="solid" bgColor={save ? "red.700" : 'blue.500'}
        icon={<Icon size="md" shadow={4} as={MaterialCommunityIcons} name="bookmark" color={ "white"} />}
        onPress={()=>{
            if(save){
                let k=val.filter((e)=>e!=data)
                set(k)
            }else{
                if(!val.includes(data)) //not mandatory
                set([...val,data]);
            }
            setSave(!save)
        }}
      />
    }
        </HStack>
      <Divider orientation='horizontal' bg='black' m='2'/>
        {isloadImg && <Image source={{uri:data.urlToImage}} rounded='5' alt="Alternate Text" height={200} width={'100%'}/>}
      {data.description}
    </Box>
  )
}

export default NewsCard