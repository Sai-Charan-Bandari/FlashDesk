import { View, Text, Linking,Share } from 'react-native'
import React from 'react'
import { Box, Divider,HStack,IconButton,Image, ScrollView ,Icon,FavouriteIcon, Button,useToast} from 'native-base'
import {AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { savedSources } from '../Recoil/Atoms'
import { useRecoilState } from 'recoil'


const ArticlePage = ({route:{params:{data}},navigation}) => {
  const [val,set]=useRecoilState(savedSources)
  let toast=useToast()
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
        <Image source={{uri:data.urlToImage}} rounded='5' alt="Alternate Text" height={250} width={'100%'}/>
        <Divider orientation='horizontal' bg='black' m='2'/>
        <Box  p='3' bg='white' my='3' rounded="lg">
          <HStack alignItems={'center'}>
        <Text >Source : {data.source.name}</Text>
        <IconButton ml='auto' height={10} mr='2' mt='2'variant="solid" bgColor={val.filter((e)=>e==data.source.name).length > 0 ? "red.700" : 'blue.500'}
        icon={<Icon size="md" shadow={4} as={MaterialCommunityIcons} name="bookmark" color={ "white"} />}
        onPress={()=>{
          if(val.filter((e)=>e==data.source.name).length > 0){
                let k=val.filter((e)=>e!=data.source.name)
                set(k)
                toast.show({description:'unsaved',duration:300})
              }else{
                set([...val,data.source.name]);
                toast.show({description:'saved',duration:300})
            }
        }}
      />
          </HStack>
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
            <IconButton mx='5' variant="solid" bg='red.700' icon={<AntDesign name="leftcircleo" size={24} color="white" />}
                onPress={()=>{
                navigation.goBack()
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