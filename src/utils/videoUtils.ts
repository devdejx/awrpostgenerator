
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
 * Verifies Vimeo access token validity
 * @param accessToken Vimeo API access token
 * @returns Promise resolving to boolean indicating if token is valid
 */
export const verifyVimeoToken = async (accessToken: string): Promise<boolean> => {
  try {
    console.log("Verifying Vimeo token");
    const response = await fetch('https://api.vimeo.com/oauth/verify', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.vimeo.*+json;version=3.4'
      }
    });
    
    const data = await response.json();
    console.log("Token verification response:", data);
    
    if (response.ok) {
      console.log("Vimeo token is valid");
      return true;
    } else {
      console.error("Vimeo token verification failed:", data);
      return false;
    }
  } catch (error) {
    console.error("Error verifying Vimeo token:", error);
    return false;
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
    // First verify the token
    const isTokenValid = await verifyVimeoToken(accessToken);
    if (!isTokenValid) {
      throw new Error("Invalid or expired Vimeo access token");
    }
    
    const { videoId } = extractVimeoInfo(url);
    console.log("Fetching video details for ID:", videoId);
    
    // Call Vimeo API to get video details
    const response = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.vimeo.*+json;version=3.4'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log("Video API response:", data);
    
    // Check if download is allowed for this video
    if (!data.privacy || data.privacy.download === false) {
      console.warn("Download not allowed for this video");
      throw new Error("Download not allowed for this video");
    }
    
    // Look for download links in the response
    if (data.download && Array.isArray(data.download) && data.download.length > 0) {
      // Get the first download link - this is the direct MP4 url
      const downloadUrl = data.download[0].link;
      console.log("Found direct download URL:", downloadUrl);
      return downloadUrl;
    } else {
      // Try to get the files array
      if (data.files && Array.isArray(data.files) && data.files.length > 0) {
        // Sort by quality (highest first)
        const sortedFiles = [...data.files].sort((a, b) => (b.height || 0) - (a.height || 0));
        // Get first progressive MP4 file
        const mp4File = sortedFiles.find(file => file.type === 'video/mp4' && file.link);
        
        if (mp4File && mp4File.link) {
          console.log("Found MP4 file from files array:", mp4File.link);
          return mp4File.link;
        }
      }
      
      throw new Error("No download links found in the API response");
    }
  } catch (error) {
    console.error("Error getting direct download URL:", error);
    throw error;
  }
};

/**
 * Triggers a browser download for a given URL
 * @param url URL to download
 * @param filename Optional filename for the download
 */
export const triggerDownload = (url: string, filename?: string): void => {
  console.log("Triggering download for URL:", url);
  
  // Create a hidden anchor element
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  
  // Set download attribute (with optional filename)
  if (filename) {
    a.download = filename;
  } else {
    a.download = '';
  }
  
  // Append to document, click it, and remove it
  document.body.appendChild(a);
  a.click();
  
  // Small timeout before removing the element
  setTimeout(() => {
    document.body.removeChild(a);
  }, 100);
};

/**
 * Gets a vimeo download URL and triggers the download
 * @param url Vimeo video URL
 * @param accessToken Vimeo API access token
 * @returns Promise resolving when download is triggered
 */
export const downloadVimeoVideo = async (url: string, accessToken: string): Promise<void> => {
  try {
    console.log("Starting download process for:", url);
    const downloadUrl = await getVimeoDirectDownloadUrl(url, accessToken);
    if (downloadUrl) {
      const filename = `vimeo_video_${Date.now()}.mp4`;
      triggerDownload(downloadUrl, filename);
      return;
    }
    throw new Error("Could not get download URL");
  } catch (error) {
    console.error("Download process failed:", error);
    throw error;
  }
};
