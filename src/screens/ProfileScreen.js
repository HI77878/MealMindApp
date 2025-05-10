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

export default function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('my-recipes');
  const [activeStory, setActiveStory] = useState(null);

  // Story Highlights Data
  const storyHighlights = [
    { id: 'new', name: 'New', isNew: true },
    { id: 'recommended', name: 'Rezepte, die ich empfehle', icon: '❤️' },
    { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
    { id: 'lunch', name: 'Lunch', icon: '🥗' },
    { id: 'dinner', name: 'Dinner', icon: '🍽️' },
    { id: 'snacks', name: 'Snacks', icon: '🥤' },
  ];

  // Eigene Rezepte (My Recipes)
  const myRecipes = [
    { id: '1', name: 'Protein Pancakes' },
    { id: '2', name: 'Greek Yogurt Bowl' },
    { id: '3', name: 'Chicken Quinoa Salad' },
  ];

  // Gespeicherte Rezepte (Saved)
  const savedRecipes = [
    { id: '1', name: 'Protein Pancakes', savedTime: '2 days ago' },
    { id: '2', name: 'Greek Yogurt Bowl', savedTime: '3 days ago' },
    { id: '3', name: 'Chicken Quinoa Salad', savedTime: '1 week ago' },
  ];

  // Gelikte Rezepte (Liked)
  const likedRecipes = [
    { id: '1', name: 'Salmon Rice Bowl', likedTime: '1 day ago' },
    { id: '2', name: 'Protein Smoothie', likedTime: '4 days ago' },
  ];

  // Freundesaktivitäten (Friends)
  const friendActivities = [
    { 
      id: '1', 
      name: 'Jamie Oliver', 
      action: 'shared a recipe', 
      time: '2h ago',
      recipe: 'Avocado Toast with Poached Eggs'
    },
    { 
      id: '2', 
      name: 'Sarah Smith', 
      action: 'liked', 
      time: '5h ago',
      recipe: 'Protein-Packed Overnight Oats'
    }
  ];

  // Story Highlight-Komponente
  const StoryHighlight = ({ item }) => (
    <TouchableOpacity 
      style={styles.storyHighlight}
      onPress={() => setActiveStory(item.id)}
    >
      <View style={[
        styles.storyCircle,
        activeStory === item.id && styles.storyCircleActive
      ]}>
        {item.isNew ? (
          <Text style={styles.newHighlightIcon}>+</Text>
        ) : (
          <Text style={styles.storyIcon}>{item.icon}</Text>
        )}
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Rezeptkartenkomponente für eigene Rezepte (im Grid)
  const RecipeGridItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
      style={styles.recipeGridItem}
    >
      <View style={styles.recipeImagePlaceholder}>
        <Text style={styles.placeholderText}>🍽️</Text>
      </View>
      <View style={styles.recipeGridOverlay}>
        <Text style={styles.recipeGridName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  // Rezeptkartenkomponente für gespeicherte/gelikte Rezepte
  const SavedRecipeCard = ({ item, timeLabel }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
      style={styles.savedRecipeCard}
    >
      <View style={styles.savedRecipeImage}>
        <Text style={styles.placeholderText}>🍽️</Text>
      </View>
      <View style={styles.savedRecipeContent}>
        <Text style={styles.savedRecipeName}>{item.name}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeIcon}>🕒</Text>
          <Text style={styles.timeText}>{timeLabel}</Text>
        </View>
        <View style={styles.recipeActions}>
          <TouchableOpacity style={styles.recipeAction}>
            <Text style={styles.actionIcon}>🔖</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recipeAction}>
            <Text style={styles.actionIcon}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recipeAction}>
            <Text style={styles.actionIcon}>💬</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Aktivitätskartenkomponente für Freunde
  const FriendActivityCard = ({ item }) => (
    <View style={styles.friendActivityCard}>
      <View style={styles.friendHeader}>
        <View style={styles.friendAvatar}>
          <Text style={styles.friendInitial}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendAction}>
            <Text>{item.action}</Text>
            <Text style={styles.friendTime}> • {item.time}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.activityContent}>
        <View style={styles.activityImage}>
          <Text style={styles.placeholderText}>🍽️</Text>
        </View>
        <View style={styles.activityDetails}>
          <Text style={styles.activityRecipe}>{item.recipe}</Text>
          <View style={styles.activityStats}>
            <TouchableOpacity style={styles.activityStat}>
              <Text style={styles.statIcon}>❤️</Text>
              <Text style={styles.statCount}>24</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activityStat}>
              <Text style={styles.statIcon}>💬</Text>
              <Text style={styles.statCount}>3</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Profil-Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileTopSection}>
            <View style={styles.avatarSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarIcon}>👤</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>Alex Johnson</Text>
                <Text style={styles.userDescription}>Fitness enthusiast & protein lover</Text>
              </View>
            </View>
            <View style={styles.profileActions}>
              <TouchableOpacity style={styles.profileAction}>
                <Text style={styles.actionIcon}>↗️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileAction}>
                <Text style={styles.actionIcon}>⚙️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Statistiken */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>Recipes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>128</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>96</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* Nutzervorteile-Highlight */}
          <View style={styles.benefitCard}>
            <Text style={styles.benefitText}>
              You've saved 4h of time & 12€ this week with MealMind! 🎉
            </Text>
          </View>

          {/* Aktionsbuttons */}
          <View style={styles.profileButtonsContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Share Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Story Highlights */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.storyHighlightsContainer}
          contentContainerStyle={styles.storyHighlightsContent}
        >
          {storyHighlights.map((story, index) => (
            <React.Fragment key={story.id}>
              <StoryHighlight item={story} />
              {index === 0 && (
                <View style={styles.storyDivider} />
              )}
            </React.Fragment>
          ))}
        </ScrollView>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'my-recipes' && styles.activeTab]}
            onPress={() => setActiveTab('my-recipes')}
          >
            <Text style={[styles.tabText, activeTab === 'my-recipes' && styles.activeTabText]}>My Recipes</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
            onPress={() => setActiveTab('saved')}
          >
            <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'liked' && styles.activeTab]}
            onPress={() => setActiveTab('liked')}
          >
            <Text style={[styles.tabText, activeTab === 'liked' && styles.activeTabText]}>Liked</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
            onPress={() => setActiveTab('friends')}
          >
            <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>Friends</Text>
          </TouchableOpacity>
        </View>

        {/* Tab-Inhalte */}
        <View style={styles.tabContent}>
          {/* Meine Rezepte Tab */}
          {activeTab === 'my-recipes' && (
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your Recipes</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.recipeGrid}>
                {myRecipes.map(recipe => (
                  <RecipeGridItem key={recipe.id} item={recipe} />
                ))}
                <TouchableOpacity style={styles.addRecipeButton}>
                  <Text style={styles.addRecipeIcon}>+</Text>
                  <Text style={styles.addRecipeText}>Add Recipe</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Gespeicherte Rezepte Tab */}
          {activeTab === 'saved' && (
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Saved Recipes</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.savedRecipesList}>
                {savedRecipes.map(recipe => (
                  <SavedRecipeCard key={recipe.id} item={recipe} timeLabel={recipe.savedTime} />
                ))}
              </View>
            </View>
          )}

          {/* Gelikte Rezepte Tab */}
          {activeTab === 'liked' && (
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Liked Recipes</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.savedRecipesList}>
                {likedRecipes.map(recipe => (
                  <SavedRecipeCard key={recipe.id} item={recipe} timeLabel={recipe.likedTime} />
                ))}
              </View>
            </View>
          )}

          {/* Freunde Tab */}
          {activeTab === 'friends' && (
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Friends' Activity</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>Find Friends</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.friendActivityList}>
                {friendActivities.map(activity => (
                  <FriendActivityCard key={activity.id} item={activity} />
                ))}
              </View>
            </View>
          )}
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
  },
  profileHeader: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileTopSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DCCEF9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    fontSize: 36,
    color: '#D6426C',
  },
  profileInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  userDescription: {
    fontSize: 14,
    color: 'rgba(62, 47, 47, 0.7)',
  },
  profileActions: {
    flexDirection: 'row',
  },
  profileAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionIcon: {
    fontSize: 18,
    color: '#3E2F2F',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D6426C',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.6)',
  },
  benefitCard: {
    marginTop: 16,
    backgroundColor: 'rgba(184, 224, 210, 0.2)',
    borderWidth: 1,
    borderColor: '#B8E0D2',
    borderRadius: 8,
    padding: 12,
  },
  benefitText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  profileButtonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#FF9E7E',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#3E2F2F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FF9E7E',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  secondaryButtonText: {
    color: '#FF9E7E',
    fontWeight: 'bold',
    fontSize: 14,
  },
  storyHighlightsContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  storyHighlightsContent: {
    paddingHorizontal: 16,
  },
  storyHighlight: {
    alignItems: 'center',
    marginRight: 16,
    width: 64,
  },
  storyCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(220, 206, 249, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyCircleActive: {
    borderWidth: 2,
    borderColor: '#FF9E7E',
    backgroundColor: 'white',
  },
  newHighlightIcon: {
    fontSize: 32,
    color: 'rgba(62, 47, 47, 0.6)',
  },
  storyIcon: {
    fontSize: 28,
  },
  storyName: {
    fontSize: 12,
    marginTop: 4,
    color: '#3E2F2F',
    textAlign: 'center',
  },
  storyDivider: {
    height: 64,
    width: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF9E7E',
  },
  tabText: {
    fontSize: 14,
    color: '#3E2F2F',
  },
  activeTabText: {
    color: '#FF9E7E',
    fontWeight: 'bold',
  },
  tabContent: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  viewAllText: {
    color: '#FF9E7E',
    fontSize: 14,
  },
  recipeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recipeGridItem: {
    width: '48%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  recipeImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 36,
  },
  recipeGridOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(62, 47, 47, 0.7)',
    padding: 8,
  },
  recipeGridName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  addRecipeButton: {
    width: '48%',
    height: 120,
    borderRadius: 8,
    backgroundColor: 'rgba(220, 206, 249, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  addRecipeIcon: {
    fontSize: 32,
    color: '#FF9E7E',
    marginBottom: 4,
  },
  addRecipeText: {
    color: '#3E2F2F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  savedRecipesList: {
    gap: 12,
  },
  savedRecipeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  savedRecipeImage: {
    width: '33%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  savedRecipeContent: {
    flex: 1,
    padding: 12,
  },
  savedRecipeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeIcon: {
    fontSize: 12,
    marginRight: 4,
    color: 'rgba(62, 47, 47, 0.6)',
  },
  timeText: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.6)',
  },
  recipeActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  recipeAction: {
    marginRight: 12,
  },
  friendActivityList: {
    gap: 16,
  },
  friendActivityCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  friendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  friendAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCCEF9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  friendInitial: {
    color: '#D6426C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#3E2F2F',
  },
  friendAction: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.7)',
  },
  friendTime: {
    color: 'rgba(62, 47, 47, 0.6)',
  },
  activityContent: {
    flexDirection: 'row',
    marginTop: 8,
  },
  activityImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityDetails: {
    flex: 1,
    paddingLeft: 12,
  },
  activityRecipe: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3E2F2F',
  },
  activityStats: {
    flexDirection: 'row',
    marginTop: 8,
  },
  activityStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  statCount: {
    fontSize: 12,
    color: '#3E2F2F',
  },
});
