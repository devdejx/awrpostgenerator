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
import { Image as ImageIcon, RefreshCw, Wand2, Video } from "lucide-react";
import { usePostStore } from "@/store/postStore";

const CRYPTO_HASHTAGS = [
  "#crypto #cryptocurrency #bitcoin #blockchain",
  "#ethereum #btc #trading #cryptonews",
  "#cryptotrading #nft #forex #money #eth",
  "#investing #investment #cryptocurrencies #bitcoins",
  "#binance #bitcoinnews #invest #bitcoinmining",
  "#business #trader #entrepreneur #forextrader",
  "#nfts #finance #stocks #dogecoin #cryptoworld",
  "#bitcointrading #investor #nftart #xrp",
  "#cryptoinvestor #cryptoart #coinbase #stockmarket",
  "#litecoin #hodl #bitcoincash #altcoin #defi",
  "#art #ripple #nftcommunity #web3 #metaverse",
  "#forextrading #blockchaintechnology #motivation",
  "#nftcollector #digitalart #cryptomarket #mining",
  "#cryptomemes #altcoins #cryptomining #forexsignals",
  "#financialfreedom #100xGem #1000xGem #Gem",
  "#CultureCoin #MovementCoin #HotCrypto #MemeCoin",
  "#CryptoGem #NextBigThing #Moonshot #AltcoinGem",
  "#LowCapGem #DeFiGem #CryptoFinds #HiddenGem",
  "#CryptoMoonshot #Next100x #MicroCap #SmallCapGem",
  "#CryptoTreasure #EmergingCrypto #CryptoLaunch",
  "#NewCrypto #CryptoAlert #CryptoBoom #CryptoTrend",
  "#CryptoBuzz #CryptoPick #NextAltcoin #CryptoPotential",
  "#CryptoInvestment #CryptoDiscovery #CryptoOpportunity",
  "#CryptoProspect #CryptoInsider #CryptoWatch",
  "#CryptoRadar #CryptoSpotlight #CryptoInsights",
  "#CryptoSignals #CryptoPicks #CryptoGems",
  "#CryptoTrends #CryptoNews #CryptoUpdates",
  "#CryptoMarket #CryptoCommunity #CryptoTalk",
  "#CryptoChat #CryptoDiscussion #CryptoFans",
  "#CryptoLovers #CryptoEnthusiast #CryptoInvestor",
  "#CryptoTrader #CryptoTips #CryptoAdvice",
  "#CryptoGuide #CryptoEducation #CryptoLearning",
  "#CryptoStrategy #CryptoPlan #CryptoGoals",
  "#CryptoSuccess #CryptoJourney #CryptoPath",
  "#CryptoRoadmap #CryptoVision #CryptoFuture",
  "#CryptoNow #CryptoToday #CryptoWorld",
  "#CryptoSpace #CryptoSphere #CryptoZone",
  "#CryptoHub #CryptoNetwork #CryptoPlatform",
  "#CryptoEcosystem #CryptoInnovation #CryptoTech",
  "#CryptoSolutions #CryptoServices #CryptoTools",
  "#Murad #Muradism #InMuradWeTrust #MuradCoin",
  "#MuradGems #MuradEffect #Murad100x #MuradAlpha",
  "#MuradPilled #MuradSeason #CZBinance #VitalikButerin",
  "#ElonMusk #APompliano #Saylor #ErikVoorhees",
  "#RogerVer #CryptoCobain #GirlGoneCrypto",
  "#MissTeenCrypto #TheCryptoLark #IvanOnTech",
  "#RaoulGMI #DTAPCAP #WillyWoo #CryptoWendyO",
  "#CryptoJack #Lopp #CryptoVet #JustinSun",
  "#WaqarZaka #PlanB #WillClemente #AriPaul",
  "#JackMallers #Balaji #NayibBukele #JamesonLopp",
  "#LauraShin #MarcAndreessen #PaulGraham #ChrisDixon",
  "#CryptoYoda #CryptoCred #CryptoDonAlt #CryptoMichaël",
  "#TheMoonCarl #CryptoBirb #AltcoinPsycho #CryptoRand",
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
  {
    short: "All Will Retire believes: Pursue passions, find joy in hobbies that bring meaning beyond work activities.",
    long: "All Will Retire believes that pursuing your passions in retirement brings true fulfillment. Whether painting, gardening, or learning an instrument, hobbies create meaning beyond work by allowing you to explore creativity and personal growth without the constraints of a traditional career."
  },
  {
    short: "Memories with friends make retirement truly special, creating lasting stories of connection and friendship.",
    long: "All Will Retire values the importance of making memories with friends. Your retirement journey should include quality time with those who matter most, creating stories that last a lifetime, deepening relationships, and finding joy in shared experiences that transcend the boundaries of work and routine."
  },
  {
    short: "Taking care of loved ones is a meaningful retirement priority that strengthens family connections.",
    long: "All Will Retire understands that taking care of loved ones, especially aging parents, is a meaningful retirement priority. Financial freedom enables you to be there when family needs you most, providing support, care, and quality time that strengthens familial bonds and ensures their well-being."
  },
  {
    short: "Volunteering full-time creates powerful social impact and gives your days purpose and community involvement.",
    long: "All Will Retire supports volunteering full-time during retirement. Dedicating your experience and time to nonprofit work creates powerful social impact while giving your days purpose, allowing you to contribute to causes you care about and make a difference in the lives of others."
  },
  {
    short: "Exploring new countries enriches retirement by broadening perspectives and creating memorable cultural experiences.",
    long: "All Will Retire encourages exploring new countries and cultures without budget constraints. Travel enriches retirement by broadening perspectives and creating unforgettable experiences, exposing you to diverse ways of life, fostering personal growth, and creating lasting memories."
  },
  {
    short: "Changing your environment can bring new life experiences and inspire creativity during retirement years.",
    long: "All Will Retire recognizes the value in changing your environment - whether leaving city life for quiet farming or bringing your expertise from rural areas to urban innovation. A change of scenery can spark creativity, offer new challenges, and provide a fresh perspective on life."
  },
  {
    short: "Rescuing animals heals both animals and their caretakers, providing purpose and emotional fulfillment.",
    long: "All Will Retire celebrates those who use their freedom to rescue animals and operate shelters. These compassionate ventures heal both animals and their caretakers, providing a sense of purpose, companionship, and the satisfaction of making a positive impact on the lives of vulnerable creatures."
  },
  {
    short: "Generous giving creates lasting positive change through strategic philanthropy and community support initiatives.",
    long: "All Will Retire promotes generous giving to causes you care about. Financial independence allows you to create lasting positive change through strategic philanthropy, enabling you to support organizations and initiatives that align with your values and contribute to a better world."
  },
  {
    short: "Learning new skills keeps your mind sharp and opens doors to opportunities throughout retirement.",
    long: "All Will Retire champions learning new skills throughout retirement. Continuous growth keeps your mind sharp and opens doors to exciting opportunities and connections, allowing you to explore new interests, stay mentally engaged, and adapt to the ever-changing world around you."
  },
  {
    short: "Creative expression allows you to share your unique voice with the world through art.",
    long: "All Will Retire inspires creative expression through writing books or creating art. Retirement provides the time and space to share your unique voice with the world, allowing you to explore your artistic talents, express your thoughts and feelings, and leave a lasting legacy."
  },
  {
    short: "Health and exercise are fundamental to a fulfilling retirement with energy and physical independence.",
    long: "All Will Retire prioritizes health and exercise as fundamental to a fulfilling retirement. Investing time in your wellbeing pays dividends through increased energy and longevity, allowing you to enjoy your retirement years to the fullest and maintain an active and independent lifestyle."
  },
  {
    short: "Entrepreneurs can launch passion projects without income pressure while pursuing meaningful business ventures.",
    long: "All Will Retire supports entrepreneurs who launch passion projects. Financial security gives you the freedom to start businesses aligned with your values without income pressure, allowing you to pursue your entrepreneurial dreams, create something meaningful, and contribute to the economy."
  },
  {
    short: "Supporting friends and family helps loved ones achieve their dreams through mentorship and financial assistance.",
    long: "All Will Retire values supporting friends and family financially. True wealth includes helping loved ones achieve their dreams through mentorship and opportunity creation, strengthening relationships, and creating a ripple effect of positive impact within your community."
  },
];

