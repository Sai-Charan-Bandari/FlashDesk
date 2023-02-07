import { StyleSheet, Text, View,FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect ,useState} from 'react'
import {Box, Center,AddIcon,VStack, Button, Spinner, ScrollView,Input,Icon,IconButton} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import FilterMenu from './FilterMenu'
import NewsCard from './NewsCard'
import { useRecoilState,useRecoilValue } from 'recoil'
import { loadedNewsArticles,category,source, notInterestedSources } from '../Recoil/Atoms'
// import {USERKEY} from '../keys'

let BASE_URL = "https://saurav.tech/NewsAPI/"
// top_headlines_api = BASE_URL+"/top-headlines/category/<category>/<country_code>.json"
// everything_api = BASE_URL+"/everything/<source_id>.json"

const Home=({navigation})=>{
  
  const [isLoading,setIsLoading]=useState(true)
  const [alist,setAlist]=useRecoilState(loadedNewsArticles)
  
  //for each category fetch we need to filter the data with this blocked sources arr
  //filtering is not required for saved source search
  const blockedSrc=useRecoilValue(notInterestedSources)

  const [categorizer,setCategorizer]=useRecoilState(category)
  const [src,setSource]=useRecoilState(source)
  let [isOpenSearch,setIsOpenSearch]=useState(false)
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

  const getData=async(isCategory=true)=>{
    try{
    let d1=await fetch(isCategory ? "https://saurav.tech/NewsAPI/top-headlines/category/"+categorizer.toLowerCase()+"/in.json"
     : "https://saurav.tech/NewsAPI/top-headlines/category/general/in.json" )
    let d2=await d1.json()
    let d3=d2.articles
      if(isCategory==false){ //saved source filtering
        d3=d2.articles.filter((e)=>e.source.name==src)
       if(d3.length == 0)
       d3=d2.articles
      }else{ //blocked sources filtering
        if(blockedSrc.length>0){
          d3=d2.articles.filter((e)=>!blockedSrc.includes(e.source.name))
        }
      }

    setAlist(d3)
    setIsLoading(false)
    }catch(e){
      console.log('error in fetching data')
    }
  }
  useEffect(()=>{
    console.log('called cat :',categorizer)
    if(categorizer){
      if(src!='')
      setSource('')
      getData(true)
    }
  },[categorizer])

  useEffect(()=>{
    console.log('called src :',src)
    if(src){
      if(categorizer!='')
      setCategorizer('')      
      getData(false)
    }
  },[src])

  useEffect(()=>{
    console.log('home alist : ',alist.length)
  },[alist])


  return(
    <Box>
      <FilterMenu type={categorizer} setCategorizer={setCategorizer} src={src} setSource={setSource} isOpenSearch={isOpenSearch} aListTemp={aListTemp} />
     
      {isLoading
      ?
      <Spinner size={'lg'} />
      :
      <FlatList style={{height:'90%'}} data={alist} renderItem={({item})=>{
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
      <Button disabled>'loading news...':'next'</Button>
        }

<IconButton bottom={7} right={7} rounded={50} position="absolute" bg={'red.700'} size="lg" icon={<Icon color="white" name='search' as={MaterialIcons} size="md" />} 
onPress={()=>{
    if(isOpenSearch){ //closing search bar
        // setSearchVal('')
        setAlist(aListTemp) //putting back original data
        // setCategorizer('general')
    }else{ //opening searchbar
        setAlistTemp(alist) //placing the main data (data of a particular category) into the temporary cache state
    }
    setIsOpenSearch(!isOpenSearch)
    }} 
/>
    </Box>
  )
}

export default Home

const styles = StyleSheet.create({})