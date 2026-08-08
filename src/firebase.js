import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBamxbClUKKslwFyGWqBOfhjg9H7cqvQDU",
  authDomain: "netflix-clone-5231d.firebaseapp.com",
  projectId: "netflix-clone-5231d",
  storageBucket: "netflix-clone-5231d.firebasestorage.app",
  messagingSenderId: "99866579536",
  appId: "1:99866579536:web:062c1a4d7b47a31da87755"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password ) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email
        })
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const login = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error)
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, signup, login, logout}