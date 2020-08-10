import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, AppState } from 'react-native';
import AppStack from './src/routes/AppStack';
import { AppLoading} from 'expo';
import {Poppins_400Regular, Poppins_600SemiBold, useFonts} from '@expo-google-fonts/poppins';
import {Archivo_400Regular , Archivo_700Bold} from '@expo-google-fonts/archivo';

export default function App() {

  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  })

  if( !fontsLoaded) {
    return <AppLoading />
  }else {
    return (
      <>
        <AppStack />
        <StatusBar style="light" /> 
      </>
    );
  }




  
}


