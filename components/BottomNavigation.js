import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BottomNavigation() {
  // Aktuelle Seite - hier statisch "Home" zur Demonstration
  const currentScreen = "Home";
  
  const isActive = (screenName) => {
    return currentScreen === screenName;
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem}>
        <Text style={[styles.navIcon, isActive('FYP') && styles.activeIcon]}>✨</Text>
        <Text style={[styles.navText, isActive('FYP') && styles.activeText]}>FYP</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Text style={[styles.navIcon, isActive('Home') && styles.activeIcon]}>🏠</Text>
        <Text style={[styles.navText, isActive('Home') && styles.activeText]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Text style={[styles.navIcon, isActive('Discover') && styles.activeIcon]}>🔍</Text>
        <Text style={[styles.navText, isActive('Discover') && styles.activeText]}>Discover</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Text style={[styles.navIcon, isActive('Plan') && styles.activeIcon]}>📅</Text>
        <Text style={[styles.navText, isActive('Plan') && styles.activeText]}>Plan</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Text style={[styles.navIcon, isActive('Profile') && styles.activeIcon]}>👤</Text>
        <Text style={[styles.navText, isActive('Profile') && styles.activeText]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 22,
    color: '#3E2F2F',
    marginBottom: 2,
  },
  navText: {
    fontSize: 12,
    color: '#3E2F2F',
  },
  activeIcon: {
    color: '#FF9E7E',
  },
  activeText: {
    color: '#FF9E7E',
    fontWeight: 'bold',
  },
}); 