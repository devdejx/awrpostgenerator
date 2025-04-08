
import React, { useState } from "react";
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

const RETIREMENT_BELIEVE_CONTENT = [
  // Short texts
  {
    short: "All Will Retire believes: Pursue passions, find joy in hobbies that bring meaning beyond work.",
    long: "All Will Retire believes that pursuing your passions in retirement brings true fulfillment. Whether painting, gardening, or learning an instrument, hobbies create meaning beyond work by allowing you to explore creativity and personal growth without the constraints of a traditional career."
  },
  {
    short: "Memories with friends make retirement truly special, creating lasting stories of connection.",
    long: "All Will Retire values the importance of making memories with friends. Your retirement journey should include quality time with those who matter most, creating stories that last a lifetime, deepening relationships, and finding joy in shared experiences that transcend the boundaries of work and routine."
  },
  {
    short: "Taking care of loved ones is a meaningful retirement priority.",
    long: "All Will Retire understands that taking care of loved ones, especially aging parents, is a meaningful retirement priority. Financial freedom enables you to be there when family needs you most, providing support, care, and quality time that strengthens familial bonds and ensures their well-being."
  },
  {
    short: "Volunteering full-time creates powerful social impact and gives your days purpose.",
    long: "All Will Retire supports volunteering full-time during retirement. Dedicating your experience and time to nonprofit work creates powerful social impact while giving your days purpose, allowing you to contribute to causes you care about and make a difference in the lives of others."
  },
  {
    short: "Exploring new countries enriches retirement by broadening perspectives.",
    long: "All Will Retire encourages exploring new countries and cultures without budget constraints. Travel enriches retirement by broadening perspectives and creating unforgettable experiences, exposing you to diverse ways of life, fostering personal growth, and creating lasting memories."
  },
  {
    short: "Changing your environment can bring new life experiences.",
    long: "All Will Retire recognizes the value in changing your environment - whether leaving city life for quiet farming or bringing your expertise from rural areas to urban innovation. A change of scenery can spark creativity, offer new challenges, and provide a fresh perspective on life."
  },
  {
    short: "Rescuing animals heals both animals and their caretakers.",
    long: "All Will Retire celebrates those who use their freedom to rescue animals and operate shelters. These compassionate ventures heal both animals and their caretakers, providing a sense of purpose, companionship, and the satisfaction of making a positive impact on the lives of vulnerable creatures."
  },
  {
    short: "Generous giving creates lasting positive change through strategic philanthropy.",
    long: "All Will Retire promotes generous giving to causes you care about. Financial independence allows you to create lasting positive change through strategic philanthropy, enabling you to support organizations and initiatives that align with your values and contribute to a better world."
  },
  {
    short: "Learning new skills keeps your mind sharp and opens doors to opportunities.",
    long: "All Will Retire champions learning new skills throughout retirement. Continuous growth keeps your mind sharp and opens doors to exciting opportunities and connections, allowing you to explore new interests, stay mentally engaged, and adapt to the ever-changing world around you."
  },
  {
    short: "Creative expression allows you to share your unique voice with the world.",
    long: "All Will Retire inspires creative expression through writing books or creating art. Retirement provides the time and space to share your unique voice with the world, allowing you to explore your artistic talents, express your thoughts and feelings, and leave a lasting legacy."
  },
  {
    short: "Health and exercise are fundamental to a fulfilling retirement.",
    long: "All Will Retire prioritizes health and exercise as fundamental to a fulfilling retirement. Investing time in your wellbeing pays dividends through increased energy and longevity, allowing you to enjoy your retirement years to the fullest and maintain an active and independent lifestyle."
  },
  {
    short: "Entrepreneurs can launch passion projects without income pressure.",
    long: "All Will Retire supports entrepreneurs who launch passion projects. Financial security gives you the freedom to start businesses aligned with your values without income pressure, allowing you to pursue your entrepreneurial dreams, create something meaningful, and contribute to the economy."
  },
  {
    short: "Supporting friends and family helps loved ones achieve their dreams.",
    long: "All Will Retire values supporting friends and family financially. True wealth includes helping loved ones achieve their dreams through mentorship and opportunity creation, strengthening relationships, and creating a ripple effect of positive impact within your community."
  },
];

