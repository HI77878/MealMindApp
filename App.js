import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigation/MainNavigator';
import OnboardingNavigator from './src/navigation/OnboardingNavigator';

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [initialRoute, setInitialRoute] = useState('OnboardingStart');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function checkIfFirstLaunch() {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData.onboardingCompleted) {
            setIsFirstLaunch(false);
            setInitialRoute('MainApp');
          } else {
            setIsFirstLaunch(true);
          }
        } else {
          setIsFirstLaunch(true);
          // Lassen wir 'hasLaunched' weg, damit das Onboarding jedes Mal neu gestartet wird,
          // wenn keine Nutzerdaten existieren
        }
      } catch (error) {
        console.log(error);
        setIsFirstLaunch(true);
      } finally {
        setIsLoading(false);
      }
    }
    
    checkIfFirstLaunch();
  }, []);

  if (isLoading) {
    // Noch prüfend, könnte Splashscreen zeigen
    return null;
  }

  return (
    <NavigationContainer>
      {isFirstLaunch ? 
        <OnboardingNavigator initialRouteName={initialRoute} /> : 
        <MainNavigator />
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3EA',
  },
}); 