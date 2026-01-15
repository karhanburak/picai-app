import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Wand2, Download, RotateCcw } from 'lucide-react-native';

interface Props {
  handleEdit: () => void;
  editMutationPending: boolean;
  editPrompt: string;
  editedImage: string | null;
  saveImage: () => void;
  isSaving: boolean;
  resetEditor: () => void;
}

export default function ActionButtons({
  handleEdit,
  editMutationPending,
  editPrompt,
  editedImage,
  saveImage,
  isSaving,
  resetEditor,
}: Props) {
  return (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={[
          styles.actionButton,
          styles.editButton,
          (editMutationPending || !editPrompt.trim()) && styles.disabledButton,
        ]}
        onPress={handleEdit}
        disabled={editMutationPending || !editPrompt.trim()}
      >
        {editMutationPending ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Wand2 size={24} color="#FFFFFF" />
        )}
        <Text style={styles.actionButtonText}>
          {editMutationPending ? 'Editing...' : 'Edit'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.actionButton,
          styles.saveButton,
          (!editedImage || isSaving) && styles.disabledButton,
        ]}
        onPress={saveImage}
        disabled={!editedImage || isSaving}
      >
        {isSaving ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Download size={24} color="#FFFFFF" />
        )}
        <Text style={styles.actionButtonText}>
          {isSaving ? 'Saving...' : 'Save'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, styles.resetButton]}
        onPress={resetEditor}
      >
        <RotateCcw size={24} color="#667eea" />
        <Text style={[styles.actionButtonText, { color: '#667eea' }]}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  editButton: {
    backgroundColor: '#667eea',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  saveButton: {
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#09882158',
  },
  resetButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});