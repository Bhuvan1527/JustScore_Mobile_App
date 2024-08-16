import { StatusBar } from "expo-status-bar";
import {Text, View, Image, ScrollView, ImageBackground} from 'react-native';
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from '../constants';
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App(){
    const {isLoading, isLoggedIn} = useGlobalContext();
    if(!isLoading && isLoggedIn) return <Redirect href='/home' />
    return (
     <SafeAreaView style={{ flex: 1, backgroundColor: 'primary' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground
                    source={images.homeBackground}
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: 0.7
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }}>
                        <Image
                            source={images.logo}
                            style={{ width: 200, height: 100, resizeMode: 'contain' }}
                        />
                        
                        <View style={{ position: 'relative', marginTop: 20 }}>
                            <CustomButton
                                title="Continue With Email"
                                handlePress={() => router.push('/sign-in')}
                                containerStyles={{ width: '100%', marginTop: 20 }}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>

            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
}
