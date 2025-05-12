import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigator from '../../navigation/MainNavigator';

export default function MainAppScreen({ navigation, route }) {
  // Parameter für direkte Navigation auslesen
  const initialScreen = route.params?.screen || null;
  const isInitial = route.params?.initial || false;
  
  // Beim Laden direkt zum HomeScreen navigieren, falls Parameter vorhanden
  useEffect(() => {
    if (initialScreen && isInitial) {
      // Verzögerung, um sicherzustellen, dass der MainNavigator vollständig geladen ist
      setTimeout(() => {
        navigation.navigate(initialScreen);
      }, 100);
    }
  }, [initialScreen, isInitial, navigation]);

  // Dummy-Funktion zum Zurücksetzen des Onboardings (für Tests)
  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.reset({
        index: 0,
        routes: [{ name: 'OnboardingStart' }],
      });
    } catch (error) {
      console.error('Fehler beim Zurücksetzen des Onboardings:', error);
    }
  };

  // Wenn initialScreen gesetzt ist, zeige direkt den MainNavigator an
  if (initialScreen && isInitial) {
    return <MainNavigator initialRouteName={initialScreen} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>MealMind App</Text>
        <Text style={styles.subtitle}>Willkommen bei der MealMind App!</Text>
        <Text style={styles.description}>
          Das Onboarding wurde erfolgreich abgeschlossen. Hier beginnt die Hauptanwendung.
        </Text>
        
        {/* Zum HomeScreen navigieren */}
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navButtonText}>Zur Startseite</Text>
        </TouchableOpacity>
        
        {/* Nur für Testzwecke */}
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={resetOnboarding}
        >
          <Text style={styles.resetButtonText}>Onboarding zurücksetzen (für Tests)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3EA',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D6426C',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: 'rgba(62, 47, 47, 0.7)',
    textAlign: 'center',
    marginBottom: 32,
  },
  navButton: {
    backgroundColor: '#FF9E7E',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  navButtonText: {
    color: '#3E2F2F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#DCCEF9',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 48,
  },
  resetButtonText: {
    color: '#3E2F2F',
    fontSize: 14,
    fontWeight: '500',
  },
});
