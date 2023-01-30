import { View, Text,Switch, TouchableOpacity } from 'react-native'
import React from 'react'
import {useRecoilState,useRecoilValue} from 'recoil'
import { savedNewsArticles,loadImg } from '../Recoil/Atoms'
import { FlatList,Box, HStack } from 'native-base'
import NewsCard from './NewsCard'
const Profile = ({navigation}) => {
    let val=useRecoilValue(savedNewsArticles)
    let [isloadImg,setIsLoadImg]=useRecoilState(loadImg)
  return (
    <Box pl='3'>
      <Text>Name</Text>
      <Text>Userid</Text>
      {/* show/hide imgs */}
            <HStack>
    <TouchableOpacity onPress={()=>setIsLoadImg(!isloadImg)}><Text>Load images in FlashCards</Text></TouchableOpacity>
        <Switch value={isloadImg} onChange={()=>setIsLoadImg(!isloadImg)}></Switch>
            </HStack>
            {/* saved flash cards */}
            {/* saved authors */}
            {/* saved  sources*/}
      {val.length<1 && <Text>No FlashCards saved yet.</Text> }
        <FlatList data={val} renderItem={(ele)=>
         <TouchableOpacity onPress={()=>navigation.navigate('ArticlePage',{data:ele.item})}>
         <NewsCard data={ele.item} saved={true}/>   
       </TouchableOpacity>
        }/>
    </Box>
  )
}

export default Profile