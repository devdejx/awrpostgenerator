import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Image as ImageIcon, RefreshCw, Wand2 } from "lucide-react";
import { usePostStore } from "@/store/postStore";

const CRYPTO_HASHTAGS = [
  "#Bitcoin #Crypto #BTC",
  "#Ethereum #ETH #Crypto",
  "#Blockchain #Crypto #Web3",
  "#DeFi #Crypto #Finance",
  "#NFT #Crypto #DigitalAssets",
  "#CryptoTrading #Bitcoin",
  "#Altcoins #Crypto #InvestmentStrategy",
];

const CRYPTO_PROFILES = [
  "@bitcoin @ethereum",
  "@CoinDesk @cz_binance",
  "@VitalikButerin @SatoshiLite",
  "@MicroStrategy @APompliano",
  "@CoinMarketCap @BitcoinMagazine",
  "@cryptorecruiter @cz_binance",
  "@PlanB @DocumentingBTC",
];

const getRandomCryptoHashtags = () => {
  return CRYPTO_HASHTAGS[Math.floor(Math.random() * CRYPTO_HASHTAGS.length)];
};

const getRandomCryptoProfiles = () => {
  return CRYPTO_PROFILES[Math.floor(Math.random() * CRYPTO_PROFILES.length)];
};

const POST_TYPES = [
  {
    value: "announcement",
    label: "Announcement",
    templates: [
      "Important new event from All Will Retire! 📢 {message} {hashtags} cc: {profiles}",
      "News from All Will Retire: {message} #news {hashtags} cc: {profiles}",
      "Attention! 🚨 All Will Retire announces: {message} {hashtags} cc: {profiles}",
    ],
  },
  {
    value: "question",
    label: "Question",
    templates: [
      "All Will Retire asks: What do you think about this? 🤔 {message} {hashtags} cc: {profiles}",
      "{message} What's your opinion? - All Will Retire {hashtags} cc: {profiles}",
      "All Will Retire is thinking about... {message} You? {hashtags} cc: {profiles}",
    ],
  },
  {
    value: "quote",
    label: "Quote",
    templates: [
      "All Will Retire shares: \"{message}\" #wisdom #quote {hashtags} cc: {profiles}",
      "Thought of the day from All Will Retire: \"{message}\" ✨ {hashtags} cc: {profiles}",
      "Inspiration by All Will Retire: \"{message}\" 💭 {hashtags} cc: {profiles}",
    ],
  },
  {
    value: "tip",
    label: "Tip",
    templates: [
      "Pro tip from All Will Retire: {message} #advice {hashtags} cc: {profiles}",
      "All Will Retire tip: Did you know? {message} 💡 {hashtags} cc: {profiles}",
      "Useful tip from All Will Retire: {message} ✅ {hashtags} cc: {profiles}",
    ],
  },
];

const generateContentFromWebsite = async (source = "random") => {
  const websiteContents = [
    "All Will Retire explains: Planning for retirement is crucial. Start early and be consistent with your savings.",
    "All Will Retire advises: Retirement isn't just about finances, it's also about having a purpose and staying active.",
    "All Will Retire recommends: Diversifying your retirement portfolio can help protect against market volatility.",
    "All Will Retire insight: Consider your healthcare needs when planning for retirement. Medical costs can be significant.",
    "All Will Retire reminder: Social security benefits alone may not be enough for a comfortable retirement.",
  ];
  
  const mediumContents = [
    "All Will Retire philosophy: Retirement planning requires a holistic approach to personal finance.",
    "All Will Retire wisdom: Understanding your long-term financial goals is key to successful retirement.",
    "All Will Retire perspective: Wealth is more than just money - it's about creating a fulfilling lifestyle.",
    "All Will Retire approach: Preparing for retirement involves financial, health, and personal growth strategies.",
    "All Will Retire belief: Your retirement journey is unique and deserves careful, personalized planning.",
    "All Will Retire principle: Strategic financial planning can help you achieve greater personal freedom.",
    "All Will Retire concept: Modern retirement approaches focus on flexibility and continuous personal development.",
  ];
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (source === "medium") {
    return mediumContents[Math.floor(Math.random() * mediumContents.length)];
  } else if (source === "website") {
    return websiteContents[Math.floor(Math.random() * websiteContents.length)];
  } else {
    const allContents = [...websiteContents, ...mediumContents];
    return allContents[Math.floor(Math.random() * allContents.length)];
  }
};

const PostGenerator = () => {
  const { post, setPost } = usePostStore();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [postType, setPostType] = useState("announcement");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentSource, setContentSource] = useState("random");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePost = () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    const selectedType = POST_TYPES.find((type) => type.value === postType);
    if (!selectedType) return;

    const randomTemplate =
      selectedType.templates[
        Math.floor(Math.random() * selectedType.templates.length)
      ];
      
    const hashtags = getRandomCryptoHashtags();
    const profiles = getRandomCryptoProfiles();
    
    const generatedMessage = randomTemplate
      .replace("{message}", message)
      .replace("{hashtags}", hashtags)
      .replace("{profiles}", profiles);

    setPost({
      content: generatedMessage,
      image: imagePreview,
      type: postType,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Success!",
      description: "Post successfully created!",
    });
  };

  const resetForm = () => {
    setMessage("");
    setPostType("announcement");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleAutoGenerate = async () => {
    setIsGenerating(true);
    try {
      const content = await generateContentFromWebsite(contentSource);
      setMessage(content);
      
      const sourceLabel = contentSource === "medium" 
        ? "Medium Article" 
        : contentSource === "website" 
          ? "AllWillRetire.com" 
          : "AllWillRetire sources";
          
      toast({
        title: "Success!",
        description: `Content generated from ${sourceLabel}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate content",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-4 bg-white">
      <div className="space-y-4 text-black">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Type
          </label>
          <Select value={postType} onValueChange={setPostType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select post type" />
            </SelectTrigger>
            <SelectContent>
              {POST_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <div className="flex items-center gap-2">
              <Select value={contentSource} onValueChange={setContentSource}>
                <SelectTrigger className="h-8 w-32">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Both Sources</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAutoGenerate}
                disabled={isGenerating}
                className="flex items-center gap-1"
              >
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                Auto Generate
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add image (optional)
          </label>
          <div className="flex items-center space-x-2">
            <label className="cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-dashed border-gray-300 hover:border-primary">
                <ImageIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <span className="text-sm text-gray-500">
              {imageFile ? imageFile.name : "No image selected"}
            </span>
          </div>

          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-40 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Button onClick={generatePost} className="w-full">
            Create Post
          </Button>
          <Button
            variant="outline"
            onClick={resetForm}
            className="w-auto p-2"
            title="Reset form"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostGenerator;
