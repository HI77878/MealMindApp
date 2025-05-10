import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PlanScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Meal Plan</Text>
          <Text style={styles.subtitle}>Plan your meals for the week</Text>
        </View>
        
        {/* Days Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.daysScrollView}
          contentContainerStyle={styles.daysContainer}
        >
          {days.map((day) => (
            <TouchableOpacity 
              key={day} 
              style={[
                styles.dayButton,
                selectedDay === day && styles.dayButtonActive
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text 
                style={[
                  styles.dayButtonText,
                  selectedDay === day && styles.dayButtonTextActive
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Today's Plan */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{selectedDay}'s Plan</Text>
            <View style={styles.nutritionSummary}>
              <Text style={styles.nutritionItem}>1,870 kcal</Text>
              <Text style={styles.nutritionItem}>•</Text>
              <Text style={styles.nutritionItem}>145g protein</Text>
            </View>
          </View>
          
          {/* Meals */}
          <MealCard 
            title="Breakfast"
            time="8:00 AM"
            name="Protein-Packed Greek Yogurt Bowl"
            calories={320}
            protein={28}
            planned={true}
            onPress={() => handleRecipePress({
              name: 'Protein-Packed Greek Yogurt Bowl',
              calories: 320,
              protein: 28,
              carbs: 35,
              fat: 12,
              time: 5,
              servings: 1,
              tags: ['breakfast', 'quick', 'high-protein'],
              ingredients: [
                '1 cup Greek yogurt (0% fat)',
                '1/4 cup blueberries',
                '1/4 cup strawberries, sliced',
                '1 tbsp honey',
                '2 tbsp almond butter',
                '1 tbsp chia seeds',
                '1/4 cup granola'
              ],
              instructions: [
                'Add Greek yogurt to a bowl.',
                'Top with berries, honey, and almond butter.',
                'Sprinkle chia seeds and granola over the top.',
                'Serve immediately or refrigerate for up to 24 hours.'
              ]
            })}
          />
          
          <MealCard 
            title="Lunch"
            time="12:30 PM"
            name="Grilled Chicken & Quinoa Salad"
            calories={450}
            protein={42}
            planned={true}
            onPress={() => handleRecipePress({
              name: 'Grilled Chicken & Quinoa Salad',
              calories: 450,
              protein: 42,
              carbs: 45,
              fat: 15,
              time: 20,
              servings: 1,
              tags: ['lunch', 'high-protein', 'balanced'],
              ingredients: [
                '4 oz grilled chicken breast, sliced',
                '1/2 cup cooked quinoa',
                '2 cups mixed greens',
                '1/4 cup cherry tomatoes, halved',
                '1/4 cucumber, diced',
                '1/4 avocado, sliced',
                '2 tbsp olive oil and lemon dressing'
              ],
              instructions: [
                'Cook quinoa according to package instructions.',
                'Grill chicken until fully cooked.',
                'Combine all ingredients in a bowl.',
                'Drizzle with dressing and toss to combine.'
              ]
            })}
          />
          
          <MealCard 
            title="Snack"
            time="3:30 PM"
            name="Protein Smoothie"
            calories={250}
            protein={20}
            planned={true}
            onPress={() => {}}
          />
          
          <MealCard 
            title="Dinner"
            time="7:00 PM"
            name="Salmon & Avocado Rice Bowl"
            calories={520}
            protein={35}
            planned={true}
            onPress={() => handleRecipePress({
              name: 'Salmon & Avocado Rice Bowl',
              calories: 520,
              protein: 35,
              carbs: 50,
              fat: 22,
              time: 25,
              servings: 1,
              tags: ['dinner', 'omega-3', 'protein'],
              ingredients: [
                '4 oz salmon fillet',
                '1/2 cup brown rice, cooked',
                '1/2 avocado, sliced',
                '1/4 cup edamame',
                '2 tbsp soy sauce',
                '1 tsp sesame oil',
                '1 tsp sesame seeds',
                '2 sheets nori, cut into strips'
              ],
              instructions: [
                'Cook rice according to package instructions.',
                'Season salmon with salt and pepper.',
                'Pan sear salmon for 4 minutes per side.',
                'Arrange rice in bowl, top with salmon and other ingredients.',
                'Drizzle with soy sauce and sesame oil, sprinkle with sesame seeds.'
              ]
            })}
          />
          
          <MealCard 
            title="Evening Snack"
            time="9:00 PM"
            name="Add a meal"
            isEmpty={true}
            onPress={() => {}}
          />
        </View>
        
        {/* AI Plan Button */}
        <View style={styles.aiButtonsContainer}>
          <TouchableOpacity style={styles.aiButton}>
            <Ionicons name="sparkles-outline" size={20} color="white" style={{marginRight: 8}} />
            <Text style={styles.aiButtonText}>Generate AI Plan for the Week</Text>
          </TouchableOpacity>
        </View>
        
        {/* Shopping List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shopping List</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.shoppingListCard}>
            <View style={styles.shoppingListHeader}>
              <Text style={styles.shoppingListTitle}>This Week's Ingredients</Text>
              <Text style={styles.shoppingListCount}>23 items</Text>
            </View>
            
            <View style={styles.shoppingListPreview}>
              <View style={styles.shoppingItem}>
                <Text style={styles.shoppingItemBullet}>•</Text>
                <Text style={styles.shoppingItemText}>Greek yogurt (0% fat)</Text>
              </View>
              <View style={styles.shoppingItem}>
                <Text style={styles.shoppingItemBullet}>•</Text>
                <Text style={styles.shoppingItemText}>Chicken breast (1 lb)</Text>
              </View>
              <View style={styles.shoppingItem}>
                <Text style={styles.shoppingItemBullet}>•</Text>
                <Text style={styles.shoppingItemText}>Salmon fillets (1 lb)</Text>
              </View>
              <View style={styles.shoppingItem}>
                <Text style={styles.shoppingItemBullet}>•</Text>
                <Text style={styles.shoppingItemText}>Quinoa (1 cup)</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.viewShoppingListButton}>
              <Text style={styles.viewShoppingListButtonText}>View Complete List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MealCard({ title, time, name, calories, protein, planned = false, isEmpty = false, onPress }) {
  if (isEmpty) {
    return (
      <TouchableOpacity style={styles.emptyMealCard} onPress={onPress}>
        <View style={styles.emptyMealCardContent}>
          <View>
            <Text style={styles.mealCardTitle}>{title}</Text>
            <Text style={styles.mealCardTime}>{time}</Text>
          </View>
          <View style={styles.addMealButton}>
            <Ionicons name="add-circle" size={24} color="#D6426C" />
            <Text style={styles.addMealText}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity 
      style={[
        styles.mealCard, 
        { borderLeftWidth: 4, borderLeftColor: planned ? '#B8E0D2' : '#FF9E7E' }
      ]}
      onPress={onPress}
    >
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
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(62, 47, 47, 0.7)',
    marginTop: 4,
  },
  daysScrollView: {
    marginBottom: 24,
  },
  daysContainer: {
    paddingRight: 16,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  dayButtonActive: {
    backgroundColor: '#D6426C',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3E2F2F',
  },
  dayButtonTextActive: {
    color: 'white',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  nutritionSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutritionItem: {
    fontSize: 14,
    color: '#D6426C',
    marginHorizontal: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#D6426C',
    fontWeight: '500',
  },
  mealCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  mealCardContent: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealCardHeader: {
    marginBottom: 4,
  },
  mealCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  mealCardTime: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.7)',
  },
  mealCardName: {
    fontSize: 14,
    color: '#3E2F2F',
  },
  mealCardMetrics: {
    alignItems: 'flex-end',
  },
  mealCardCalories: {
    fontSize: 14,
    color: '#D6426C',
    fontWeight: '600',
  },
  mealCardProtein: {
    fontSize: 12,
    color: '#3E2F2F',
  },
  emptyMealCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    marginBottom: 12,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#D6D6D6',
  },
  emptyMealCardContent: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addMealButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addMealText: {
    fontSize: 14,
    color: '#D6426C',
    marginLeft: 4,
    fontWeight: '500',
  },
  aiButtonsContainer: {
    marginBottom: 24,
  },
  aiButton: {
    backgroundColor: '#D6426C',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shoppingListCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  shoppingListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  shoppingListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  shoppingListCount: {
    fontSize: 14,
    color: '#D6426C',
  },
  shoppingListPreview: {
    marginBottom: 16,
  },
  shoppingItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  shoppingItemBullet: {
    fontSize: 16,
    color: '#D6426C',
    marginRight: 8,
  },
  shoppingItemText: {
    fontSize: 14,
    color: '#3E2F2F',
  },
  viewShoppingListButton: {
    backgroundColor: '#F0E0D6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  viewShoppingListButtonText: {
    color: '#3E2F2F',
    fontSize: 14,
    fontWeight: '600',
  },
}); 