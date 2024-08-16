import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
// import useAppwrite from "../../lib/useAppwrite";
import {signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  // const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    try {
      const x = await signOut();
      setUser(null);
      setIsLoggedIn(false);

      router.replace("/sign-in");
    } catch (error) {
      console.log("Error in sign-out")
    }
    
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {console.log(user)}
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
};

export default Profile;