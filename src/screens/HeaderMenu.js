import { View, Text ,Linking} from 'react-native'
import React, { useState } from 'react'
import { Button, HStack ,IconButton,Icon,Image} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons,Ionicons } from '@expo/vector-icons'
import {logged} from '../Recoil/Atoms'
import { useRecoilValue } from 'recoil'
import LogModal from './LogModal'

const HeaderMenu = () => {
  const loggedIn=useRecoilValue(logged)
  const [showModal,setShowModal]=useState(false)
  return (
      <HStack p='3' style={{marginTop:5}}>
        {showModal && <LogModal setShowModal={setShowModal} />}
        <Button bg='red.700'
          onPress={()=>{Linking.openURL('https://github.com/Sai-Charan-Bandari/FlashDesk')}}
           _text={{fontFamily:'body',fontStyle:'italic',fontWeight:'bold'}}
        >
          FlashDesk
        </Button>
        
        <Button bg='red.700' ml='auto'
        onPress={()=>{
          if(showModal)
          setShowModal(false)
          else
          setShowModal(true)
        }}
        >
          {
            !loggedIn
            ?
            <Icon as={<MaterialIcons name="settings" />} color="white" size={6} />
            :
            <Ionicons name="person-circle-sharp" size={26} color="white" />
          }
          </Button>
      </HStack>
     
  )
}

export default HeaderMenu