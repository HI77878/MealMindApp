import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingStep4Screen({ navigation }) {
  const [selectedMeals, setSelectedMeals] = useState(null);

  // Funktion zum Navigieren zum nächsten Screen
  const handleContinue = async () => {
    if (!selectedMeals) {
      return; // Button sollte deaktiviert sein, aber zur Sicherheit prüfen
    }

    try {
      // Holen der vorhandenen Nutzerdaten
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : {};
      
      // Hinzufügen der Mahlzeitanzahl
      const updatedUserData = {
        ...userData,
        mealsPerDay: selectedMeals
      };
      
      // Speichern der aktualisierten Daten
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // Zum nächsten Screen navigieren
      navigation.navigate('OnboardingStep5');
    } catch (error) {
      console.error('Fehler beim Speichern der Mahlzeitenanzahl:', error);
    }
  };

  // Hilfsfunktion für den Hinweistext
  const getMealMeaningText = () => {
    switch (selectedMeals) {
      case 3:
        return "Three larger meals per day - breakfast, lunch, and dinner.";
      case 4:
        return "Three main meals plus one snack to keep your energy levels stable.";
      case 5:
        return "Three main meals plus two snacks for consistent protein intake.";
      case 6:
        return "Smaller, more frequent meals throughout the day for steady energy.";
      default:
        return "Select the number of meals you typically eat in a day.";
    }
  };

  // Meal Option Button Komponente
  const MealOptionButton = ({ count }) => (
    <TouchableOpacity 
      style={[
        styles.mealButton,
        selectedMeals === count && styles.mealButtonSelected
      ]}
      onPress={() => setSelectedMeals(count)}
    >
      <Text style={[
        styles.mealCountText,
        selectedMeals === count && styles.mealCountTextSelected
      ]}>
        {count}
      </Text>
      <Text style={[
        styles.mealLabelText,
        selectedMeals === count && styles.mealLabelTextSelected
      ]}>
        meals
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '44%' }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>Step 4/11</Text>
          <Text style={styles.progressLabel}>Meal Frequency</Text>
        </View>
      </View>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>How many meals do you eat per day?</Text>
        <Text style={styles.subtitle}>
          This helps us plan your daily nutrition and distribute your macros appropriately.
        </Text>
      </View>

      {/* Meal Options Grid */}
      <View style={styles.mealOptionsContainer}>
        <View style={styles.mealOptionsRow}>
          <MealOptionButton count={3} />
          <MealOptionButton count={4} />
        </View>
        <View style={styles.mealOptionsRow}>
          <MealOptionButton count={5} />
          <MealOptionButton count={6} />
        </View>
      </View>

      {/* What this means section */}
      <View style={styles.meaningContainer}>
        <Text style={styles.meaningTitle}>What this means:</Text>
        <Text style={styles.meaningText}>{getMealMeaningText()}</Text>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedMeals && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedMeals}
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
  mealOptionsContainer: {
    marginVertical: 24,
  },
  mealOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  mealButton: {
    width: '48%',
    height: 96,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(220, 206, 249, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealButtonSelected: {
    backgroundColor: '#FF9E7E',
    borderColor: '#FF9E7E',
  },
  mealCountText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  mealCountTextSelected: {
    color: 'white',
  },
  mealLabelText: {
    fontSize: 14,
    color: '#3E2F2F',
    marginTop: 4,
  },
  mealLabelTextSelected: {
    color: 'white',
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
