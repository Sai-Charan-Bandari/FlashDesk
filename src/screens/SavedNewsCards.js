import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { savedNewsArticles } from '../Recoil/Atoms'
import NewsCard from './NewsCard'
import { useRecoilValue } from 'recoil'
import { FlatList,Box, HStack ,Button, Radio,Center, Heading,IconButton} from 'native-base'
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const SavedNewsCards = ({navigation}) => {
    let val=useRecoilValue(savedNewsArticles)
  return (
    <View>
      {val.length==0
      ?
      <HStack my='3' alignItems={'center'}>
         <IconButton rounded={50} size={'md'} variant="solid" bg={'red.700'}  _icon={{
            as: AntDesign,
            name: "leftcircleo",color:'white',size:'lg'
          }}  onPress={()=>{navigation.goBack()}} />
          <Center><Heading >No FlashCards saved</Heading></Center>
      </HStack>
      :
      <Box>
      <HStack my='3' alignItems={'center'}>
         <IconButton rounded={50} size={'md'} variant="solid" bg={'red.700'}  _icon={{
            as: AntDesign,
            name: "leftcircleo",color:'white',size:'lg'
          }}  onPress={()=>{navigation.goBack()}} />
          <Center><Heading >Saved FlashCards</Heading></Center>
      </HStack>
        <FlatList height={'92%'} data={val} renderItem={(ele)=>
         <TouchableOpacity onPress={()=>navigation.navigate('ArticlePage',{data:ele.item})}>
         <NewsCard data={ele.item} saved={true}/>   
       </TouchableOpacity>
        }/>
        </Box>
      }
    </View>
  )
}

export default SavedNewsCards

const styles = StyleSheet.create({})