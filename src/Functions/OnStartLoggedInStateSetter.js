import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Button, useToast } from 'native-base';
import { Cache } from "react-native-cache";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkLoginOnStart,savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,userDetails,tabIndex,loadedNewsArticles,orderOfStartOptions,source,notInterestedSources,defaultCategory} from '../Recoil/Atoms'
import { useRecoilState, useSetRecoilState } from 'recoil';

//it utilizes a checkLogin atom which is used to check for loggedIn user only once..i.e at the start of the application
//if checkLogin is true then check the local cache for userDetails & setchecklogin to false , fetch (db/cache for data) and setStates... else dont check 


const OnStartLoggedInStateSetter = () => {
    let toast=useToast()
    const [check,setCheck]=useRecoilState(checkLoginOnStart)
    const setUser=useSetRecoilState(userDetails)
    const [loggedIn,setLoggedIn]=useRecoilState(logged)
    // useEffect(()=>{
    //     //resetting cache on logout
    //     if(loggedIn==false && check==false){
    //         //i.e this is not the starting stage of the app and the user logs out, then we will reset the cache
    //         //we need to check the checkLoginOnStart value also and ensure that it is false .
    //         //bcoz if it is the starting stage of the app ..the loggedIn value will be by default false, check will be default true
    //         // hence, there's a chance that the user's cache data maybe reset 
    //         resetcache()
    //     }
    // },[loggedIn])

    let [categorizer,setCategorizer]=useRecoilState(category)
    let  [newsObj,setNewsObj] =useRecoilState(loadedNewsArticles)
  let setSavedNewsArticles=useSetRecoilState(savedNewsArticles)
  let setSavedSources=useSetRecoilState(savedSources)
  let setLoadImg=useSetRecoilState(loadImg)
  let setSavedCategories=useSetRecoilState(savedCategories)
  let setNotInterestedSources=useSetRecoilState(notInterestedSources)
  let setDefaultCategory=useSetRecoilState(defaultCategory)

    const cache = new Cache({
        namespace: "flashdesk",
        policy: {
            // maxEntries: 50000, // if unspecified, it can have unlimited entries
            stdTTL: 0 // the standard ttl as number in seconds, default: 0 (unlimited)
        },
        backend: AsyncStorage
    });
    
    // async function resetcache(){
    //     //logout
    //     try{
    //     await cache.set("userDetails", JSON.stringify({
    //         username:'NULL',
    //         uid:''
    //     }));
    //     await cache.set("userSavedVals", JSON.stringify({
    //         defaultCategory:'general',
    //         loadImg: true,
    //         notInterestedSources:[],
    //         savedNewsArticles:[],
    //         savedCategories:['general'],
    //         savedSources:[]                  
    //         }));
    //     console.log("set data into cache success")
    //     }catch(e){
    //         console.log("could not set userDetails from cache ",e)
    //     }
    // }
    
    // async function setcache(){
    //     //logout
    //     try{
    //     await cache.set("userDetails", JSON.stringify({
    //         username:'bsc',
    //         uid:'adfadfasdrtrye4546'
    //     }));
    //     await cache.set("userSavedVals", JSON.stringify({
    //         defaultCategory:'general',
    //         loadImg: true,
    //         notInterestedSources:[],
    //         savedNewsArticles:[],
    //         savedCategories:['general'],
    //         savedSources:[]                  
    //         }));
    //     console.log("set data into cache success")
    //     }catch(e){
    //         console.log("could not set userDetails from cache ",e)
    //     }
    // }
    async function getcache(){
        const valueJSON = await cache.get("userDetails");
        if(valueJSON){
            toast.show({description:'user object detected',duration:500})
            try{
        const value=JSON.parse(valueJSON)
        console.log("retrieved cache data ",value)
        if(value.username!='NULL' && value.uid!=''){
            try{
                let userJSONData = await cache.get("userSavedVals")
                console.log("retreived userJsonData ",userJSONData)
        const {defaultCategory,loadImg,notInterestedSources,savedNewsArticles,savedCategories,savedSources }= JSON.parse(userJSONData)
                //setting user login atoms
                setUser(value)
                setLoggedIn(true)
                //setting user states
                setDefaultCategory(defaultCategory)
                setCategorizer(defaultCategory)
                setLoadImg(loadImg)
                setNotInterestedSources(notInterestedSources)
                setSavedNewsArticles(savedNewsArticles)
                setSavedCategories(savedCategories)
                setSavedSources(savedSources)
                //we have to set the sources data in newsObj here only..bcoz fetch (getData) func doesnt support source names
                let newsCopy={...newsObj}
                if(newsCopy['general'].length==0){
                    //if general articles are not yet fetched..probably due to loading of default category
                    let d1=await fetch("https://saurav.tech/NewsAPI/top-headlines/category/general/in.json")
                    let d2=await d1.json()
                    newsCopy['general']=d2.articles
                    console.log("general articles len 0...so i set it to ",newsCopy['general'].length)
                }
                for(let i=0;i<savedSources.length;i++){
                    let d3=newsCopy['general'].filter((e)=>e.source.name==savedSources[i])
                    if(d3.length == 0) d3=newsCopy['general']
                    newsCopy[savedSources[i].toLowerCase()]=d3
                  }
                    setNewsObj(newsCopy)
            }catch(e){
                console.log("could not get userSavedData from cache ",e)
            }
        }else{
            console.log("user not loggedin according to cache data")
        }
        //checkLoginOnStart state set to false now..it will no longer be true until the whole app reloads/re-renders/restarts
        setCheck(false)
    }catch(e){
        console.log("could not get userDetails from cache ",e)
    }
}else{
    //initializing default cache items
    await cache.set("userDetails", JSON.stringify({
        username:'NULL',
        uid:''
    }))
    await cache.set("userSavedVals", JSON.stringify({
        defaultCategory:'general',
            loadImg: true,
            notInterestedSources:[],
            savedNewsArticles:[],
            savedCategories:['general'],
            savedSources:[]  
    }));
    toast.show({description:'default user objects initialized',duration:500})
}
    }

    useEffect(()=>{
        //calling getcache() method
        if(check){
            getcache()
        }
    },[])
  return (
    <View>
    {/* <Button my='20' onPress={()=>
    getcache()}>
        fetch
    </Button>
    <Button onPress={()=>setcache()}>
        set
    </Button> */}
    </View>
  )
}

export default OnStartLoggedInStateSetter

const styles = StyleSheet.create({})