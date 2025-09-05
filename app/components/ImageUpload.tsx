import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Image as ImageIcon } from 'lucide-react-native';

interface Props {
  pickImage: (source: 'camera' | 'gallery') => void;
}

export default function ImageUpload({ pickImage }: Props) {
  return (
    <View style={styles.uploadSection}>
      <View style={styles.uploadPlaceholder}>
        <ImageIcon size={64} color="#9CA3AF" />
        <Text style={styles.uploadText}>Select a photo to get started</Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage('camera')}>
          <Camera size={24} color="#FFFFFF" />
          <Text style={styles.uploadButtonText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage('gallery')}>
          <ImageIcon size={24} color="#FFFFFF" />
          <Text style={styles.uploadButtonText}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  uploadSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  uploadPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 40,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    width: '100%',
    minHeight: 200,
  },
  uploadText: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});