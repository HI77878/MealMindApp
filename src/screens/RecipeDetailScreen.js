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

export default function RecipeDetailScreen({ route, navigation }) {
  // Empfange Rezeptdaten aus der Navigation oder verwende Dummy-Daten
  const { recipeId } = route.params || { recipeId: '1' };
  
  // Dummy-Rezeptdaten (später durch API/Backend-Daten ersetzen)
  const [recipe, setRecipe] = useState({
    id: recipeId,
    title: "Protein-Packed Greek Yogurt Bowl",
    rating: 4.2,
    reviews: 128,
    categories: ["Breakfast", "High Protein", "Quick & Easy", "Vegetarian"],
    nutrition: {
      calories: 320,
      protein: 28,
      carbs: 32,
      fat: 12
    },
    prepTime: 5,
    description: "A quick and delicious protein-packed breakfast bowl that will keep you full and energized throughout the morning. Perfect for busy days!",
    ingredients: [
      "1 cup Greek yogurt (full-fat or 2%)",
      "1 scoop protein powder (vanilla)",
      "1 tbsp honey or maple syrup",
      "1/4 cup mixed berries",
      "1 tbsp chia seeds",
      "1 tbsp almond butter",
      "2 tbsp granola"
    ],
    instructions: [
      "Add Greek yogurt to a bowl.",
      "Mix in protein powder and sweetener until well combined.",
      "Top with berries, chia seeds, and granola.",
      "Drizzle almond butter on top.",
      "Enjoy immediately or refrigerate for up to 24 hours."
    ],
    isFavorite: false
  });

  // Toggle Favorit-Status
  const toggleFavorite = () => {
    setRecipe({...recipe, isFavorite: !recipe.isFavorite});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header mit Zurück-Button */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Rezeptbild */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>🍽️</Text>
          </View>
        </View>

        {/* Rezepttitel und Aktionen */}
        <View style={styles.titleContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <View style={styles.titleActions}>
            <TouchableOpacity onPress={toggleFavorite}>
              <Text style={styles.favoriteIcon}>
                {recipe.isFavorite ? '❤️' : '♡'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.shareIcon}>↗️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bewertungen */}
        <View style={styles.ratingsContainer}>
          <View style={styles.starsContainer}>
            {"★★★★☆".split('').map((star, index) => (
              <Text key={index} style={styles.starIcon}>{star}</Text>
            ))}
          </View>
          <Text style={styles.reviewsText}>({recipe.reviews} reviews)</Text>
        </View>

        {/* Kategorien/Tags */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {recipe.categories.map((category, index) => (
            <View key={index} style={styles.categoryTag}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Nährwertinformationen */}
        <View style={styles.nutritionCard}>
          <Text style={styles.sectionTitle}>Nutrition Info</Text>
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{recipe.nutrition.calories}</Text>
              <Text style={styles.nutritionLabel}>kcal</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={[styles.nutritionValue, styles.proteinValue]}>{recipe.nutrition.protein}g</Text>
              <Text style={styles.nutritionLabel}>protein</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{recipe.nutrition.carbs}g</Text>
              <Text style={styles.nutritionLabel}>carbs</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{recipe.nutrition.fat}g</Text>
              <Text style={styles.nutritionLabel}>fat</Text>
            </View>
          </View>
        </View>

        {/* Zubereitungszeit */}
        <View style={styles.prepTimeContainer}>
          <Text style={styles.timeIcon}>🕐</Text>
          <Text style={styles.prepTimeText}>{recipe.prepTime} minutes</Text>
          <Text style={styles.prepTimeLabel}>prep time</Text>
        </View>

        {/* Beschreibung */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{recipe.description}</Text>
        </View>

        {/* Zutaten */}
        <View style={styles.ingredientsContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList}>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bulletPointText}>•</Text>
                </View>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Anleitung */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
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

        {/* Aktionsbuttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.addToMealPlanButton}>
            <Text style={styles.addToMealPlanButtonText}>Add to Meal Plan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.chatWithAIButton}>
            <Text style={styles.chatWithAIButtonText}>Chat with AI</Text>
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
  header: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 18,
    color: '#3E2F2F',
  },
  imageContainer: {
    width: '100%',
    height: 250,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3E2F2F',
    flex: 1,
  },
  titleActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  shareIcon: {
    fontSize: 24,
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    fontSize: 16,
    color: '#FF9E7E',
    marginRight: 2,
  },
  reviewsText: {
    fontSize: 14,
    color: 'rgba(62, 47, 47, 0.7)',
    marginLeft: 4,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(220, 206, 249, 0.5)',
    borderRadius: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#3E2F2F',
  },
  nutritionCard: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 12,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  proteinValue: {
    color: '#D6426C',
  },
  nutritionLabel: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.6)',
  },
  prepTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  timeIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  prepTimeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginRight: 4,
  },
  prepTimeLabel: {
    fontSize: 15,
    color: 'rgba(62, 47, 47, 0.7)',
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#3E2F2F',
  },
  ingredientsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  ingredientsList: {
    gap: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 20,
    paddingTop: 2,
  },
  bulletPointText: {
    fontSize: 16,
    color: '#FF9E7E',
    fontWeight: 'bold',
  },
  ingredientText: {
    fontSize: 15,
    color: '#3E2F2F',
    flex: 1,
  },
  instructionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF9E7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  instructionNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  instructionText: {
    fontSize: 15,
    color: '#3E2F2F',
    flex: 1,
    lineHeight: 22,
  },
  actionButtonsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  addToMealPlanButton: {
    backgroundColor: '#D6426C',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addToMealPlanButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatWithAIButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  chatWithAIButtonText: {
    color: '#3E2F2F',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
