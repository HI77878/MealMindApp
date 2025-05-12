import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

// Importieren der Screens
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import FYPScreen from '../screens/FYPScreen';
import PlanScreen from '../screens/PlanScreen';
import ShoppingScreen from '../screens/ShoppingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';

// Stack Navigator für die verschiedenen Tabs
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </HomeStack.Navigator>
  );
}

const DiscoverStack = createStackNavigator();
function DiscoverStackScreen() {
  return (
    <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
      <DiscoverStack.Screen name="DiscoverMain" component={DiscoverScreen} />
      <DiscoverStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </DiscoverStack.Navigator>
  );
}

const FYPStack = createStackNavigator();
function FYPStackScreen() {
  return (
    <FYPStack.Navigator screenOptions={{ headerShown: false }}>
      <FYPStack.Screen name="FYPMain" component={FYPScreen} />
      <FYPStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </FYPStack.Navigator>
  );
}

const PlanStack = createStackNavigator();
function PlanStackScreen() {
  return (
    <PlanStack.Navigator screenOptions={{ headerShown: false }}>
      <PlanStack.Screen name="PlanMain" component={PlanScreen} />
      <PlanStack.Screen name="Shopping" component={ShoppingScreen} />
      <PlanStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </PlanStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </ProfileStack.Navigator>
  );
}

// Tab-Navigator
const Tab = createBottomTabNavigator();

export default function MainNavigator({ initialRouteName = 'Home' }) {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          height: 60,
        },
        tabBarActiveTintColor: '#FF9E7E',
        tabBarInactiveTintColor: '#3E2F2F',
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen 
        name="FYP" 
        component={FYPStackScreen} 
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>✨</Text>,
        }}
      />
      <Tab.Screen 
        name="Home" 
        component={HomeStackScreen} 
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🏠</Text>,
        }}
      />
      <Tab.Screen 
        name="Discover" 
        component={DiscoverStackScreen} 
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🔍</Text>,
        }}
      />
      <Tab.Screen 
        name="Plan" 
        component={PlanStackScreen} 
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>📅</Text>,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStackScreen} 
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
} 