const VIMEO_VIDEOS = [
  "https://vimeo.com/1073620983/639f4602df",
  "https://vimeo.com/1073621013/b2ed1c4f0f",
  "https://vimeo.com/1073621029/b524df5ac8",
  "https://vimeo.com/1073621046/27ca5564b8",
  "https://vimeo.com/1073621073/f2b42f7576",
  "https://vimeo.com/1073621108/1c3560f64e",
  "https://vimeo.com/1076760086",
  "https://vimeo.com/1076760061",
  "https://vimeo.com/1076760047",
  "https://vimeo.com/1076760036",
  "https://vimeo.com/1076760019",
  "https://vimeo.com/1076760164",
  "https://vimeo.com/1076760149",
  "https://vimeo.com/1076760137",
  "https://vimeo.com/1076760112"
];

const TELL_OUR_STORY_CONTENT = [
  {
    short: "AWR Life By Design empowers individuals to achieve financial independence through proven strategies and community support.",
    long: "AWR Life By Design revolutionizes how people approach financial independence. We provide battle-tested strategies, strong community support, and innovative tools that empower individuals to break free from traditional employment constraints and design their ideal lifestyle."
  },
  {
    short: "Our sustainable funding engines combine cutting-edge strategies with ethical practices for long-term wealth creation.",
    long: "Through our sustainable funding engines, we're pioneering a new approach to wealth creation. We leverage cutting-edge market analysis, proprietary trading strategies, and ethical practices to generate consistent returns, all while building a supportive community that shares knowledge and success."
  },
  {
    short: "All Will Retire's mission extends beyond profits to create lasting positive impact in our communities.",
    long: "The heart of All Will Retire's mission is creating lasting positive impact. We're building a movement that combines financial success with social responsibility, ensuring our community members can retire with dignity while contributing to the greater good of society."
  },
  {
    short: "At AWR, we measure success by the number of lives transformed and dreams achieved in our community.",
    long: "Success at AWR isn't just measured in financial terms—it's measured by the transformation we see in people's lives. Every community member who achieves financial freedom, pursues their passions, or helps others on their journey represents a victory for our mission."
  },
  {
    short: "AWR Balkans brings innovative financial strategies and community support to Southeast European markets.",
    long: "All Will Retire Balkans represents our commitment to expanding financial freedom globally. By adapting our successful strategies to Southeast European markets, we're creating new opportunities for wealth creation while respecting local cultural values and economic conditions."
  },
  {
    short: "Our community celebrates diverse paths to financial independence, from entrepreneurship to passive income streams.",
    long: "In the AWR community, we celebrate the many paths to financial independence. Whether through entrepreneurship, trading, passive income streams, or innovative investment strategies, we support our members in finding approaches that align with their values and goals."
  },
  {
    short: "AWR's innovative approach challenges traditional financial systems while creating accessible wealth-building opportunities.",
    long: "Our innovative approach at AWR challenges conventional financial wisdom. We've developed new paradigms for wealth creation that make financial independence accessible to everyone, not just those with privileged backgrounds or traditional credentials."
  },
  {
    short: "Through consistent daily actions, AWR members build sustainable wealth and lasting financial freedom.",
    long: "At AWR, we believe in the power of consistent daily actions. Our community members achieve remarkable results through disciplined implementation of our strategies, proving that small steps, taken consistently, lead to extraordinary financial outcomes."
  },
  {
    short: "AWR's ecosystem provides comprehensive support from education to implementation of wealth-building strategies.",
    long: "The AWR ecosystem offers comprehensive support at every stage of the financial independence journey. From educational resources and mentorship to practical tools and community support, we ensure our members have everything they need to succeed."
  },
  {
    short: "Our community's success stories inspire and guide others on their path to financial independence.",
    long: "The success stories within our community serve as both inspiration and practical guides. Each achievement, whether big or small, demonstrates the effectiveness of our approach and lights the way for others on their journey to financial freedom."
  },
  {
    short: "AWR embraces constructive criticism to strengthen our community and improve our strategies continuously.",
    long: "All Will Retire values constructive criticism as a catalyst for growth. We actively seek feedback from our community to refine our strategies, strengthen our processes, and build a more resilient ecosystem that serves everyone's financial independence goals."
  },
  {
    short: "Small, consistent progress builds the foundation for lasting financial independence in the AWR journey.",
    long: "At All Will Retire, we champion the power of small, incremental progress. Each step forward, no matter how modest, contributes to building sustainable wealth and financial independence. Our community celebrates these daily victories as they compound into significant achievements."
  },
  {
    short: "AWR's stress-scaling communities provide support and guidance through market volatility.",
    long: "All Will Retire's stress-scaling communities are designed to support members through market challenges. We understand that financial markets can be stressful, which is why our community focuses on process-oriented strategies and mutual support to navigate volatility successfully."
  },
  {
    short: "Real people with real aspirations drive the AWR community's mission for authentic retirement solutions.",
    long: "All Will Retire is built on the foundation of real people pursuing real retirement aspirations. Our community represents diverse backgrounds and goals, united by the common desire for financial independence and meaningful post-retirement lives."
  },
  {
    short: "Safety and security are paramount in AWR's approach to building sustainable wealth.",
    long: "All Will Retire prioritizes the safety and security of our community members. Our comprehensive approach includes educational resources, risk management strategies, and transparent communication to ensure members can build wealth confidently and securely."
  },
  {
    short: "Process-oriented mindset helps AWR members stay focused on long-term financial independence goals.",
    long: "All Will Retire emphasizes a process-oriented mindset that keeps members focused on their long-term objectives. By following proven systems and maintaining consistency, our community members build resilient wealth-generation strategies that withstand market fluctuations."
  }
];

