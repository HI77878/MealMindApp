import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingStep6Screen({ navigation }) {
  const [budgetType, setBudgetType] = useState('weekly');
  const [budgetAmount, setBudgetAmount] = useState('');

  // Funktion zum Navigieren zum nächsten Screen
  const handleContinue = async () => {
    if (!budgetAmount.trim()) {
      return; // Button sollte deaktiviert sein, aber zur Sicherheit prüfen
    }

    try {
      // Holen der vorhandenen Nutzerdaten
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : {};
      
      // Hinzufügen des Budgets
      const updatedUserData = {
        ...userData,
        budget: {
          type: budgetType,
          amount: parseFloat(budgetAmount) || 0
        }
      };
      
      // Speichern der aktualisierten Daten
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // Zum nächsten Screen navigieren
      navigation.navigate('OnboardingStep7');
    } catch (error) {
      console.error('Fehler beim Speichern des Budgets:', error);
    }
  };

  // Hilfsfunktion für den Hinweistext
  const getBudgetMeaningText = () => {
    switch (budgetType) {
      case 'daily':
        return "We'll optimize your daily meals to stay within this budget.";
      case 'weekly':
        return "We'll plan your weekly meals to fit within this budget.";
      case 'monthly':
        return "We'll help you manage your monthly food expenses within this budget.";
      default:
        return '';
    }
  };

  // Hilfsfunktion für den Vergleichstext
  const getComparisonText = () => {
    if (!budgetAmount.trim()) return '';
    
    const amount = parseFloat(budgetAmount);
    
    switch (budgetType) {
      case 'daily':
        return `That's about $${(amount * 7).toFixed(2)} per week or $${(amount * 30).toFixed(2)} per month.`;
      case 'weekly':
        return `That's about $${(amount / 7).toFixed(2)} per day or $${(amount * 4.3).toFixed(2)} per month.`;
      case 'monthly':
        return `That's about $${(amount / 30).toFixed(2)} per day or $${(amount / 4.3).toFixed(2)} per week.`;
      default:
        return '';
    }
  };

  // Komponente für Budget-Typ-Auswahl
  const BudgetTypeOption = ({ type, label }) => (
    <TouchableOpacity 
      style={[
        styles.budgetTypeButton,
        budgetType === type && styles.budgetTypeButtonSelected
      ]}
      onPress={() => setBudgetType(type)}
    >
      <Text 
        style={[
          styles.budgetTypeText,
          budgetType === type && styles.budgetTypeTextSelected
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '66%' }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>Step 6/11</Text>
          <Text style={styles.progressLabel}>Budget</Text>
        </View>
      </View>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>What's your budget for meals?</Text>
        <Text style={styles.subtitle}>
          We'll suggest recipes that fit within your budget.
        </Text>
      </View>

      {/* Budget Type Selection */}
      <View style={styles.budgetTypeContainer}>
        <BudgetTypeOption type="daily" label="Daily" />
        <BudgetTypeOption type="weekly" label="Weekly" />
        <BudgetTypeOption type="monthly" label="Monthly" />
      </View>

      {/* Budget Amount Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          {budgetType.charAt(0).toUpperCase() + budgetType.slice(1)} Budget
        </Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter amount"
            value={budgetAmount}
            onChangeText={setBudgetAmount}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* What this means section */}
      <View style={styles.meaningContainer}>
        <Text style={styles.meaningTitle}>What this means:</Text>
        <Text style={styles.meaningText}>{getBudgetMeaningText()}</Text>
        {budgetAmount.trim() !== '' && (
          <Text style={styles.comparisonText}>{getComparisonText()}</Text>
        )}
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !budgetAmount.trim() && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!budgetAmount.trim()}
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
  budgetTypeContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  budgetTypeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  budgetTypeButtonSelected: {
    backgroundColor: '#FF9E7E',
  },
  budgetTypeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  budgetTypeTextSelected: {
    color: 'white',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3E2F2F',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  currencySymbol: {
    paddingLeft: 16,
    fontSize: 16,
    color: 'rgba(62, 47, 47, 0.6)',
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
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
  comparisonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D6426C',
    marginTop: 8,
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
