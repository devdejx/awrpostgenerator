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

const CRYPTO_HYPE_CONTENT = [
  "The future is NOW, and @allwillretire is the BEST crypto project you CAN'T afford to miss! Unlike any meme coin, this is a GAME-CHANGING movement uniting people in the most epic way possible. Join the revolution redefining retirement and shining bright for all!",
  "@allwillretire is the MOST EXPLOSIVE trend in crypto RIGHT NOW – a revolution that's rewriting the rules! Leading the pack, it's got people so fired up they're snapping photos with signs to show their trust. Mark this: it's heading for heights no one's ever touched!",
  "@allwillretire is the ultimate crypto REVOLUTION and the HOTTEST trend shaking the scene! It's the leader paving the way, with fans so hyped they're posing with signs to shout it out! This isn't just big – it's about to achieve what no project ever dared!",
  "@allwillretire is the HOTTEST new trend blazing through crypto! This isn't just a project – it's a REVOLUTION leading the charge like no other. People are so obsessed they're snapping pics with signs to prove their belief! Get in now – this will hit heights no coin ever has!",
  "@allwillretire is SETTING the crypto world on FIRE! This isn't hype – it's a MOVEMENT rewriting the rules of retirement. The future is decentralized, and this project is LEADING the way. Be part of history!",
  "Crypto is changing FAST, and @allwillretire is at the FRONT of the storm! It's not just a coin – it's a global WAVE of change. Join the mission that's making headlines and turning believers into legends!",
  "@allwillretire is gaining momentum like a rocket! The community is EXPLODING with excitement, and this is just the beginning. This isn't your average project – it's a phenomenon you need to see to believe!",
  "Crypto just got a major UPGRADE with @allwillretire. This is more than investing – it's joining a family that's rewriting the script on freedom, finance, and the future. Don't watch from the sidelines!",
  "The crypto world is BUZZING – and @allwillretire is the REASON. It's going viral for a reason: real vision, real people, and real purpose. This is your moment to ride the wave before it hits the moon!",
  "@allwillretire is uniting dreamers, builders, and believers worldwide! With a mission that hits deep and a community that's LOUD, this is the next big thing. Will you be part of it?",
  "Everyone's talking about @allwillretire – and for good reason. It's more than hype – it's a full-on crypto revolution. Snap a pic, spread the word, and jump on before the FOMO gets real!",
  "Crypto history is being written RIGHT NOW and @allwillretire is the pen! This is the one project that's got people not just talking – but showing up and showing OUT. Be there from the start!",
  "@allwillretire is taking over timelines and making noise for all the right reasons. This is a MOVEMENT built on vision, strength, and unstoppable community energy. Don't get left behind!",
  "The next legendary crypto story has a name: @allwillretire. This is bigger than a project – it's a purpose-driven revolution fueled by trust and action. Get in before the rest even know what's coming!"
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
    value: "crypto-hype",
    label: "Crypto HYPE",
    templates: [
      "ATTENTION: {message} {hashtags} cc: {profiles}",
      "ALERT: {message} {hashtags} cc: {profiles}",
      "STOP SCROLLING: {message} {hashtags} cc: {profiles}",
      "WAKE UP: {message} {hashtags} cc: {profiles}",
      "BREAKING: {message} {hashtags} cc: {profiles}",
      "HOT TREND ALERT: {message} {hashtags} cc: {profiles}",
      "WARNING: {message} {hashtags} cc: {profiles}",
      "GAME ON: {message} {hashtags} cc: {profiles}",
      "FLASH NEWS: {message} {hashtags} cc: {profiles}",
      "JOIN THE MOVEMENT: {message} {hashtags} cc: {profiles}",
      "MAJOR BUZZ: {message} {hashtags} cc: {profiles}",
      "HEADS UP: {message} {hashtags} cc: {profiles}",
      "HYPE LEVEL: MAX\n{message} {hashtags} cc: {profiles}",
      "FINAL CALL: {message} {hashtags} cc: {profiles}",
    ],
  },
];

