import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';

export default function ShoppingScreen({ navigation }) {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState({
    "Dairy & Eggs": [
      { name: "Greek yogurt", amount: "4 cups", checked: false },
      { name: "Eggs", amount: "1 dozen", checked: true },
      { name: "Milk", amount: "1 liter", checked: false },
      { name: "Cheddar cheese", amount: "200g", checked: false },
    ],
    "Fruits & Vegetables": [
      { name: "Bananas", amount: "6", checked: false },
      { name: "Mixed berries", amount: "500g", checked: false },
      { name: "Spinach", amount: "200g", checked: true },
      { name: "Bell peppers", amount: "3", checked: false },
      { name: "Avocados", amount: "2", checked: false },
      { name: "Broccoli", amount: "1 head", checked: false },
    ],
    "Protein": [
      { name: "Chicken breast", amount: "1kg", checked: false },
      { name: "Salmon fillets", amount: "500g", checked: false },
      { name: "Protein powder", amount: "1 scoop", checked: true },
      { name: "Tofu", amount: "400g", checked: false },
    ],
    "Grains & Legumes": [
      { name: "Quinoa", amount: "500g", checked: false },
      { name: "Brown rice", amount: "1kg", checked: false },
      { name: "Oats", amount: "500g", checked: true },
      { name: "Chickpeas", amount: "1 can", checked: false },
    ]
  });

  // Berechne die Gesamtzahl der Artikel und wie viele davon angekreuzt sind
  const totalItems = Object.values(items).flat().length;
  const checkedItems = Object.values(items).flat().filter(item => item.checked).length;

  // Funktion zum Umschalten des Checkbox-Status
  const toggleItemCheck = (category, index) => {
    const updatedItems = {...items};
    updatedItems[category][index].checked = !updatedItems[category][index].checked;
    setItems(updatedItems);
  };

  // Funktion zum Hinzufügen eines neuen Artikels
  const addItem = () => {
    if (newItem.trim() === '') return;
    
    // Füge den Artikel zur ersten Kategorie hinzu (könnte verbessert werden)
    const firstCategory = Object.keys(items)[0];
    const updatedItems = {...items};
    updatedItems[firstCategory].push({
      name: newItem.trim(),
      amount: "",
      checked: false
    });
    
    setItems(updatedItems);
    setNewItem('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header mit Zurück-Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Shopping List</Text>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.exportButtonText}>Export</Text>
          </TouchableOpacity>
        </View>

        {/* Datumsbereich */}
        <View style={styles.dateRangeCard}>
          <Text style={styles.dateRangeLabel}>Shopping for:</Text>
          <TouchableOpacity style={styles.dateRangeButton}>
            <Text style={styles.dateRangeText}>May 7 - May 13</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Artikel hinzufügen */}
        <View style={styles.addItemContainer}>
          <TextInput
            style={styles.addItemInput}
            placeholder="Add an item"
            value={newItem}
            onChangeText={setNewItem}
          />
          <TouchableOpacity style={styles.addItemButton} onPress={addItem}>
            <Text style={styles.addItemButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Einkaufsliste */}
        <View style={styles.shoppingListContainer}>
          {Object.entries(items).map(([category, categoryItems]) => (
            <ShoppingCategory
              key={category}
              title={category}
              items={categoryItems}
              onToggleCheck={toggleItemCheck}
            />
          ))}
        </View>

        {/* Zusammenfassung */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <Text style={styles.bagIcon}>🛍️</Text>
            <View>
              <Text style={styles.summaryTitle}>Shopping Summary</Text>
              <Text style={styles.summaryText}>{totalItems} items total • {checkedItems} checked</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Komponente für eine Einkaufskategorie
function ShoppingCategory({ title, items, onToggleCheck }) {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <View style={styles.categoryCard}>
        {items.map((item, index) => (
          <View 
            key={index} 
            style={[
              styles.itemRow,
              index !== items.length - 1 && styles.itemBorder
            ]}
          >
            <TouchableOpacity 
              style={[styles.checkbox, item.checked && styles.checkboxChecked]} 
              onPress={() => onToggleCheck(title, index)}
            >
              {item.checked && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <Text 
              style={[
                styles.itemName, 
                item.checked && styles.itemNameChecked
              ]}
            >
              {item.name}
            </Text>
            <Text style={styles.itemAmount}>{item.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3EA',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 22,
    color: '#3E2F2F',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  exportButton: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  exportButtonText: {
    color: '#3E2F2F',
    fontSize: 14,
  },
  dateRangeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateRangeLabel: {
    fontSize: 14,
    color: '#3E2F2F',
  },
  dateRangeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  dateRangeText: {
    color: '#3E2F2F',
    fontSize: 14,
  },
  dropdownIcon: {
    marginLeft: 6,
    fontSize: 10,
    color: '#3E2F2F',
  },
  addItemContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  addItemInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  addItemButton: {
    backgroundColor: '#FF9E7E',
    borderRadius: 8,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addItemButtonText: {
    color: '#3E2F2F',
    fontSize: 20,
    fontWeight: 'bold',
  },
  shoppingListContainer: {
    marginBottom: 24,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 8,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF9E7E',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF9E7E',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: '#3E2F2F',
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: 'rgba(62, 47, 47, 0.5)',
  },
  itemAmount: {
    fontSize: 14,
    color: 'rgba(62, 47, 47, 0.6)',
  },
  summaryCard: {
    backgroundColor: 'rgba(220, 206, 249, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bagIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#D6426C',
  },
  summaryTitle: {
    fontWeight: 'bold',
    color: '#3E2F2F',
    fontSize: 16,
  },
  summaryText: {
    fontSize: 12,
    color: 'rgba(62, 47, 47, 0.7)',
  },
});