const getRandomCryptoHashtags = () => {
  const selectedHashtags = CRYPTO_HASHTAGS[Math.floor(Math.random() * CRYPTO_HASHTAGS.length)];
  return selectedHashtags;
};

const getRandomCryptoProfiles = () => {
  return CRYPTO_PROFILES[Math.floor(Math.random() * CRYPTO_PROFILES.length)];
};

const POST_TYPES = [
  {
    value: "retirement-believe",
    label: "Retirement Believe",
    templates: [
      "{message} {hashtags} cc: {profiles}",
      "{message} 💡 {hashtags} cc: {profiles}",
      "{message} 🌟 {hashtags} cc: {profiles}",
    ],
  },
  {
    value: "tell-our-story",
    label: "Tell Our Story",
    templates: [
      "{message} {hashtags} cc: {profiles}",
      "{message} 📖 {hashtags} cc: {profiles}",
      "{message} 💬 {hashtags} cc: {profiles}",
    ],
  },
  {
    value: "crypto",
    label: "Crypto",
    templates: [
      "{message} {hashtags} cc: {profiles}",
    ],
  },
];

const generateContentFromWebsite = async (source = "random", postType = "") => {
  if (postType === "retirement-believe") {
    return RETIREMENT_BELIEVE_CONTENT[Math.floor(Math.random() * RETIREMENT_BELIEVE_CONTENT.length)];
  }
  
  if (postType === "tell-our-story") {
    return TELL_OUR_STORY_CONTENT[Math.floor(Math.random() * TELL_OUR_STORY_CONTENT.length)];
  }

  const websiteContents = [
    "All Will Retire explains: Planning for retirement is crucial. Start early and be consistent with your savings.",
    "All Will Retire advises: Retirement isn't just about finances, it's also about having a purpose and staying active.",
    "All Will Retire recommends: Diversify your retirement portfolio can help protect against market volatility.",
    "All Will Retire insight: Consider healthcare needs when planning for retirement. Medical costs can be significant.",
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

interface PostGeneratorProps {
  onPostCreated: () => void;
}

const PostGenerator = ({ onPostCreated }: PostGeneratorProps) => {
  const { post, setPost } = usePostStore();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [postType, setPostType] = useState("retirement-believe");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
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
          setVideoPreview(null);
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
      video: videoPreview,
      type: postType,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Success!",
      description: "Post successfully created!",
    });

    onPostCreated();
  };

  const resetForm = () => {
    setMessage("");
    setPostType("retirement-believe");
    setImageFile(null);
    setImagePreview(null);
    setVideoPreview(null);
  };

  const handleAutoGenerate = async () => {
    if (postType === "crypto") {
      toast({
        title: "Info",
        description: "Content generation not available for Crypto posts",
      });
      return;
    }
    
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

  const handleGenerateVideo = async () => {
    setIsGeneratingVideo(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const randomVideo = VIMEO_VIDEOS[Math.floor(Math.random() * VIMEO_VIDEOS.length)];
      setVideoPreview(randomVideo);
      
      setImagePreview(null);
      setImageFile(null);
      
      toast({
        title: "Success!",
        description: "Vimeo video selected",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate video",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingVideo(false);
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
              <div>
                <label className="block text-xs text-gray-600 mb-1">Text Length</label>
                <Select value={textLength} onValueChange={setTextLength}>
                  <SelectTrigger className="h-8 w-32 bg-white text-black">
                    <SelectValue placeholder="Text Length" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black">
                    <SelectItem value="short" className="text-black">Short</SelectItem>
                    <SelectItem value="long" className="text-black">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            Media
          </label>
          <div className="flex items-center space-x-3">
            <div>
              <label className="cursor-pointer block">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-dashed border-gray-300 hover:border-primary">
                  <ImageIcon className="h-5 w-5 text-gray-400" />
                </div>
                <span className="text-xs text-gray-500 mt-1 block text-center">Add image</span>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateVideo}
                disabled={isGeneratingVideo}
                className="h-10 w-10 p-0 flex items-center justify-center"
                title="Get random Vimeo video"
              >
                {isGeneratingVideo ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <Video className="h-5 w-5 text-gray-400" />
                )}
              </Button>
              <span className="text-xs text-gray-500 mt-1 block text-center">Random video</span>
            </div>
            
            <span className="text-sm text-gray-500 ml-2">
              {imageFile ? imageFile.name : videoPreview ? "Vimeo video selected" : "No media selected"}
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
          
          {videoPreview && !imagePreview && (
            <div className="mt-4 flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Video className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600 truncate">
                <a href={videoPreview} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {videoPreview}
                </a>
              </span>
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
