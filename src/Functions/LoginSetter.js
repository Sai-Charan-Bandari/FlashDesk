import { useSetRecoilState } from 'recoil'
import {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,username,tabIndex,loadedNewsArticles,orderOfStartOptions,source,notInterestedSources,defaultCategory} from '../Recoil/Atoms'

//takes userData
function LoginSetter({savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,username,tabIndex,loadedNewsArticles,orderOfStartOptions,source,notInterestedSources,defaultCategory}){
    setLoadImg(loadImg)
    setDefaultCategory(defaultCategory)
    setSavedCategories(savedCategories)
}

//importer creates setState funcs using atoms and passes it to LoginSetter which
    let setSavedNewsArticles=useSetRecoilState(savedNewsArticles)
    let setSavedSources=useSetRecoilState(savedSources)
    let setLoadImg=useSetRecoilState(loadImg)
    let setSavedCategories=useSetRecoilState(savedCategories)
    let setNotInterestedSources=useSetRecoilState(notInterestedSources)
    let setDefaultCategory=useSetRecoilState(defaultCategory)

