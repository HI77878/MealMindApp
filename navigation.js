import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// Import Screens
import DiscoverScreen from './screens/DiscoverScreen';
import FYPScreen from './screens/FYPScreen';
import HomeScreen from './screens/HomeScreen';
import PlanScreen from './screens/PlanScreen';
import ProfileScreen from './screens/ProfileScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';

// Import Component
import BottomNavigation from './components/BottomNavigation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigation {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="FYP" component={FYPScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Plan" component={PlanScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 