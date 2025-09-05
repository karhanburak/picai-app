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
        style={[styles.actionButton, styles.editButton]}
        onPress={handleEdit}
        disabled={editMutationPending || !editPrompt.trim()}
      >
        {editMutationPending ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Wand2 size={24} color="#FFFFFF" />
        )}
        <Text style={styles.actionButtonText}>
          {editMutationPending ? 'Editing...' : 'Edit Photo'}
        </Text>
      </TouchableOpacity>
      {editedImage && (
        <TouchableOpacity
          style={[styles.actionButton, styles.saveButton]}
          onPress={saveImage}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Download size={24} color="#FFFFFF" />
          )}
          <Text style={styles.actionButtonText}>
            {isSaving ? 'Saving...' : 'Save Photo'}
          </Text>
        </TouchableOpacity>
      )}
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
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  editButton: {
    backgroundColor: '#667eea',
  },
  saveButton: {
    backgroundColor: '#10B981',
  },
  resetButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});