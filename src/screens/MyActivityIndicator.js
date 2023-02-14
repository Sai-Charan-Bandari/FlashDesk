import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Box, Center } from 'native-base'

const MyActivityIndicator = () => {
  return (
    <Box width='220' rounded={10} bg={'white'} height='220' m='auto' p='5' justifyContent={'center'}>
        <Center >
        <ActivityIndicator size={100} color='red'/>
        </Center>
        </Box>
  )
}

export default MyActivityIndicator

const styles = StyleSheet.create({})