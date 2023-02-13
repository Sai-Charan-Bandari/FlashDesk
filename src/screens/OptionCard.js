import React, { useEffect } from 'react'
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
    
    return(
      <Button shadow={5} size={40}  _text={!savedCat.includes(cat) ? {fontSize:'18',fontWeight:'bold', color:'black'} : {fontSize:'18',fontWeight:'bold',color:'black'}} rounded='5' m='2' bg={color} borderWidth={savedCat.includes(cat) ? '3' : '0'} borderColor={savedCat.includes(cat)?'red.500':'black'}
    onPress={()=>{
      if(savedCat.includes(cat)){
        let k=savedCat.filter((e)=>e!=cat)
        setSavedCat(k)
      }else{
        setSavedCat([...savedCat,cat])
      }
    }}
    >
      {cat} 
    </Button >
    )
  }
}
export default OptionCard