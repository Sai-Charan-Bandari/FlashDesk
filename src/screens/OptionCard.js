import { View, Text } from 'react-native'
import React from 'react'
import { Box, Button } from 'native-base'
import {useSetRecoilState,useRecoilState} from 'recoil'
import { tabIndex,savedCategories,category} from '../Recoil/Atoms'
import { useRecoilValue } from 'recoil'

const OptionCard1 = ({cat,color}) => {
  return (
    <Button shadow={5} size={40}  _text={{fontSize:'18',fontWeight:'bold',color:'black'}} rounded='5' m='2' bg={color}
    onPress={()=>navigation.navigate('Home',{cat:cat,color:color})}
    >
      {cat} 
    </Button >
  )
}
const OptionCard2 = ({src,color}) => {
  return (
    <Button shadow={5} size={40}  _text={{fontSize:'18',fontWeight:'bold',color:'black'}} rounded='5' m='2' bg={color}
    onPress={()=>navigation.navigate('Home',{src:src,color:color})}
    >
      {src} 
    </Button >
  )
}

const OptionCard = ({cat,color,type}) => {
  
  if(type){
    // button
    let setIndex=useSetRecoilState(tabIndex)
    let setCategory=useSetRecoilState(category)
  return (
    <Button shadow={5} size={40}  _text={{fontSize:'18',fontWeight:'bold',color:'black'}} rounded='5' m='2' bg={color}
    onPress={()=>{
      setCategory(cat.toLowerCase())
      setIndex(1)
    }}
    >
      {cat} 
    </Button >
  )}
  else{
    //checkbox
    let [savedCat,setSavedCat] = useRecoilState(savedCategories)
    let lowerCat=cat.toLowerCase()
    return(
      <Button shadow={5} size={40}  _text={savedCat.includes(lowerCat) ? {fontSize:'18',fontWeight:'bold', color:'white'} : {fontSize:'18',fontWeight:'bold',color:'blue.500'}} rounded='5' m='2' bg={color}
    onPress={()=>{
      if(savedCat.includes(lowerCat)){
        let k=savedCat.filter((e)=>e!=lowerCat)
        setSavedCat(k)
      }else{
        // console.log('else blok')
        // let k=[...savedCat]
        // k.push(lowerCat)
        // setSavedCat(k)
        setSavedCat([...savedCat,lowerCat])
      }
    }}
    >
      {cat} 
    </Button >
    )
  }
}
export default OptionCard