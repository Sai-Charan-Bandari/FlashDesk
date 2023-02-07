import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA-CAvGayxCckku75k7yyDLtKoL5uitGQc",
  authDomain: "newsapp-62fce.firebaseapp.com",
  projectId: "newsapp-62fce",
  storageBucket: "newsapp-62fce.appspot.com",
  messagingSenderId: "1019158481892",
  appId: "1:1019158481892:web:5f950df450a9ef373915f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app