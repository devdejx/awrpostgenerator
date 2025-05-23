import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Share2, Download, Loader2, User } from "lucide-react";
import { usePostStore } from "@/store/postStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { getVimeoEmbedUrl, downloadVimeoVideo } from "@/utils/videoUtils";

const PostPreview = () => {
  const { post } = usePostStore();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const isMobile = useIsMobile();

  const formatPostContent = (content) => {
    if (!content) return '';
    
    const cleanedContent = content.replace(/^(Our|All Will Retire|AWR)( retirement)? (philosophy|believes|approach|insight|reminder|wisdom|perspective|belief|principle|concept|understands|champions|values|celebrates|promotes|inspires|prioritizes|supports|explains|advises|recommends):\s*/gi, '');
    
    return `${cleanedContent}\n\n@AllWillRetire`;
  };

  const handleCopyToClipboard = () => {
    if (!post.content) {
      toast({
        title: "Error",
        description: "Create a post first",
        variant: "destructive",
      });
      return;
    }

    const formattedContent = formatPostContent(post.content);
    
    navigator.clipboard
      .writeText(formattedContent)
      .then(() => {
        setCopied(true);
        toast({
          title: "Success!",
          description: "Copied to clipboard!",
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Error copying text",
          variant: "destructive",
        });
      });
  };

  const shareToTwitter = () => {
    if (!post.content) {
      toast({
        title: "Error",
        description: "Create a post first",
        variant: "destructive",
      });
      return;
    }
    
    const formattedContent = formatPostContent(post.content);
    let twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(formattedContent)}`;
    
    if (post.image || post.video) {
      toast({
        title: "Notice",
        description: "Media will be available for manual adding on X",
      });
    }
    
    window.open(twitterUrl, '_blank');
    
    toast({
      title: "Opening X (Twitter)",
      description: "Redirecting you to X to complete your post",
    });
  };

  const downloadVideo = async () => {
    try {
      setIsDownloading(true);
      await downloadVimeoVideo(post.video || "");
      
      toast({
        title: "Success",
        description: "Download has started",
      });
    } catch (error: any) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred while downloading the video",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (!post.content) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          Create a post first to see the preview
        </p>
      </div>
    );
  }

  const formattedDate = new Date().toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  
  const formattedContent = formatPostContent(post.content);

  return (
    <Card className="border border-gray-200 bg-white p-3 sm:p-4 max-w-full overflow-hidden">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start space-x-2 sm:space-x-3">
          <Avatar className={isMobile ? "h-9 w-9" : "h-10 w-10"}>
            <AvatarFallback className="bg-gray-200">
              <User className="h-5 w-5 text-gray-600" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap">
              <span className="font-bold text-black text-sm sm:text-base">User</span>
              <span className="text-gray-500 text-xs sm:text-sm ml-1 sm:ml-2">@username</span>
              <span className="text-gray-500 mx-1 text-xs sm:text-sm">·</span>
              <span className="text-gray-500 text-xs sm:text-sm">{formattedDate}</span>
            </div>
            <p className="mt-1 text-gray-800 whitespace-pre-wrap text-sm sm:text-base break-words">{formattedContent}</p>
            
            {post.image && (
              <div className="mt-2 sm:mt-3">
                <img
                  src={post.image}
                  alt="Post image"
                  className="rounded-lg border border-gray-200 max-h-64 sm:max-h-80 object-cover w-full"
                />
              </div>
            )}
            {post.video && (
              <div className="mt-2 sm:mt-3">
                <div className="rounded-lg overflow-hidden relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                  <iframe 
                    src={getVimeoEmbedUrl(post.video)}
                    className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-200"
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowFullScreen
                    title="Vimeo video"
                  ></iframe>
                </div>
              </div>
            )}
            
            <div className="mt-2 sm:mt-3 flex items-center justify-between text-gray-500 text-xs sm:text-sm pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-circle"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>42</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-repeat"
                >
                  <path d="m17 2 4 4-4 4" />
                  <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                  <path d="m7 22-4-4 4-4" />
                  <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                </svg>
                <span>128</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-heart"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>365</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-bar-chart"
                >
                  <line x1="12" y1="20" x2="12" y2="10" />
                  <line x1="18" y1="20" x2="18" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="16" />
                </svg>
                <span>12.3k</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleCopyToClipboard}
              variant="outline"
              className="flex items-center justify-center space-x-2 w-full text-xs sm:text-sm h-9 border-2 border-[#D4AF37] hover:border-[#FFD700] transition-colors duration-300"
            >
              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{copied ? "Copied!" : "Copy text"}</span>
            </Button>
            
            <Button
              onClick={downloadVideo}
              variant="outline"
              className="flex items-center justify-center space-x-2 w-full text-xs sm:text-sm h-9 border-2 border-[#D4AF37] hover:border-[#FFD700] transition-colors duration-300"
              disabled={!post.video || isDownloading}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Download video</span>
                </>
              )}
            </Button>
          </div>
          
          <Button
            onClick={shareToTwitter}
            className="flex items-center justify-center space-x-2 w-full text-xs sm:text-sm h-9 border-2 border-[#D4AF37] hover:border-[#FFD700] transition-colors duration-300"
          >
            <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Post to X</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostPreview;
