import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const placeholderImages: Record<string, Omit<ImagePlaceholder, 'id'>> = data.placeholderImages.reduce((acc, img) => {
    acc[img.id] = {
        description: img.description,
        imageUrl: img.imageUrl,
        imageHint: img.imageHint
    };
    return acc;
}, {} as Record<string, Omit<ImagePlaceholder, 'id'>>);
