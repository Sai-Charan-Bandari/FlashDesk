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
  // denotes default Category to be loaded on login
  const defaultCategory=atom({
    key:'defaultCategory',
    default:''
  })
  // denotes current selected Category
  const category=atom({
    key:'category',
    default:'general'
  })
  // denotes current selected Source
  const source=atom({
    key:'source',
    default:''
  })
  const savedCategories=atom({
    key:'savedCategories',
    default:['general']
    // default:[]
  })
  
  const savedSources=atom({
    key:'savedSources',
    // default:['No sources saved yet']
    default:[]
  })
  
  //notinterestedsrc
  const notInterestedSources=atom({
    key:'notInterestedSources',
    default:[]
  })
 const orderOfStartOptions=atom({
  //if it is false then both buttons and chckboxes will be displayed
  //else only chckboxes will be displayed
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

  export {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,username,tabIndex,loadedNewsArticles,orderOfStartOptions,source,notInterestedSources,defaultCategory}