import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import {Box, Center,AddIcon,VStack, Button, Spinner, ScrollView,Input,Icon,IconButton,Slide,Fab} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { categories } from './StartOptions'
import { savedSources,loadedNewsArticles,tabIndex ,savedCategories,logged, fabVisible,category} from '../Recoil/Atoms'
import { useRecoilValue,useRecoilState } from 'recoil'
// shows different categories and select a specific category

const FilterMenu = ({categorizer,setCategorizer}) => {
  const showFab =useRecoilValue(fabVisible)
  const selectedTabIs =useRecoilValue(tabIndex)
    const sourcesArr = useRecoilValue(savedSources)
    const savedCatArr = useRecoilValue(savedCategories)
    const loggedIn = useRecoilValue(logged)
    const [alist,setAlist] = useRecoilState(loadedNewsArticles)
    // temporary state variable ...this value stores all the content of the original alist
      //when we search something then the alist(loadedNewsArticles) will be updated to specific articles only
      //when we want to retreive the original list then we can get it back using this temporary alist
      //this aListTemp will be initialized only when user clicks on search-fab button
    const [aListTemp,setAlistTemp]=useState()
    useEffect(()=>{
      //called when it is created/initialized
      if(aListTemp)
        console.log('aListTemp : ',aListTemp.length)
    },[aListTemp])

    let [highlight,setHighlight]=useRecoilState(category)
    let [toggle,setToggle]=useState(true)
    let [searchVal,setSearchVal]=useState('')
    let [isOpenSearch,setIsOpenSearch]=useState(false)
    
    
  return (
    <Box height={20}>

        {toggle==true && isOpenSearch==false
        &&
        <ScrollView horizontal showsHorizontalScrollIndicator={false} p='2' bg={'gray.200'}>
            <Button onPress={()=>setToggle(!toggle)} alignItems={'center'} bg='white' _text={{fontWeight:'bold',color:'black'}}>Categories</Button>
            {
              // if user is not logged in show all categories
              // if user is logged in but he has not saved any categories except general then show all categories
            loggedIn==false || savedCatArr.length==1
            ?
            categories.map((ele,i)=>
            <Button m='2' p='2' key={i} rounded={25} bgColor={highlight==ele ? 'white' : 'red.800'} _text={{color:highlight==ele ?'black' :'white',fontWeight:'bold'}} borderColor={highlight==ele && 'red.700'} borderWidth={highlight==ele ? 3 : 0}
            onPress={()=>{setHighlight(ele);setCategorizer(ele)}}>
                {ele}
                </Button>
            )
            :
            savedCatArr.map((ele,i)=>
            <Button m='2' p='2' key={i} rounded={25} bgColor={highlight==ele ? 'white' : 'red.800'} _text={{color:highlight==ele ?'black' :'white',fontWeight:'bold'}} borderColor={highlight==ele && 'red.700'} borderWidth={highlight==ele ? 3 : 0}
            onPress={()=>{setHighlight(ele);setCategorizer(ele)}}>
                {ele}
                </Button>
            )
          }
        </ScrollView>
        }
        {toggle==false && isOpenSearch==false
        &&
        <ScrollView horizontal showsHorizontalScrollIndicator={false} p='2' bg={'gray.200'}>
            <Button onPress={()=>setToggle(!toggle)} alignItems={'center'} bg='white' _text={{fontWeight:'bold',color:'black'}}>Sources</Button>
            {
            sourcesArr.length==0
            ?
            <Box m='2' p='2' rounded={25} bgColor={'red.800'} 
            onPress={()=>setToggle(!toggle)}>
                <Center  _text={{color:'white',fontWeight:'bold'}}>No sources saved yet</Center>
              </Box>
            :
            sourcesArr.map((ele,i)=>
            <Button m='2' p='2' key={i} rounded={25} bgColor={highlight==ele ? 'white' : 'red.800'} _text={{color:highlight==ele ?'black' :'white',fontWeight:'bold'}} borderColor={highlight==ele && 'red.700'} borderWidth={highlight==ele ? 3 : 0}
            onPress={()=>{
              setHighlight(ele);
              setCategorizer(ele)          
            }}>
                {ele}
                </Button>
            )}
        </ScrollView>
        }
        
{/* SEARCH BAR */}
{/* the fab must be visible only in Home page */}
{(selectedTabIs==1 && showFab==true)
&&
  <Fab position="absolute" bg={'red.700'} size="md" icon={<Icon color="white" name='search' as={MaterialIcons} size="md" />} 
onPress={()=>{
    if(isOpenSearch){ //closing search bar
        setSearchVal('')
        setAlist(aListTemp) //putting back original data
        // setCategorizer('general')
    }else{ //opening searchbar
        setAlistTemp(alist) //placing the main data (data of a particular category) into the temporary cache state
    }
    setIsOpenSearch(!isOpenSearch)
    }} 
/>
}

{isOpenSearch &&
        <Box bg={'red.700'} p='3' height={'90%'} mb='2' _text={{fontWeight:'bold',fontSize:'lg',color:'white'}} justifyContent='center'>
        <Input value={searchVal} placeholder={categories[0]} bg="#fff" width="100%" height='100%' borderRadius={4} py={2} px={1} fontSize={14} 
      _focus={{borderColor: 'white'}} color='white'
      onChangeText={(txt)=>setSearchVal(txt)}
      InputLeftElement={<IconButton size='md' _icon={{
        as: MaterialIcons,
        name: "search",m:2 , color:"gray.400"
      }} 
      onPress={()=>{
        if(searchVal!=''){
          let k=alist.filter((e)=>(e.title.includes(searchVal) || e.description.includes(searchVal)))
          setAlist(k)
        }else{
          setAlist(aListTemp) //putting back original data
        }
      }}
      />
      } />
        </Box>
}
    </Box >
  )
}

export default FilterMenu

const styles = StyleSheet.create({})