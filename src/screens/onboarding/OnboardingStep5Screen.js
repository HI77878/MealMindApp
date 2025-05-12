import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingStep5Screen({ navigation }) {
  const [selectedTime, setSelectedTime] = useState(null);

  // Zeitoptionen
  const timeOptions = [
    { value: '15', label: '15 min' },
    { value: '30', label: '30 min' },
    { value: '45', label: '45 min' },
    { value: '60+', label: '60+ min' },
  ];

  // Funktion zum Navigieren zum nächsten Screen
  const handleContinue = async () => {
    if (!selectedTime) {
      return; // Button sollte deaktiviert sein, aber zur Sicherheit prüfen
    }

    try {
      // Holen der vorhandenen Nutzerdaten
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : {};
      
      // Hinzufügen der Kochzeit
      const updatedUserData = {
        ...userData,
        cookingTime: selectedTime
      };
      
      // Speichern der aktualisierten Daten
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // Zum nächsten Screen navigieren
      navigation.navigate('OnboardingStep6');
    } catch (error) {
      console.error('Fehler beim Speichern der Kochzeit:', error);
    }
  };

  // Hilfsfunktion für den Hinweistext
  const getTimeMeaningText = () => {
    switch (selectedTime) {
      case '15':
        return "We'll focus on quick, simple recipes that require minimal preparation.";
      case '30':
        return "A good balance of quick meals and some that need a bit more attention.";
      case '45':
        return "You'll get a mix of recipes, including some that are more involved.";
      case '60+':
        return "You'll receive a variety of recipes, including those that require more preparation time.";
      default:
        return "Select how much time you typically have for meal preparation each day.";
    }
  };

  // Komponente für Zeit-Option
  const TimeOptionCard = ({ option }) => (
    <TouchableOpacity 
      style={[
        styles.timeCard,
        selectedTime === option.value && styles.timeCardSelected
      ]}
      onPress={() => setSelectedTime(option.value)}
    >
      <View style={styles.timeCardContent}>
        <Ionicons 
          name="time-outline" 
          size={24} 
          color={selectedTime === option.value ? '#8BC34A' : 'rgba(62, 47, 47, 0.6)'} 
        />
        <Text style={styles.timeLabel}>{option.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '55%' }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>Step 5/11</Text>
          <Text style={styles.progressLabel}>Cooking Time</Text>
        </View>
      </View>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>How much time do you have for cooking/preparation each day?</Text>
        <Text style={styles.subtitle}>
          We'll suggest recipes that fit your available time.
        </Text>
      </View>

      {/* Time Options Grid */}
      <View style={styles.timeOptionsContainer}>
        <View style={styles.timeOptionsRow}>
          <TimeOptionCard option={timeOptions[0]} />
          <TimeOptionCard option={timeOptions[1]} />
        </View>
        <View style={styles.timeOptionsRow}>
          <TimeOptionCard option={timeOptions[2]} />
          <TimeOptionCard option={timeOptions[3]} />
        </View>
      </View>

      {/* What this means section */}
      <View style={styles.meaningContainer}>
        <Text style={styles.meaningTitle}>What this means:</Text>
        <Text style={styles.meaningText}>{getTimeMeaningText()}</Text>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedTime && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedTime}
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
  timeOptionsContainer: {
    marginVertical: 24,
  },
  timeOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(220, 206, 249, 0.5)',
    padding: 16,
  },
  timeCardSelected: {
    backgroundColor: 'rgba(139, 195, 74, 0.2)',
    borderColor: '#8BC34A',
  },
  timeCardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  timeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginTop: 8,
  },
  meaningContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DCCEF9',
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
  continueButtonDisabled: {
    backgroundColor: 'rgba(255, 158, 126, 0.6)',
  },
  continueButtonText: {
    color: '#3E2F2F',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
