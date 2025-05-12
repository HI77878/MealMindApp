import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingStep11Screen({ navigation }) {
  const [selected, setSelected] = useState([]);
  const [otherText, setOtherText] = useState('');

  // Motivationsoptionen
  const options = [
    { value: 'muscle', label: 'Muskelaufbau', icon: '💪' },
    { value: 'fat', label: 'Fettabbau', icon: '🔥' },
    { value: 'time', label: 'Zeit sparen', icon: '⏱️' },
    { value: 'nutrition', label: 'Bessere Ernährung', icon: '🥗' },
    { value: 'health', label: 'Gesundheit verbessern', icon: '❤️' },
  ];

  // Toggle-Funktion zum Hinzufügen/Entfernen einer Option
  const toggleOption = (value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(item => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  // Funktion zum Abschließen des Onboardings und Navigieren zum Hauptscreen
  const handleCompleteSetup = async () => {
    if (selected.length === 0) {
      return; // Button sollte deaktiviert sein, aber zur Sicherheit prüfen
    }

    try {
      // Holen der vorhandenen Nutzerdaten
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : {};
      
      // Hinzufügen der Motivationsdaten
      const updatedUserData = {
        ...userData,
        motivation: {
          reasons: selected,
          otherReasons: otherText.trim() || null
        },
        onboardingCompleted: true
      };
      
      // Speichern der aktualisierten Daten
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // Zum Hauptscreen navigieren
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    } catch (error) {
      console.error('Fehler beim Speichern der Motivationsdaten:', error);
    }
  };

  // Komponente für Motivationsoption
  const MotivationOption = ({ option }) => (
    <TouchableOpacity 
      style={[
        styles.optionCard,
        selected.includes(option.value) && styles.optionCardSelected
      ]}
      onPress={() => toggleOption(option.value)}
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
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Step 11/11</Text>
            <Text style={styles.progressLabel}>Motivation</Text>
          </View>
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Was bringt dich zu MealMind?</Text>
          <Text style={styles.subtitle}>
            Wähle alle zutreffenden Optionen aus.
          </Text>
        </View>

        {/* Options List */}
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <MotivationOption key={option.value} option={option} />
          ))}
        </View>

        {/* Other Reasons TextInput */}
        <View style={styles.otherReasonsContainer}>
          <Text style={styles.otherReasonsLabel}>Andere Gründe? (Optional)</Text>
          <TextInput
            style={styles.otherReasonsInput}
            placeholder="Erzähle uns mehr über deine Ziele..."
            value={otherText}
            onChangeText={setOtherText}
            multiline
            numberOfLines={4}
          />
        </View>
      </ScrollView>

      {/* Complete Setup Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.completeButton,
            selected.length === 0 && styles.completeButtonDisabled
          ]}
          onPress={handleCompleteSetup}
          disabled={selected.length === 0}
        >
          <Text style={styles.completeButtonText}>Complete Setup</Text>
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
    marginBottom: 24,
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
  otherReasonsContainer: {
    marginBottom: 24,
  },
  otherReasonsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 8,
  },
  otherReasonsInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECECEC',
    padding: 16,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
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
  completeButton: {
    backgroundColor: '#FF9E7E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  completeButtonDisabled: {
    backgroundColor: 'rgba(255, 158, 126, 0.6)',
  },
  completeButtonText: {
    color: '#3E2F2F',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
