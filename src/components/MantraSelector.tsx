import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, Modal, FlatList } from 'react-native';
import { MantraEntry, MANTRA_CATALOG } from '../utils/mantraCatalog';

interface MantraSelectorProps {
  selectedMantra: MantraEntry;
  onSelect: (mantra: MantraEntry) => void;
  disabled: boolean;
}

export function MantraSelector({ selectedMantra, onSelect, disabled }: MantraSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (mantra: MantraEntry) => {
    onSelect(mantra);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mantra</Text>
      <Pressable
        onPress={() => setIsOpen(true)}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`Select mantra. Currently: ${selectedMantra.name}`}
        accessibilityState={{ disabled }}
        style={[styles.selector, disabled && styles.selectorDisabled]}
      >
        <Text style={[styles.selectorText, disabled && styles.selectorTextDisabled]} numberOfLines={1}>
          {selectedMantra.name}
        </Text>
        <Text style={[styles.chevron, disabled && styles.selectorTextDisabled]}>▼</Text>
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownTitle}>Select Mantra</Text>
            <FlatList
              data={MANTRA_CATALOG}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelect(item)}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.name}${item.id === selectedMantra.id ? ', selected' : ''}`}
                  style={[
                    styles.option,
                    item.id === selectedMantra.id && styles.optionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.id === selectedMantra.id && styles.optionTextSelected,
                    ]}
                  >
                    {item.name}
                  </Text>
                  {item.id === selectedMantra.id && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    fontWeight: '600',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FF6B00',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  selectorDisabled: {
    opacity: 0.5,
    borderColor: '#CCC',
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectorTextDisabled: {
    color: '#999',
  },
  chevron: {
    fontSize: 12,
    color: '#FF6B00',
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: '80%',
    maxHeight: '60%',
    paddingVertical: 16,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionSelected: {
    backgroundColor: '#FFF3E8',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  optionTextSelected: {
    color: '#FF6B00',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    color: '#FF6B00',
    fontWeight: 'bold',
  },
});
