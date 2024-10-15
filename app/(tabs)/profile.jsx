
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../services/Config";

import { icons } from "../../constants";

const Profile = () => {
  
  const logout = async () => {
    
    signOut(FIREBASE_AUTH).then(() => {
        // Sign-out successful.
      console.log("Signed out successfully");
      router.replace("/sign-in");
    }).catch((error) => {
        // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      router.replace("/home");
    });
    
    
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>            
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default Profile
