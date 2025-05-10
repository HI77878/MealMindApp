import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import FYPScreen from './src/screens/FYPScreen';
import PlanScreen from './src/screens/PlanScreen';
import ShoppingScreen from './src/screens/ShoppingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';

// Stack für den Home-Tab
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </HomeStack.Navigator>
  );
}

// Stack für den Discover-Tab
const DiscoverStack = createStackNavigator();
function DiscoverStackScreen() {
  return (
    <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
      <DiscoverStack.Screen name="DiscoverMain" component={DiscoverScreen} />
      <DiscoverStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </DiscoverStack.Navigator>
  );
}

// Stack für den FYP-Tab
const FYPStack = createStackNavigator();
function FYPStackScreen() {
  return (
    <FYPStack.Navigator screenOptions={{ headerShown: false }}>
      <FYPStack.Screen name="FYPMain" component={FYPScreen} />
      <FYPStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </FYPStack.Navigator>
  );
}

// Stack Navigator für den Plan-Tab
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

// ProfileStack für den Profil-Tab
const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </ProfileStack.Navigator>
  );
}

// Tab-Navigator erstellen
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3EA',
  },
}); 