import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,userDetails,tabIndex,loadedNewsArticles,orderOfStartOptions,notInterestedSources,defaultCategory} from '../Recoil/Atoms'
import app from '../../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getFirestore,updateDoc } from 'firebase/firestore';
import { async } from '@firebase/util';


const DbUpdater = () => {
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