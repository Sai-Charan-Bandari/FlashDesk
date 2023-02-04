import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Box, Button, Center, HStack, ScrollView } from 'native-base'
import { categories } from './StartOptions'
import { savedSources } from '../Recoil/Atoms'
import { useRecoilValue } from 'recoil'
// shows different categories and select a specific category

const FilterMenu = ({type,setCategorizer,source,setSource}) => {
    const sourcesArr = useRecoilValue(savedSources)
    let [highlight,setHighlight]=useState(type ? type : source)
    let [toggle,setToggle]=useState(true)
  return (
    <Box height={20}>
        {toggle
        ?
        <ScrollView horizontal showsHorizontalScrollIndicator={false} p='2'>
            <Button onPress={()=>setToggle(!toggle)} alignItems={'center'} bg='white' _text={{fontWeight:'bold',color:'black'}}>Categories</Button>
            {categories.map((ele,i)=>
            <Button m='2' p='2' key={i} rounded={25} bgColor={highlight==ele ? 'white' : 'red.800'} _text={{color:highlight==ele ?'black' :'white',fontWeight:'bold'}}
            onPress={()=>{setHighlight(ele);setCategorizer(ele)}}>
                {ele}
                </Button>
            )}
        </ScrollView>
        :
        <ScrollView horizontal showsHorizontalScrollIndicator={false} p='2'>
            <Button onPress={()=>setToggle(!toggle)} alignItems={'center'} bg='white' _text={{fontWeight:'bold',color:'black'}}>Sources</Button>
            {
            sourcesArr.length==1
            ?
            <Button m='2' p='2' rounded={25} bgColor={'red.800'} 
            onPress={()=>setToggle(!toggle)}>
                <Center  _text={{color:'white',fontWeight:'bold'}}>{sourcesArr[0]}</Center>
              </Button>

            :
            
            sourcesArr.map((ele,i)=>
            <Button m='2' p='2' key={i} rounded={25} bgColor={highlight==ele ? 'white' : 'red.800'} _text={{color:highlight==ele ?'black' :'white',fontWeight:'bold'}}
            onPress={()=>{setHighlight(ele);setSource(ele)}}>
                {ele}
                </Button>
            )}
        </ScrollView>
        }
    </Box >
  )
}

export default FilterMenu

const styles = StyleSheet.create({})