import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Profile from './Profile'
import EditSavedSrc from './EditSavedSrc'
import SavedNewsCards from './SavedNewsCards'
import ArticlePage from './ArticlePage'


//NOTE: THIS TAB IS VISIBLE ONLY IF LOGGED IS TRUE...
//THE ABOVE LOGIC HAS BEEN IMPLEMENTED IN NAVTABS COMP..HENCE WE NEED NOT USE LOGGED AGAIN HERE
const SubNavContainer = () => {
    let Stack=createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Profile' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Profile' component={Profile}/>
            <Stack.Screen name='ArticlePage' component={ArticlePage}/>
            <Stack.Screen name='EditSavedSrc' component={EditSavedSrc}/>
            <Stack.Screen name='SavedNewsCards' component={SavedNewsCards}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default SubNavContainer