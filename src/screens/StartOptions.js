import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'native-base'

const StartOptions = ({navigation}) => {
  return (
    <View>
      <Text>StartOptions</Text>
      <Button onPress={()=>navigation.navigate('Home')}>
        next
      </Button>
    </View>
  )
}

export default StartOptions