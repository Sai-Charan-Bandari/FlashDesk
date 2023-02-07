import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Center ,IconButton,Icon, HStack, Box,Image, Divider, Button,Pressable, Toast, useToast} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {savedNewsArticles,loadImg} from '../Recoil/Atoms'
import {useRecoilState, useRecoilValue} from 'recoil'

//saved tells whether we r referring to cards in home pg or saved cards
const NewsCard = ({data,saved}) => {
let [val,set]=useRecoilState(savedNewsArticles)
let isloadImg = useRecoilValue(loadImg)
let toast=useToast()

useEffect(()=>{
    // val.forEach((ele)=>
    // console.log(ele.title)
    // )
    console.log('saved news articles : ',val.length)
},[val])

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
          // console.log('inside onPress')
                let k=val.filter((e)=>e.title!=data.title)
                set(k)
                toast.show({description:'unsaved',duration:300})
        }}
      />
    :
      <IconButton ml='auto' height={10} mr='2' mt='2'variant="solid" bgColor={val.filter((e)=>e.title==data.title).length > 0 ? "red.700" : 'blue.500'}
        icon={<Icon size="md" shadow={4} as={MaterialCommunityIcons} name="bookmark" color={ "white"} />}
        onPress={()=>{
          if(val.filter((e)=>e.title==data.title).length > 0){
                let k=val.filter((e)=>e.title!=data.title)
                set(k)
                toast.show({description:'unsaved',duration:300})
              }else{
                set([...val,data]);
                toast.show({description:'saved',duration:300})
            }
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