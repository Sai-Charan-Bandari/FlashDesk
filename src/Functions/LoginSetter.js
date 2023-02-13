import { View } from 'native-base'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,userDetails,tabIndex,loadedNewsArticles,orderOfStartOptions,notInterestedSources,defaultCategory} from '../Recoil/Atoms'
import app from '../../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { async } from '@firebase/util';

//CURRENTLY IT IS A FUNCTION NOT A COMP...UNCOMMENT RETURN STATEMENT TO MAKE IT A COMP
function LoginSetter(){

    const db=getFirestore(app)
    const auth=getAuth(app)
    let [newsObj,setNewsObj]=useRecoilState(loadedNewsArticles)
  let setSavedNewsArticles=useSetRecoilState(savedNewsArticles)
  let setSavedSources=useSetRecoilState(savedSources)
  let setLoadImg=useSetRecoilState(loadImg)
  let setSavedCategories=useSetRecoilState(savedCategories)
  let setNotInterestedSources=useSetRecoilState(notInterestedSources)
  let setDefaultCategory=useSetRecoilState(defaultCategory)
  let setUserName=useSetRecoilState(userDetails)
  let setLoggedIn=useSetRecoilState(logged)
  let [categorizer,setCategorizer]=useRecoilState(category)

  const setData=async(uid)=>{
    console.log("called setdaata")
   try{
     const docRef=doc(db,"Users",uid)
     console.log("got docref")
     const docSnap =await getDoc(docRef)
     if(docSnap.exists()){
       console.log("got docsnap")
       try {
        let newsCopy={...newsObj}
         const docRef2=doc(db,"UsersSavedData",uid)
         const docSnap2 = await getDoc(docRef2)
         if(docSnap2.exists()){
           setLoggedIn(true)
           //from docSnap of Users collection
           setUserName({username:docSnap.data().email.substring(0,email.length-10),uid:user.uid})
           //from docSnap of UsersSavedData collection
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
   }
  }
   catch(e){
   console.log("erroor in setting data ",e)
   }
  }

    onAuthStateChanged(auth,(user) => {
        if (user) {
          const uid = user.uid;
          setData(uid);
          // alert(uid)
        } else {
          setLoggedIn(false)
          // alert('successfully logged out')
        }
      }); 


    //   return (
    //     <View></View>
    //   )
    }
    
export default LoginSetter
