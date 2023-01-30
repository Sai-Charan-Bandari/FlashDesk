import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Box, Button, HStack, ScrollView } from 'native-base'

// shows different categories and select a specific category

const FilterMenu = ({type}) => {
    let [highlight,setHighlight]=useState(type)
    let typeArr=[' All ','Technology','Sports','Economy','Politics','Science','Stocks','Wildlife']
  return (
    <Box>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} p='2'>
            {typeArr.map((ele,i)=>
            <Button m='2' p='2' key={i} rounded={25} bgColor={highlight==ele ? 'white' : 'red.800'} _text={{color:highlight==ele ?'black' :'white',fontWeight:'bold'}}
            onPress={()=>setHighlight(ele)}>
                {ele}
                </Button>
            )}
        </ScrollView>
    </Box>
  )
}

export default FilterMenu

const styles = StyleSheet.create({})