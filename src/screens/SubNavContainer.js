import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HeaderMenu from './HeaderMenu'
import StartOptions from './StartOptions'
import Profile from './Profile'


const Main = () => {
    let Stack=createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Profile' screenOptions={{headerShown:false}}>
            <Stack.Screen name='StartOptions' component={StartOptions}/>
            <Stack.Screen name='Profile' component={Profile}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main