import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
   apiKey: "AIzaSyDqzAQUsienEZ3HnkKyLqXR-FZmMQAVHqg",
   authDomain: "crown-db-15085.firebaseapp.com",
   databaseURL: "https://crown-db-15085.firebaseio.com",
   projectId: "crown-db-15085",
   storageBucket: "",
   messagingSenderId: "616346642250",
   appId: "1:616346642250:web:d960698f4495f3a5"
 };

 export const createUserProfileDocument = async (userAuth, additionalData) => {
   if (!userAuth) return;

   const userRef = firestore.doc(`users/${userAuth.uid}`);

   const snapShot = await userRef.get();

   if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
         })

      } catch (error) {
         console.log('error creating user', error.message);
      }
   }

   return userRef;
 };

 firebase.initializeApp(config);

 export const auth = firebase.auth();
 export const firestore = firebase.firestore();

 const provider = new firebase.auth.GoogleAuthProvider();
 provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;