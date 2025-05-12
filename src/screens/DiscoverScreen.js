import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import FilterModal from '../components/modals/FilterModal';

export default function DiscoverScreen({ navigation }) {
  const [forMeActive, setForMeActive] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);
  
  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  const applyFilters = (filters) => {
    console.log('Applied filters:', filters);
    setActiveFilters(filters);
    // Hier könnten die Rezepte basierend auf den Filtern gefiltert werden
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Discover</Text>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search meals or ingredients" 
            placeholderTextColor="#999"
          />
        </View>
        
        {/* Filters */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={openFilterModal}
          >
            <Text style={styles.filterButtonText}>⚙️ Filter</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              forMeActive && styles.filterButtonActive
            ]} 
            onPress={() => setForMeActive(!forMeActive)}
          >
            <Text 
              style={[
                styles.filterButtonText, 
                forMeActive && styles.filterButtonTextActive
              ]}
            >
              ✨ For Me
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
            id="1"
            navigation={navigation}
          />
          <RecipeCard 
            name="Grilled Chicken & Quinoa Salad"
            calories={450}
            protein={42}
            time={20}
            tags={["lunch", "high-protein"]}
            id="2"
            navigation={navigation}
          />
          <RecipeCard 
            name="Salmon & Avocado Rice Bowl"
            calories={520}
            protein={35}
            time={25}
            tags={["dinner", "omega-3"]}
            id="3"
            navigation={navigation}
          />
        </View>
      </ScrollView>
      
      <FilterModal
        visible={filterModalVisible}
        onClose={closeFilterModal}
        onApply={applyFilters}
      />
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

function RecipeCard({ name, calories, protein, time, tags, id, navigation }) {
  return (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: id })}
    >
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
    fontSize: 16,
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
  },
  categoryCard: {
    width: '48%',
    height: 100,
    backgroundColor: '#CCCCCC',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(62, 47, 47, 0.5)',
    padding: 10,
  },
  categoryName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recipesSection: {
    marginBottom: 32,
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recipeImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeImageText: {
    fontSize: 30,
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
    color: '#3E2F2F',
    marginRight: 8,
  },
  recipeProtein: {
    fontSize: 14,
    color: '#D6426C',
    fontWeight: '500',
  },
  recipeTime: {
    fontSize: 14,
    color: '#3E2F2F',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    backgroundColor: 'rgba(184, 224, 210, 0.3)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 6,
    marginTop: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#3E2F2F',
  },
}); 