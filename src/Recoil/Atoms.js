import {
    atom,
    selector,
  } from 'recoil';

  const navToHome=atom({
    key:'navToHome',
    default:''
  })

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

  const logged=atom({
    key:'logged',
    default:true
    // make sure to set default to false... befroe firebase auth
  })
  
  //savedsrc
  //notinterestedsrc
  export {navToHome,savedNewsArticles,loadImg,category,logged}