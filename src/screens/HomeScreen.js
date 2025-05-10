import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi Alex 👋</Text>
            <Text style={styles.subGreeting}>Let's reach your goals today!</Text>
          </View>
          <Text style={styles.logo}>
            <Text style={styles.logoOrange}>Meal</Text>
            <Text style={styles.logoPink}>Mind</Text>
          </Text>
        </View>

        {/* Today's Progress Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Progress</Text>
          
          {/* Calories Display */}
          <View style={styles.caloriesContainer}>
            <View style={styles.caloriesSemiCircle}>
              <View style={styles.caloriesSemiCircleProgress}></View>
              <View style={styles.caloriesTextContainer}>
                <Text style={styles.caloriesText}>1,250 kcal</Text>
                <Text style={styles.caloriesSubtext}>übrig</Text>
              </View>
            </View>
          </View>

          {/* Macros */}
          <View style={styles.macroContainer}>
            {/* Carbs */}
            <View style={styles.macroItem}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroTitle}>Kohlenhydrate</Text>
                <Text style={styles.macroValue}>120 / 220 g</Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressBar, { width: '55%', backgroundColor: '#B8E0D2' }]} />
              </View>
            </View>

            {/* Protein */}
            <View style={styles.macroItem}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroTitle}>Eiweiß</Text>
                <Text style={styles.macroValue}>85 / 150 g</Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressBar, { width: '57%', backgroundColor: '#D6426C' }]} />
              </View>
            </View>

            {/* Fat */}
            <View style={styles.macroItem}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroTitle}>Fett</Text>
                <Text style={styles.macroValue}>40 / 70 g</Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressBar, { width: '57%', backgroundColor: '#DCCEF9' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Today's Meals */}
        <View style={styles.mealsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Meals</Text>
            <View style={styles.mealActions}>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add Meal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.scanButton}>
                <Text style={styles.scanButtonText}>📷</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Meal Cards */}
          <MealCard 
            title="Breakfast" 
            time="8:00 AM" 
            name="Protein Pancakes" 
            calories={420} 
            protein={32} 
            completed={true} 
            id="1"
            navigation={navigation}
          />
          
          <MealCard 
            title="Lunch" 
            time="12:30 PM" 
            name="Chicken Quinoa Bowl" 
            calories={580} 
            protein={42} 
            completed={true} 
            id="2"
            navigation={navigation}
          />
          
          <MealCard 
            title="Snack" 
            time="3:30 PM" 
            name="Greek Yogurt & Berries" 
            calories={250} 
            protein={18} 
            completed={false} 
            id="3"
            navigation={navigation}
          />
          
          <MealCard 
            title="Dinner" 
            time="7:00 PM" 
            name="Salmon with Vegetables" 
            calories={620} 
            protein={45} 
            completed={false} 
            id="4"
            navigation={navigation}
          />
        </View>

        {/* AI Buttons */}
        <View style={styles.aiButtonsContainer}>
          <TouchableOpacity style={styles.aiButton}>
            <Text style={styles.aiButtonText}>✨ Plan full day with AI</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.aiButton}>
            <Text style={styles.aiButtonText}>✨ Plan full week with AI</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Meal Card Component
function MealCard({ title, time, name, calories, protein, completed, id, navigation }) {
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: id })}
    >
      <View style={[
        styles.mealCard, 
        { borderLeftWidth: 4, borderLeftColor: completed ? '#B8E0D2' : '#FF9E7E' }
      ]}>
        <View style={styles.mealCardContent}>
          <View>
            <View style={styles.mealCardHeader}>
              <Text style={styles.mealCardTitle}>{title}</Text>
              <Text style={styles.mealCardTime}>{time}</Text>
            </View>
            <Text style={styles.mealCardName}>{name}</Text>
          </View>
          <View style={styles.mealCardMetrics}>
            <Text style={styles.mealCardCalories}>{calories} kcal</Text>
            <Text style={styles.mealCardProtein}>{protein}g protein</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3EA',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  subGreeting: {
    fontSize: 14,
    color: 'rgba(62, 47, 47, 0.7)',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoOrange: {
    color: '#FF9E7E',
  },
  logoPink: {
    color: '#D6426C',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3E2F2F',
  },
  caloriesContainer: {
    alignItems: 'center',
    marginBottom: 30,
    height: 90,
  },
  caloriesSemiCircle: {
    width: 180,
    height: 90,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    backgroundColor: 'rgba(255, 158, 126, 0.2)',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  caloriesSemiCircleProgress: {
    position: 'absolute',
    width: 180,
    height: 90,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    backgroundColor: '#FF9E7E',
    // Für 60% Fortschritt
    transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
    transformOrigin: 'bottom center',
    bottom: 0,
  },
  caloriesTextContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  caloriesText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D6426C',
  },
  caloriesSubtext: {
    fontSize: 14,
    color: 'rgba(62, 47, 47, 0.7)',
  },
  macroContainer: {
    marginTop: 16,
    gap: 16,
  },
  macroItem: {
    marginBottom: 8,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  macroTitle: {
    fontSize: 16,
    color: '#3E2F2F',
  },
  macroValue: {
    fontSize: 16,
    color: '#3E2F2F',
    fontWeight: '500',
  },
  progressBg: {
    height: 10,
    backgroundColor: 'rgba(220, 206, 249, 0.3)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  mealsSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  mealActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    padding: 8,
  },
  addButtonText: {
    color: '#FF9E7E',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scanButton: {
    marginLeft: 8,
    padding: 8,
  },
  scanButtonText: {
    fontSize: 20,
  },
  qrCodeIcon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#3E2F2F',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  qrCodeSquare: {
    width: 10,
    height: 10,
    backgroundColor: '#3E2F2F',
    opacity: 0.8,
  },
  mealCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  mealCardContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealCardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#3E2F2F',
  },
  mealCardTime: {
    fontSize: 14,
    color: 'rgba(62, 47, 47, 0.6)',
    marginLeft: 8,
  },
  mealCardName: {
    fontSize: 16,
    color: '#3E2F2F',
    marginTop: 4,
  },
  mealCardMetrics: {
    alignItems: 'flex-end',
  },
  mealCardCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  mealCardProtein: {
    fontSize: 14,
    color: '#D6426C',
    fontWeight: '500',
  },
  aiButtonsContainer: {
    marginBottom: 40,
    gap: 16,
  },
  aiButton: {
    backgroundColor: '#D6426C',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aiButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 