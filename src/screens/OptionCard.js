import { View, Text } from 'react-native'
import React from 'react'
import { Box, Button } from 'native-base'
import { navToHome } from '../Recoil/Atoms'
import { useRecoilValue } from 'recoil'

const OptionCard1 = ({cat,color}) => {
  const navigation = useRecoilValue(navToHome)
  return (
    <Button shadow={5} size={40}  _text={{fontSize:'18',fontWeight:'bold',color:'black'}} rounded='5' m='2' bg={color}
    onPress={()=>navigation.navigate('Home',{cat:cat,color:color})}
    >
      {cat} 
    </Button >
  )
}
const OptionCard2 = ({src,color}) => {
  const navigation = useRecoilValue(navToHome)
  return (
    <Button shadow={5} size={40}  _text={{fontSize:'18',fontWeight:'bold',color:'black'}} rounded='5' m='2' bg={color}
    onPress={()=>navigation.navigate('Home',{src:src,color:color})}
    >
      {src} 
    </Button >
  )
}

export {OptionCard1,OptionCard2}