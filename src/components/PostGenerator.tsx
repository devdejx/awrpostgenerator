
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

const POST_TYPES = [
  {
    value: "announcement",
    label: "Announcement",
    templates: [
      "Important new event! 📢 {message}",
      "News of the day: {message} #news",
      "Attention! 🚨 {message}",
    ],
  },
  {
    value: "question",
    label: "Question",
    templates: [
      "What do you think about this? 🤔 {message}",
      "{message} What's your opinion?",
      "Thinking about... {message} You?",
    ],
  },
  {
    value: "quote",
    label: "Quote",
    templates: [
      "\"{message}\" #wisdom #quote",
      "Thought of the day: \"{message}\" ✨",
      "Inspiration for today: \"{message}\" 💭",
    ],
  },
  {
    value: "tip",
    label: "Tip",
    templates: [
      "Pro tip: {message} #advice",
      "Did you know? {message} 💡",
      "Useful tip: {message} ✅",
    ],
  },
];

// Mock function to generate content from website
const generateContentFromWebsite = async () => {
  // In a real implementation, this would be an API call to fetch and process content
  // For demo purposes, we'll return predefined content related to the website
  const possibleContents = [
    "Planning for retirement is crucial. Start early and be consistent with your savings.",
    "Retirement isn't just about finances, it's also about having a purpose and staying active.",
    "Diversifying your retirement portfolio can help protect against market volatility.",
    "Consider your healthcare needs when planning for retirement. Medical costs can be significant.",
    "Social security benefits alone may not be enough for a comfortable retirement.",
  ];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return random content
  return possibleContents[Math.floor(Math.random() * possibleContents.length)];
};

const PostGenerator = () => {
  const { post, setPost } = usePostStore();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [postType, setPostType] = useState("announcement");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
    const generatedMessage = randomTemplate.replace("{message}", message);

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
      const content = await generateContentFromWebsite();
      setMessage(content);
      toast({
        title: "Success!",
        description: "Content generated from AllWillRetire.com",
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
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Type
          </label>
          <Select value={postType} onValueChange={setPostType}>
            <SelectTrigger>
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
