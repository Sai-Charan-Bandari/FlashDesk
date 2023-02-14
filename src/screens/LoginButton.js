import { StyleSheet, Text, TouchableOpacity, View ,Modal} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Input} from 'native-base'
import {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,userDetails,tabIndex,loadedNewsArticles,orderOfStartOptions,source,notInterestedSources,defaultCategory} from '../Recoil/Atoms'
import { useRecoilState,useSetRecoilState } from 'recoil'
import { getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { getFirestore,collection, setDoc, doc, getDoc } from "firebase/firestore";
import app from '../../firebaseConfig'
import { Cache } from "react-native-cache";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginButton = ({setShowModal,setModalState}) => {
    const auth=getAuth(app)
    const db=getFirestore(app)
    const [loggedIn,setLoggedIn]=useRecoilState(logged)

    let [categorizer,setCategorizer]=useRecoilState(category)

    let  [newsObj,setNewsObj] =useRecoilState(loadedNewsArticles)

  let setSavedNewsArticles=useSetRecoilState(savedNewsArticles)
  let setSavedSources=useSetRecoilState(savedSources)
  let setLoadImg=useSetRecoilState(loadImg)
  let setSavedCategories=useSetRecoilState(savedCategories)
  let setNotInterestedSources=useSetRecoilState(notInterestedSources)
  let setDefaultCategory=useSetRecoilState(defaultCategory)

  const [userName,setUserName]=useRecoilState(userDetails)
    const [password,setPassword]=useState('Sukku@12345')
    const [email,setEmail]=useState('sukumar@gmail.com')

    //cache
    const cache = new Cache({
      namespace: "flashdesk",
      policy: {
          // maxEntries: 50000, // if unspecified, it can have unlimited entries
          stdTTL: 0 // the standard ttl as number in seconds, default: 0 (unlimited)
      },
      backend: AsyncStorage
  });
  //setting cache on login
  async function setcache(user){ 
    try{
    await cache.set("userDetails", JSON.stringify({
      username:user.username,
      uid:user.uid
    }));
    // await cache.set("userSavedVals", JSON.stringify({
    //     defaultCategory:'general',
    //     loadImg: true,
    //     notInterestedSources:[],
    //     savedNewsArticles:[],
    //     savedCategories:['general'],
    //     savedSources:[]                  
    //     }));
    console.log("set data into cache success")
    // let k=await cache.get('userDetails')
    // console.log("checking cache : ",k)
    }catch(e){
        console.log("could not set userDetails from cache ",e)
    }
}

return (
    <Box width='220' rounded={10} bg={'white'} height='220' m='auto' p='5'>
        <Input placeholder='Email/Username' onChangeText={(txt)=>setEmail(txt)} value={email} ></Input>
        <Input placeholder='Password' onChangeText={(txt)=>setPassword(txt)} value={password}></Input>
        <Button width={'100%'}  onPress={()=>{
          setModalState(3)
            signInWithEmailAndPassword(auth,email,password).then(async(userCredential)=> {
          let newsCopy={...newsObj}
                // first chck if user signed into firebase successfully or not
                const user = userCredential.user;
                // now check if the user's data is present in firestore or not & get user data
                try {
                  const docRef2=doc(db,"UsersSavedData",user.uid)
                              const docSnap2 = await getDoc(docRef2)
                              if(docSnap2.exists()){
                                //setting cache
                                setcache({username:email.substring(0,email.length-10),uid:user.uid})
                                //
                                setUserName({username:email.substring(0,email.length-10),uid:user.uid})
                                   setLoggedIn(true)
                                   setShowModal(false)
                                   let dataObj=docSnap2.data()
                                   console.log("dataObj is : ",dataObj)
                                   setLoadImg(dataObj.loadImg)
                                   setNotInterestedSources(dataObj.notInterestedSources)
                                   setSavedCategories(dataObj.savedCategories)
                                   setSavedSources(dataObj.savedSources)
                                   setSavedNewsArticles(dataObj.savedNewsArticles)
                                  for(let i=0;i<dataObj.savedSources.length;i++){
                                    let d3=newsCopy['general'].filter((e)=>e.source.name==dataObj.savedSources[i])
                                    if(d3.length == 0) d3=newsCopy['general']
                                    newsCopy[dataObj.savedSources[i].toLowerCase()]=d3
                                  }
                                    setNewsObj(newsCopy)
                                   //setting defaultcat maynot be required
                                   setDefaultCategory(dataObj.defaultCategory)
                                   setCategorizer(dataObj.defaultCategory)

                              }
                              }catch (e) {
                                console.error("Error adding document2: ", e);
                              }
              })
              .catch((error) => {
                alert("error logging in")
              })
        }}>Log in</Button>
        </Box>
)
} 

export default LoginButton