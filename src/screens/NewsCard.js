import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Center ,IconButton,Icon, HStack, Box,Image, Divider, Button,Pressable} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {savedNewsArticles} from '../Recoil/Atoms'
import {useRecoilState} from 'recoil'
import { useNavigation } from '@react-navigation/native'

const NewsCard = ({data}) => {
    let nav=useNavigation()
let [val,set]=useRecoilState(savedNewsArticles)
useEffect(()=>{
console.log(val)
},[val])
let [save,setSave]=useState(false)
  return (
    <Box my='5' rounded={10} mx='2' shadow='5' bg='white' p='3' >
    <HStack m='auto' >
      <Pressable bg='white' mr='50'  onPress={()=>nav.navigate('ArticlePage')} >
        <Text style={{fontWeight:'bold',fontSize:16}}>{data.title}</Text>
        </Pressable>
      <IconButton ml='auto' height={10} mr='2' mt='2'variant="solid" bgColor={save ? "red.700" : 'blue.500'}
        icon={<Icon size="md" as={MaterialCommunityIcons} name="bookmark" color={ "white"} />}
        onPress={()=>{
            if(save){
                // let k=val.filter((e)=>e!=data)
                // set(k)
            }else{
                set([...val,data]);
            }
            setSave(!save)
        }}
      />
        </HStack>
      <Divider orientation='horizontal' bg='black' mt='2'/>
        <Image source={{uri:data.urlToImage}} alt="Alternate Text" height={200} width={'100%'}/>
      {data.description}
    </Box>
  )
}

export default NewsCard