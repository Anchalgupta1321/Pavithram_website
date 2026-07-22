export const runtime = 'edge';

export async function POST(request) {
  // Simple security check (optional, but good practice)
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  
  if (secret !== 'pavithram123') {
    return new Response('Unauthorized', { status: 401 });
  }

  // The GitHub Personal Access Token is stored in Cloudflare Pages environment variables
  const GITHUB_PAT = process.env.GITHUB_PAT;
  if (!GITHUB_PAT) {
    return new Response('Missing GITHUB_PAT environment variable', { status: 500 });
  }

  try {
    // Trigger the GitHub Action
    const res = await fetch('https://api.github.com/repos/Anchalgupta1321/Pavithram_website/dispatches', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${GITHUB_PAT}`,
        'User-Agent': 'Cloudflare Pages Bridge',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event_type: 'update_wp_data' })
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(`GitHub API Error: ${res.status} ${text}`, { status: res.status });
    }

    return new Response('Successfully triggered GitHub Action!', { status: 200 });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}
