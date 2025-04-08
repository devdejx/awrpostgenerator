
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePostStore } from "@/store/postStore";
import { Loader2, Upload, Video } from "lucide-react";

// Define crypto hashtags
const CRYPTO_HASHTAGS = [
  "#crypto", "#cryptocurrency", "#bitcoin", "#blockchain", "#ethereum", "#btc", "#trading", 
  "#cryptonews", "#cryptotrading", "#nft", "#forex", "#money", "#eth", "#investing", "#investment", 
  "#cryptocurrencies", "#bitcoins", "#binance", "#bitcoinnews", "#invest", "#bitcoinmining", "#business", 
  "#trader", "#entrepreneur", "#forextrader", "#nfts", "#finance", "#stocks", "#dogecoin", "#cryptoworld", 
  "#bitcointrading", "#investor", "#nftart", "#xrp", "#cryptoinvestor", "#cryptoart", "#coinbase", 
  "#stockmarket", "#litecoin", "#hodl", "#bitcoincash", "#altcoin", "#defi", "#art", "#ripple", 
  "#nftcommunity", "#web3", "#metaverse", "#forextrading", "#blockchaintechnology", "#motivation", 
  "#nftcollector", "#digitalart", "#cryptomarket", "#mining", "#cryptomemes", "#altcoins", "#cryptomining", 
  "#forexsignals", "#financialfreedom", "#100xGem", "#1000xGem", "#Gem", "#CultureCoin", "#MovementCoin", 
  "#HotCrypto", "#MemeCoin", "#CryptoGem", "#NextBigThing", "#Moonshot", "#AltcoinGem", "#LowCapGem", 
  "#DeFiGem", "#CryptoFinds", "#HiddenGem", "#CryptoMoonshot", "#Next100x", "#MicroCap", "#SmallCapGem", 
  "#CryptoTreasure", "#EmergingCrypto", "#CryptoLaunch", "#NewCrypto", "#CryptoAlert", "#CryptoBoom", 
  "#CryptoTrend", "#CryptoBuzz", "#CryptoPick", "#NextAltcoin", "#CryptoPotential", "#CryptoInvestment", 
  "#CryptoDiscovery", "#CryptoOpportunity", "#CryptoProspect", "#CryptoInsider", "#CryptoWatch", 
  "#CryptoRadar", "#CryptoSpotlight", "#CryptoInsights", "#CryptoSignals", "#CryptoPicks", "#CryptoGems", 
  "#CryptoTrends", "#CryptoNews", "#CryptoUpdates", "#CryptoMarket", "#CryptoCommunity", "#CryptoTalk", 
  "#CryptoChat", "#CryptoDiscussion", "#CryptoFans", "#CryptoLovers", "#CryptoEnthusiast", "#CryptoInvestor", 
  "#CryptoTrader", "#CryptoTips", "#CryptoAdvice", "#CryptoGuide", "#CryptoEducation", "#CryptoLearning", 
  "#CryptoStrategy", "#CryptoPlan", "#CryptoGoals", "#CryptoSuccess", "#CryptoJourney", "#CryptoPath", 
  "#CryptoRoadmap", "#CryptoVision", "#CryptoFuture", "#CryptoNow", "#CryptoToday", "#CryptoWorld", 
  "#CryptoSpace", "#CryptoSphere", "#CryptoZone", "#CryptoHub", "#CryptoNetwork", "#CryptoPlatform", 
  "#CryptoEcosystem", "#CryptoInnovation", "#CryptoTech", "#CryptoSolutions", "#CryptoServices", 
  "#CryptoTools", "#Murad", "#Muradism", "#InMuradWeTrust", "#MuradCoin", "#MuradGems", "#MuradEffect", 
  "#Murad100x", "#MuradAlpha", "#MuradPilled", "#MuradSeason", "#CZBinance", "#VitalikButerin", "#ElonMusk", 
  "#APompliano", "#Saylor", "#ErikVoorhees", "#RogerVer", "#CryptoCobain", "#GirlGoneCrypto", "#MissTeenCrypto", 
  "#TheCryptoLark", "#IvanOnTech", "#RaoulGMI", "#DTAPCAP", "#WillyWoo", "#CryptoWendyO", "#CryptoJack", 
  "#Lopp", "#CryptoVet", "#JustinSun", "#WaqarZaka", "#PlanB", "#WillClemente", "#AriPaul", "#JackMallers", 
  "#Balaji", "#NayibBukele", "#JamesonLopp", "#LauraShin", "#MarcAndreessen", "#PaulGraham", "#ChrisDixon", 
  "#CryptoYoda", "#CryptoCred", "#CryptoDonAlt", "#CryptoMichaël", "#TheMoonCarl", "#CryptoBirb", 
  "#AltcoinPsycho", "#CryptoRand", "#CryptoHustle", "#CryptoBobby", "#CryptoDaily", "#CryptoZombie", 
  "#DataDash", "#Boxmining", "#Suppoman", "#ChrisBurniske", "#AdamBack", "#NickSzabo"
];

