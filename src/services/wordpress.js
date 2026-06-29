const WP_API_BASE = 'https://www.pavithram.online/wp-json/wp/v2';

/**
 * Fetches gallery items from WordPress.
 * Extracts the featured image URL from the embedded data.
 */
export async function fetchGalleryImages() {
  try {
    // 1. Fetch all Gallery "Albums"
    const res = await fetch(`${WP_API_BASE}/gallery?_embed=1&per_page=100`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds (Incremental Static Regeneration)
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch galleries: ${res.status}`);
    }

    const galleries = await res.json();
    let allImages = [];

    // 2. For each Gallery album, fetch all the photos uploaded inside it
    for (const gallery of galleries) {
      const mediaRes = await fetch(`${WP_API_BASE}/media?parent=${gallery.id}&per_page=100`, {
        next: { revalidate: 60 }
      });
      
      if (mediaRes.ok) {
        const mediaItems = await mediaRes.json();
        
        // Extract the clean image URLs from the media attachments
        const photos = mediaItems.map(media => {
          return {
            id: media.id,
            title: media.title?.rendered || gallery.title.rendered,
            url: media.source_url,
            album: gallery.title.rendered // Keep track of which album it belongs to
          };
        }).filter(img => img.url); // Remove any broken items
        
        allImages = [...allImages, ...photos];
      }
    }

    return allImages;
  } catch (error) {
    console.error('Error fetching WordPress gallery:', error);
    return [];
  }
}

/**
 * Fetches testimonials from WordPress.
 */
export async function fetchTestimonials() {
  try {
    const res = await fetch(`${WP_API_BASE}/testimonial?_embed=1&per_page=10`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch testimonials: ${res.status}`);
    }

    const data = await res.json();
    
    return data.map(post => {
      let imageUrl = null;
      if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
        imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
      }

      // Strip HTML tags from content since WP returns <p> tags
      const rawContent = post.content.rendered;
      const cleanContent = rawContent.replace(/<[^>]+>/g, '').trim();

      return {
        id: post.id,
        name: post.title.rendered,
        content: cleanContent,
        image: imageUrl
      };
    });
  } catch (error) {
    console.error('Error fetching WordPress testimonials:', error);
    return [];
  }
}

/**
 * Submits form data to WordPress Contact Form 7 REST API.
 * @param {string|number} formId - The ID of the Contact Form 7 form.
 * @param {FormData} formData - The FormData object containing the form fields.
 */
export async function submitForm(formId, formData) {
  // Mock success if no form ID is provided yet (graceful fallback)
  if (!formId || String(formId).startsWith('MOCK')) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ status: 'mail_sent', message: 'Thank you for your message. It has been sent.' }), 1500);
    });
  }

  try {
    const res = await fetch(`https://www.pavithram.online/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
      method: 'POST',
      body: formData,
    });
    
    return await res.json();
  } catch (error) {
    console.error('Error submitting form to CF7:', error);
    return { status: 'mail_failed', message: 'There was an error trying to send your message. Please try again later.' };
  }
}
