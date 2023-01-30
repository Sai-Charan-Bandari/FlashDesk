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
  export {navToHome,savedNewsArticles,loadImg}