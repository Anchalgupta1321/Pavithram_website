import HeritageClient from './HeritageClient';
import { fetchTestimonials } from '@/services/wordpress';

export default async function HeritagePage() {
  const testimonials = await fetchTestimonials();
  
  return <HeritageClient testimonials={testimonials} />;
}
