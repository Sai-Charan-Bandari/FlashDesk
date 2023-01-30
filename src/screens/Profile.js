import { View, Text,Switch, TouchableOpacity } from 'react-native'
import React from 'react'
import {useRecoilState} from 'recoil'
import { savedNewsArticles,loadImg } from '../Recoil/Atoms'
import { FlatList,Box, HStack } from 'native-base'
import NewsCard from './NewsCard'
const Profile = () => {
    let [val,setVal]=useRecoilState(savedNewsArticles)
    let [isloadImg,setIsLoadImg]=useRecoilState(loadImg)
    console.log("val is ",val)
  return (
    <View>
      <Text>Name</Text>
      <Text>Userid</Text>
            <HStack>
    <TouchableOpacity onPress={()=>setIsLoadImg(!isloadImg)}><Text>Load images in FlashCards</Text></TouchableOpacity>
        <Switch value={isloadImg} onChange={()=>setIsLoadImg(!isloadImg)}></Switch>
            </HStack>
      {val.length<1 && <Text>arey yaar</Text> }
        <FlatList data={val} renderItem={(ele)=>
        <NewsCard data={ele.item}/>
        }/>
    </View>
  )
}

export default Profile