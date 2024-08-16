import { Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';


const Home = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View className="justify-center flex flex-col h-screen items-center space-x-2 content-center bg-black w-full h-[10vh]">
          <Text className="text-2xl text-semibold font-pextrabold text-secondary"> Welcome to JustScore</Text>
          <Image
            source={images.logo}
            style={{resizeMode:'contain', height:40, width:100}}
          />
      </View>
      <View>
        
      </View>
      
    </SafeAreaView>
  )
}

export default Home
