import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Box, Center,AddIcon, Button} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import FilterMenu from './FilterMenu'

const Home=({navigation})=>{
  const Stack = createNativeStackNavigator();
  return(
    <Box>
      <FilterMenu />
      <Button onPress={()=>navigation.navigate('ArticlePage')}>
        next
      </Button>
    </Box>
  )
}

export default Home

const styles = StyleSheet.create({})