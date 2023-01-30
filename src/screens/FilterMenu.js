import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Box, Button, HStack, ScrollView } from 'native-base'
import { categories } from './StartOptions'

// shows different categories and select a specific category

const FilterMenu = ({type,setCategorizer}) => {
    let [highlight,setHighlight]=useState(type)
    
  return (
    <Box>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} p='2'>
            {categories.map((ele,i)=>
            <Button m='2' p='2' key={i} rounded={25} bgColor={highlight==ele ? 'white' : 'red.800'} _text={{color:highlight==ele ?'black' :'white',fontWeight:'bold'}}
            onPress={()=>{setHighlight(ele);setCategorizer(ele)}}>
                {ele}
                </Button>
            )}
        </ScrollView>
    </Box>
  )
}

export default FilterMenu

const styles = StyleSheet.create({})