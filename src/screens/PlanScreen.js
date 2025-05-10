import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image 
} from 'react-native';
// Removing Ionicons import to fix font loading error
// import { Ionicons } from '@expo/vector-icons';

export default function PlanScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState(2); // "Wed" wird als aktiv gesetzt

  // Dummy-Daten für die Kalenderansicht
  const weekDays = [
    { id: 0, day: "Mon", date: "5", active: false },
    { id: 1, day: "Tue", date: "6", active: false },
    { id: 2, day: "Wed", date: "7", active: true },
    { id: 3, day: "Thu", date: "8", active: false },
    { id: 4, day: "Fri", date: "9", active: false },
    { id: 5, day: "Sat", date: "10", active: false },
    { id: 6, day: "Sun", date: "11", active: false },
  ];

  // Wähle einen Tag aus
  const selectDay = (id) => {
    setSelectedDay(id);
  };

  // Dummy-Meal-Daten
  const meals = [
    {
      id: 1,
      title: "Breakfast",
      time: "8:00 AM",
      recipe: "Protein Pancakes with Berries",
      calories: 420,
      protein: 32,
    },
    {
      id: 2,
      title: "Morning Snack",
      time: "10:30 AM",
      recipe: "Protein Shake with Banana",
      calories: 250,
      protein: 25,
    },
    {
      id: 3,
      title: "Lunch",
      time: "1:00 PM",
      recipe: "Chicken Quinoa Bowl",
      calories: 580,
      protein: 42,
    },
    {
      id: 4,
      title: "Afternoon Snack",
      time: "4:00 PM",
      recipe: "Greek Yogurt & Berries",
      calories: 250,
      protein: 18,
    },
    {
      id: 5,
      title: "Dinner",
      time: "7:00 PM",
      recipe: "Salmon with Vegetables",
      calories: 620,
      protein: 45,
    },
  ];

  // Komponente für eine Mahlzeitkarte
  const MealTimeCard = ({ title, time, recipe, calories, protein }) => (
    <TouchableOpacity 
      style={styles.mealCard}
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.toLowerCase().replace(/\s+/g, '-') })}
    >
      <View style={styles.mealCardHeader}>
        <View>
          <Text style={styles.mealCardTitle}>{title}</Text>
          <Text style={styles.mealCardTime}>{time}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.changeButton}>Change</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.mealCardContent}>
        <View style={styles.mealImagePlaceholder}>
          <Text style={styles.mealImageText}>🍽️</Text>
        </View>
        <View style={styles.mealDetails}>
          <Text style={styles.mealName}>{recipe}</Text>
          <View style={styles.mealMetrics}>
            <Text style={styles.mealCalories}>{calories} kcal</Text>
            <Text style={styles.mealProtein}>{protein}g protein</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Meal Planner</Text>
          <TouchableOpacity 
            style={styles.shoppingListButton}
            onPress={() => navigation.navigate('Shopping')}
          >
            {/* Replacing Ionicons with text emoji */}
            <Text style={{fontSize: 18, color: "#3E2F2F"}}>🛒</Text>
            <Text style={styles.shoppingListText}>Shopping List</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Card */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity style={styles.calendarArrow}>
              {/* Replacing Ionicons with text emoji */}
              <Text style={{fontSize: 18, color: "#3E2F2F"}}>◀️</Text>
            </TouchableOpacity>
            <Text style={styles.calendarTitle}>May 7 - May 13, 2025</Text>
            <TouchableOpacity style={styles.calendarArrow}>
              {/* Replacing Ionicons with text emoji */}
              <Text style={{fontSize: 18, color: "#3E2F2F"}}>▶️</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysContainer}>
            {weekDays.map((day) => (
              <TouchableOpacity
                key={day.id}
                style={[
                  styles.dayButton,
                  selectedDay === day.id && styles.activeDayButton
                ]}
                onPress={() => selectDay(day.id)}
              >
                <Text 
                  style={[
                    styles.dayText, 
                    selectedDay === day.id && styles.activeDayText
                  ]}
                >
                  {day.day}
                </Text>
                <Text 
                  style={[
                    styles.dateText, 
                    selectedDay === day.id && styles.activeDayText
                  ]}
                >
                  {day.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Daily Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Wednesday, May 7</Text>
          <View style={styles.macrosContainer}>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>2,200</Text>
              <Text style={styles.macroLabel}>kcal</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={[styles.macroValue, styles.proteinValue]}>150g</Text>
              <Text style={styles.macroLabel}>protein</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>220g</Text>
              <Text style={styles.macroLabel}>carbs</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>70g</Text>
              <Text style={styles.macroLabel}>fat</Text>
            </View>
          </View>
        </View>

        {/* Meal Plans */}
        <View style={styles.mealsContainer}>
          {meals.map((meal) => (
            <MealTimeCard
              key={meal.id}
              title={meal.title}
              time={meal.time}
              recipe={meal.recipe}
              calories={meal.calories}
              protein={meal.protein}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            {/* Replacing Ionicons with text emoji */}
            <Text style={{fontSize: 18, color: "#3E2F2F"}}>➕</Text>
            <Text style={styles.actionButtonText}>Add Another Meal</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            {/* Replacing Ionicons with text emoji */}
            <Text style={{fontSize: 18, color: "#3E2F2F"}}>📱</Text>
            <Text style={styles.actionButtonText}>QR-Code scannen</Text>
          </TouchableOpacity>
        </View>

        {/* AI Button */}
        <TouchableOpacity style={styles.aiButton}>
          <Text style={styles.aiButtonText}>✨ Regenerate Day with AI</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3EA',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  shoppingListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  shoppingListText: {
    marginLeft: 4,
    color: '#3E2F2F',
    fontSize: 14,
  },
  calendarCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  calendarArrow: {
    padding: 4,
  },
  calendarTitle: {
    fontWeight: 'bold',
    color: '#3E2F2F',
    fontSize: 16,
  },
  daysContainer: {
    flexDirection: 'row',
  },
  dayButton: {
    width: 48,
    paddingVertical: 8,
    backgroundColor: 'rgba(220, 206, 249, 0.3)',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  activeDayButton: {
    backgroundColor: '#FF9E7E',
  },
  dayText: {
    fontSize: 12,
    color: '#3E2F2F',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  activeDayText: {
    color: 'white',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryTitle: {
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 8,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  proteinValue: {
    color: '#D6426C',
  },
  macroLabel: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.6)',
  },
  mealsContainer: {
    marginBottom: 16,
    gap: 12,
  },
  mealCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mealCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealCardTitle: {
    fontWeight: 'bold',
    color: '#3E2F2F',
    fontSize: 16,
  },
  mealCardTime: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.6)',
  },
  changeButton: {
    color: '#FF9E7E',
    fontWeight: '500',
  },
  mealCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mealImageText: {
    fontSize: 24,
  },
  mealDetails: {
    flex: 1,
  },
  mealName: {
    fontWeight: '500',
    color: '#3E2F2F',
    marginBottom: 4,
  },
  mealMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealCalories: {
    fontSize: 12,
    color: '#3E2F2F',
    marginRight: 8,
  },
  mealProtein: {
    fontSize: 12,
    color: '#D6426C',
    fontWeight: '500',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  actionButtonText: {
    marginLeft: 4,
    color: '#3E2F2F',
    fontSize: 14,
  },
  aiButton: {
    backgroundColor: '#D6426C',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  aiButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
