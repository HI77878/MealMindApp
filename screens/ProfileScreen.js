import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>
        
        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileImageText}>A</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alex Johnson</Text>
            <Text style={styles.profileEmail}>alex.johnson@example.com</Text>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Days Tracked</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>87%</Text>
            <Text style={styles.statLabel}>Goal Completion</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Favorite Meals</Text>
          </View>
        </View>
        
        {/* Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Goals</Text>
          <View style={styles.goalsCard}>
            <View style={styles.goalItem}>
              <View>
                <Text style={styles.goalTitle}>Daily Calories</Text>
                <Text style={styles.goalValue}>2,100 kcal</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="pencil-outline" size={20} color="#D6426C" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.goalDivider} />
            
            <View style={styles.goalItem}>
              <View>
                <Text style={styles.goalTitle}>Protein Target</Text>
                <Text style={styles.goalValue}>150g</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="pencil-outline" size={20} color="#D6426C" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.goalDivider} />
            
            <View style={styles.goalItem}>
              <View>
                <Text style={styles.goalTitle}>Weight Goal</Text>
                <Text style={styles.goalValue}>75kg (-5kg)</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="pencil-outline" size={20} color="#D6426C" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Preferences & Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences & Settings</Text>
          
          <SettingsItem 
            icon="notifications-outline" 
            title="Notifications"
            hasSwitch={true}
          />
          
          <SettingsItem 
            icon="restaurant-outline" 
            title="Dietary Preferences"
            subtitle="Omnivore, no peanuts"
          />
          
          <SettingsItem 
            icon="fitness-outline" 
            title="Fitness Goals"
            subtitle="Maintain weight, build muscle"
          />
          
          <SettingsItem 
            icon="globe-outline" 
            title="Language"
            subtitle="English"
          />
          
          <SettingsItem 
            icon="help-circle-outline" 
            title="Help & Support"
          />
          
          <SettingsItem 
            icon="log-out-outline" 
            title="Sign Out"
            isDestructive={true}
          />
        </View>
        
        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>MealMind v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsItem({ icon, title, subtitle, hasSwitch = false, isDestructive = false }) {
  return (
    <TouchableOpacity style={styles.settingsItem}>
      <View style={styles.settingsItemLeft}>
        <View style={styles.settingsItemIcon}>
          <Ionicons 
            name={icon} 
            size={20} 
            color={isDestructive ? "#E74C3C" : "#D6426C"} 
          />
        </View>
        <View>
          <Text style={[
            styles.settingsItemTitle,
            isDestructive && styles.settingsItemTitleDestructive
          ]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      
      {hasSwitch ? (
        <View style={styles.switchContainer}>
          <View style={styles.switchOn} />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#3E2F2F" />
      )}
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D6426C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileImageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(62, 47, 47, 0.7)',
    marginBottom: 12,
  },
  editProfileButton: {
    backgroundColor: '#F0E0D6',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  editProfileText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3E2F2F',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D6426C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#3E2F2F',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 16,
  },
  goalsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  goalTitle: {
    fontSize: 14,
    color: '#3E2F2F',
    marginBottom: 4,
  },
  goalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  goalDivider: {
    height: 1,
    backgroundColor: '#F0E0D6',
    marginVertical: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF3EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3E2F2F',
  },
  settingsItemTitleDestructive: {
    color: '#E74C3C',
  },
  settingsItemSubtitle: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.7)',
    marginTop: 2,
  },
  switchContainer: {
    width: 36,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#B8E0D2',
    padding: 2,
    justifyContent: 'center',
  },
  switchOn: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 12,
  },
  appVersion: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.5)',
  },
}); 