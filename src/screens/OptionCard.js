import { View, Text } from 'react-native'
import React from 'react'
import { Box, Button } from 'native-base'
import { navToHome } from '../Recoil/Atoms'
import { useRecoilValue } from 'recoil'
const OptionCard = ({text,color}) => {
  const navigation = useRecoilValue(navToHome)
  return (
    <Button shadow={5} size={40}  _text={{fontSize:'18',fontWeight:'bold',color:'black'}} rounded='5' m='2' bg={color}
    onPress={()=>navigation.navigate('Home',{text:text,color:color})}
    >
      {text}
    </Button >
  )
}

export default OptionCard