import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingStartScreen({ navigation }) {
  // Funktion zum Navigieren zum nächsten Screen
  const handleGetStarted = () => {
    navigation.navigate('OnboardingStep1');
  };

  // Funktion zum Überspringen des Onboardings
  const skipToMainApp = () => {
    // Setze den Onboarding-Status, um zukünftige Onboardings zu überspringen
    AsyncStorage.setItem('userData', JSON.stringify({ onboardingCompleted: true }))
      .catch(error => console.error('Fehler beim Speichern des Onboarding-Status:', error));
      
    // Navigiere direkt zum HomeScreen
    navigation.reset({
      index: 0,
      routes: [{ 
        name: 'MainApp',
        // Diese Parameter stellen sicher, dass die Haupt-Navigation zum HomeTab navigiert
        params: { 
          screen: 'Home',
          initial: true 
        }
      }],
    });
  };

  // Wiederverwendbare Feature-Komponente
  const FeatureItem = ({ text }) => (
    <View style={styles.featureContainer}>
      <View style={styles.checkCircle}>
        <Text style={styles.checkmark}>✓</Text>
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Welcome to MealMind</Text>
          <Text style={styles.subtitle}>
            Your smart, friendly nutrition assistant that helps you reach your protein goals with personalized meal plans.
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <FeatureItem text="Personalized meal plans based on your goals" />
          <FeatureItem text="Track your macros and nutrition goals" />
          <FeatureItem text="AI-powered recipe suggestions" />
          <FeatureItem text="Automatic shopping lists" />
        </View>
      </ScrollView>

      {/* Button Section */}
      <View style={styles.buttonSection}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={skipToMainApp}
        >
          <Text style={styles.skipButtonText}>Skip to App</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.getStartedButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.getStartedButtonText}>Let's Get Started</Text>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E2F2F',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(62, 47, 47, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    marginBottom: 48,
    gap: 24,
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF9E7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkmark: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 16,
    color: '#3E2F2F',
    flex: 1,
  },
  buttonSection: {
    padding: 24,
    paddingBottom: 32,
  },
  skipButton: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#3E2F2F',
    fontWeight: '500',
  },
  getStartedButton: {
    backgroundColor: '#FF9E7E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedButtonText: {
    color: '#3E2F2F',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
