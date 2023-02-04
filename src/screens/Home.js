import { StyleSheet, Text, View,FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect ,useState} from 'react'
import {Box, Center,AddIcon,VStack, Button, Spinner, ScrollView,Input,Icon,IconButton} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import FilterMenu from './FilterMenu'
import NewsCard from './NewsCard'
// import {USERKEY} from '../keys'

let BASE_URL = "https://saurav.tech/NewsAPI/"
// top_headlines_api = BASE_URL+"/top-headlines/category/<category>/<country_code>.json"
// everything_api = BASE_URL+"/everything/<source_id>.json"

const Home=({navigation,route})=>{
  
  const [isLoading,setIsLoading]=useState(true)
  const [alist,setAlist]=useState([1,2,3])
  const [categorizer,setCategorizer]=useState('general')
  const [source,setSource]=useState('')


  const getData=async(isCategory=true)=>{
    try{
    let d1=await fetch(isCategory ? "https://saurav.tech/NewsAPI/top-headlines/category/"+categorizer.toLowerCase()+"/in.json"
     : "https://saurav.tech/NewsAPI/everything/"+source.toLowerCase()+".json" )
    let d2=await d1.json()
    setAlist(d2.articles)
    setIsLoading(false)
    }catch(e){
      console.log('error in fetching data')
    }
  }
  useEffect(()=>{
    if(categorizer)
    getData(true)
  },[categorizer])

  useEffect(()=>{
    if(source)
    getData(false)
  },[source])

  useEffect(()=>{
    // console.log(alist)
  },[alist])
  return(
    <Box>
      <FilterMenu type={categorizer} setCategorizer={setCategorizer} source={source} setSource={setSource}/>
     
      {isLoading
      ?
      <Spinner size={'lg'} />
      :
      <FlatList style={{height:'85%'}} data={alist} renderItem={({item})=>{
        console.log("the item is ",item)
        return(
          <TouchableOpacity onPress={()=>navigation.navigate('ArticlePage',{data:item})}>
            <NewsCard data={item} saved={false}/>   
          </TouchableOpacity>
          )
        }
      } />
      }
      
        { isLoading &&
      <Button disabled>'loading news...':'next'</Button>
        }
    </Box>
  )
}

export default Home

const styles = StyleSheet.create({})