
/**
 * Extracts the Vimeo video ID and hash from a Vimeo URL
 * @param url Vimeo video URL
 * @returns Object containing videoId and hash (if available)
 */
export const extractVimeoInfo = (url: string) => {
  const match = url.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/);
  if (!match) {
    throw new Error('Invalid Vimeo URL');
  }
  
  return {
    videoId: match[1],
    hash: match[2] || ''
  };
};

/**
 * Creates a Vimeo embed URL from a regular Vimeo URL
 * @param url Vimeo video URL
 * @returns Embed URL for the video
 */
export const getVimeoEmbedUrl = (url: string) => {
  try {
    const { videoId, hash } = extractVimeoInfo(url);
    if (hash) {
      return `https://player.vimeo.com/video/${videoId}?h=${hash}`;
    }
    return `https://player.vimeo.com/video/${videoId}`;
  } catch (error) {
    console.error("Error parsing Vimeo URL:", error);
    return url;
  }
};

/**
 * Gets the direct download link for a Vimeo video using the Vimeo API
 * @param url Vimeo video URL
 * @param apiKey Vimeo API access token
 * @returns Promise resolving to the direct download URL
 */
export const getVimeoDirectDownloadUrl = async (url: string, apiKey: string): Promise<string> => {
  try {
    const { videoId } = extractVimeoInfo(url);
    
    const response = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(`API Response: ${errorText}`);
      throw new Error(`Failed to fetch video data: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Vimeo API response:", data);
    
    // Find the download links
    if (data.download && Array.isArray(data.download) && data.download.length > 0) {
      // Sort by quality (highest first) and get the first one
      const downloads = [...data.download];
      downloads.sort((a, b) => b.size - a.size);
      return downloads[0].link;
    } else if (data.files && Array.isArray(data.files) && data.files.length > 0) {
      // Alternative: use files array which contains progressive download links
      const files = [...data.files];
      files.sort((a, b) => (b.height || 0) - (a.height || 0));
      return files[0].link;
    }
    
    throw new Error("No download links available for this video");
  } catch (error) {
    console.error("Error getting direct download URL:", error);
    throw error;
  }
};

/**
 * Creates a direct download URL for a Vimeo video (fallback method)
 * @param url Vimeo video URL
 * @returns Download URL for the video
 * @deprecated Use getVimeoDirectDownloadUrl instead
 */
export const getVimeoDownloadUrl = (url: string) => {
  try {
    const { videoId } = extractVimeoInfo(url);
    // Using the direct video URL format that triggers download
    return `https://vimeo.com/${videoId}?action=download`;
  } catch (error) {
    console.error("Error creating download URL:", error);
    return '';
  }
};
