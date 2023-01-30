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
      <Box mt='10' bg={route.params.color} p='5' mb='5'>{route.params.text}</Box>
      {isLoading
      ?
      <Spinner size={'lg'} />
      :
      // <Box mt='10' bg={route.params.color} p='5' my='2'>{alist[0].description}</Box>
      // <FlatList data={alist} renderItem={({item})=>{
      //   console.log("the item is ",item)
      //   return(
      //     <TouchableOpacity>
      //       <NewsCard source={item.source.name} author={item.author} title={item.title} description={item.description} />   
      //     </TouchableOpacity>
      //     )
      //   }
      // } />

      <ScrollView>
        {alist &&  alist.map((item,i)=>
        <NewsCard data={item} />   
        )}
      </ScrollView>
      }
      
      <Button onPress={()=>navigation.navigate('ArticlePage')}>
        {isLoading ? 'loading news...':'next'}
      </Button>
    </Box>
  )
}

export default Home

const styles = StyleSheet.create({})