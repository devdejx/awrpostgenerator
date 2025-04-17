
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
  // Fixed video ID and token as specified
  const videoId = "1073621108";
  const token = "4779545e0c95733f0bd6371a56152a86";
  
  try {
    console.log("Pridobivanje podatkov za video ID:", videoId);
    
    // Make API request to fetch video data directly
    const response = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
      method: 'GET',
      headers: {
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
      } else {
        throw new Error(`API Napaka: ${status} ${response.statusText}`);
      }
    }
    
    // Parse response data
    const data = await response.json();
    console.log("Odgovor API-ja:", data);
    
    // Try to directly use the download URL or progressive URLs if download array isn't available
    if (data.download && data.download.length > 0) {
      const downloadLink = data.download[0].link;
      if (!downloadLink) {
        throw new Error("Povezava za prenos ni na voljo.");
      }
      
      // Start download using direct link
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadLink;
      a.download = 'video.mp4';
      
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        document.body.removeChild(a);
      }, 100);
      return;
    } 
    // Fallback to progressive links if available
    else if (data.files && data.files.length > 0) {
      // Find progressive download link with highest quality
      const progressiveFiles = data.files.filter((file: any) => 
        file.quality && file.link && file.type === "video/mp4"
      ).sort((a: any, b: any) => {
        // Sort by quality (HD is higher than SD)
        const qualityOrder: {[key: string]: number} = {
          'hd': 3,
          'sd': 2,
          'mobile': 1
        };
        return (qualityOrder[b.quality] || 0) - (qualityOrder[a.quality] || 0);
      });
      
      if (progressiveFiles.length > 0) {
        const bestQualityLink = progressiveFiles[0].link;
        
        // Start download using progressive link
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = bestQualityLink;
        a.download = 'video.mp4';
        
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
          document.body.removeChild(a);
        }, 100);
        return;
      }
    }
    
    // If we get here, no download options were found
    throw new Error("Prenos videa ni omogočen. Vklopi 'Allow download' v nastavitvah videa.");
    
  } catch (error: any) {
    console.error("Napaka pri prenosu:", error);
    throw error;
  }
};
