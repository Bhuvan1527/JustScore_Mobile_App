import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router';

const StartMatch = () => {
  const [metaDetails, setMetaDetails] = useState({
    no_of_overs: '2',
    run_for_wide: 'yes',
    no_of_players_per_team: '5'
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const start = () => {
    if(!metaDetails.no_of_overs || !metaDetails.no_of_players_per_team || !metaDetails.run_for_wide){
      Alert.alert("Error", "Please fill in all the fields")
    }

    // router.push({pathname:`match/${metaDetails.no_of_overs}`, params: metaDetails})
    router.push({pathname:'match', params: metaDetails})
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="texsecondt-2xl text-white text-semibold mt-10 font-psemibold">Fill-in the details</Text>
          <View className="flex flex-row flex-wrap gap-2 justify-evenly items-center ">
            <FormField
              title="Over Count"
              value={metaDetails.no_of_overs}
              handleChangeText={(e) => setMetaDetails({ ...metaDetails, no_of_overs: e })}
              otherStyles="mt-7 max-w-[50vh] flex flex-col items-center content-center"
            />

            <FormField
              title="Runs for Wide"
              value={metaDetails.run_for_wide}
              handleChangeText={(e) => setMetaDetails({ ...metaDetails, run_for_wide: e })}
              otherStyles="mt-7 max-w-[50vh] flex flex-col items-center content-center"
            />

            <FormField
              title="Players Per Team"
              value={metaDetails.no_of_players_per_team}
              handleChangeText={(e) => setMetaDetails({ ...metaDetails, no_of_players_per_team: e })}
              otherStyles="mt-7 max-w-[50vh] flex flex-col items-center content-center"
            />
          </View>
          <CustomButton
            title="Start the match"
            handlePress={start}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default StartMatch