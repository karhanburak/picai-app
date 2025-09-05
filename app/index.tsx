import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import Editor from './components/Editor';

import { useImagePicker } from './hooks/useImagePicker';
import { useEditMutation } from './hooks/useEditMutation';
import { useSaveImage } from './hooks/useSaveImage';

export default function PhotoEditor() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState<string>('');
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { pickImage } = useImagePicker(setSelectedImage, setEditedImage, setShowComparison, setEditPrompt);
  const editMutation = useEditMutation(setEditedImage, setShowComparison);
  const { saveImage } = useSaveImage();

  const handleEdit = async () => {
    if (!selectedImage || !editPrompt.trim()) {
      // Alert handled in hook
      alert('Please select an image and enter a valid prompt.');
      return;
    }

    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = (reader.result as string).split(',')[1];
        editMutation.mutate({
          prompt: editPrompt.trim(),
          imageBase64: base64Data,
        });
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      // Alert handled in hook
      console.error('Error processing image:', error);
    }
  };

  const resetEditor = () => {
    setSelectedImage(null);
    setEditedImage(null);
    setEditPrompt('');
    setShowComparison(false);
  };

  const quickPrompts = [
    'Remove the background',
    'Make it black and white',
    'Add a sunset sky',
    'Make it look vintage',
    'Remove all people',
    'Add dramatic lighting',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} style="dark" />
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!selectedImage ? (
          <ImageUpload pickImage={pickImage} />
        ) : (
          <Editor
            selectedImage={selectedImage}
            editedImage={editedImage}
            showComparison={showComparison}
            editPrompt={editPrompt}
            setEditPrompt={setEditPrompt}
            quickPrompts={quickPrompts}
            handleEdit={handleEdit}
            editMutationPending={editMutation.isPending}
            saveImage={() => saveImage(editedImage, setIsSaving)}
            isSaving={isSaving}
            resetEditor={resetEditor}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingVertical: 0,
  },
});