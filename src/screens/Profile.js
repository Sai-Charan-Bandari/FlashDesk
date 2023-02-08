import { View, Text,Switch, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import {useRecoilState,useRecoilValue,useSetRecoilState} from 'recoil'
import { savedNewsArticles,loadImg,username,savedCategories,tabIndex,orderOfStartOptions, savedSources,notInterestedSources, defaultCategory} from '../Recoil/Atoms'
import { FlatList,Box, HStack ,Button, Radio} from 'native-base'
import NewsCard from './NewsCard'
import  OptionCard from './OptionCard'
import { categories } from './StartOptions'

const Profile = ({navigation}) => {
    let val=useRecoilValue(savedNewsArticles)
    let uname=useRecoilValue(username)
    let [isloadImg,setIsLoadImg]=useRecoilState(loadImg)
    let savedCat=useRecoilValue(savedCategories)
    let savedSrc=useRecoilValue(savedSources)
    let notSrc=useRecoilValue(notInterestedSources)
    let setIndex=useSetRecoilState(tabIndex)
    let setRevertOrder=useSetRecoilState(orderOfStartOptions)
    let [radioValue,setRadioValue]=useRecoilState(defaultCategory)
  return (
    <Box pl='3'>
      <Text>User Name : {uname}</Text>
      <Text>Email : </Text>

      {/* show/hide imgs in flashcards*/}
            <HStack alignItems={'center'}>
    <TouchableOpacity onPress={()=>setIsLoadImg(!isloadImg)}><Text>Load images in FlashCards</Text></TouchableOpacity>
        <Switch value={isloadImg} onChange={()=>setIsLoadImg(!isloadImg)}></Switch>
            </HStack>

      {/* set default category to load flashcards */}
      <HStack alignItems={'center'}>
      <Text>{radioValue=='' ? 'Set default category to load upon login':'Default category set to '+radioValue}</Text>
      <Switch value={radioValue!=''} onChange={()=>setRadioValue('')}></Switch>
      </HStack>
          <Radio.Group value={radioValue} onChange={nextValue => {setRadioValue(nextValue);}}>
            <FlatList data={categories} renderItem={({item})=>
          <Radio value={item}>{item}</Radio>
          }/>
          </Radio.Group>
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
          navigation.navigate('EditSavedSrc',{type:true})
        }} bg='red.700' _text={{color:'white'}}>Edit Saved Sources</Button>
      }

        {/* blocked/not interested sources */}
        {notSrc.length!=0 &&
      <Box>
      <Text>Blocked {notSrc.length} Sources</Text>
      <Button onPress={()=>{
          navigation.navigate('EditSavedSrc',{type:false})
        }} bg='red.700' _text={{color:'white'}}>Edit Blocked Sources</Button>
        </Box>
        }

           {/* saved flashcards */}
     <Text>{val.length<1 ? 'No FlashCards saved yet.' : 'Saved '+val.length+' FlashCards'}</Text> 
      {val.length>=1 &&
      <Button onPress={()=>{
        navigation.navigate('SavedNewsCards')
      }} bg='red.700' _text={{color:'white'}}>Checkout saved FlashCards</Button>
        }

  {/* saved authors */}
    </Box>
  )
}

export default Profile