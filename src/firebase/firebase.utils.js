import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBdB7a3pC0KGxWxQYhkbma39Cz1seyvzrs",
  authDomain: "clothing-db-db204.firebaseapp.com",
  databaseURL: "https://clothing-db-db204.firebaseio.com",
  projectId: "clothing-db-db204",
  storageBucket: "clothing-db-db204.appspot.com",
  messagingSenderId: "1055433696517",
  appId: "1:1055433696517:web:994fac1a3076bd4559836c",
  measurementId: "G-6PW4V821X3"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
