import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingStep7Screen({ navigation }) {
  const [allergies, setAllergies] = useState([]);
  const [customAllergy, setCustomAllergy] = useState('');

  // Liste der häufigen Allergene
  const commonAllergies = [
    'Dairy', 'Eggs', 'Peanuts', 'Tree Nuts',
    'Soy', 'Wheat', 'Gluten', 'Fish',
    'Shellfish', 'Sesame'
  ];

  // Funktion zum Hinzufügen/Entfernen einer Allergie
  const toggleAllergy = (allergy) => {
    if (allergies.includes(allergy)) {
      setAllergies(allergies.filter(a => a !== allergy));
    } else {
      setAllergies([...allergies, allergy]);
    }
  };

  // Funktion zum Hinzufügen einer benutzerdefinierten Allergie
  const addCustomAllergy = () => {
    if (customAllergy.trim() && !allergies.includes(customAllergy.trim())) {
      setAllergies([...allergies, customAllergy.trim()]);
      setCustomAllergy('');
    }
  };

  // Funktion zum Navigieren zum nächsten Screen
  const handleContinue = async () => {
    try {
      // Holen der vorhandenen Nutzerdaten
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : {};
      
      // Hinzufügen der Allergien
      const updatedUserData = {
        ...userData,
        allergies: allergies
      };
      
      // Speichern der aktualisierten Daten
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // Zum nächsten Screen navigieren
      navigation.navigate('OnboardingStep8');
    } catch (error) {
      console.error('Fehler beim Speichern der Allergien:', error);
    }
  };

  // Komponente für einen Allergie-Chip
  const AllergyChip = ({ allergy, selected }) => (
    <TouchableOpacity 
      style={[
        styles.allergyChip,
        selected && styles.allergyChipSelected
      ]}
      onPress={() => toggleAllergy(allergy)}
    >
      <Text 
        style={[
          styles.allergyChipText,
          selected && styles.allergyChipTextSelected
        ]}
      >
        {allergy}
      </Text>
      {selected && (
        <Ionicons 
          name="close" 
          size={16} 
          color="#3E2F2F" 
          style={styles.allergyChipIcon} 
        />
      )}
    </TouchableOpacity>
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
              <View style={[styles.progressFill, { width: '77%' }]} />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>Step 7/11</Text>
              <Text style={styles.progressLabel}>Allergies</Text>
            </View>
          </View>

          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Do you have any allergies or intolerances?</Text>
            <Text style={styles.subtitle}>
              We'll make sure to exclude these ingredients from your meal plans.
            </Text>
          </View>

          {/* Common Allergies */}
          <View style={styles.allergiesContainer}>
            <View style={styles.allergyChipsContainer}>
              {commonAllergies.map((allergy) => (
                <AllergyChip 
                  key={allergy} 
                  allergy={allergy} 
                  selected={allergies.includes(allergy)} 
                />
              ))}
            </View>

            {/* Custom Allergy Input */}
            <View style={styles.customAllergyContainer}>
              <TextInput
                style={styles.customAllergyInput}
                placeholder="Add other allergies or intolerances"
                value={customAllergy}
                onChangeText={setCustomAllergy}
                onSubmitEditing={addCustomAllergy}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={addCustomAllergy}
              >
                <Ionicons name="add" size={24} color="#3E2F2F" />
              </TouchableOpacity>
            </View>

            {/* Selected Allergies */}
            {allergies.length > 0 && (
              <View style={styles.selectedAllergiesContainer}>
                <Text style={styles.selectedAllergiesTitle}>Your allergies:</Text>
                <View style={styles.selectedAllergiesChips}>
                  {allergies.map((allergy) => (
                    <View key={allergy} style={styles.selectedAllergyChip}>
                      <Text style={styles.selectedAllergyText}>{allergy}</Text>
                      <TouchableOpacity onPress={() => toggleAllergy(allergy)}>
                        <Ionicons 
                          name="close" 
                          size={16} 
                          color="rgba(62, 47, 47, 0.6)" 
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}
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
  allergiesContainer: {
    marginBottom: 24,
  },
  allergyChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  allergyChip: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(220, 206, 249, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  allergyChipSelected: {
    backgroundColor: '#DCCEF9',
    borderColor: '#DCCEF9',
  },
  allergyChipText: {
    fontSize: 14,
    color: 'rgba(62, 47, 47, 0.7)',
  },
  allergyChipTextSelected: {
    color: '#3E2F2F',
    fontWeight: '500',
  },
  allergyChipIcon: {
    marginLeft: 4,
  },
  customAllergyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  customAllergyInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#FF9E7E',
    width: 46,
    height: 46,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAllergiesContainer: {
    marginTop: 24,
  },
  selectedAllergiesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 8,
  },
  selectedAllergiesChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedAllergyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCCEF9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedAllergyText: {
    fontSize: 14,
    color: '#3E2F2F',
    marginRight: 6,
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
  continueButtonText: {
    color: '#3E2F2F',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
