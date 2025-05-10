import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DiscoverScreen({ navigation }) {
  const [forMeActive, setForMeActive] = useState(false);
  
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
          <Text style={styles.title}>Discover</Text>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search meals or ingredients" 
            placeholderTextColor="#999"
          />
        </View>
        
        {/* Filters */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={16} color="#3E2F2F" style={{marginRight: 4}} />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              forMeActive && styles.filterButtonActive
            ]} 
            onPress={() => setForMeActive(!forMeActive)}
          >
            <Ionicons name="sparkles" size={16} color={forMeActive ? "white" : "#3E2F2F"} style={{marginRight: 4}} />
            <Text 
              style={[
                styles.filterButtonText, 
                forMeActive && styles.filterButtonTextActive
              ]}
            >
              For Me
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Meine Kategorien</Text>
          <View style={styles.categoriesGrid}>
            <CategoryCard name="High Protein" />
            <CategoryCard name="Quick & Easy" />
            <CategoryCard name="Low Carb" />
            <CategoryCard name="Vegetarian" />
          </View>
        </View>
        
        {/* Trending Recipes */}
        <View style={styles.recipesSection}>
          <Text style={styles.sectionTitle}>Trending Recipes</Text>
          <RecipeCard 
            name="Protein-Packed Greek Yogurt Bowl"
            calories={320}
            protein={28}
            time={5}
            tags={["breakfast", "quick"]}
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
          <RecipeCard 
            name="Grilled Chicken & Quinoa Salad"
            calories={450}
            protein={42}
            time={20}
            tags={["lunch", "high-protein"]}
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
          <RecipeCard 
            name="Salmon & Avocado Rice Bowl"
            calories={520}
            protein={35}
            time={25}
            tags={["dinner", "omega-3"]}
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
      </ScrollView>
    </SafeAreaView>
  );
}

function CategoryCard({ name }) {
  return (
    <View style={styles.categoryCard}>
      <View style={styles.categoryGradient}>
        <Text style={styles.categoryName}>{name}</Text>
      </View>
    </View>
  );
}

function RecipeCard({ name, calories, protein, time, tags, onPress }) {
  return (
    <TouchableOpacity style={styles.recipeCard} onPress={onPress}>
      <View style={styles.recipeImagePlaceholder}>
        <Text style={styles.recipeImageText}>🍽️</Text>
      </View>
      <View style={styles.recipeContent}>
        <Text style={styles.recipeName}>{name}</Text>
        <View style={styles.recipeMetricsRow}>
          <Text style={styles.recipeCalories}>{calories} kcal</Text>
          <Text style={styles.recipeProtein}>{protein}g protein</Text>
        </View>
        <View style={styles.recipeMetricsRow}>
          <Text style={styles.recipeTime}>⏱️ {time} min</Text>
        </View>
        <View style={styles.tagContainer}>
          {tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#3E2F2F',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  filterButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#FF9E7E',
  },
  filterButtonText: {
    color: '#3E2F2F',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 16,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    height: 100,
    backgroundColor: '#F8E0D0',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  categoryGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  recipesSection: {
    marginBottom: 24,
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#FFDBCB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeImageText: {
    fontSize: 40,
  },
  recipeContent: {
    flex: 1,
    padding: 12,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 4,
  },
  recipeMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  recipeCalories: {
    fontSize: 14,
    color: '#D6426C',
    fontWeight: '600',
    marginRight: 12,
  },
  recipeProtein: {
    fontSize: 14,
    color: '#3E2F2F',
  },
  recipeTime: {
    fontSize: 14,
    color: '#3E2F2F',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#FFDBCB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagText: {
    color: '#D6426C',
    fontSize: 12,
  },
}); 