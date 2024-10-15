import { FIREBASE_AUTH } from "./Config";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function signIn(emailId, password) {
    signInWithEmailAndPassword(FIREBASE_AUTH, emailId, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            return NaN;
        });
}