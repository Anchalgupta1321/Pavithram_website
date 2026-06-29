import HomeClient from './HomeClient';
import { fetchTestimonials, fetchGalleryImages } from '@/services/wordpress';

export default async function HomePage() {
  const testimonials = await fetchTestimonials();
  const allGalleryImages = await fetchGalleryImages();
  
  // Get 4 images for the home page preview
  const galleryPreview = allGalleryImages.slice(0, 4);

  return <HomeClient testimonials={testimonials} galleryPreview={galleryPreview} />;
}
