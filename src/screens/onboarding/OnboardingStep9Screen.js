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

export default function OnboardingStep9Screen({ navigation }) {
  const [selectedDiet, setSelectedDiet] = useState(null);

  // Diät-Optionen
  const dietOptions = [
    { value: 'vegan', label: 'Vegan', description: 'No animal products' },
    { value: 'vegetarian', label: 'Vegetarian', description: 'No meat or fish' },
    { value: 'pescatarian', label: 'Pescatarian', description: 'Vegetarian + seafood' },
    { value: 'omnivore', label: 'Omnivore', description: 'Everything in moderation' },
    { value: 'keto', label: 'Keto', description: 'Low carb, high fat' },
    { value: 'paleo', label: 'Paleo', description: 'Whole foods based' },
  ];

  // Funktion zum Navigieren zum nächsten Screen
  const handleContinue = async () => {
    if (!selectedDiet) {
      return; // Button sollte deaktiviert sein, aber zur Sicherheit prüfen
    }

    try {
      // Holen der vorhandenen Nutzerdaten
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : {};
      
      // Hinzufügen der Ernährungsweise
      const updatedUserData = {
        ...userData,
        dietaryStyle: selectedDiet
      };
      
      // Speichern der aktualisierten Daten
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // Zum nächsten Screen navigieren
      navigation.navigate('OnboardingStep10');
    } catch (error) {
      console.error('Fehler beim Speichern der Ernährungsweise:', error);
    }
  };

  // Hilfsfunktion für den Hinweistext
  const getDietMeaningText = () => {
    switch (selectedDiet) {
      case 'vegan':
        return "We'll only suggest plant-based meals with no animal products.";
      case 'vegetarian':
        return "We'll include dairy and eggs, but no meat or fish in your meal plans.";
      case 'pescatarian':
        return "Your meal plans will include plant foods, dairy, eggs, and seafood, but no meat.";
      case 'omnivore':
        return "You'll receive a balanced mix of all food groups.";
      case 'keto':
        return "We'll focus on low-carb, high-fat meals to help maintain ketosis.";
      case 'paleo':
        return "Your meals will focus on whole foods like meat, fish, eggs, vegetables, fruits, and nuts.";
      default:
        return "Select the dietary style that best matches your preferences.";
    }
  };

  // Komponente für Diät-Option
  const DietOption = ({ option }) => (
    <TouchableOpacity 
      style={[
        styles.dietOptionCard,
        selectedDiet === option.value && styles.dietOptionCardSelected
      ]}
      onPress={() => setSelectedDiet(option.value)}
    >
      <View style={styles.dietOptionContent}>
        <Text style={styles.dietOptionLabel}>{option.label}</Text>
        <Text style={styles.dietOptionDescription}>{option.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '82%' }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Step 9/11</Text>
            <Text style={styles.progressLabel}>Dietary Style</Text>
          </View>
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Do you follow a specific dietary style?</Text>
          <Text style={styles.subtitle}>
            We'll tailor your meal suggestions accordingly.
          </Text>
        </View>

        {/* Diet Options Grid */}
        <View style={styles.dietOptionsGrid}>
          {dietOptions.map((option, index) => (
            <DietOption key={option.value} option={option} />
          ))}
        </View>

        {/* What this means section */}
        <View style={styles.meaningContainer}>
          <Text style={styles.meaningTitle}>What this means:</Text>
          <Text style={styles.meaningText}>{getDietMeaningText()}</Text>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedDiet && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedDiet}
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
    marginBottom: 24,
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
  dietOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dietOptionCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(220, 206, 249, 0.5)',
    marginBottom: 16,
    padding: 16,
  },
  dietOptionCardSelected: {
    backgroundColor: 'rgba(255, 158, 126, 0.2)',
    borderColor: '#FF9E7E',
  },
  dietOptionContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  dietOptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 4,
  },
  dietOptionDescription: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.7)',
    textAlign: 'center',
  },
  meaningContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DCCEF9',
    marginTop: 8,
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
