import { StyleSheet, Text, TouchableOpacity, View ,Modal} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Input} from 'native-base'
import {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,userDetails,tabIndex,loadedNewsArticles,orderOfStartOptions,source,notInterestedSources,defaultCategory} from '../Recoil/Atoms'
import { useRecoilState,useSetRecoilState } from 'recoil'
import { getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { getFirestore,collection, setDoc, doc, getDoc } from "firebase/firestore";
import app from '../../firebaseConfig'

const SignupButton = ({setShowModal,setModalState}) => {
    const auth=getAuth(app)
    const db=getFirestore(app)
    const setLoggedIn=useSetRecoilState(logged)

    let [savedArt,setSavedNewsArticles]=useRecoilState(savedNewsArticles)
  let [savedSrc,setSavedSources]=useRecoilState(savedSources)
  let [img,setLoadImg]=useRecoilState(loadImg)
  let [savedCat,setSavedCategories]=useRecoilState(savedCategories)
  let [notval,setNotInterestedSources]=useRecoilState(notInterestedSources)
  let [defCat,setDefaultCategory]=useRecoilState(defaultCategory)
    
  let setIndex=useSetRecoilState(tabIndex)
  let setRevertOrder=useSetRecoilState(orderOfStartOptions)

  const setUserName=useSetRecoilState(userDetails)
    const [password,setPassword]=useState('Sukku@12345')
    const [email,setEmail]=useState('@gmail.com')

  return (
    <Box width='220' rounded={10} bg={'white'} height='220' m='auto' p='5'>
    <Input placeholder='Email/Username' onChangeText={(txt)=>setEmail(txt)} value={email}></Input>
    <Input placeholder='Password' onChangeText={(txt)=>setPassword(txt)} value={password}></Input>
    <Button width={'100%'}  onPress={()=>{
      setModalState(3)
        createUserWithEmailAndPassword(auth,email,password)
        .then(async(userCredential) => {
          // Signed in 
          const user = userCredential.user;
        //   console.log("user ",user)
        try {
              const docRef = await setDoc(doc(db, "Users",user.uid), {
                  email: email,
                  password: password,
                  username:email.substring(0,email.length-10)
                });
                console.log("created user")
                try{
                  const docRef2 = await setDoc(doc(db, "UsersSavedData",user.uid), {
                    defaultCategory:'general',
                    loadImg: true,
                    notInterestedSources:[],
                    savedNewsArticles:[],
                    savedCategories:['general'],
                    savedSources:[]                  
                    });
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

                  setUserName({username:email.substring(0,email.length-10),uid:user.uid})
                     setLoggedIn(true)
                     setShowModal(false)
                     setRevertOrder(true)
                      setIndex(0)
                }catch(e){
                  console.log("error adding doc2:",e)
                }
            } catch (e) {
                console.error("Error adding doc1: ", e);
              }
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // console.log("errr ",errorCode,errorMessage)
                alert("error signing up")
            });
             
    }}>Sign up</Button>
    </Box>
  )
}

export default SignupButton

const styles = StyleSheet.create({})