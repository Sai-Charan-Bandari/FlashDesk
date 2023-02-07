import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Heading, HStack, ScrollView,  VStack ,IconButton,Icon, SimpleGrid, Square} from 'native-base'
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { savedSources,notInterestedSources } from '../Recoil/Atoms'
import { useRecoilState } from 'recoil'

// This comp is used to display both saved and not interested src
const EditSavedSrc = ({navigation,route:{params:{type}}}) => {
  let [savedSrc,setSavedSrc]=useRecoilState(savedSources)
  let [notSrc,setNotSrc]=useRecoilState(notInterestedSources)

  if(type){ //saved src
  return (
    <Center bg='white'>
      <HStack>
          <IconButton rounded={50} size={'md'} variant="solid" bg={'red.700'}  _icon={{
            as: AntDesign,
            name: "leftcircleo",color:'white',size:'lg'
          }}  onPress={()=>{navigation.goBack()}} />
        <Text>Saved Sources</Text>
          </HStack>
        {savedSrc.length==0
        ?
          <Box>Empty</Box>
        :
        <SimpleGrid columns={2}>
        {savedSrc.map((item)=>
        <Square key={item} m='2' rounded={5} shadow={5} size={40} bg='blue.800'>
          <Text style={{color:'white',fontSize:16}}>{item}</Text>
          <IconButton mx='auto' height={10} mt='2'variant="solid" bgColor={"red.700"}
        icon={<Icon size="md" as={MaterialCommunityIcons} name="delete" color={ "white"} />}
        onPress={()=>{
                let k=savedSrc.filter((e)=>e!=item)
                setSavedSrc(k)
        }}
      />
          </Square>
        )
        }
          </SimpleGrid>
        }
        </Center>
  )
      }else{ //not interested src
        return(
          <Center bg='white'>
          <HStack>
              <IconButton rounded={50} size={'md'} variant="solid" bg={'red.700'}  _icon={{
                as: AntDesign,
                name: "leftcircleo",color:'white',size:'lg'
              }}  onPress={()=>{navigation.goBack()}} />
            <Text>Blocked Sources</Text>
              </HStack>
            {notSrc.length==0
            ?
              <Box>Empty</Box>
            :
            <SimpleGrid columns={2}>
            {notSrc.map((item)=>
            <Square key={item} m='2' rounded={5} shadow={5} size={40} bg='blue.800'>
              <Text style={{color:'white',fontSize:16}}>{item}</Text>
              <IconButton mx='auto' height={10} mt='2'variant="solid" bgColor={"red.700"}
            icon={<Icon size="md" as={MaterialCommunityIcons} name="delete" color={ "white"} />}
            onPress={()=>{
                    let k=notSrc.filter((e)=>e!=item)
                    setNotSrc(k)
            }}
          />
              </Square>
            )
            }
              </SimpleGrid>
            }
            </Center>
        )
      }
}

export default EditSavedSrc