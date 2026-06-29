import { fetchGalleryImages } from '../../services/wordpress';
import GalleryClient from './GalleryClient';

export const metadata = {
  title: 'Gallery | Pavithram Foods',
  description: 'A visual journey through our state-of-the-art facilities, our pure ingredients, and our 75-year legacy of taste.',
};

export default async function GalleryPage() {
  // Fetch live data from WordPress (Server-side)
  const images = await fetchGalleryImages();

  return <GalleryClient images={images} />;
}
