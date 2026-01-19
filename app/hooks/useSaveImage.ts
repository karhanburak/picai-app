import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as LegacyFileSystem from 'expo-file-system/legacy';

export function useSaveImage() {
    const saveImage = async (editedImage: string | null, setIsSaving: (saving: boolean) => void) => {
        if (!editedImage) {
            Alert.alert('No Image', 'Please edit an image first before saving.');
            return;
        }

        try {
            setIsSaving(true);

            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission needed', 'Media library permission is required to save photos.');
                return;
            }

            const filename = `edited_photo_${Date.now()}.jpg`;
            const fileUri = `${LegacyFileSystem.documentDirectory}${filename}`;
            const base64Data = editedImage.split(',')[1];

            // Use string 'base64' explicitly to avoid property access errors if types are mismatched
            await LegacyFileSystem.writeAsStringAsync(fileUri, base64Data, {
                encoding: 'base64',
            });

            const asset = await MediaLibrary.createAssetAsync(fileUri);
            await LegacyFileSystem.deleteAsync(fileUri, { idempotent: true });

            Alert.alert('Success', 'Photo saved to your gallery!');
            console.log('Photo saved successfully:', asset);
        } catch (error) {
            Alert.alert('Error', 'Failed to save photo. Please try again.');
            console.error('Save error:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return { saveImage };
}
