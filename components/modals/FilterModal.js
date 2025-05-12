import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  ScrollView,
  FlatList
} from 'react-native';

const FilterModal = ({ visible, onClose, onApply }) => {
  // Anfangszustand der Filter
  const [calories, setCalories] = useState(500);
  const [protein, setProtein] = useState(30);
  const [budget, setBudget] = useState(10);
  const [cookingTime, setCookingTime] = useState('30 minutes');
  const [cookingTimeDropdownVisible, setCookingTimeDropdownVisible] = useState(false);
  const [dietaryStyle, setDietaryStyle] = useState('All');
  const [dietaryDropdownVisible, setDietaryDropdownVisible] = useState(false);

  // Optionen für Dropdowns
  const cookingTimeOptions = ['15 minutes', '30 minutes', '45 minutes', '60 minutes', '90+ minutes'];
  const dietaryOptions = ['All', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Low Carb', 'Paleo', 'High Protein', 'Gluten Free', 'Dairy Free'];

  // Reset-Funktion für Filter
  const resetFilters = () => {
    setCalories(500);
    setProtein(30);
    setBudget(10);
    setCookingTime('30 minutes');
    setDietaryStyle('All');
  };

  // Anwenden der Filter und Schließen des Modals
  const applyFilters = () => {
    onApply({
      calories,
      protein,
      budget,
      cookingTime,
      dietaryStyle
    });
    onClose();
  };

  // Custom Slider Komponente
  const CustomSlider = ({ value, onValueChange, min, max, step = 1, leftLabel, rightLabel }) => {
    const [sliderValue, setSliderValue] = useState(value);
    const [dragging, setDragging] = useState(false);
    const sliderRef = useRef(null);
    const [sliderWidth, setSliderWidth] = useState(200);
    
    // Berechne den Prozentsatz für die Position des Thumbs
    const percentage = ((sliderValue - min) / (max - min)) * 100;
    
    const handleSliderPress = (event) => {
      const { locationX } = event.nativeEvent;
      
      // Berechne den neuen Wert basierend auf der Position des Taps
      const newPercentage = locationX / sliderWidth;
      const newValue = min + (max - min) * newPercentage;
      
      // Runde den Wert zum nächsten Step
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      
      setSliderValue(clampedValue);
      onValueChange(clampedValue);
    };
    
    return (
      <View style={styles.sliderContainer}>
        <TouchableOpacity 
          ref={sliderRef}
          style={styles.slider} 
          onPress={handleSliderPress}
          activeOpacity={1}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setSliderWidth(width);
          }}
        >
          <View style={styles.sliderTrack}>
            <View 
              style={[styles.sliderFill, { width: `${percentage}%` }]} 
            />
          </View>
          <View 
            style={[
              styles.sliderThumb, 
              { left: `${percentage}%` }
            ]} 
          />
        </TouchableOpacity>
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>{leftLabel}</Text>
          <Text style={styles.sliderLabel}>{rightLabel}</Text>
        </View>
      </View>
    );
  };

  // Custom Dropdown Komponente
  const CustomDropdown = ({ value, options, onChange, placeholder, isVisible, setIsVisible }) => {
    return (
      <View style={styles.dropdownContainer}>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setIsVisible(!isVisible)}
        >
          <Text style={styles.dropdownButtonText}>{value || placeholder}</Text>
          <Text style={styles.dropdownIcon}>{isVisible ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        
        {isVisible && (
          <View style={styles.dropdownMenu}>
            <ScrollView>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    value === option && styles.dropdownItemSelected
                  ]}
                  onPress={() => {
                    onChange(option);
                    setIsVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      value === option && styles.dropdownItemTextSelected
                    ]}
                  >
                    {value === option && '✓ '}{option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  // Schließe alle Dropdowns wenn außerhalb geklickt wird
  const closeDropdowns = () => {
    setCookingTimeDropdownVisible(false);
    setDietaryDropdownVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={() => {
        closeDropdowns();
        onClose();
      }}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => {
            e.stopPropagation();
            closeDropdowns();
          }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter Recipes</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent}>
                {/* Calories Slider */}
                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Calories</Text>
                  <CustomSlider
                    value={calories}
                    onValueChange={setCalories}
                    min={0}
                    max={1500}
                    step={50}
                    leftLabel="0 kcal"
                    rightLabel="1500 kcal"
                  />
                </View>

                {/* Minimum Protein Slider */}
                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Minimum Protein</Text>
                  <CustomSlider
                    value={protein}
                    onValueChange={setProtein}
                    min={0}
                    max={100}
                    step={5}
                    leftLabel="0g"
                    rightLabel="100g"
                  />
                </View>

                {/* Max Cooking Time Dropdown */}
                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Max Cooking Time</Text>
                  <CustomDropdown
                    value={cookingTime}
                    options={cookingTimeOptions}
                    onChange={setCookingTime}
                    placeholder="Select cooking time"
                    isVisible={cookingTimeDropdownVisible}
                    setIsVisible={setCookingTimeDropdownVisible}
                  />
                </View>

                {/* Budget per Meal Slider */}
                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Budget per Meal</Text>
                  <CustomSlider
                    value={budget}
                    onValueChange={setBudget}
                    min={1}
                    max={30}
                    step={1}
                    leftLabel="€1"
                    rightLabel="€30"
                  />
                </View>

                {/* Dietary Style Dropdown */}
                <View style={styles.filterSection}>
                  <Text style={styles.filterLabel}>Dietary Style</Text>
                  <CustomDropdown
                    value={dietaryStyle}
                    options={dietaryOptions}
                    onChange={setDietaryStyle}
                    placeholder="Select dietary style"
                    isVisible={dietaryDropdownVisible}
                    setIsVisible={setDietaryDropdownVisible}
                  />
                </View>
              </ScrollView>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.resetButton} 
                  onPress={resetFilters}
                >
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.applyButton} 
                  onPress={applyFilters}
                >
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF3EA',
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2F2F',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#3E2F2F',
  },
  modalContent: {
    maxHeight: '70%',
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2F2F',
    marginBottom: 12,
  },
  sliderContainer: {
    width: '100%',
    height: 40,
  },
  slider: {
    width: '100%',
    height: 20,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 6,
    width: '100%',
    backgroundColor: '#DCCEF9',
    borderRadius: 3,
  },
  sliderFill: {
    height: 6,
    backgroundColor: '#FF9E7E',
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#FF9E7E',
    borderRadius: 10,
    top: 0,
    marginLeft: -10,
    transform: [{ translateY: -7 }],
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabel: {
    color: '#3E2F2F',
    fontSize: 12,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1,
  },
  dropdownButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    color: '#3E2F2F',
    fontSize: 16,
  },
  dropdownIcon: {
    color: '#3E2F2F',
    fontSize: 12,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECECEC',
    maxHeight: 200,
    zIndex: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemSelected: {
    backgroundColor: '#D6426C',
  },
  dropdownItemText: {
    color: '#3E2F2F',
    fontSize: 16,
  },
  dropdownItemTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  resetButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#3E2F2F',
    fontWeight: 'bold',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#FF9E7E',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FilterModal; 