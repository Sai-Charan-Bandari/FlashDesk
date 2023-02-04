import { StyleSheet, Text, TouchableOpacity, View ,Modal} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Input} from 'native-base'
import {logged, username} from '../Recoil/Atoms'
import { useRecoilState } from 'recoil'

const LogModal = ({setShowModal}) => {
    const [loggedIn,setLoggedIn]=useRecoilState(logged)
    useEffect(()=>{
        console.log('loggedIn : ',loggedIn)
    },[loggedIn])
    const [userName,setUserName]=useRecoilState(username)
    const [modalState,setModalState]=useState(0)
    //0-> nrml , 1-> login, 2-> signup
  return (
    <Modal transparent={true} animationType='slide'>
      <TouchableOpacity style={{width:'100%',height:'100%',backgroundColor:'#00000080'}}  onPress={()=>setShowModal(false)} >
        {modalState==0
        &&
        <Box width='200' rounded={10} bg={'white'} height='200' m='auto' p='5'>
            {loggedIn
            ?
            <Center>
            <Text>
                Logged in as {userName}
            </Text>
            <Button onPress={()=>{
                setUserName('NULL')
                setLoggedIn(false)
                // setShowModal(false)
            }}>
                Logout
            </Button>
            </Center>
            :
            <Center>
            <Text>
                not Logged in 
            </Text>
            <Button onPress={()=>{
                setModalState(1)
            }}>
                Log In
            </Button>
            <Button onPress={()=>{
                setModalState(2)
            }}>
                Sign Up
            </Button>
            </Center>
            }
        </Box>
        }

        {modalState==1
        &&
        <Box width='200' rounded={10} bg={'white'} height='200' m='auto' p='5'>
        <Input placeholder='Email/Username'></Input>
        <Input placeholder='Password'></Input>
        <Button onPress={()=>{
                 setUserName('Charan')
                 setLoggedIn(true)
                 setShowModal(false)
        }}>Log in</Button>
        </Box>
}
        {modalState==2 &&
        <Box width='200' rounded={10} bg={'white'} height='200' m='auto' p='5'>
        <Input placeholder='Email/Username'></Input>
        <Input placeholder='Password'></Input>
        <Button onPress={()=>{
                 setUserName('Charan')
                 setLoggedIn(true)
                 setShowModal(false)
        }}>Sign up</Button>
        </Box>
        }
        
      </TouchableOpacity>
    </Modal>
  )
}

export default LogModal

const styles = StyleSheet.create({})