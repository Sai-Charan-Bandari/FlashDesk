import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'

const HeaderMenu = () => {
  const navigation=useNavigation()
  return (
    <View>
      <Text>Header</Text>
      <Button onPress={()=>navigation.navigate('Profile')}>
        next
      </Button>
    </View>
  )
}

export default HeaderMenu