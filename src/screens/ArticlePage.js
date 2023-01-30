import { View, Text, Linking,Share } from 'react-native'
import React from 'react'
import { Box, Divider,HStack,IconButton,Image, ScrollView ,Icon,FavouriteIcon, Button} from 'native-base'
import {MaterialIcons } from '@expo/vector-icons'



const ArticlePage = ({route:{params:{data}}}) => {

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              data.url,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      };

  return (
    <ScrollView p='5' height={'20%'}>
        <Divider orientation='horizontal' bg='black' m='2'/>
      <Box bg='white' mb='3' p='3' rounded={'lg'} >
        <Text style={{fontWeight:'bold',fontSize:16}}>{data.title}</Text>
        </Box>
        <Image source={{uri:data.urlToImage}} rounded='5' alt="Alternate Text" height={200} width={'100%'}/>
        <Divider orientation='horizontal' bg='black' m='2'/>
        <Box  p='3' bg='white' my='3' rounded="lg">
        <Text >Source : {data.source.name}</Text>
        <Text >Author : {data.author}</Text>
        <Text >Published at : {data.publishedAt}</Text>
            
        </Box>
        <Box  mb='3' p='3' bg='white' rounded="lg">
            {data.description}
            {data.content}
        </Box>
        <HStack mb='10'>
            <IconButton variant="solid" bg='red.700' icon={<Icon size="md" as={MaterialIcons} name="share" color="white" />}
                onPress={onShare} 
                />
            <IconButton mx='5' variant="solid" bg='red.700' icon={<FavouriteIcon color="white" />}
                onPress={()=>{
                console.log('hello')
                }} 
            />
            <Button ml='auto' bg='red.700' _text={{fontWeight:'bold'}}
            onPress={()=>Linking.openURL(data.url)}>
                Read more
            </Button>
        </HStack>
    </ScrollView>
  )
}

export default ArticlePage