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

export default function OnboardingStep8Screen({ navigation }) {
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('likes'); // 'likes' oder 'dislikes'

  // Funktion zum Hinzufügen eines Eintrags
  const addItem = () => {
    if (inputValue.trim()) {
      if (activeTab === 'likes' && !likes.includes(inputValue.trim())) {
        setLikes([...likes, inputValue.trim()]);
      } else if (activeTab === 'dislikes' && !dislikes.includes(inputValue.trim())) {
        setDislikes([...dislikes, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  // Funktion zum Entfernen eines Eintrags
  const removeItem = (item, type) => {
    if (type === 'likes') {
      setLikes(likes.filter(i => i !== item));
    } else {
      setDislikes(dislikes.filter(i => i !== item));
    }
  };

  // Funktion zum Navigieren zum nächsten Screen
  const handleContinue = async () => {
    try {
      // Holen der vorhandenen Nutzerdaten
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : {};
      
      // Hinzufügen der Vorlieben und Abneigungen
      const updatedUserData = {
        ...userData,
        foodPreferences: {
          likes: likes,
          dislikes: dislikes
        }
      };
      
      // Speichern der aktualisierten Daten
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // Zum nächsten Screen navigieren
      navigation.navigate('OnboardingStep9');
    } catch (error) {
      console.error('Fehler beim Speichern der Vorlieben und Abneigungen:', error);
    }
  };

  // Komponente für einen Vorlieben/Abneigungen-Tag
  const PreferenceTag = ({ item, type }) => (
    <View style={[
      styles.preferenceTag,
      type === 'likes' ? styles.likeTag : styles.dislikeTag
    ]}>
      <Ionicons 
        name={type === 'likes' ? 'thumbs-up' : 'thumbs-down'} 
        size={14} 
        color="#3E2F2F" 
        style={styles.preferenceTagIcon} 
      />
      <Text style={styles.preferenceTagText}>{item}</Text>
      <TouchableOpacity onPress={() => removeItem(item, type)}>
        <Ionicons 
          name="close" 
          size={14} 
          color="rgba(62, 47, 47, 0.6)" 
        />
      </TouchableOpacity>
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
              <View style={[styles.progressFill, { width: '88%' }]} />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>Step 8/11</Text>
              <Text style={styles.progressLabel}>Preferences</Text>
            </View>
          </View>

          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Are there any foods you particularly like or dislike?</Text>
            <Text style={styles.subtitle}>
              This helps us personalize your meal suggestions.
            </Text>
          </View>

          {/* Tab Switcher */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[
                styles.tabButton,
                activeTab === 'likes' && styles.tabButtonActiveLikes
              ]}
              onPress={() => setActiveTab('likes')}
            >
              <Ionicons 
                name="thumbs-up" 
                size={18} 
                color={activeTab === 'likes' ? '#3E2F2F' : '#3E2F2F'} 
              />
              <Text style={styles.tabButtonText}>Likes</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.tabButton,
                activeTab === 'dislikes' && styles.tabButtonActiveDislikes
              ]}
              onPress={() => setActiveTab('dislikes')}
            >
              <Ionicons 
                name="thumbs-down" 
                size={18} 
                color={activeTab === 'dislikes' ? '#FFFFFF' : '#3E2F2F'} 
              />
              <Text 
                style={[
                  styles.tabButtonText,
                  activeTab === 'dislikes' && styles.tabButtonTextDislikes
                ]}
              >
                Dislikes
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input Field */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={`Add foods you ${activeTab === 'likes' ? 'like' : 'dislike'}`}
              value={inputValue}
              onChangeText={setInputValue}
              onSubmitEditing={addItem}
            />
            <TouchableOpacity
              style={[
                styles.addButton,
                activeTab === 'likes' ? styles.addButtonLikes : styles.addButtonDislikes
              ]}
              onPress={addItem}
            >
              <Ionicons name="add" size={24} color={activeTab === 'likes' ? '#3E2F2F' : '#FFFFFF'} />
            </TouchableOpacity>
          </View>

          {/* Likes Section */}
          {likes.length > 0 && (
            <View style={styles.preferencesSection}>
              <Text style={styles.preferencesSectionTitle}>Foods you like:</Text>
              <View style={styles.preferencesTagsContainer}>
                {likes.map(item => (
                  <PreferenceTag key={item} item={item} type="likes" />
                ))}
              </View>
            </View>
          )}

          {/* Dislikes Section */}
          {dislikes.length > 0 && (
            <View style={styles.preferencesSection}>
              <Text style={styles.preferencesSectionTitle}>Foods you dislike:</Text>
              <View style={styles.preferencesTagsContainer}>
                {dislikes.map(item => (
                  <PreferenceTag key={item} item={item} type="dislikes" />
                ))}
              </View>
            </View>
          )}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  tabButtonActiveLikes: {
    backgroundColor: '#8BC34A',
  },
  tabButtonActiveDislikes: {
    backgroundColor: '#D6426C',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginLeft: 6,
  },
  tabButtonTextDislikes: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  textInput: {
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
    width: 46,
    height: 46,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonLikes: {
    backgroundColor: '#8BC34A',
  },
  addButtonDislikes: {
    backgroundColor: '#D6426C',
  },
  preferencesSection: {
    marginBottom: 16,
  },
  preferencesSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 8,
  },
  preferencesTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  preferenceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  likeTag: {
    backgroundColor: 'rgba(139, 195, 74, 0.3)',
  },
  dislikeTag: {
    backgroundColor: 'rgba(214, 66, 108, 0.2)',
  },
  preferenceTagIcon: {
    marginRight: 6,
  },
  preferenceTagText: {
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
