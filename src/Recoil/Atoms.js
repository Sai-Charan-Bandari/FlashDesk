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
  export {navToHome,savedNewsArticles,loadImg,category}