// Define crypto profiles
const CRYPTO_PROFILES = [
  "@bitcoinmagazine", "@CoinDesk", "@cz_binance", "@saylor", "@VitalikButerin", 
  "@elonmusk", "@aantonop", "@APompliano", "@PeterSchiff", "@tyler", "@MuradMerali"
];

// Define post types with templates
const POST_TYPES = [
  {
    label: "Motivational",
    value: "motivational",
    templates: [
      "All Will Retire believes {message}. {hashtags} {profiles}",
      "All Will Retire stands for financial freedom. {message} {hashtags} {profiles}",
      "{message} This is the All Will Retire mindset. {hashtags} {profiles}",
      "The All Will Retire philosophy: {message} {hashtags} {profiles}",
      "Financial freedom is within reach. {message} - All Will Retire {hashtags} {profiles}"
    ]
  },
  {
    label: "Educational",
    value: "educational",
    templates: [
      "Today's crypto lesson: {message} {hashtags} {profiles}",
      "Did you know? {message} #AllWillRetire {hashtags} {profiles}",
      "All Will Retire explains: {message} {hashtags} {profiles}",
      "Crypto knowledge is power. {message} {hashtags} {profiles}",
      "Let's learn together: {message} #AWR {hashtags} {profiles}"
    ]
  },
  {
    label: "News",
    value: "news",
    templates: [
      "Breaking: {message} #AllWillRetire {hashtags} {profiles}",
      "All Will Retire News Alert: {message} {hashtags} {profiles}",
      "Just in: {message} #AWR {hashtags} {profiles}",
      "Market update: {message} {hashtags} {profiles}",
      "Trending now: {message} #AllWillRetire {hashtags} {profiles}"
    ]
  }
];

const PostGenerator = () => {
  const { toast } = useToast();
  const { setPost } = usePostStore();
  const [userMessage, setUserMessage] = useState("");
  const [postType, setPostType] = useState("motivational");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  // Function to get random items from an array
  const getRandomItems = (array: string[], count: number): string => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).join(" ");
  };

  // Generate random crypto hashtags
  const getRandomCryptoHashtags = () => {
    return getRandomItems(CRYPTO_HASHTAGS, 5);
  };

  // Generate random crypto profiles to mention
  const getRandomCryptoProfiles = () => {
    return getRandomItems(CRYPTO_PROFILES, 2);
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset video when image is selected
      setVideoPreview(null);
    }
  };
  
  // Handle auto-generating video
  const handleAutoGenerateVideo = () => {
    // Reset image when video is selected
    setImageFile(null);
    setImagePreview(null);
    
    setIsGeneratingVideo(true);
    
    // Simulate video generation - in a real app, this would call an API
    setTimeout(() => {
      setVideoPreview("/lovable-uploads/3f38e58d-70db-4dce-89fa-f41ee30228c0.png"); // Using logo as placeholder
      setIsGeneratingVideo(false);
      toast({
        title: "Video Generated",
        description: "Video has been successfully created",
      });
    }, 2000);
  };

  // Generate post function
  const generatePost = () => {
    if (!userMessage.trim()) {
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
      .replace("{message}", userMessage)
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
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="post-type">Post Type</Label>
        <Select value={postType} onValueChange={setPostType}>
          <SelectTrigger className="mt-1.5 w-full">
            <SelectValue placeholder="Select a post type" />
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
        <Label htmlFor="message">Your message</Label>
        <Textarea
          id="message"
          placeholder="Enter your crypto insights here..."
          className="mt-1.5 resize-none h-24"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Add Image</Label>
          <div className="mt-1.5">
            <Label 
              htmlFor="image-upload" 
              className="flex items-center justify-center gap-2 h-10 px-4 w-full border rounded-md bg-background hover:bg-accent transition-colors cursor-pointer"
            >
              <Upload size={16} />
              <span>Upload Image</span>
            </Label>
            <Input 
              id="image-upload"
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          {imagePreview && (
            <div className="mt-2">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-20 w-full object-cover rounded-md"
              />
            </div>
          )}
        </div>
        
        <div>
          <Label>Auto-Generate Video</Label>
          <div className="mt-1.5">
            <Button
              type="button"
              onClick={handleAutoGenerateVideo}
              variant="outline"
              className="w-full"
              disabled={isGeneratingVideo}
            >
              {isGeneratingVideo ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Video className="mr-2 h-4 w-4" />
                  Generate Video
                </>
              )}
            </Button>
          </div>
          {videoPreview && !isGeneratingVideo && (
            <div className="mt-2">
              <div className="h-20 w-full rounded-md bg-muted flex items-center justify-center">
                <Video className="h-6 w-6 text-primary/70" />
                <span className="ml-2 text-sm text-muted-foreground">Video ready</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Button onClick={generatePost} className="w-full mt-4" size="lg">
        Generate Post
      </Button>
    </div>
  );
};

export default PostGenerator;
