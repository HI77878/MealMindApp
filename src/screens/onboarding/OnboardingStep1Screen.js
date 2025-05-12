import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function OnboardingStep1Screen({ navigation }) {
  // State für Formulardaten
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState(null); // 'male', 'female', oder 'other'
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  // Funktion zum Navigieren zum nächsten Screen
  const handleContinue = async () => {
    // Validierung (optional, kann erweitert werden)
    if (!name.trim()) {
      alert('Bitte gib deinen Namen ein');
      return;
    }

    // Speichern der Nutzerdaten im AsyncStorage
    try {
      const userData = {
        name,
        birthDate,
        gender,
        height: height ? parseInt(height) : 0,
        weight: weight ? parseInt(weight) : 0,
      };
      
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      // Zum nächsten Screen navigieren
      navigation.navigate('OnboardingStep2');
    } catch (error) {
      console.error('Fehler beim Speichern der Nutzerdaten:', error);
    }
  };

  // DatePicker-Handler
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate.toLocaleDateString());
    }
  };

  // Gender Button Komponente
  const GenderButton = ({ title, selected, onPress }) => (
    <TouchableOpacity 
      style={[
        styles.genderButton,
        selected && styles.genderButtonSelected
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.genderButtonText,
          selected && styles.genderButtonTextSelected
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '11%' }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Step 1/11</Text>
            <Text style={styles.progressLabel}>Basic Info</Text>
          </View>
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Tell us about yourself</Text>
          <Text style={styles.subtitle}>
            We'll use this information to personalize your nutrition plan.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Your Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Birth Date Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Birth Date</Text>
            <TouchableOpacity 
              style={styles.textInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: birthDate ? '#3E2F2F' : '#999', fontSize: 16 }}>
                {birthDate || 'TT.MM.JJJJ'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={birthDate ? new Date(birthDate) : new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
          </View>

          {/* Gender Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Gender</Text>
            <View style={styles.genderButtonsContainer}>
              <GenderButton 
                title="Male" 
                selected={gender === 'male'} 
                onPress={() => setGender('male')} 
              />
              <GenderButton 
                title="Female" 
                selected={gender === 'female'} 
                onPress={() => setGender('female')} 
              />
              <GenderButton 
                title="Other" 
                selected={gender === 'other'} 
                onPress={() => setGender('other')} 
              />
            </View>
          </View>

          {/* Height and Weight Inputs */}
          <View style={styles.rowInputGroup}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Height (cm)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="175"
                value={height}
                onChangeText={setHeight}
                keyboardType="number-pad"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 16 }]}>
              <Text style={styles.inputLabel}>Weight (kg)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="70"
                value={weight}
                onChangeText={setWeight}
                keyboardType="number-pad"
              />
            </View>
          </View>
        </View>
      </ScrollView>

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
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3E2F2F',
    marginBottom: 8,
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
  rowInputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  genderButtonSelected: {
    backgroundColor: '#FF9E7E',
    borderColor: '#FF9E7E',
  },
  genderButtonText: {
    color: '#3E2F2F',
    fontSize: 16,
    fontWeight: '500',
  },
  genderButtonTextSelected: {
    color: 'white',
  },
  buttonContainer: {
    padding: 24,
    paddingTop: 0,
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
