import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FYPScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('für-dich');

  // Dummy-Daten für die Tabs
  const exploreData = [
    { id: '1', name: 'Protein Pancakes', protein: 32 },
    { id: '2', name: 'Greek Yogurt Bowl', protein: 28 },
    { id: '3', name: 'Chicken Quinoa Salad', protein: 42 },
    { id: '4', name: 'Salmon Rice Bowl', protein: 35 },
    { id: '5', name: 'Protein Smoothie', protein: 30 },
    { id: '6', name: 'Avocado Toast', protein: 18 },
    { id: '7', name: 'Turkey Wrap', protein: 38 },
    { id: '8', name: 'Overnight Oats', protein: 24 },
  ];

  const followingStories = [
    { id: 'create', username: 'Create', isCreate: true },
    { id: '1', username: 'Jamie' },
    { id: '2', username: 'Sarah' },
    { id: '3', username: 'Mike' },
    { id: '4', username: 'Lisa' },
    { id: '5', username: 'John' },
  ];

  const followingPosts = [
    { 
      id: '1', 
      title: 'Homemade Protein Granola', 
      calories: 280, 
      protein: 22, 
      time: 40, 
      likes: 87, 
      username: 'Jamie', 
      tags: ['breakfast', 'meal-prep', 'snack']
    },
    { 
      id: '2', 
      title: 'Vegetarian Buddha Bowl', 
      calories: 420, 
      protein: 18, 
      time: 25, 
      likes: 64, 
      username: 'Sarah', 
      tags: ['lunch', 'vegetarian', 'balanced']
    },
  ];

  const forYouPosts = [
    { 
      id: '1', 
      title: 'Protein-Packed Greek Yogurt Bowl', 
      calories: 320, 
      protein: 28, 
      time: 5, 
      likes: 245, 
      username: 'nutrition_coach', 
      tags: ['breakfast', 'high-protein', 'quick']
    },
    { 
      id: '2', 
      title: 'Grilled Chicken & Quinoa Salad', 
      calories: 450, 
      protein: 42, 
      time: 20, 
      likes: 189, 
      username: 'fitness_foodie', 
      tags: ['lunch', 'high-protein', 'meal-prep']
    },
    { 
      id: '3', 
      title: 'Salmon & Avocado Rice Bowl', 
      calories: 520, 
      protein: 35, 
      time: 25, 
      likes: 312, 
      username: 'protein_chef', 
      tags: ['dinner', 'omega-3', 'balanced']
    },
    { 
      id: '4', 
      title: '5-Minute Protein Smoothie', 
      calories: 280, 
      protein: 30, 
      time: 5, 
      likes: 178, 
      username: 'smoothie_master', 
      tags: ['breakfast', 'high-protein', 'quick']
    },
  ];

  // Render-Funktionen für verschiedene Tab-Inhalte
  const renderExploreItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.exploreItem}
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
    >
      <View style={styles.exploreImagePlaceholder}>
        <Text style={styles.explorePlaceholderText}>🍽️</Text>
      </View>
      <View style={styles.exploreItemGradient}>
        <Text style={styles.exploreItemName}>{item.name}</Text>
        <View style={styles.exploreItemProtein}>
          <Text style={styles.exploreItemProteinText}>{item.protein}g protein</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderStoryItem = ({ item }) => (
    <View style={styles.storyItem}>
      {item.isCreate ? (
        <View style={styles.createStoryCircle}>
          <Text style={styles.createStoryIcon}>+</Text>
        </View>
      ) : (
        <View style={styles.storyCircle}>
          <Text style={styles.storyInitial}>{item.username.charAt(0)}</Text>
        </View>
      )}
      <Text style={styles.storyUsername}>{item.username}</Text>
    </View>
  );

  const renderPostCard = (post) => (
    <TouchableOpacity 
      key={post.id} 
      style={styles.postCard}
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: post.id })}
    >
      <View style={styles.postImageContainer}>
        <View style={styles.postImagePlaceholder}>
          <Text style={styles.postImagePlaceholderText}>🍽️</Text>
        </View>
        <View style={styles.postImageGradient}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <View style={styles.postMetrics}>
            <Text style={styles.postCalories}>{post.calories} kcal</Text>
            <View style={styles.postProteinBadge}>
              <Text style={styles.postProteinText}>{post.protein}g protein</Text>
            </View>
            <Text style={styles.postTime}>{post.time} min</Text>
          </View>
          <View style={styles.postTags}>
            {post.tags.map(tag => (
              <View key={tag} style={styles.postTag}>
                <Text style={styles.postTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.postFooter}>
        <View style={styles.postUser}>
          <View style={styles.postUserAvatar}>
            <Text style={styles.postUserInitial}>@{post.username.charAt(0)}</Text>
          </View>
          <Text style={styles.postUsername}>@{post.username}</Text>
        </View>
        <Text style={styles.postLikes}>{post.likes} likes</Text>
      </View>
      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.postAction}
          onPress={(e) => {
            e.stopPropagation();
            // Like action logic here
          }}
        >
          <Text style={styles.postActionIcon}>♥</Text>
          <Text style={styles.postActionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.postAction}
          onPress={(e) => {
            e.stopPropagation();
            // Save action logic here
          }}
        >
          <Text style={styles.postActionIcon}>🔖</Text>
          <Text style={styles.postActionText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.postAction}
          onPress={(e) => {
            e.stopPropagation();
            // Comment action logic here
          }}
        >
          <Text style={styles.postActionIcon}>💬</Text>
          <Text style={styles.postActionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.postAction}
          onPress={(e) => {
            e.stopPropagation();
            // Share action logic here
          }}
        >
          <Text style={styles.postActionIcon}>↗</Text>
          <Text style={styles.postActionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs Navigation */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'erkunden' && styles.activeTab]} 
          onPress={() => setActiveTab('erkunden')}
        >
          <Text style={[styles.tabText, activeTab === 'erkunden' && styles.activeTabText]}>Erkunden</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'folge-ich' && styles.activeTab]} 
          onPress={() => setActiveTab('folge-ich')}
        >
          <Text style={[styles.tabText, activeTab === 'folge-ich' && styles.activeTabText]}>Folge ich</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'für-dich' && styles.activeTab]} 
          onPress={() => setActiveTab('für-dich')}
        >
          <Text style={[styles.tabText, activeTab === 'für-dich' && styles.activeTabText]}>Für dich</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Erkunden Tab */}
        {activeTab === 'erkunden' && (
          <View style={styles.exploreContainer}>
            <FlatList
              data={exploreData}
              renderItem={renderExploreItem}
              keyExtractor={item => item.id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.exploreRow}
            />
          </View>
        )}

        {/* Folge ich Tab */}
        {activeTab === 'folge-ich' && (
          <View style={styles.followingContainer}>
            {/* Stories */}
            <View style={styles.storiesContainer}>
              <FlatList
                data={followingStories}
                renderItem={renderStoryItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.storiesList}
              />
            </View>
            
            {/* Posts */}
            <View style={styles.postsContainer}>
              {followingPosts.map(post => renderPostCard(post))}
            </View>
          </View>
        )}

        {/* Für dich Tab */}
        {activeTab === 'für-dich' && (
          <View style={styles.forYouContainer}>
            {forYouPosts.map(post => renderPostCard(post))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3EA',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF9E7E',
  },
  tabText: {
    color: '#3E2F2F',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FF9E7E',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingTop: 12,
  },
  // Erkunden Tab Styles
  exploreContainer: {
    paddingHorizontal: 12,
  },
  exploreRow: {
    justifyContent: 'space-between',
  },
  exploreItem: {
    width: '48%',
    height: 160,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  exploreImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  explorePlaceholderText: {
    fontSize: 32,
  },
  exploreItemGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(62, 47, 47, 0.5)',
    padding: 10,
  },
  exploreItemName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  exploreItemProtein: {
    backgroundColor: 'rgba(214, 66, 108, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  exploreItemProteinText: {
    color: 'white',
    fontSize: 12,
  },
  // Folge ich Tab Styles
  followingContainer: {
    flex: 1,
  },
  storiesContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  storiesList: {
    paddingHorizontal: 16,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  storyCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FF9E7E',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  createStoryCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#DCCEF9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createStoryIcon: {
    fontSize: 30,
    color: '#D6426C',
  },
  storyInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D6426C',
  },
  storyUsername: {
    fontSize: 12,
    marginTop: 4,
    color: '#3E2F2F',
  },
  postsContainer: {
    padding: 16,
    gap: 24,
  },
  // Für dich Tab Styles
  forYouContainer: {
    padding: 16,
    gap: 24,
  },
  // Post Card Styles (gemeinsam für Folge ich und Für dich)
  postCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  postImageContainer: {
    height: 200,
    position: 'relative',
  },
  postImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImagePlaceholderText: {
    fontSize: 40,
  },
  postImageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(62, 47, 47, 0.7)',
    padding: 16,
  },
  postTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  postMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  postCalories: {
    color: 'white',
    fontSize: 14,
    marginRight: 8,
  },
  postProteinBadge: {
    backgroundColor: 'rgba(214, 66, 108, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  postProteinText: {
    color: 'white',
    fontSize: 12,
  },
  postTime: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  postTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postTag: {
    backgroundColor: 'rgba(220, 206, 249, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginTop: 4,
  },
  postTagText: {
    color: 'white',
    fontSize: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUserAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCCEF9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  postUserInitial: {
    color: '#D6426C',
    fontWeight: 'bold',
    fontSize: 12,
  },
  postUsername: {
    fontWeight: '500',
    color: '#3E2F2F',
  },
  postLikes: {
    color: '#3E2F2F',
    fontSize: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postActionIcon: {
    marginRight: 4,
    fontSize: 16,
  },
  postActionText: {
    color: '#3E2F2F',
    fontSize: 12,
  },
});
