import { Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';

interface EditResponse {
  image: {
    base64Data: string;
    mimeType: string;
  };
}

export function useEditMutation(setEditedImage: (uri: string) => void, setShowComparison: (show: boolean) => void) {
  return useMutation({
    mutationFn: async ({ prompt, imageBase64 }: { prompt: string; imageBase64: string }) => {
      const response = await fetch('https://toolkit.rork.com/images/edit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          images: [{ type: 'image', image: imageBase64 }],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to edit image');
      }

      return response.json() as Promise<EditResponse>;
    },
    onSuccess: (data) => {
      const editedImageUri = `data:${data.image.mimeType};base64,${data.image.base64Data}`;
      setEditedImage(editedImageUri);
      setShowComparison(true);
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to edit image. Please try again.');
      console.error('Edit error:', error);
    },
  });
}