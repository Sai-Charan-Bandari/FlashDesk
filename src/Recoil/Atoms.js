import {
    atom,
    selector,
  } from 'recoil';

  //it tells whether the search icon fab needs to be displayed or not
  const fabVisible=atom({
    key:'fabVisible',
    default:true
  })
  const loadedNewsArticles=atom({
    key:'loadedNewsArticles',
    default:{
      general:[],
      business:[],
      science:[],
      entertainment:[],
      sports:[],
      health:[],
      technology:[],
    }
    // default:[]
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
  //from 25th commit onwards there is no source atom (representing selected source)... it is identified by category only
  const category=atom({
    //note: all category names stored here Start with capital letter except 'general'
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
    default:false
    // make sure to set default to false... befroe firebase auth
  })

  //change this atom to userDetails later
  const username=atom({
    key:'username',
    default:'NULL'
    // default:'NULL'
  })

  //used in FilterMenu and NavTabs
  //specifies which tab is being displayed currently
  const tabIndex=atom({
    key:'tabIndex',
    default:1
  })

  export {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories,username,tabIndex,loadedNewsArticles,orderOfStartOptions,notInterestedSources,defaultCategory,fabVisible}