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
  export {navToHome,savedNewsArticles}