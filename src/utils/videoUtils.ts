
/**
 * Extracts the Vimeo video ID from a Vimeo URL
 * @param url Vimeo video URL
 * @returns Video ID
 */
export const extractVimeoId = (url: string): string => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  if (!match) {
    throw new Error('Neveljavna Vimeo povezava');
  }
  return match[1];
};

/**
 * Creates a Vimeo embed URL from a regular Vimeo URL
 * @param url Vimeo video URL
 * @returns Embed URL for the video
 */
export const getVimeoEmbedUrl = (url: string): string => {
  try {
    const videoId = extractVimeoId(url);
    return `https://player.vimeo.com/video/${videoId}`;
  } catch (error) {
    console.error("Napaka pri generiranju embed URL-ja:", error);
    return url;
  }
};

/**
 * Downloads a Vimeo video using the provided access token
 * @param url Vimeo video URL
 * @returns Promise that resolves when download starts
 */
export const downloadVimeoVideo = async (url: string): Promise<void> => {
  // Exact token as specified
  const token = "c2e9ef6bafe3fa090c6e1d095aa5";
  
  try {
    // Extract video ID from URL
    const videoId = extractVimeoId(url);
    console.log("Pridobivanje podatkov za video ID:", videoId);
    
    // Fetch video details from Vimeo API with correct Bearer token format
    const response = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
      method: 'GET',
      headers: {
        // Ensure there's exactly one space between 'Bearer' and the token
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.vimeo.*+json;version=3.4',
        'Content-Type': 'application/json'
      }
    });
    
    // Handle HTTP errors
    if (!response.ok) {
      const status = response.status;
      console.error("API napaka:", status, await response.text());
      
      if (status === 401 || status === 403) {
        throw new Error("Napaka pri povezavi z Vimeo. Preveri access token ali dovoljenja.");
      } else if (status === 404) {
        throw new Error("Video ni najden na Vimeo.");
      } else {
        throw new Error(`API Napaka: ${status} ${response.statusText}`);
      }
    }
    
    // Parse response data
    const data = await response.json();
    console.log("Odgovor API-ja:", data);
    
    // Check for download links
    if (!data.download || data.download.length === 0) {
      throw new Error("Prenos videa ni omogočen. Vklopi 'Allow download' v nastavitvah videa na Vimeu.");
    }
    
    // Get download link from first element
    const downloadLink = data.download[0].link;
    if (!downloadLink) {
      throw new Error("Povezava za prenos ni na voljo.");
    }
    
    // Create and trigger download
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = downloadLink;
    a.download = '';
    
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
    }, 100);
    
  } catch (error: any) {
    console.error("Napaka pri prenosu:", error);
    throw error;
  }
};
