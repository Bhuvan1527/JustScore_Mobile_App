import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import CustomButton from '../components/CustomButton'

const Match = () => {
  const metaData = useLocalSearchParams();
  const [isFirstInnings, setIsFirstInnings] = useState(true)
  const [wideRun, setWideRun] = useState(false);
  const [Target, setTarget] = useState(null);
  const [isSecondInnings, setIsSecondInnings] = useState(false)

  useEffect(() => {
    if (metaData.run_for_wide === 'yes') {
      setWideRun(prevValue => !prevValue);
    }
    return;
  }, [])

  const [matchSeq, setMatchSeq] = useState({
    totalOvers: parseInt(metaData.no_of_overs),
    currentOver: 0,
    currentBall: 0,
    currentWicketsDown: 0,
    totalWickets: parseInt(metaData.no_of_players_per_team),
    currentScore: 0,
  })

  useEffect(() => {
    if (!isSecondInnings && !isFirstInnings) {
      // router.replace('/home')
    }
    if (isSecondInnings) {
      console.log("Second innings started")
      setMatchSeq(prev => ({ ...prev, currentBall: 0 }))
      setMatchSeq(prev => ({ ...prev, currentOver: 0 }))
      setMatchSeq(prev => ({ ...prev, currentWicketsDown: 0 }))
      setTarget(matchSeq.currentScore)
      setMatchSeq(prev => ({ ...prev, currentScore: 0 }))
    }

  }, [isSecondInnings])


  useEffect(() => {
    console.log("FirstInnings")
    if(!isFirstInnings) {
      setIsSecondInnings(true);
      console.log("Finished first innings");
    }

  }, [isFirstInnings])

  const handleScore = (runs, wickets) => {
    setMatchSeq(prevMatchSeq => ({ ...prevMatchSeq, currentScore: prevMatchSeq.currentScore + runs }));
    
    if (wickets != 0) {
      setMatchSeq(prevMatchSeq => ({
        ...prevMatchSeq,
        currentWicketsDown: prevMatchSeq.currentWicketsDown + wickets
      }));

      if (matchSeq.currentWicketsDown + wickets >= metaData.no_of_players_per_team) {
        if (isFirstInnings) {
          setIsFirstInnings(false)
        } 
        else if (isSecondInnings) setIsSecondInnings(false)
      }
    }
    setMatchSeq(prevMatchSeq => ({
      ...prevMatchSeq,
      currentBall: (prevMatchSeq.currentBall + 1) % 6
    }));


    if ((matchSeq.currentBall + 1) % 6 === 0) {
      setMatchSeq(prevMatchSeq => ({
        ...prevMatchSeq,
        currentOver: parseInt(prevMatchSeq.currentOver) + 1
      }));
      console.log(matchSeq.currentOver);
      if (matchSeq.currentOver + 1 === matchSeq.totalOvers) {
        if (isFirstInnings) {
          setIsFirstInnings(false);
        }
        else if(isSecondInnings) setIsSecondInnings(false);
      }
    }
    if(isSecondInnings && matchSeq.currentScore + runs > Target){
      setIsSecondInnings(false);
      return;
    }
    return;
  }

  const handleWide = () => {
    var var1 = 0;
    if (wideRun) {
      var1 = 1;
    }
    setMatchSeq(prevMatchSeq => ({ ...prevMatchSeq, currentScore: prevMatchSeq.currentScore + var1 }));
  }

  return (
    <SafeAreaView className="bg-primary h-full flex flex-col justify-start p-3">
      <View className="flex flex-row gap-2 justify-between items-center ">
        <Text className="text-secondary font-bold text-xl">Match for {metaData.no_of_overs} overs</Text>
        <CustomButton
          title="<"
          handlePress={() => router.replace('startMatch')}
          containerStyles="mt-7 w-[10vh]"
        />
      </View>
      <View className="flex flex-col gap-2 justify-center items-center">
        {isFirstInnings ? (
          <Text className="text-secondary font-bold text-2xl"> First Innings</Text>
        ) : (
          <Text className="text-secondary font-bold text-2xl"> Second Innings</Text>
        )}
      </View>
      <View className="justify-center min-h-[30vh] w-full flex flex-col items-center">
        <Text className="text-white text-6xl font-black">
          {matchSeq.currentScore}/{matchSeq.currentOver}.{matchSeq.currentBall}-{matchSeq.currentWicketsDown}
        </Text>
      </View>

      <View className="w-full justify-between flex flex-row gap-2 flex-wrap">
        <Text className="text-secondary text-lg font-bold w-[20vh]">Remaining Overs: {matchSeq.totalOvers - matchSeq.currentOver}</Text>
        {isSecondInnings && (
          <Text className="text-secondary text-lg font-bold w-[20vh]">Target: {Target}</Text>
        )}
      </View>

      <View className="w-full justify-between flex flex-row gap-2 flex-wrap mt-5">
        <CustomButton
          title="4 runs"
          handlePress={() => handleScore(4, 0)}
          containerStyles="mt-7 w-[10vh]"
        />
        <CustomButton
          title="6 runs"
          handlePress={() => handleScore(6, 0)}
          containerStyles="mt-7 w-[10vh]"
        />
        <CustomButton
          title="0 runs"
          handlePress={() => handleScore(0, 0)}
          containerStyles="mt-7 w-[10vh]"
        />
        <CustomButton
          title="1 run"
          handlePress={() => handleScore(1, 0)}
          containerStyles="mt-7 w-[10vh]"
        />
        <CustomButton
          title="2 runs"
          handlePress={() => handleScore(2, 0)}
          containerStyles="mt-7 w-[10vh]"
        />
        <CustomButton
          title="3 runs"
          handlePress={() => handleScore(3, 0)}
          containerStyles="mt-7 w-[10vh]"
        />
        <CustomButton
          title="wicket"
          handlePress={() => handleScore(0, 1)}
          containerStyles="mt-7 w-[10vh]"
        />
        <CustomButton
          title="wide"
          handlePress={handleWide}
          containerStyles="mt-7 w-[10vh]"
        />
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={!isFirstInnings && !isSecondInnings}
        onRequestClose={() => {console.warn("closed")}}
      >
        <View className="flex bg-white flex-col gap-2 justify-center items-center m-3">
          {(matchSeq.currentScore < Target) && <Text className="text-black text-4xl">
            YaY! Team A Won
            </Text>}
            {(matchSeq.currentScore > Target) && <Text className="text-black text-4xl">
            YaY! Team B Won
            </Text>}
            {(matchSeq.currentScore === Target) && <Text className="text-black text-4xl">
            Draw
            </Text>}
            <CustomButton
              title="Finish Match"
              handlePress={() => router.replace('/home')}
              containerStyles="w-full"
            />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Match

// const styles = StyleSheet.create({})