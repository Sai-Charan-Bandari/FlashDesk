import React from 'react'
import { Button } from 'native-base'
import {useSetRecoilState,useRecoilState, useRecoilValue} from 'recoil'
import { tabIndex,savedCategories,category} from '../Recoil/Atoms'


const OptionCard = ({cat,color,type}) => {
  
  if(type){
    // button
    let setIndex=useSetRecoilState(tabIndex)
    let setCategory=useSetRecoilState(category)
  return (
    <Button shadow={5} size={40}  _text={{fontSize:'18',fontWeight:'bold',color:'black'}} rounded='5' m='2' bg={color}
    onPress={()=>{
      setCategory(cat)
      setIndex(1)
    }}
    >
      {cat} 
    </Button >
  )}
  else{
    //checkbox
    const [savedCat,setSavedCat] = useRecoilState(savedCategories)
    let lowerCat=cat.toLowerCase()
    return(
      <Button shadow={5} size={40}  _text={!savedCat.includes(lowerCat) ? {fontSize:'18',fontWeight:'bold', color:'black'} : {fontSize:'18',fontWeight:'bold',color:'blue.500'}} rounded='5' m='2' bg={color}
    onPress={()=>{
      if(savedCat.includes(lowerCat)){
        let k=savedCat.filter((e)=>e!=lowerCat)
        setSavedCat(k)
      }else{
        setSavedCat([...savedCat,lowerCat])
      }
    }}
    >
      {cat} 
    </Button >
    )
  }
}
export default OptionCard