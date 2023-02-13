import { StyleSheet, Text, View,FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect ,useState} from 'react'
import {Box, Center, Button, Spinner,} from 'native-base'
import FilterMenu from './FilterMenu'
import NewsCard from './NewsCard'
import { useRecoilState,useRecoilValue } from 'recoil'
import { loadedNewsArticles,category,notInterestedSources } from '../Recoil/Atoms'
import { categories } from './StartOptions'
// import {USERKEY} from '../keys'

let BASE_URL = "https://saurav.tech/NewsAPI/"
// top_headlines_api = BASE_URL+"/top-headlines/category/<category>/<country_code>.json"
// everything_api = BASE_URL+"/everything/<source_id>.json"

const Home=({navigation})=>{
  
  const [isLoading,setIsLoading]=useState(true)
  const [newsObj,setNewsObj]=useRecoilState(loadedNewsArticles)
  
  //for each category fetch we need to filter the data with this blocked sources arr
  //filtering is not required for saved source search
  const blockedSrc=useRecoilValue(notInterestedSources)

  const categorizer=useRecoilValue(category)

  const getData=async()=>{
    //it sure that k is a category name but not source name
    let k=categorizer.toLowerCase() //default

    console.log("the value of k is : ",k)
    
    try{
      let d3,d4 //d3 will store the final array to be set to alist //d4 will be duplicate of unfiltered d3
      let d1=await fetch("https://saurav.tech/NewsAPI/top-headlines/category/"+k+"/in.json")
      let d2=await d1.json()
      d3=d2.articles
      console.log("fetched ",k)
    //duplicating unfiltered d3
    d4=d3

      if(blockedSrc.length>0){
        d3=d4.filter((e)=>!blockedSrc.includes(e.source.name))
      }
    
    setNewsObj({...newsObj,[k]:d3})
    setIsLoading(false)
    }catch(e){
      console.log('error in fetching data')
    }
  }

  useEffect(()=>{
    console.log('called cat :',categorizer)
    if(newsObj[categorizer.toLowerCase()].length==0){ //if that category data is not available
      getData()
    }
  },[categorizer])

  useEffect(()=>{
    console.log('newsObj updated ',Object.keys(newsObj))
    if(newsObj[categorizer.toLowerCase()].length==0){ //if that category data is not available
      getData()
    }
  },[newsObj])
  
  useEffect(()=>{
    console.log('newsObj updated ',Object.keys(newsObj))
    if(newsObj[categorizer.toLowerCase()].length==0){ //if that category data is not available
      getData()
    }
  },[])

  return(
    <Box>
      <FilterMenu />
     
      {isLoading
      ?
      <Spinner size={'lg'} />
      :
      <FlatList style={{height:'90%'}} data={newsObj[categorizer.toLowerCase()]} renderItem={({item})=>{
        // console.log("the item is ",item)
        return(
          <TouchableOpacity onPress={()=>{
          navigation.navigate('ArticlePage',{data:item})
          }
          }>
            <NewsCard data={item} saved={false}/>   
          </TouchableOpacity>
          )
        }
      } />
      }
      
        { isLoading &&
      <Button disabled>loading news...</Button>
        }

    </Box>
  )
}

export default Home

const styles = StyleSheet.create({})