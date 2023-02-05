import { View, Text,Switch, TouchableOpacity} from 'react-native'
import React from 'react'
import {useRecoilState,useRecoilValue} from 'recoil'
import { savedNewsArticles,loadImg,username,savedCategories } from '../Recoil/Atoms'
import { FlatList,Box, HStack ,Button} from 'native-base'
import NewsCard from './NewsCard'
import { OptionCard1 } from './OptionCard'

const Profile = ({navigation}) => {
    let val=useRecoilValue(savedNewsArticles)
    let uname=useRecoilValue(username)
    let [isloadImg,setIsLoadImg]=useRecoilState(loadImg)
    let [savedCat,setSavedCat]=useRecoilState(savedCategories)
  return (
    <Box pl='3'>


      <Text>User Name : {uname}</Text>
      <Text>Email : </Text>
      {/* show/hide imgs */}
            <HStack alignItems={'center'}>
    <TouchableOpacity onPress={()=>setIsLoadImg(!isloadImg)}><Text>Load images in FlashCards</Text></TouchableOpacity>
        <Switch value={isloadImg} onChange={()=>setIsLoadImg(!isloadImg)}></Switch>
            </HStack>
            {/* saved flash cards */}
            {/* saved authors */}
            {/* saved  sources*/}

          {/* saved categories */} 
          {/* 'general' is saved by default */}
          {savedCat.length==1 ? <Text>No Categories saved yet.</Text> 
          : 
          <Box>
          <Text>Saved Categories</Text>
        <FlatList data={savedCat} renderItem={(ele)=>
          <OptionCard1 cat={ele.item} color='blue' />
        }/>
        </Box>
        }
        <Button onPress={()=>navigation.navigate('EditSavedCat')} bg='red.700' _text={{color:'white'}}>Edit Saved Categories</Button>

            {/* saved flashcards */}
      {val.length<1
      ? <Text>No FlashCards saved yet.</Text> 
      : 
      <Box>
      <Text>Saved FlashCards</Text>
        <FlatList data={val} renderItem={(ele)=>
         <TouchableOpacity onPress={()=>navigation.navigate('ArticlePage',{data:ele.item})}>
         <NewsCard data={ele.item} saved={true}/>   
       </TouchableOpacity>
        }/>
        </Box>
        }
    </Box>
  )
}

export default Profile