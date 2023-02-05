import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import StartOptions from './StartOptions'
import Profile from './Profile'
import EditSavedCat from './EditSavedCat'

//NOTE: THIS TAB IS VISIBLE ONLY IF LOGGED IS TRUE...
//THE ABOVE LOGIC HAS BEEN IMPLEMENTED IN NAVTABS COMP..HENCE WE NEED NOT USE LOGGED AGAIN HERE
const SubNavContainer = () => {
    let Stack=createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Profile' screenOptions={{headerShown:false}}>
            {/* <Stack.Screen name='StartOptions' component={StartOptions}/> */}
            <Stack.Screen name='Profile' component={Profile}/>
            <Stack.Screen name='EditSavedCat' component={EditSavedCat}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default SubNavContainer