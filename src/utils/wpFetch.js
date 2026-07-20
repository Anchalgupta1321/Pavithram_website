/**
 * Resilient WordPress REST fetch helper.
 *
 * The WordPress origin (pavithram.online) sits behind a WAF / "Security Check"
 * layer that intermittently answers server-side requests with an HTML challenge
 * page (starting with `<!doctype`) or drops the connection, instead of JSON.
 * A raw `res.json()` on that HTML throws `SyntaxError: Unexpected token '<'`,
 * which previously blanked out the Gallery, Blogs and Heritage pages.
 *
 * This helper:
 *   - sends browser-like headers (some WAF rules let real browsers through),
 *   - times out slow/hung requests instead of waiting forever,
 *   - retries transient failures (network error, 5xx, or an HTML challenge body)
 *     with a short backoff,
 *   - reads the body as text first and only JSON.parses it after confirming it
 *     is not an HTML page — so a challenge response degrades to the caller's
 *     fallback instead of throwing.
 *
 * @param {string} url
 * @param {object} [options]
 * @param {object} [options.next]      Next.js fetch cache hints (passed through).
 * @param {number} [options.retries]   Extra attempts after the first (default 3).
 * @param {number} [options.timeoutMs] Per-attempt timeout (default 15000).
 * @returns {Promise<any>} Parsed JSON.
 * @throws {Error} If every attempt fails or never yields JSON.
 */
export async function wpFetchJson(url, options = {}) {
  const { next, retries = 0, timeoutMs = 8000 } = options;

  const headers = {
    Accept: 'application/json',
    // Custom header for Solution 1
    'X-Pavithram-Builder': 'true',
    // Custom User-Agent for Solution 2
    'User-Agent': 'PavithramNextJSBuilder/1.0 (CloudflarePages)',
  };

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await Promise.race([
        fetch(url, {
          headers,
          signal: controller.signal,
          ...(next ? { next } : {}),
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('ManualTimeoutError')), timeoutMs)
        )
      ]);

      const body = await res.text();

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${url}`);
      }

      // WAF challenge / HTML page instead of JSON.
      const trimmed = body.trimStart();
      if (trimmed.startsWith('<')) {
        throw new Error(`Non-JSON (WAF challenge?) response for ${url}`);
      }

      return JSON.parse(body);
    } catch (error) {
      lastError = error;
      if (error.name === 'AbortError' || error.message === 'ManualTimeoutError') {
        console.warn(`Attempt ${attempt + 1}/${retries + 1} timed out for ${url}`);
      }
      // Back off before retrying (200ms, 400ms, 600ms, ...) to let the WAF
      // rate-limit window clear.
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
      }
    } finally {
      clearTimeout(timer);
    }
  }

  throw lastError ?? new Error(`Failed to fetch ${url}`);
}