const getRandomCryptoHashtags = () => {
  return CRYPTO_HASHTAGS[Math.floor(Math.random() * CRYPTO_HASHTAGS.length)];
};

const getRandomCryptoProfiles = () => {
  return CRYPTO_PROFILES[Math.floor(Math.random() * CRYPTO_PROFILES.length)];
};

const POST_TYPES = [
  {
    value: "retirement-believe",
    label: "Retirement Believe",
    templates: [
      "All Will Retire believes: {message} #RetirementWisdom {hashtags} cc: {profiles}",
      "Our retirement philosophy: {message} 💡 {hashtags} cc: {profiles}",
      "A core belief from All Will Retire: {message} 🌟 {hashtags} cc: {profiles}",
    ],
  },
  {
    value: "tell-our-story",
    label: "Tell Our Story",
    templates: [
      "Our journey at All Will Retire: {message} #OurStory {hashtags} cc: {profiles}",
      "A chapter from All Will Retire: {message} 📖 {hashtags} cc: {profiles}",
      "Sharing our narrative: {message} 💬 {hashtags} cc: {profiles}",
    ],
  },
  {
    value: "what-a-gem",
    label: "What a GEM",
    templates: [
      "Discover a gem from All Will Retire: {message} #GemOfWisdom {hashtags} cc: {profiles}",
      "A sparkling insight: {message} ✨ {hashtags} cc: {profiles}",
      "GEM alert from All Will Retire: {message} 💎 {hashtags} cc: {profiles}",
    ],
  },
];

const generateContentFromWebsiteOriginal = async (source = "random", postType = "") => {
  // For retirement-believe type, use our special content
  if (postType === "retirement-believe") {
    return RETIREMENT_BELIEVE_CONTENT[Math.floor(Math.random() * RETIREMENT_BELIEVE_CONTENT.length)];
  }

  // Original content for other post types
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
  const [postType, setPostType] = useState("retirement-believe");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentSource, setContentSource] = useState("random");
  const [textLength, setTextLength] = useState("short");

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
    setPostType("retirement-believe");
    setImageFile(null);
    setImagePreview(null);
  };

  const generateContentFromWebsite = async (postType = "") => {
    if (postType === "retirement-believe") {
      const content = RETIREMENT_BELIEVE_CONTENT[Math.floor(Math.random() * RETIREMENT_BELIEVE_CONTENT.length)];
      return textLength === "short" ? content.short : content.long;
    }
    
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
    
    let allContents = [];
    if (contentSource === "medium") {
      allContents = mediumContents;
    } else if (contentSource === "website") {
      allContents = websiteContents;
    } else {
      allContents = [...websiteContents, ...mediumContents];
    }

    const content = allContents[Math.floor(Math.random() * allContents.length)];
    return content;
  };

  const handleAutoGenerate = async () => {
    setIsGenerating(true);
    try {
      const content = await generateContentFromWebsite(postType);
      setMessage(content);
      
      let sourceLabel = textLength === "short" ? "Short Text" : "Long Text";
          
      toast({
        title: "Success!",
        description: `Content generated (${sourceLabel})`,
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
          <label className="block text-sm font-medium text-black mb-1">
            Post Type
          </label>
          <Select value={postType} onValueChange={setPostType}>
            <SelectTrigger className="w-full bg-white text-black">
              <SelectValue placeholder="Select post type" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              {POST_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value} className="text-black">
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-black">
              Message
            </label>
            <div className="flex items-center gap-2">
              <Select 
                value={textLength} 
                onValueChange={setTextLength}
              >
                <SelectTrigger className="h-8 w-32 bg-white text-black">
                  <SelectValue placeholder="Text Length" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="short" className="text-black">Short</SelectItem>
                  <SelectItem value="long" className="text-black">Long</SelectItem>
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
            className="min-h-[100px] bg-white"
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
          <Button 
            onClick={generatePost} 
            className="w-full border-2 border-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
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
