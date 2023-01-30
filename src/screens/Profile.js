import { View, Text } from 'react-native'
import React from 'react'
import {useRecoilState} from 'recoil'
import { savedNewsArticles } from '../Recoil/Atoms'
import { FlatList } from 'native-base'
import NewsCard from './NewsCard'
const Profile = () => {
    let [val,setVal]=useRecoilState(savedNewsArticles)
    console.log("val is ",val)
  return (
    <View>
      <Text>Name</Text>
      <Text>Userid</Text>
      {val.length<1 && <Text>arey yaar</Text> }
        <FlatList data={val} renderItem={(ele)=>
        <NewsCard data={ele.item}/>
        }/>
    </View>
  )
}

export default Profile