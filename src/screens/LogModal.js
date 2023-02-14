import { StyleSheet, Text, TouchableOpacity, View ,Modal, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Input} from 'native-base'
import {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,userDetails,tabIndex,loadedNewsArticles,orderOfStartOptions,source,notInterestedSources,defaultCategory} from '../Recoil/Atoms'
import { useRecoilState,useSetRecoilState } from 'recoil'
import { getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { getFirestore,collection, setDoc, doc, getDoc } from "firebase/firestore";
import app from '../../firebaseConfig'
import { async } from '@firebase/util'
import MyActivityIndicator from './MyActivityIndicator'
import LoginButton from './LoginButton'
import SignupButton from './SignupButton'
import LogoutButton from './LogoutButton'


const LogModal = ({setShowModal}) => {

    const [loggedIn,setLoggedIn]=useRecoilState(logged)
    useEffect(()=>{
        console.log('loggedIn : ',loggedIn)
    },[loggedIn])

    // const [userName,setUserName]=useRecoilState(userDetails)
    const [modalState,setModalState]=useState(0)
    //0-> nrml , 1-> login, 2-> signup, 3-> loading

    
  return (
    <Modal transparent={true} animationType='slide'>
      <TouchableOpacity style={{width:'100%',height:'100%',backgroundColor:'#00000080'}}  onPress={()=>setShowModal(false)} >
        {modalState==0
        &&
        <Box width='220' rounded={10} bg={'white'} height='220' m='auto' p='5'>
            {loggedIn
            ?
            <LogoutButton setModalState={setModalState} setShowModal={setShowModal} />
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
        <LoginButton setModalState={setModalState} setShowModal={setShowModal} />
}

        {/* SIGNUP */}

        {modalState==2 &&
        <SignupButton setModalState={setModalState} setShowModal={setShowModal} />
        }

        {/* LOADING */}

        {modalState==3 && <MyActivityIndicator/>}
        
      </TouchableOpacity>
    </Modal>
  )
}

export default LogModal

const styles = StyleSheet.create({})