import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,userDetails,tabIndex,loadedNewsArticles,orderOfStartOptions,notInterestedSources,defaultCategory, checkLoginOnStart} from '../Recoil/Atoms'
import app from '../../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getFirestore,updateDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
import { Cache } from "react-native-cache";
import AsyncStorage from '@react-native-async-storage/async-storage';


const DbUpdater = () => {
  const check=useRecoilValue(checkLoginOnStart)
  //////////////////////////////////////
  // cache
   const cache = new Cache({
    namespace: "flashdesk",
    policy: {
        // maxEntries: 50000, // if unspecified, it can have unlimited entries
        stdTTL: 0 // the standard ttl as number in seconds, default: 0 (unlimited)
    },
    backend: AsyncStorage
});

//setting cache on change of states
async function setcache(stateChanged){
  try{
  // await cache.set("userDetails", JSON.stringify({
  //     username:'bsc',
  //     uid:'adfadfasdrtrye4546'
  // }));
  let userJSONData = await cache.get("userSavedVals")
  let setterObj=JSON.parse(userJSONData)
   setterObj={...setterObj , [stateChanged.key] : stateChanged.value
    // defaultCategory:'general',
    // loadImg: true,
    // notInterestedSources:[],
    // savedNewsArticles:[],
    // savedCategories:['general'],
    // savedSources:[]                  
  }
  await cache.set("userSavedVals", JSON.stringify(setterObj));
  console.log("set data into cache success")
  }catch(e){
      console.log("could not set userDetails from cache ",e)
  }
}
  //////////////////////////////////////
  //firebase
    const db=getFirestore(app)
    const loggedIn=useRecoilValue(logged)
    const user=useRecoilValue(userDetails)
    ///////////////////////////////////////////////////
    //creating states for atoms
    ///////////////////////////////////////////////////
    let [catArr,setCatArr]=useRecoilState(savedCategories)
    // db setter
    async function updateSavedCategories(){
        try{
            const docRef=doc(db,"UsersSavedData",user.uid)
            await updateDoc(docRef, {
                savedCategories: catArr
            });
            console.log("db updated")
        }catch(e){
            console.log("error in DbUpdater : savedCat ",e)
        }
    }
    useEffect(()=>{
        if(loggedIn){
            updateSavedCategories()
            if(!check){
              setcache({key:'savedCategories',value:catArr})
            }
        }
    },[catArr])
    ///////////////////////////////////////////////////
    const [notval,setnotval]=useRecoilState(notInterestedSources)
    // db setter
    async function updateNotInterestedSources(){
        try{
            const docRef=doc(db,"UsersSavedData",user.uid)
            await updateDoc(docRef, {
        notInterestedSources: notval
      });
      console.log("db updated")
    }catch(e){
        console.log("error in DbUpdater : notval ",e)
        }
    }
    useEffect(()=>{
        if(loggedIn){
            updateNotInterestedSources()
            if(!check){
              setcache({key:'notInterestedSources',value:notval})
            }
        }
    },[notval])
    ///////////////////////////////////////////////////
    const [savedSrc,setSavedSrc]=useRecoilState(savedSources)
    // db setter
  async function updateInterestedSources(){
    try{
      const docRef=doc(db,"UsersSavedData",user.uid)
      await updateDoc(docRef, {
        savedSources: savedSrc
      });
      console.log("db updated")
    }catch(e){
      console.log("error in DbUpdater : savedSrc ",e)
    }
  }
    useEffect(()=>{
      if(loggedIn){
        updateInterestedSources()
        if(!check){
          setcache({key:'savedSources',value:savedSrc})
        }
       }
    },[savedSrc])
    ///////////////////////////////////////////////////
    let [isloadImg,setIsLoadImg]=useRecoilState(loadImg)
    // db setter
  async function updateLoadImg(){
    try{
      const docRef=doc(db,"UsersSavedData",user.uid)
      await updateDoc(docRef, {
        loadImg:isloadImg
      });
      console.log("db updated")
    }catch(e){
      console.log("error in DbUpdater : isLoadImg ",e)
    }
  }
    useEffect(()=>{
      if(loggedIn){
        updateLoadImg()
        if(!check){
          setcache({key:'loadImg',value:isloadImg})
        }
      }
    },[isloadImg])
    ///////////////////////////////////////////////////
    let [savedNewsArr,setSavedNewsArticles]=useRecoilState(savedNewsArticles)
    // db setter
  async function updateSavedNewsArticles(){
    try{
      const docRef=doc(db,"UsersSavedData",user.uid)
      await updateDoc(docRef, {
        savedNewsArticles:savedNewsArr
      });
      console.log("db updated")
    }catch(e){
      console.log("error in DbUpdater : savedNewsArr ",e)
    }
  }
    useEffect(()=>{
      if(loggedIn){
        updateSavedNewsArticles()
        if(!check){
          setcache({key:'savedNewsArticles',value:savedNewsArr})
        }
      }
    },[savedNewsArr])
    ///////////////////////////////////////////////////
    let [defaultCat,setDefaultCat]=useRecoilState(defaultCategory)
    // db setter
  async function updateDefaultCategory(){
    try{
      const docRef=doc(db,"UsersSavedData",user.uid)
      await updateDoc(docRef, {
        defaultCategory:defaultCat
      });
      console.log("db updated")
    }catch(e){
      console.log("error in DbUpdater : defaultCat ",e)
    }
  }
    useEffect(()=>{
      if(loggedIn){
        updateDefaultCategory()
        if(!check){
          setcache({key:'defaultCategory',value:defaultCat})
        }
      }
    },[defaultCat])

    ///////////////////////////////////////////////////
    return (
    <View>
    </View>
  )
}

export default DbUpdater

const styles = StyleSheet.create({})