import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PromptInput from './PromptInput';
import ActionButtons from './ActionButtons';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';

interface Props {
  selectedImage: string;
  editedImage: string | null;
  showComparison: boolean;
  editPrompt: string;
  setEditPrompt: (prompt: string) => void;
  quickPrompts: string[];
  handleEdit: () => void;
  editMutationPending: boolean;
  saveImage: () => void;
  isSaving: boolean;
  resetEditor: () => void;
}

export default function Editor({
  selectedImage,
  editedImage,
  showComparison,
  editPrompt,
  setEditPrompt,
  quickPrompts,
  handleEdit,
  editMutationPending,
  saveImage,
  isSaving,
  resetEditor,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // Prepare images for zoom viewer
  const images = [
    { url: selectedImage, props: { source: { uri: selectedImage } } },
    ...(editedImage ? [{ url: editedImage, props: { source: { uri: editedImage } } }] : []),
  ];

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.editorSection}>
      <View style={styles.imageContainer}>
        {showComparison && editedImage ? (
          <View style={styles.comparisonContainer}>
            <View style={styles.imageWrapper}>
              <Text style={styles.imageLabel}>Original</Text>
              <TouchableOpacity onPress={() => openModal(0)}>
                <Image source={{ uri: selectedImage }} style={styles.comparisonImage} />
              </TouchableOpacity>
            </View>
            <View style={styles.imageWrapper}>
              <Text style={styles.imageLabel}>Edited</Text>
              <TouchableOpacity onPress={() => openModal(1)}>
                <Image source={{ uri: editedImage }} style={styles.comparisonImage} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={() => openModal(0)}>
            <Image source={{ uri: selectedImage }} style={styles.mainImage} />
          </TouchableOpacity>
        )}
      </View>
      <PromptInput
        editPrompt={editPrompt}
        setEditPrompt={setEditPrompt}
        quickPrompts={quickPrompts}
      />
      <ActionButtons
        handleEdit={handleEdit}
        editMutationPending={editMutationPending}
        editPrompt={editPrompt}
        editedImage={editedImage}
        saveImage={saveImage}
        isSaving={isSaving}
        resetEditor={resetEditor}
      />

      <Modal
        isVisible={modalVisible}
        style={{ margin: 0 }}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        useNativeDriver
      >
        <ImageViewer
          imageUrls={images}
          index={modalIndex}
          enableSwipeDown
          onSwipeDown={closeModal}
          onCancel={closeModal}
          backgroundColor="rgba(0,0,0,0.95)"
          saveToLocalByLongPress={false}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  editorSection: {
    gap: 24,
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mainImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  comparisonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  imageWrapper: {
    flex: 1,
  },
  imageLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  comparisonImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
});