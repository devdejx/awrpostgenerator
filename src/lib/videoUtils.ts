
/**
 * Utility functions for handling video operations
 */

/**
 * Creates a downloadable URL for a given video source
 * @param videoUrl The URL of the video to download
 * @returns A URL that can be used to download the video
 */
export const createDownloadableVideoUrl = (videoUrl: string): string => {
  // Handle Vimeo URLs
  if (videoUrl.includes('vimeo.com')) {
    const videoId = getVimeoId(videoUrl);
    if (videoId) {
      // Add download parameter to the embed URL
      return `https://player.vimeo.com/video/${videoId}?download=1`;
    }
  }
  
  // For other video types, return the original URL
  return videoUrl;
};

/**
 * Extracts the Vimeo video ID from a URL
 * @param url Vimeo URL
 * @returns Video ID or null if not found
 */
export const getVimeoId = (url: string): string | null => {
  try {
    const match = url.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};
