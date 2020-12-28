import firebase from 'firebase'
import firestore from 'firebase/firestore'

  var firebaseConfig = {
    apiKey: "AIzaSyDNWz_4qy2Tg7MxrpUCkZESeW3Ltx6T3K8",
    authDomain: "udemy-ninja-smoothies-d6068.firebaseapp.com",
    databaseURL: "https://udemy-ninja-smoothies-d6068.firebaseio.com",
    projectId: "udemy-ninja-smoothies-d6068",
    storageBucket: "udemy-ninja-smoothies-d6068.appspot.com",
    messagingSenderId: "710791792311",
    appId: "1:710791792311:web:96daa3f8c4f450b9136f32"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  // firebaseApp.firestore().setting({ timestampInSnapShots: true })
  // ta lưu cái initializeApp thành 1 biến. vì biến này có thể gọi ra các thư viện dịch vụ của firebase


  //export firestore database, export để các thằng nào muốn dùng thì grap từ cái init.js này
  export default firebaseApp.firestore();