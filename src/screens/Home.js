import { StyleSheet, Text, View,FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect ,useState} from 'react'
import {Box, Center,AddIcon,VStack, Button, Spinner, ScrollView} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import FilterMenu from './FilterMenu'
import NewsCard from './NewsCard'
import {USERKEY} from '../keys'

let BASE_URL = "https://saurav.tech/NewsAPI/"
// top_headlines_api = BASE_URL+"/top-headlines/category/<category>/<country_code>.json"
// everything_api = BASE_URL+"/everything/<source_id>.json"

const Home=({navigation,route})=>{
  const [isLoading,setIsLoading]=useState(true)
  const [alist,setAlist]=useState([1,2,3])
  const getData=async()=>{
    try{
    let d1=await fetch("https://saurav.tech/NewsAPI/top-headlines/category/health/in.json")
    let d2=await d1.json()
    setAlist(d2.articles)
    setIsLoading(false)
    }catch(e){
      console.log('error in fetching data')
    }
  }
  useEffect(()=>{
    getData()
  },[])
  useEffect(()=>{
    console.log(alist)
  },[alist])
  return(
    <Box>
      <FilterMenu type={route.params.text}/>
      <Box  bg={route.params.color} p='5' mb='2'>{route.params.text}</Box>
      {isLoading
      ?
      <Spinner size={'lg'} />
      :
      <FlatList style={{height:'80%'}} data={alist} renderItem={({item})=>{
        console.log("the item is ",item)
        return(
          <TouchableOpacity onPress={()=>navigation.navigate('ArticlePage',{data:item})}>
            <NewsCard data={item} saved={false}/>   
          </TouchableOpacity>
          )
        }
      } />
      }
      
      <Button onPress={()=>navigation.navigate('ArticlePage')}>
        {isLoading ? 'loading news...':'next'}
      </Button>
    </Box>
  )
}

export default Home

const styles = StyleSheet.create({})