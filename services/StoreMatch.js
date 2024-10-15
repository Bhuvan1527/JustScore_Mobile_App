import { addDoc, CollectionReference, doc, DocumentReference, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH } from "./Config";
import { db } from "./Config"; // Firebase Firestore instance
import { collectManifestSchemes } from "expo-linking";
import { collection } from "firebase/firestore";

// Function to add a match to the 'matches' collection of a specific user
const addOrUpdateMatch = async (uid, matchData, matchId = null) => {
  try {
    // const userDocRef = doc(db, "Users/"+uid+"/Matches", uid)  // Reference to the user document
    addDoc(collection(db, "Users/"+uid+"/Matches"), {
        MatchSequence: JSON.stringify(matchData)
    })
    console.log("Match successfully added");
    
  } catch (error) {
    console.error("Error adding/updating match: ", error);
  }
};

export default addOrUpdateMatch;