
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Share2 } from "lucide-react";
import { usePostStore } from "@/store/postStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PostPreview = () => {
  const { post } = usePostStore();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    if (!post.content) {
      toast({
        title: "Napaka",
        description: "Najprej ustvarite objavo",
        variant: "destructive",
      });
      return;
    }

    navigator.clipboard
      .writeText(post.content)
      .then(() => {
        setCopied(true);
        toast({
          title: "Uspešno!",
          description: "Kopirano v odložišče!",
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast({
          title: "Napaka",
          description: "Napaka pri kopiranju",
          variant: "destructive",
        });
      });
  };

  const shareToTwitter = () => {
    if (!post.content) {
      toast({
        title: "Napaka",
        description: "Najprej ustvarite objavo",
        variant: "destructive",
      });
      return;
    }
    
    // Create Twitter share URL with text content
    let twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.content)}`;
    
    // If there's an image, add it to the URL as a media parameter
    // Note: Twitter's Web Intent API doesn't directly support image sharing,
    // but we can include the image URL to make it easier for users to add it manually
    if (post.image) {
      toast({
        title: "Obvestilo",
        description: "Slika bo na voljo za ročno dodajanje na X",
      });
    }
    
    window.open(twitterUrl, '_blank');
    
    toast({
      title: "Odpiranje X (Twitter)",
      description: "Preusmerjamo vas na X, da dokončate objavo",
    });
  };

  if (!post.content) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          Najprej ustvarite objavo za ogled predogleda
        </p>
      </div>
    );
  }

  const formattedDate = new Date().toLocaleDateString("sl-SI", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="border border-gray-200 p-4">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback>X</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-bold">Uporabnik</span>
              <span className="text-gray-500 text-sm ml-2">@username</span>
              <span className="text-gray-500 mx-1">·</span>
              <span className="text-gray-500 text-sm">{formattedDate}</span>
            </div>
            <p className="mt-1 text-gray-800 whitespace-pre-wrap">{post.content}</p>
            {post.image && (
              <div className="mt-3">
                <img
                  src={post.image}
                  alt="Post image"
                  className="rounded-lg border border-gray-200 max-h-80 object-cover w-full"
                />
              </div>
            )}
            <div className="mt-3 flex items-center space-x-12 text-gray-500 text-sm pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
                  width="16"
                  height="16"
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
                  width="16"
                  height="16"
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
                  width="16"
                  height="16"
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

        <div className="pt-4 border-t border-gray-200 flex gap-2">
          <Button
            onClick={handleCopyToClipboard}
            variant="outline"
            className="flex items-center space-x-2 w-full"
          >
            <Copy className="h-4 w-4" />
            <span>{copied ? "Kopirano!" : "Kopiraj besedilo"}</span>
          </Button>
          
          <Button
            onClick={shareToTwitter}
            className="flex items-center space-x-2 w-full"
          >
            <Share2 className="h-4 w-4" />
            <span>Objavi na X</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostPreview;
