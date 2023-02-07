import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './Home'
import ArticlePage from './ArticlePage'

const HomeNavContainer = () => {
    let Stack=createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='ArticlePage' component={ArticlePage}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default HomeNavContainer