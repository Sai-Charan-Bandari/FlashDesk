import {
    atom,
    selector,
  } from 'recoil';

  const savedNewsArticles=atom({
    key:'savedNewsArticles',
    default:[]
  })
  const loadImg=atom({
    key:'loadImg',
    default:true
  })
  const category=atom({
    key:'category',
    default:'general'
  })
  const savedCategories=atom({
    key:'savedCategories',
    default:['general']
  })
  const savedSources=atom({
    key:'savedSources',
    default:['No sources saved yet']
    // default:['No sources saved yet','science','fiction']
  })

  const logged=atom({
    key:'logged',
    default:false
    // make sure to set default to false... befroe firebase auth
  })

  //savedsrc
  //notinterestedsrc
  export {savedNewsArticles,savedSources,loadImg,category,logged,savedCategories}