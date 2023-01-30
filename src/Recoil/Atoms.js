import {
    atom,
    selector,
  } from 'recoil';

  const navToHome=atom({
    key:'navToHome',
    default:''
  })

  const newsArticles=atom({
    key:'newsArticles',
    default:[]
  })
  export {navToHome,newsArticles}