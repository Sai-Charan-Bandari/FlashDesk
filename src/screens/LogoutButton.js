import { StyleSheet, Text, TouchableOpacity, View ,Modal} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Input} from 'native-base'
import {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,userDetails,tabIndex,loadedNewsArticles,orderOfStartOptions,source,notInterestedSources,defaultCategory} from '../Recoil/Atoms'
import { useRecoilState,useSetRecoilState } from 'recoil'
import { getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { getFirestore,collection, setDoc, doc, getDoc } from "firebase/firestore";
import app from '../../firebaseConfig'

const LogoutButton = ({setShowModal,setModalState}) => {

    const auth=getAuth(app)
    // const db=getFirestore(app)
    const setLoggedIn=useSetRecoilState(logged)
    const [userName,setUserName]=useRecoilState(userDetails)

    let [savedArt,setSavedNewsArticles]=useRecoilState(savedNewsArticles)
  let [savedSrc,setSavedSources]=useRecoilState(savedSources)
  let [img,setLoadImg]=useRecoilState(loadImg)
  let [savedCat,setSavedCategories]=useRecoilState(savedCategories)
  let [notval,setNotInterestedSources]=useRecoilState(notInterestedSources)
  let [defCat,setDefaultCategory]=useRecoilState(defaultCategory)

  return (
    <Center>
    <Box width={'100%'} mb='3' bg='red.700' _text={{color:'white',margin:'auto'}} p='2' rounded={4}>
        Logged in as {userName.username}
    </Box>
    <Button width={'100%'} onPress={()=>{
        setModalState(3)
        signOut(auth).then(() => {
           console.log("Sign-out successful.")
           //make sure to logout user first before resetting all atoms..bcoz there's a chance that DbUpdater will be called and it may reset the firestore data as well
                    setUserName({username:'NULL',uid:''})
                    setLoggedIn(false)
           //resetting everything
                    if(savedArt.length!=0)
                    setSavedNewsArticles([])
                    if(defCat!='general')
                    setDefaultCategory('general')
                    if(img!=true)
                    setLoadImg(true)
                    if(notval.length!=0)
                    setNotInterestedSources([])
                    if(savedSrc.length!=0)
                    setSavedSources([])
                    if(savedCat.length!=1)
                    setSavedCategories(['general'])
                    setShowModal(false)
          }).catch((error) => {
           console.log("An error happened during signout")
          });
    }}>
        Logout
    </Button>
    </Center>
  )
}

export default LogoutButton

const styles = StyleSheet.create({})