import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity
} from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingStep2Screen({ navigation }) {
  const [hungerLevel, setHungerLevel] = useState(5);

  // Funktion zum Navigieren zum nächsten Screen
  const handleContinue = async () => {
    try {
      // Holen der vorhandenen Nutzerdaten
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : {};
      
      // Hinzufügen des Hunger-Levels
      const updatedUserData = {
        ...userData,
        hungerLevel
      };
      
      // Speichern der aktualisierten Daten
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // Zum nächsten Screen navigieren
      navigation.navigate('OnboardingStep3');
    } catch (error) {
      console.error('Fehler beim Speichern des Hunger-Levels:', error);
    }
  };

  // Hilfsfunktion für den Hinweistext
  const getMeaningText = () => {
    if (hungerLevel <= 3) {
      return "With a low hunger level, we'll suggest fewer, more substantial meals to keep you satisfied.";
    } else if (hungerLevel <= 7) {
      return "With a medium hunger level, we'll suggest 4-5 balanced meals throughout the day to keep your energy levels stable.";
    } else {
      return "With a high hunger level, we'll suggest more frequent, smaller meals to help manage your hunger throughout the day.";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '22%' }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>Step 2/11</Text>
          <Text style={styles.progressLabel}>Hunger Level</Text>
        </View>
      </View>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>How hungry are you usually?</Text>
        <Text style={styles.subtitle}>
          This helps us determine your meal frequency and portion sizes.
        </Text>
      </View>

      {/* Slider Section */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderValueContainer}>
          <Text style={styles.sliderValue}>{hungerLevel}</Text>
        </View>
        
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={hungerLevel}
          onValueChange={setHungerLevel}
          minimumTrackTintColor="#EC8E6C"
          maximumTrackTintColor="#DCCEF9"
          thumbTintColor="#D6426C"
        />
        
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabelText}>Rarely hungry</Text>
          <Text style={styles.sliderLabelText}>Always hungry</Text>
        </View>
      </View>

      {/* What this means section */}
      <View style={styles.meaningContainer}>
        <Text style={styles.meaningTitle}>What this means:</Text>
        <Text style={styles.meaningText}>{getMeaningText()}</Text>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3EA',
    padding: 24,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#DCCEF9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF9E7E',
    borderRadius: 2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.6)',
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(62, 47, 47, 0.7)',
    lineHeight: 22,
  },
  sliderContainer: {
    marginVertical: 32,
  },
  sliderValueContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  sliderValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D6426C',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabelText: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.7)',
  },
  meaningContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DCCEF9',
    marginTop: 24,
    marginBottom: 24,
  },
  meaningTitle: {
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 4,
  },
  meaningText: {
    fontSize: 14,
    color: 'rgba(62, 47, 47, 0.7)',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  continueButton: {
    backgroundColor: '#FF9E7E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#3E2F2F',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
