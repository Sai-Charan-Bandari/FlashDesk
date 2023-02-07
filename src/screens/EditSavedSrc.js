import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Heading, HStack, ScrollView,  VStack ,IconButton,Icon, SimpleGrid, Square} from 'native-base'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { savedSources } from '../Recoil/Atoms'
import { useRecoilState } from 'recoil'


const EditSavedSrc = ({navigation}) => {
  let [savedSrc,setSavedSrc]=useRecoilState(savedSources)

  return (
    <Center bg='white'>
        <Text>Saved Sources</Text>
        <SimpleGrid columns={2}>

        {savedSrc.map((item)=>
        <Square key={item} m='2' rounded={5} shadow={5} size={40} bg='blue.800'>
          <Text style={{color:'white',fontSize:16}}>{item}</Text>
         <IconButton position={'absolute'} top='4' left='3' rounded={50} size={'md'} variant="solid" bg={'red.700'}  _icon={{
           as: AntDesign,
           name: "leftcircleo",color:'white',size:'lg'
          }}  onPress={()=>{navigation.goBack()}} />
          </Square>
        )
        }
          </SimpleGrid>
        </Center>
  )
}

export default EditSavedSrc