import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  editPrompt: string;
  setEditPrompt: (prompt: string) => void;
  quickPrompts: string[];
}

export default function PromptInput({ editPrompt, setEditPrompt, quickPrompts }: Props) {
  return (
    <View style={styles.promptSection}>
      <Text style={styles.sectionTitle}>What would you like to change?</Text>
      <TextInput
        style={styles.promptInput}
        placeholder="Describe how you want to edit the photo..."
        placeholderTextColor="#9CA3AF"
        value={editPrompt}
        onChangeText={setEditPrompt}
        multiline
        numberOfLines={3}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickPrompts}>
        {quickPrompts.map((prompt, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickPromptButton}
            onPress={() => setEditPrompt(prompt)}
          >
            <Text style={styles.quickPromptText}>{prompt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  promptSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  promptInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#374151',
    textAlignVertical: 'top',
    minHeight: 80,
    marginBottom: 16,
  },
  quickPrompts: {
    marginTop: 8,
  },
  quickPromptButton: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  quickPromptText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '500',
  },
});