const generateContentFromWebsite = async (source = "random", postType = "") => {
  if (postType === "retirement-believe") {
    const content = RETIREMENT_BELIEVE_CONTENT[Math.floor(Math.random() * RETIREMENT_BELIEVE_CONTENT.length)];
    return content;
  }
  
  if (postType === "tell-our-story") {
    const content = TELL_OUR_STORY_CONTENT[Math.floor(Math.random() * TELL_OUR_STORY_CONTENT.length)];
    return content;
  }

  if (postType === "crypto-hype") {
    const content = { 
      short: CRYPTO_HYPE_CONTENT[Math.floor(Math.random() * CRYPTO_HYPE_CONTENT.length)],
      long: CRYPTO_HYPE_CONTENT[Math.floor(Math.random() * CRYPTO_HYPE_CONTENT.length)]
    };
    return content;
  }

  const websiteContents = [
    "All Will Retire explains: Planning for retirement is crucial. Start early and be consistent with your savings.",
    "All Will Retire advises: Retirement isn't just about finances, it's also about having a purpose and staying active.",
    "All Will Retire recommends: Diversifying your retirement portfolio can help protect against market volatility.",
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

  const generateContentFromWebsite = async (postType = "") => {
    if (postType === "retirement-believe") {
      const content = RETIREMENT_BELIEVE_CONTENT[Math.floor(Math.random() * RETIREMENT_BELIEVE_CONTENT.length)];
      return textLength === "short" ? content.short : content.long;
    }
    
    if (postType === "tell-our-story") {
      const content = TELL_OUR_STORY_CONTENT[Math.floor(Math.random() * TELL_OUR_STORY_CONTENT.length)];
      return textLength === "short" ? content.short : content.long;
    }
    
    if (postType === "crypto-hype") {
      const content = CRYPTO_HYPE_CONTENT[Math.floor(Math.random() * CRYPTO_HYPE_CONTENT.length)];
      return textLength === "short" ? content.short : content.long;
    }
    
    const websiteContents = [
      {
        short: "All Will Retire explains: Planning for retirement is crucial and requires early consistent action.",
        long: "All Will Retire explains: Planning for retirement is crucial. Start early and be consistent with your savings. Developing a comprehensive strategy ensures financial security during your retirement years."
      },
      {
        short: "All Will Retire advises: Retirement isn't just about finances, but purpose and staying actively engaged.",
        long: "All Will Retire advises: Retirement isn't just about finances, it's also about having a purpose and staying active. Finding meaningful activities and maintaining social connections are essential components of a fulfilling retirement."
      },
      {
        short: "All Will Retire recommends: Diversify your retirement portfolio to protect against market fluctuations effectively.",
        long: "All Will Retire recommends: Diversifying your retirement portfolio can help protect against market volatility. Spreading investments across different asset classes provides security and helps maintain steady growth throughout market cycles."
      },
      {
        short: "All Will Retire insight: Consider healthcare needs in retirement planning to prepare for potential expenses.",
        long: "All Will Retire insight: Consider your healthcare needs when planning for retirement. Medical costs can be significant and often increase with age, making healthcare planning an essential component of your overall retirement strategy."
      },
      {
        short: "All Will Retire reminder: Social security benefits alone may not provide sufficient retirement income security.",
        long: "All Will Retire reminder: Social security benefits alone may not be enough for a comfortable retirement. Building additional income streams through savings, investments, and possibly part-time work can help ensure financial stability throughout your retirement years."
      },
    ];
    
    const mediumContents = [
      {
        short: "All Will Retire philosophy: Holistic approach to retirement includes financial, social and health aspects.",
        long: "All Will Retire philosophy: Retirement planning requires a holistic approach to personal finance. Consider not just your portfolio, but your health, housing, social connections, and personal growth to create a comprehensive retirement strategy."
      },
      {
        short: "All Will Retire wisdom: Define your long-term financial goals to create successful retirement planning strategies.",
        long: "All Will Retire wisdom: Understanding your long-term financial goals is key to successful retirement. Clarifying what you want from retirement helps determine how much you need to save and what investment strategies will best support your vision."
      },
      {
        short: "All Will Retire perspective: Wealth extends beyond money to encompass lifestyle, health, and personal fulfillment.",
        long: "All Will Retire perspective: Wealth is more than just money - it's about creating a fulfilling lifestyle. True retirement wealth includes strong relationships, good health, meaningful activities, and the freedom to enjoy your time without financial stress."
      },
      {
        short: "All Will Retire approach: Preparing for retirement requires balanced financial, health, and personal development strategies.",
        long: "All Will Retire approach: Preparing for retirement involves financial, health, and personal growth strategies. A well-rounded plan addresses not just your financial security but also maintaining physical and mental well-being while pursuing activities that bring you joy."
      },
      {
        short: "All Will Retire belief: Your retirement journey demands personalized planning based on individual goals and values.",
        long: "All Will Retire belief: Your retirement journey is unique and deserves careful, personalized planning. Cookie-cutter approaches rarely work because each person has different needs, goals, and dreams for their retirement years that should guide their financial decisions."
      },
      {
        short: "All Will Retire principle: Strategic financial planning creates greater personal freedom and retirement flexibility options.",
        long: "All Will Retire principle: Strategic financial planning can help you achieve greater personal freedom. With proper planning and disciplined saving, you can create options for yourself that might include early retirement, part-time work, or pursuing passion projects."
      },
      {
        short: "All Will Retire concept: Modern retirement approaches emphasize flexibility, adaptation, and continuous personal development opportunities.",
        long: "All Will Retire concept: Modern retirement approaches focus on flexibility and continuous personal development. Today's retirees often blend work, learning, leisure, and service in creative ways that redefine traditional notions of retirement as a static life stage."
      },
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
    return textLength === "short" ? content.short : content.long;
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
            <label className
