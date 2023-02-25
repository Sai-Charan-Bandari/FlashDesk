import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Intro = () => {
  return (
    <View style={{paddingLeft:10}}>
      <Text style={{fontWeight:'500'}}>Thanks for trying out.</Text>
      <Text style={{fontWeight:'500'}}>Creator : BSC</Text>
      <Text style={{fontWeight:'500'}}>Platform : React-Native</Text>
      <Text style={{fontWeight:'500'}}>Github : Click on App icon to visit GitHub</Text>
      <Text style={{fontWeight:'500'}}>Features of this app :</Text>
      <Text>
      FlashDesk is a simplistic news app that allows users to select and save Categories, Sources, News Articles, Default Category, block Uninterested Sources
      </Text>
      <Text style={{fontWeight:'500'}}>Why create an account ? : </Text>
      <Text>Creating an account stores your saved options into cloud database and allows you to retrieve your saved options in any device you login with ease.</Text>
      <Text>All options saved by unlogged users will remain temporarily in the app and will reset when app restarts.</Text>
      {/* <Text>Tutorial : </Text> */}
    </View>
  )
}

export default Intro

const styles = StyleSheet.create({})