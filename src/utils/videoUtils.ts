
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
 * @param accessToken Vimeo API access token
 * @returns Promise resolving to the direct download URL
 */
export const getVimeoDirectDownloadUrl = async (url: string, accessToken: string): Promise<string> => {
  try {
    const { videoId } = extractVimeoInfo(url);
    
    // First try to get the video details directly from the API
    const videoResponse = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.vimeo.*+json;version=3.4'
      }
    });
    
    if (!videoResponse.ok) {
      console.error(`Video API Error: ${videoResponse.status} ${videoResponse.statusText}`);
      const errorText = await videoResponse.text();
      console.error(`API Response: ${errorText}`);
      
      // If the direct API fails, try the OEmbed API which has fewer restrictions
      return getVimeoDownloadUrlViaOEmbed(url);
    }
    
    const videoData = await videoResponse.json();
    console.log("Vimeo API video response:", videoData);
    
    // Check if download links are available
    if (videoData.download && Array.isArray(videoData.download) && videoData.download.length > 0) {
      // Sort by quality (highest first) and get the first one
      const downloads = [...videoData.download];
      downloads.sort((a, b) => b.size - a.size);
      return downloads[0].link;
    } 
    
    // Check if progressive file links are available
    if (videoData.files && Array.isArray(videoData.files) && videoData.files.length > 0) {
      const files = [...videoData.files];
      files.sort((a, b) => (b.height || 0) - (a.height || 0));
      return files[0].link;
    }
    
    // If API access doesn't provide download links, try fallback methods
    return getVimeoDownloadUrlViaOEmbed(url);
    
  } catch (error) {
    console.error("Error getting direct download URL:", error);
    // Try fallback method if direct API fails
    return getVimeoDownloadUrlViaOEmbed(url);
  }
};

/**
 * Fallback method to get a Vimeo download URL using OEmbed
 * @param url Vimeo video URL
 * @returns Promise resolving to the download URL
 */
export const getVimeoDownloadUrlViaOEmbed = async (url: string): Promise<string> => {
  try {
    const { videoId } = extractVimeoInfo(url);
    
    // Use the OEmbed API to get video information
    const oembedResponse = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`);
    
    if (!oembedResponse.ok) {
      console.error(`OEmbed API Error: ${oembedResponse.status}`);
      throw new Error(`Failed to fetch OEmbed data: ${oembedResponse.status}`);
    }
    
    const oembedData = await oembedResponse.json();
    console.log("Vimeo OEmbed response:", oembedData);
    
    // Get the video player URL from the OEmbed response
    if (oembedData && oembedData.video_id) {
      // Return the video URL that will trigger download when opened
      return `https://player.vimeo.com/video/${oembedData.video_id}/config`;
    }
    
    throw new Error("Could not find video information in OEmbed response");
  } catch (error) {
    console.error("Error in OEmbed fallback:", error);
    
    // Use the most basic fallback method - redirect to Vimeo with download parameter
    const { videoId } = extractVimeoInfo(url);
    return `https://vimeo.com/${videoId}/download`;
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
    return `https://vimeo.com/${videoId}/download`;
  } catch (error) {
    console.error("Error creating download URL:", error);
    return '';
  }
};
