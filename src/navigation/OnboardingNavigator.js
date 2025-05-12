import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingStartScreen from '../screens/onboarding/OnboardingStartScreen';
import OnboardingStep1Screen from '../screens/onboarding/OnboardingStep1Screen';
import OnboardingStep2Screen from '../screens/onboarding/OnboardingStep2Screen';
import OnboardingStep3Screen from '../screens/onboarding/OnboardingStep3Screen';
import OnboardingStep4Screen from '../screens/onboarding/OnboardingStep4Screen';
import OnboardingStep5Screen from '../screens/onboarding/OnboardingStep5Screen';
import OnboardingStep6Screen from '../screens/onboarding/OnboardingStep6Screen';
import OnboardingStep7Screen from '../screens/onboarding/OnboardingStep7Screen';
import OnboardingStep8Screen from '../screens/onboarding/OnboardingStep8Screen';
import OnboardingStep9Screen from '../screens/onboarding/OnboardingStep9Screen';
import OnboardingStep10Screen from '../screens/onboarding/OnboardingStep10Screen';
import OnboardingStep11Screen from '../screens/onboarding/OnboardingStep11Screen';
import MainAppScreen from '../screens/main/MainAppScreen';

const Stack = createStackNavigator();

export default function OnboardingNavigator({ initialRouteName = 'OnboardingStart' }) {
  return (
    <Stack.Navigator 
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="OnboardingStart" component={OnboardingStartScreen} />
      <Stack.Screen name="OnboardingStep1" component={OnboardingStep1Screen} />
      <Stack.Screen name="OnboardingStep2" component={OnboardingStep2Screen} />
      <Stack.Screen name="OnboardingStep3" component={OnboardingStep3Screen} />
      <Stack.Screen name="OnboardingStep4" component={OnboardingStep4Screen} />
      <Stack.Screen name="OnboardingStep5" component={OnboardingStep5Screen} />
      <Stack.Screen name="OnboardingStep6" component={OnboardingStep6Screen} />
      <Stack.Screen name="OnboardingStep7" component={OnboardingStep7Screen} />
      <Stack.Screen name="OnboardingStep8" component={OnboardingStep8Screen} />
      <Stack.Screen name="OnboardingStep9" component={OnboardingStep9Screen} />
      <Stack.Screen name="OnboardingStep10" component={OnboardingStep10Screen} />
      <Stack.Screen name="OnboardingStep11" component={OnboardingStep11Screen} />
      <Stack.Screen name="MainApp" component={MainAppScreen} />
      {/* Hier später weitere Onboarding-Screens hinzufügen */}
    </Stack.Navigator>
  );
} 