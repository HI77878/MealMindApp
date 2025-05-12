import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingStep10Screen({ navigation }) {
  const [selected, setSelected] = useState(null);

  // Optionen zur Auswahl
  const options = [
    { value: 'tiktok', label: 'TikTok', icon: '🎵' },
    { value: 'instagram', label: 'Instagram', icon: '📸' },
    { value: 'recommendation', label: 'Empfehlung', icon: '👥' },
    { value: 'appstore', label: 'App Store', icon: '📱' },
    { value: 'other', label: 'Sonstiges', icon: '✨' },
  ];

  // Funktion zum Navigieren zum nächsten Screen
  const handleContinue = async () => {
    if (!selected) {
      return; // Button sollte deaktiviert sein, aber zur Sicherheit prüfen
    }

    try {
      // Holen der vorhandenen Nutzerdaten
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : {};
      
      // Hinzufügen der Information, wie der Nutzer die App gefunden hat
      const updatedUserData = {
        ...userData,
        howFoundUs: selected
      };
      
      // Speichern der aktualisierten Daten
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // Zum nächsten Screen navigieren
      navigation.navigate('OnboardingStep11');
    } catch (error) {
      console.error('Fehler beim Speichern der Herkunftsinformation:', error);
    }
  };

  // Komponente für Option-Karte
  const OptionCard = ({ option }) => (
    <TouchableOpacity 
      style={[
        styles.optionCard,
        selected === option.value && styles.optionCardSelected
      ]}
      onPress={() => setSelected(option.value)}
    >
      <View style={styles.optionContent}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{option.icon}</Text>
        </View>
        <Text style={styles.optionLabel}>{option.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '91%' }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Step 10/11</Text>
            <Text style={styles.progressLabel}>How You Found Us</Text>
          </View>
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Wie hast du uns gefunden?</Text>
          <Text style={styles.subtitle}>
            Deine Antwort hilft uns, unsere App zu verbessern.
          </Text>
        </View>

        {/* Options List */}
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <OptionCard key={option.value} option={option} />
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selected && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selected}
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
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 80,
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
  optionsContainer: {
    marginTop: 16,
  },
  optionCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(220, 206, 249, 0.5)',
    padding: 16,
    marginBottom: 16,
  },
  optionCardSelected: {
    backgroundColor: 'rgba(255, 158, 126, 0.2)',
    borderColor: '#FF9E7E',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(220, 206, 249, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  buttonContainer: {
    padding: 24,
    paddingTop: 0,
    backgroundColor: '#FFF3EA',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
