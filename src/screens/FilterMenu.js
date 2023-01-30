import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Box, Button, Center, HStack, ScrollView } from 'native-base'
import { categories,sourcesArr } from './StartOptions'

// shows different categories and select a specific category

const FilterMenu = ({type,setCategorizer,source,setSource}) => {
    let [highlight,setHighlight]=useState(type ? type : source)
    let [toggle,setToggle]=useState(true)
  return (
    <Box >
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
            {sourcesArr.map((ele,i)=>
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