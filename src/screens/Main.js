import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HeaderMenu from './HeaderMenu'
import Home from './Home'
import StartOptions from './StartOptions'
import ArticlePage from './ArticlePage'
import Profile from './Profile'

const Main = () => {
    let Stack=createNativeStackNavigator()
  return (
    <NavigationContainer>
        <HeaderMenu />
        <Stack.Navigator initialRouteName='StartOptions'>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='StartOptions' component={StartOptions}/>
            <Stack.Screen name='ArticlePage' component={ArticlePage}/>
            <Stack.Screen name='Profile' component={Profile}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main