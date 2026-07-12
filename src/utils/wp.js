import { wpFetchJson } from './wpFetch';

export async function getWordPressPosts() {
  try {
    const wpPosts = await wpFetchJson(
      'https://www.pavithram.online/wp-json/wp/v2/posts?_embed&per_page=100',
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );

    return wpPosts.map(post => {
      // Extract featured image
      let imageUrl = 'https://www.pavithram.online/wp-content/uploads/2025/10/Groceries_.png'; // Fallback
      if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
        imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
      }
      
      // Extract category (just take the first one if available)
      let categoryName = 'Uncategorized';
      if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
        const categories = post._embedded['wp:term'][0];
        if (categories && categories.length > 0) {
          categoryName = categories[0].name;
        }
      }

      // Strip HTML tags from excerpt for the short description
      const strippedExcerpt = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "").trim();

      // Estimate read time (rough calculation based on word count)
      const wordCount = post.content.rendered.split(/\s+/).length;
      const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

      // Format date (e.g., "19 Mar, 2026")
      const dateObj = new Date(post.date);
      const formattedDate = dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      return {
        id: post.id,
        slug: post.slug,
        title: post.title.rendered,
        date: formattedDate,
        image: imageUrl,
        category: categoryName,
        excerpt: strippedExcerpt.length > 120 ? strippedExcerpt.substring(0, 120) + '...' : strippedExcerpt,
        readTime: `${readTimeMinutes} min read`,
        content: post.content.rendered // This is HTML
      };
    });
  } catch (error) {
    console.error('Error in getWordPressPosts:', error);
    return [];
  }
}
