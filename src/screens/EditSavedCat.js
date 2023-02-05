import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Heading, HStack, ScrollView,  VStack ,IconButton,Icon} from 'native-base'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { navToHome } from '../Recoil/Atoms'
import StartOptions from './StartOptions'
// import { useNavigation } from '@react-navigation/native'


const EditSavedCat = ({navigation}) => {

  return (
    <Box bg='white'>
        
         <IconButton position={'absolute'} top='4' left='3' rounded={50} size={'md'} variant="solid" bg={'red.700'}  _icon={{
             as: AntDesign,
             name: "leftcircleo",color:'white',size:'lg'
            }}  onPress={()=>{navigation.goBack()}} />
        <StartOptions type={true}/>
        </Box>
  )
}

export default EditSavedCat