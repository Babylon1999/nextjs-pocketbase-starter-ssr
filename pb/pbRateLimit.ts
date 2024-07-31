// Temporary in-memory store for rate limiting. Should be replaced with a proper store like Redis.
const rateLimiterStore: { [ip: string]: number } = {};

// Function to add or update the IP address with the current timestamp
export async function updateRateLimiter(ip: keyof typeof rateLimiterStore) {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp

  // Check if the IP exists and if the timestamp is older than 10 seconds
  if (rateLimiterStore[ip] && rateLimiterStore[ip] > currentTime) {
    return false; // Request is rate-limited
  }

  rateLimiterStore[ip] = currentTime + 1800;

  return true; // Request is allowed
}

// Function to clean up old entries (older than 1800 (30min) seconds)
export async function cleanRateLimiterStore() {
  const currentTime = Math.floor(Date.now() / 1000);

  for (const ip in rateLimiterStore) {
    if (rateLimiterStore[ip] <= currentTime) {
      delete rateLimiterStore[ip];
    }
  }
}

// Set an interval to clean up the store every 30min
setInterval(cleanRateLimiterStore, 1800000);

export default rateLimiterStore;
