import { StyleSheet, Text, TouchableOpacity, View ,Modal} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Input} from 'native-base'
import {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,username,tabIndex,loadedNewsArticles,orderOfStartOptions,source,notInterestedSources,defaultCategory} from '../Recoil/Atoms'
import { useRecoilState,useSetRecoilState } from 'recoil'
import { getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { getFirestore,collection, setDoc, doc, getDoc } from "firebase/firestore";
import app from '../../firebaseConfig'
import { async } from '@firebase/util'


const LogModal = ({setShowModal}) => {

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

    const [userName,setUserName]=useRecoilState(username)
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
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
                Logged in as {userName}
            </Box>
            <Button width={'100%'} onPress={()=>{
                signOut(auth).then(() => {
                   console.log("Sign-out successful.")
                  }).catch((error) => {
                   console.log("An error happened during signout")
                  });
                setUserName('NULL')
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
        <Input placeholder='Email/Username' onChangeText={(txt)=>setEmail(txt)}></Input>
        <Input placeholder='Password' onChangeText={(txt)=>setPassword(txt)}></Input>
        <Button width={'100%'}  onPress={()=>{
            signInWithEmailAndPassword(auth,email,password).then(async(userCredential)=> {
                // first chck if user signed into firebase successfully or not
                const user = userCredential.user;
                // now check if the user's data is present in firestore or not & get user data
                try {
                    const docRef = doc(db, "Users", user.uid);
                      const docSnap = await getDoc(docRef);

                            if (docSnap.exists()) {
                              console.log("docsnap1 : ", docSnap.data());
                              try{
                              const docRef2=doc(db,"UsersSavedData",user.uid)
                              const docSnap2 = await getDoc(docRef2)
                              if(docSnap2.exists()){
                                setUserName(email.substring(0,email.length-10))
                                   setLoggedIn(true)
                                   setShowModal(false)
                                   let dataObj=docSnap2.data()
                                   setLoadImg(dataObj.loadImg)
                                   setNotInterestedSources(dataObj.notInterestedSources)
                                   setSavedCategories(dataObj.savedCategories)
                                   setSavedSources(dataObj.savedSources)
                                   //setting defaultcat maynot be required
                                   setDefaultCategory(dataObj.defaultCategory)
                                   //setSavedArticles
                                   setCategorizer(dataObj.defaultCategory)
                                  console.log("docsnap2 : ",dataObj)
                              }
                              }catch (e) {
                                console.error("Error adding document2: ", e);
                              }
                            } else {
                             // doc.data() will be undefined in this case
                            console.log("No such document!");
                            }

                            
                         //set loadImg set by the user
                        //  here take defaultCategory set by the user and setCategorizer to that value
                        //set not interested categories
                        //set saved categories
                        //set saved sources
                        //fetch saved articles from general using their titles (if not found,skip) and then set saved articles
                  } catch (e) {
                      console.error("Error adding document1: ", e);
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
        <Input placeholder='Email/Username' onChangeText={(txt)=>setEmail(txt)}></Input>
        <Input placeholder='Password' onChangeText={(txt)=>setPassword(txt)}></Input>
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
                    console.log("created user")
                    try{
                      const docRef2 = await setDoc(doc(db, "UsersSavedData",user.uid), {
                        defaultCategory:'general',
                        loadImg: true,
                        notInterestedSources:[],
                        savedArticles:[],
                        savedCategories:[],
                        savedSources:[]
                      });
                      setUserName(email.substring(0,email.length-10))
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
        }
        
      </TouchableOpacity>
    </Modal>
  )
}

export default LogModal

const styles = StyleSheet.create({})