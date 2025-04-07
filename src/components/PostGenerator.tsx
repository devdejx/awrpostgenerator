
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
import { useToast } from "@/components/ui/sonner";
import { Image as ImageIcon, RefreshCw } from "lucide-react";
import { usePostStore } from "@/store/postStore";

const POST_TYPES = [
  {
    value: "announcement",
    label: "Obvestilo",
    templates: [
      "Nov pomemben dogodek! 📢 {message}",
      "Novica dneva: {message} #novica",
      "Pozor! 🚨 {message}",
    ],
  },
  {
    value: "question",
    label: "Vprašanje",
    templates: [
      "Kaj mislite o tem? 🤔 {message}",
      "{message} Kakšno je vaše mnenje?",
      "Razmišljam... {message} Vi?",
    ],
  },
  {
    value: "quote",
    label: "Citat",
    templates: [
      ""{message}" #modrost #citat",
      "Misel dneva: "{message}" ✨",
      "Navdih za danes: "{message}" 💭",
    ],
  },
  {
    value: "tip",
    label: "Nasvet",
    templates: [
      "Pro nasvet: {message} #nasvet",
      "Ali ste vedeli? {message} 💡",
      "Koristen nasvet: {message} ✅",
    ],
  },
];

const PostGenerator = () => {
  const { post, setPost } = usePostStore();
  const toast = useToast();
  const [message, setMessage] = useState("");
  const [postType, setPostType] = useState("announcement");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      toast.error("Prosim vnesite sporočilo");
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

    toast.success("Objava uspešno ustvarjena!");
  };

  const resetForm = () => {
    setMessage("");
    setPostType("announcement");
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tip objave
          </label>
          <Select value={postType} onValueChange={setPostType}>
            <SelectTrigger>
              <SelectValue placeholder="Izberite tip objave" />
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sporočilo
          </label>
          <Textarea
            placeholder="Vnesite svoje sporočilo..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dodaj sliko (neobvezno)
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
              {imageFile ? imageFile.name : "Nobena slika ni izbrana"}
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
            Ustvari objavo
          </Button>
          <Button
            variant="outline"
            onClick={resetForm}
            className="w-auto p-2"
            title="Ponastavi obrazec"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostGenerator;
