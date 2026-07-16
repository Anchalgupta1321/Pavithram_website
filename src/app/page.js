import HomeClient from './HomeClient';
import { fetchTestimonials, fetchGalleryImages, fetchPromoBanner } from '@/services/wordpress';

export const runtime = 'edge';

export default async function HomePage() {
  const testimonials = await fetchTestimonials();
  const allGalleryImages = await fetchGalleryImages();
  const promoBannerUrl = await fetchPromoBanner();
  
  // Get 4 images for the home page preview
  const galleryPreview = allGalleryImages.slice(0, 4);

  return <HomeClient testimonials={testimonials} galleryPreview={galleryPreview} promoBannerUrl={promoBannerUrl} />;
}
