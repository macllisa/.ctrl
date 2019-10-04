import firebase from 'firebase';

const fire = firebase.initializeApp({
    apiKey: "AIzaSyCgVasuDBhsKqaZ8a-dIAdhaLXM_F8dTlE",
    authDomain: "controle-estoque-3939.firebaseapp.com",
    databaseURL: "https://controle-estoque-3939.firebaseio.com",
    projectId: "controle-estoque-3939",
    storageBucket: "controle-estoque-3939.appspot.com",
    messagingSenderId: "915947126561",
    appId: "1:915947126561:web:6691d0e19c76b90469c860"
});

export const db = fire.firestore();
export const usersCollection = db.collection('usuarios');
export const pedidosCollection = db.collection('pedidos');
export const produtosCollection = db.collection('produtos');