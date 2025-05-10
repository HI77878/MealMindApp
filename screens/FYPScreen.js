import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FYPScreen({ navigation }) {
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
          <Text style={styles.title}>For You</Text>
          <Text style={styles.subtitle}>AI-powered recommendations based on your preferences</Text>
        </View>
        
        {/* Recommendation Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Recommended Meals</Text>
          <Text style={styles.sectionSubtitle}>Based on your calorie and protein goals</Text>
          
          <FYPRecipeCard 
            title="Breakfast"
            time="8:00 AM"
            name="Protein-Packed Greek Yogurt Bowl"
            calories={320}
            protein={28}
            match={96}
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
          
          <FYPRecipeCard 
            title="Lunch"
            time="12:30 PM"
            name="Grilled Chicken & Quinoa Salad"
            calories={450}
            protein={42}
            match={92}
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
          
          <FYPRecipeCard 
            title="Dinner"
            time="7:00 PM"
            name="Salmon & Avocado Rice Bowl"
            calories={520}
            protein={35}
            match={88}
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
        </View>
        
        {/* Based on Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Based on Your Goals</Text>
          <Text style={styles.sectionSubtitle}>Meal plans that match your fitness goals</Text>
          
          <View style={styles.goalCardsContainer}>
            <GoalCard 
              title="High Protein Plan"
              description="Optimized for muscle building with 2,400 calories & 180g protein"
              icon="barbell-outline"
            />
            
            <GoalCard 
              title="Weight Loss Plan"
              description="Calorie-controlled plan with 1,800 calories & balanced macros"
              icon="trending-down-outline"
            />
          </View>
        </View>
        
        {/* Personalize Recommendations */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.personalizeButton}>
            <Ionicons name="options-outline" size={20} color="white" style={{marginRight: 8}} />
            <Text style={styles.personalizeButtonText}>Update My Preferences</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FYPRecipeCard({ title, time, name, calories, protein, match, onPress }) {
  return (
    <TouchableOpacity style={styles.fypCard} onPress={onPress}>
      <View style={styles.fypCardHeader}>
        <View>
          <Text style={styles.fypCardTitle}>{title}</Text>
          <Text style={styles.fypCardTime}>{time}</Text>
        </View>
        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{match}% match</Text>
        </View>
      </View>
      
      <View style={styles.fypCardBody}>
        <View style={styles.fypImagePlaceholder}>
          <Text style={styles.fypImageText}>🍽️</Text>
        </View>
        <View style={styles.fypCardContent}>
          <Text style={styles.fypCardName}>{name}</Text>
          <View style={styles.fypCardMetrics}>
            <Text style={styles.fypCardCalories}>{calories} kcal</Text>
            <Text style={styles.fypCardProtein}>{protein}g protein</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function GoalCard({ title, description, icon }) {
  return (
    <TouchableOpacity style={styles.goalCard}>
      <View style={styles.goalCardIcon}>
        <Ionicons name={icon} size={24} color="#FF9E7E" />
      </View>
      <View style={styles.goalCardContent}>
        <Text style={styles.goalCardTitle}>{title}</Text>
        <Text style={styles.goalCardDescription}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#3E2F2F" />
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
    marginBottom: 24,
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: 'rgba(62, 47, 47, 0.7)',
    marginBottom: 16,
  },
  fypCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  fypCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fypCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  fypCardTime: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.7)',
  },
  matchBadge: {
    backgroundColor: '#B8E0D2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  fypCardBody: {
    flexDirection: 'row',
  },
  fypImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#FFDBCB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fypImageText: {
    fontSize: 24,
  },
  fypCardContent: {
    flex: 1,
  },
  fypCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3E2F2F',
    marginBottom: 8,
  },
  fypCardMetrics: {
    flexDirection: 'row',
  },
  fypCardCalories: {
    fontSize: 14,
    color: '#D6426C',
    fontWeight: '600',
    marginRight: 12,
  },
  fypCardProtein: {
    fontSize: 14,
    color: '#3E2F2F',
  },
  goalCardsContainer: {
    gap: 12,
  },
  goalCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  goalCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF3EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  goalCardContent: {
    flex: 1,
  },
  goalCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 4,
  },
  goalCardDescription: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.7)',
  },
  personalizeButton: {
    backgroundColor: '#D6426C',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  personalizeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 