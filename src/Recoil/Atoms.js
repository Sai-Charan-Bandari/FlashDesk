import {
    atom,
    selector,
  } from 'recoil';

  const loadedNewsArticles=atom({
    key:'loadedNewsArticles',
    default:[]
  })
  const savedNewsArticles=atom({
    key:'savedNewsArticles',
    default:[]
  })
  const loadImg=atom({
    key:'loadImg',
    default:true
  })
  // denotes current selected Category
  const category=atom({
    key:'category',
    default:'general'
  })
  const savedCategories=atom({
    key:'savedCategories',
    default:['general']
    // default:[]
  })

  const savedSources=atom({
    key:'savedSources',
    default:['No sources saved yet']
    // default:['No sources saved yet','science','fiction']
  })

 const orderOfStartOptions=atom({
  key:'orderOfStartOptions',
  default:false
 })

  const logged=atom({
    key:'logged',
    default:true
    // make sure to set default to false... befroe firebase auth
  })

  //change this atom to userDetails later
  const username=atom({
    key:'username',
    default:'Charan'
    // default:'NULL'
  })

  //used in FilterMenu and NavTabs
  //specifies which tab is being displayed currently
  const tabIndex=atom({
    key:'tabIndex',
    default:1
  })

  //notinterestedsrc
  export {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,username,tabIndex,loadedNewsArticles,orderOfStartOptions}