import { StyleSheet, Text, TouchableOpacity, View ,Modal} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Input} from 'native-base'
import {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,userDetails,tabIndex,loadedNewsArticles,orderOfStartOptions,source,notInterestedSources,defaultCategory} from '../Recoil/Atoms'
import { useRecoilState,useSetRecoilState } from 'recoil'
import { getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { getFirestore,collection, setDoc, doc, getDoc } from "firebase/firestore";
import app from '../../firebaseConfig'
import { async } from '@firebase/util'


const LogModal = ({setShowModal}) => {

let [newsObj,setNewsObj]=useRecoilState(loadedNewsArticles)

  let setSavedNewsArticles=useSetRecoilState(savedNewsArticles)
  let setSavedSources=useSetRecoilState(savedSources)
  let setLoadImg=useSetRecoilState(loadImg)
  let setSavedCategories=useSetRecoilState(savedCategories)
  let setNotInterestedSources=useSetRecoilState(notInterestedSources)
  let setDefaultCategory=useSetRecoilState(defaultCategory)

  let [categorizer,setCategorizer]=useRecoilState(category)


    const auth=getAuth(app)
    const db=getFirestore(app)
    const [loggedIn,setLoggedIn]=useRecoilState(logged)
    useEffect(()=>{
        console.log('loggedIn : ',loggedIn)
    },[loggedIn])

    const [userName,setUserName]=useRecoilState(userDetails)
    const [password,setPassword]=useState('Sukku@12345')
    const [email,setEmail]=useState('sukumar@gmail.com')
    const [modalState,setModalState]=useState(0)
    //0-> nrml , 1-> login, 2-> signup

    let setIndex=useSetRecoilState(tabIndex)
    let setRevertOrder=useSetRecoilState(orderOfStartOptions)
  return (
    <Modal transparent={true} animationType='slide'>
      <TouchableOpacity style={{width:'100%',height:'100%',backgroundColor:'#00000080'}}  onPress={()=>setShowModal(false)} >
        {modalState==0
        &&
        <Box width='220' rounded={10} bg={'white'} height='220' m='auto' p='5'>
            {loggedIn
            ?
            <Center>
            <Box width={'100%'} mb='3' bg='red.700' _text={{color:'white',margin:'auto'}} p='2' rounded={4}>
                Logged in as {userName.username}
            </Box>
            <Button width={'100%'} onPress={()=>{
                signOut(auth).then(() => {
                   console.log("Sign-out successful.")
                  }).catch((error) => {
                   console.log("An error happened during signout")
                  });
                setUserName({username:'NULL',uid:''})
                setLoggedIn(false)
                // setShowModal(false)
            }}>
                Logout
            </Button>
            </Center>
            :
            <Center>
            <Box width={'100%'} bg='red.700' _text={{color:'white',margin:'auto'}} p='2' rounded={4}>
                Not Logged in 
            </Box>
            <Button my='3' width={'100%'} onPress={()=>{setModalState(1)}}>
                Log In
            </Button>
            <Button width={'100%'} onPress={()=>{setModalState(2)}}>
                Sign Up
            </Button>
            </Center>
            }
        </Box>
        }

        {/* LOGIN */}

        {modalState==1
        &&
        <Box width='220' rounded={10} bg={'white'} height='220' m='auto' p='5'>
        <Input placeholder='Email/Username' onChangeText={(txt)=>setEmail(txt)} value={email} ></Input>
        <Input placeholder='Password' onChangeText={(txt)=>setPassword(txt)} value={password}></Input>
        <Button width={'100%'}  onPress={()=>{
            signInWithEmailAndPassword(auth,email,password).then(async(userCredential)=> {
          let newsCopy={...newsObj}
                // first chck if user signed into firebase successfully or not
                const user = userCredential.user;
                // now check if the user's data is present in firestore or not & get user data
                try {
                  const docRef2=doc(db,"UsersSavedData",user.uid)
                              const docSnap2 = await getDoc(docRef2)
                              if(docSnap2.exists()){
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
}

        {/* SIGNUP */}

        {modalState==2 &&
        <Box width='220' rounded={10} bg={'white'} height='220' m='auto' p='5'>
        <Input placeholder='Email/Username' onChangeText={(txt)=>setEmail(txt)} ></Input>
        <Input placeholder='Password' onChangeText={(txt)=>setPassword(txt)} ></Input>
        <Button width={'100%'}  onPress={()=>{
            createUserWithEmailAndPassword(auth,email,password)
            .then(async(userCredential) => {
              // Signed in 
              const user = userCredential.user;
              console.log("user ",user)
              try {
                  const docRef = await setDoc(doc(db, "Users",user.uid), {
                      email: email,
                      password: password,
                      username:email.substring(0,email.length-10)
                    });
                    setUserName({username:email.substring(0,email.length-10),uid:user.uid})
                       setLoggedIn(true)
                       setShowModal(false)
                       setRevertOrder(true)
                        setIndex(0)
                } catch (e) {
                    console.error("Error adding document: ", e);
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
        }
        
      </TouchableOpacity>
    </Modal>
  )
}

export default LogModal

const styles = StyleSheet.create({})