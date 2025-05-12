import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingStep3Screen({ navigation }) {
  // State für Nährwerte
  const [calories, setCalories] = useState('2200');
  const [protein, setProtein] = useState('150');
  const [carbs, setCarbs] = useState('220');
  const [fats, setFats] = useState('70');
  
  // State für Nutzerprofilwerte
  const [recommendedCalories, setRecommendedCalories] = useState('2200');
  const [recommendedProtein, setRecommendedProtein] = useState('150');

  // Lädt Nutzerdaten beim Screen-Laden
  useEffect(() => {
    loadUserData();
  }, []);

  // Lädt existierende Nutzerdaten
  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        
        // Hier könnten berechnete Empfehlungen basierend auf Nutzerdaten erfolgen
        // Zum Beispiel basierend auf Gewicht, Größe, Alter und Geschlecht
        if (userData.weight && userData.height) {
          // Beispielberechnung (vereinfacht):
          const calculatedCalories = Math.round(userData.weight * 30);
          const calculatedProtein = Math.round(userData.weight * 2);
          
          setRecommendedCalories(calculatedCalories.toString());
          setRecommendedProtein(calculatedProtein.toString());
          
          // Setze Standardwerte, falls noch nicht eingegeben
          if (!calories) setCalories(calculatedCalories.toString());
          if (!protein) setProtein(calculatedProtein.toString());
        }
      }
    } catch (error) {
      console.error('Fehler beim Laden der Nutzerdaten:', error);
    }
  };

  // Funktion zum Navigieren zum nächsten Screen
  const handleContinue = async () => {
    // Validierung
    if (!calories.trim() || !protein.trim()) {
      alert('Bitte fülle die erforderlichen Felder aus.');
      return;
    }

    try {
      // Holen der vorhandenen Nutzerdaten
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : {};
      
      // Hinzufügen der Nährwertziele
      const updatedUserData = {
        ...userData,
        nutritionGoals: {
          calories: parseInt(calories) || 0,
          protein: parseInt(protein) || 0,
          carbs: parseInt(carbs) || 0,
          fats: parseInt(fats) || 0
        }
      };
      
      // Speichern der aktualisierten Daten
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // Zum nächsten Screen navigieren
      navigation.navigate('OnboardingStep4');
    } catch (error) {
      console.error('Fehler beim Speichern der Nährwertziele:', error);
    }
  };

  // Komponente für Eingabefelder
  const InputField = ({ label, value, onChangeText, placeholder, isRequired, recommendation }) => (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <Text style={isRequired ? styles.requiredLabel : styles.optionalLabel}>
          {isRequired ? 'Required' : 'Optional'}
        </Text>
      </View>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType="numeric"
      />
      {recommendation ? (
        <Text style={styles.recommendationText}>
          Recommended: {recommendation} based on your profile
        </Text>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '33%' }]} />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>Step 3/11</Text>
              <Text style={styles.progressLabel}>Nutrition Goals</Text>
            </View>
          </View>

          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Set your nutrition goals</Text>
            <Text style={styles.subtitle}>
              Tell us what you want to achieve with your diet.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <InputField
              label="Daily Calories"
              value={calories}
              onChangeText={setCalories}
              placeholder="e.g. 2200"
              isRequired={true}
              recommendation={recommendedCalories + " kcal"}
            />
            
            <InputField
              label="Daily Protein (g)"
              value={protein}
              onChangeText={setProtein}
              placeholder="e.g. 150"
              isRequired={true}
              recommendation={recommendedProtein + "g"}
            />
            
            <InputField
              label="Daily Carbs (g)"
              value={carbs}
              onChangeText={setCarbs}
              placeholder="e.g. 220"
              isRequired={false}
            />
            
            <InputField
              label="Daily Fats (g)"
              value={fats}
              onChangeText={setFats}
              placeholder="e.g. 70"
              isRequired={false}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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
  },
  scrollContent: {
    flexGrow: 1,
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
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3E2F2F',
  },
  requiredLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D6426C',
  },
  optionalLabel: {
    fontSize: 14,
    color: 'rgba(62, 47, 47, 0.6)',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  recommendationText: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.6)',
    marginTop: 4,
  },
  buttonContainer: {
    padding: 24,
    paddingTop: 0,
    backgroundColor: '#FFF3EA',
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
