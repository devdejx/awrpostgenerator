
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIContentGeneratorProps {
  onContentGenerated: (content: string) => void;
}

const AIContentGenerator = ({ onContentGenerated }: AIContentGeneratorProps) => {
  const { toast } = useToast();
  const [url, setUrl] = useState("https://www.allwillretire.com/");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = async () => {
    if (!url || !url.trim()) {
      toast({
        title: "Napaka",
        description: "Vnesite veljaven URL",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI content generation (in a real app, this would call an API)
      // For now, we'll just create some content based on the provided URL
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Parse the domain name from the URL
      const domain = new URL(url).hostname.replace('www.', '');
      
      const topics = [
        "finančna neodvisnost",
        "vlaganje",
        "pasivni dohodek",
        "upokojitev",
        "finančno načrtovanje",
        "osebne finance"
      ];
      
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      
      // Generate random content based on the domain and a finance topic
      const generatedContent = `Na spletni strani ${domain} sem ravnokar odkril ${randomNumber} neverjetnih nasvetov o ${randomTopic}u! Preverite sami! #FinančnaNeodvisnost #Vlaganje`;
      
      onContentGenerated(generatedContent);
      
      toast({
        title: "Uspeh",
        description: "Vsebina je bila uspešno ustvarjena!",
      });
    } catch (error) {
      toast({
        title: "Napaka",
        description: "Prišlo je do napake pri generiranju vsebine",
        variant: "destructive",
      });
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-4 mb-4">
      <h3 className="text-lg font-medium mb-2">Ustvari z AI</h3>
      <p className="text-sm text-gray-500 mb-4">
        Vnesite URL spletne strani in AI bo ustvaril objavo za vas
      </p>
      <div className="flex flex-col space-y-4">
        <Input
          type="url"
          placeholder="Vnesite URL spletne strani..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button 
          onClick={generateContent} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Ustvarjanje...
            </>
          ) : (
            "Ustvari besedilo"
          )}
        </Button>
      </div>
    </Card>
  );
};

export default AIContentGenerator;
