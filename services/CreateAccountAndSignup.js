import { FIREBASE_AUTH } from "./Config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "./Config";
import { setDoc, doc, addDoc, collection } from 'firebase/firestore'; // Import Firestore functions
export async function createAccount(username, emailId, password){
    await createUserWithEmailAndPassword(FIREBASE_AUTH, emailId, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            updateProfile(user, {displayName: username}).catch((err) => console.log("Could not add username", err));
            // db.collection('Users').doc(user.uid).set({
            //     Email: user.email,
            //     Username: user.displayName,
            //     createdAt: firebase.firestore.FieldValue.serverTimestamp()
            // })
            setDoc(doc(db,"Users", user.uid), {
                Email: user.email,
                Username: username,
            });
            return user
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            return NaN
            // ..
        });
    
}
