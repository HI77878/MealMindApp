import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecipeDetailScreen({ route, navigation }) {
  // Extract recipe data from route params
  const { recipe } = route.params || { 
    recipe: {
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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#3E2F2F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recipe Detail</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name="bookmark-outline" size={24} color="#3E2F2F" />
          </TouchableOpacity>
        </View>

        {/* Recipe Header */}
        <View style={styles.recipeHeader}>
          <View style={styles.recipeTitleContainer}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <View style={styles.tagsRow}>
              {recipe.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.recipeImagePlaceholder}>
            <Text style={styles.recipeImageText}>🍽️</Text>
          </View>
        </View>

        {/* Quick Info */}
        <View style={styles.quickInfoContainer}>
          <View style={styles.quickInfoItem}>
            <Text style={styles.quickInfoValue}>{recipe.calories}</Text>
            <Text style={styles.quickInfoLabel}>Calories</Text>
          </View>
          <View style={styles.quickInfoDivider} />
          <View style={styles.quickInfoItem}>
            <Text style={styles.quickInfoValue}>{recipe.time} min</Text>
            <Text style={styles.quickInfoLabel}>Prep Time</Text>
          </View>
          <View style={styles.quickInfoDivider} />
          <View style={styles.quickInfoItem}>
            <Text style={styles.quickInfoValue}>{recipe.servings}</Text>
            <Text style={styles.quickInfoLabel}>Servings</Text>
          </View>
        </View>

        {/* Nutrition Facts */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nutrition Facts</Text>
          <View style={styles.macroContainer}>
            {/* Protein */}
            <View style={styles.macroItem}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroTitle}>Protein</Text>
                <Text style={styles.macroValue}>{recipe.protein}g</Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressBar, { width: '70%', backgroundColor: '#D6426C' }]} />
              </View>
            </View>

            {/* Carbs */}
            <View style={styles.macroItem}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroTitle}>Carbs</Text>
                <Text style={styles.macroValue}>{recipe.carbs}g</Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressBar, { width: '40%', backgroundColor: '#B8E0D2' }]} />
              </View>
            </View>

            {/* Fat */}
            <View style={styles.macroItem}>
              <View style={styles.macroHeader}>
                <Text style={styles.macroTitle}>Fat</Text>
                <Text style={styles.macroValue}>{recipe.fat}g</Text>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressBar, { width: '30%', backgroundColor: '#DCCEF9' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ingredients</Text>
          <View style={styles.ingredientsList}>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Instructions</Text>
          <View style={styles.instructionsList}>
            {recipe.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.addMealButton]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.addMealButtonText}>Add to My Meals</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={24} color="#3E2F2F" />
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3E2F2F',
  },
  saveButton: {
    padding: 8,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  recipeTitleContainer: {
    flex: 1,
    paddingRight: 16,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#FFDBCB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    color: '#D6426C',
    fontSize: 12,
    fontWeight: '500',
  },
  recipeImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#FFDBCB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeImageText: {
    fontSize: 40,
  },
  quickInfoContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickInfoItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickInfoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D6426C',
    marginBottom: 4,
  },
  quickInfoLabel: {
    fontSize: 12,
    color: '#3E2F2F',
    opacity: 0.7,
  },
  quickInfoDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#F0E0D6',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 16,
  },
  macroContainer: {
    gap: 12,
  },
  macroItem: {
    gap: 8,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroTitle: {
    fontSize: 14,
    color: '#3E2F2F',
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3E2F2F',
  },
  progressBg: {
    height: 8,
    backgroundColor: '#F0E0D6',
    borderRadius: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  ingredientsList: {
    gap: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    fontSize: 16,
    color: '#D6426C',
    marginRight: 8,
    marginTop: -2,
  },
  ingredientText: {
    fontSize: 16,
    color: '#3E2F2F',
    flex: 1,
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF9E7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  instructionNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 16,
    color: '#3E2F2F',
    flex: 1,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addMealButton: {
    flex: 1,
    backgroundColor: '#D6426C',
  },
  addMealButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 