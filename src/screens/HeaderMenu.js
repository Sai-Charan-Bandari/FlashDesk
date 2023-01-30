import { View, Text ,Linking} from 'react-native'
import React from 'react'
import { Button, HStack ,IconButton,Icon,Image} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

const HeaderMenu = () => {
  const navigation=useNavigation()
  return (
      <HStack p='5' mt='2.5'>
        <Button bg='red.700'
          onPress={()=>{Linking.openURL('https://github.com/Sai-Charan-Bandari/FlashDesk')}}
           _text={{fontFamily:'body',fontStyle:'italic',fontWeight:'bold'}}
        >
          FlashDesk
        </Button>
        
        <Button bg='red.700' ml='auto'
        onPress={()=>{navigation.navigate('Profile')}}>
            <Image width={30} height={30} source={{uri:"https://cdn-icons-png.flaticon.com/128/9131/9131529.png"}} alt='couldnt load img'></Image>
          </Button>
      </HStack>
     
  )
}

export default HeaderMenu