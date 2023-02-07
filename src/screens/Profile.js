import { View, Text,Switch, TouchableOpacity} from 'react-native'
import React from 'react'
import {useRecoilState,useRecoilValue,useSetRecoilState} from 'recoil'
import { savedNewsArticles,loadImg,username,savedCategories,tabIndex,orderOfStartOptions, savedSources} from '../Recoil/Atoms'
import { FlatList,Box, HStack ,Button} from 'native-base'
import NewsCard from './NewsCard'
import  OptionCard from './OptionCard'

const Profile = ({navigation}) => {
    let val=useRecoilValue(savedNewsArticles)
    let uname=useRecoilValue(username)
    let [isloadImg,setIsLoadImg]=useRecoilState(loadImg)
    let savedCat=useRecoilValue(savedCategories)
    let savedSrc=useRecoilValue(savedSources)
    let setIndex=useSetRecoilState(tabIndex)
    let setRevertOrder=useSetRecoilState(orderOfStartOptions)
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

          {/* saved categories */} 
          {/* 'general' is saved by default */}
          <Text>{savedCat.length<2 ? 'No Categories saved yet.' : `Saved ${savedCat.length-1} categories.`} </Text> 
        <Button onPress={()=>{
          setRevertOrder(true)
          setIndex(0)
        }} bg='red.700' _text={{color:'white'}}>Edit Saved Categories</Button>

        {/* saved  sources*/}
        <Text>{savedSrc.length==0 ? 'No Sources saved yet. Save sources from articles you read.' : `Saved ${savedSrc.length} sources.`} </Text> 
        {savedSrc.length>0 &&
        <Button onPress={()=>{
          navigation.navigate('EditSavedSrc')
        }} bg='red.700' _text={{color:'white'}}>Edit Saved Sources</Button>
      }

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