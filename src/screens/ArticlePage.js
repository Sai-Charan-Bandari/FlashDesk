import { View, Text, Linking,Share } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Divider,HStack,IconButton,Image, ScrollView ,Icon,FavouriteIcon, Button,useToast} from 'native-base'
import {AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { savedSources,notInterestedSources,fabVisible,loadedNewsArticles } from '../Recoil/Atoms'
import { useRecoilState,useSetRecoilState } from 'recoil'


const ArticlePage = ({route:{params:{data}},navigation}) => {
  const [val,set]=useRecoilState(savedSources)
  const [notval,setnotval]=useRecoilState(notInterestedSources)
  const setShowFab=useSetRecoilState(fabVisible)
  const [newsObj,setNewsObj]=useRecoilState(loadedNewsArticles)

  useEffect(()=>{
    // on create
    setShowFab(false)
  },[])

  useEffect(()=>{
    // on destroy
    return ()=>setShowFab(true)
  },[])

    useEffect(()=>{
      console.log('notval : ',notval.length)
    },[notval])

    useEffect(()=>{
      console.log('val : ',val.length)
    },[val])

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

        {/*  */}

        <IconButton ml='auto' height={10} mr='2' mt='2'variant="solid" bgColor={notval.includes(data.source.name) ? "red.700" : 'blue.500'}
        icon={<MaterialIcons name="not-interested" size={20} color="white" />}
        onPress={()=>{
          if(notval.includes(data.source.name)){
                let k=notval.filter((e)=>e!=data.source.name)
                setnotval(k)
                toast.show({description:'unmarked',duration:500})
              }else{
                // if any saved src is to be blocked
                if(val.includes(data.source.name)){
                  let k=val.filter((e)=>e!=data.source.name)
                set(k)
                }
                setnotval([...notval,data.source.name]);
                //resetting newsObj to default but u must keep the saved sources as it is ...else there is chance to face errors
                setNewsObj({...newsObj,
                  general:[],
                  business:[],
                  science:[],
                  entertainment:[],
                  sports:[],
                  health:[],
                  technology:[],
                })
                toast.show({description:'marked as not-interested',duration:500})
            }
        }}
      />

      {/*    */}

      <IconButton ml='auto' height={10} mr='2' mt='2'variant="solid" bgColor={val.includes(data.source.name) ? "red.700" : 'blue.500'}
        icon={<Icon size="md" shadow={4} as={MaterialCommunityIcons} name="bookmark" color={ "white"} />}
        onPress={()=>{
          if(val.includes(data.source.name)){
                let k=val.filter((e)=>e!=data.source.name)
                set(k)
/////////////////////////we can also remove that particular key from newsObj (similarly add this functionlity in EditSavedSrc also )//////////////////////////////
                toast.show({description:'unsaved',duration:500})
              }else{
                //if any blocked src needs to be saved
                if(notval.includes(data.source.name)){
                  let k=notval.filter((e)=>e!=data.source.name)
                setnotval(k)
                }
                set([...val,data.source.name]);
                //we need to add this source as a new category with filtered 'general' data into newsObj
                let d3=newsObj['general'].filter((e)=>e.source.name==data.source.name)
                if(d3.length == 0)
                d3=newsObj['general']
                setNewsObj({...newsObj,[data.source.name.toLowerCase()]:d3})
                //the above things must be done before the user sets the category to this source_name
                toast.show({description:'saved as interested source',duration:500})
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