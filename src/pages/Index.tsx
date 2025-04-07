
import { useState } from "react";
import PostGenerator from "@/components/PostGenerator";
import PostPreview from "@/components/PostPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dot-pattern py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center mr-3 glow border-2 border-[#D4AF37]">
              <img 
                src="/awr-logo.png" 
                alt="AWR Lifestyle Logo" 
                className="h-20 w-20 object-contain rounded-full"
              />
            </div>
            <h1 className="text-4xl font-extrabold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
                All Will Retire
              </span> 
              <span className="text-white"> Post Generator</span>
            </h1>
          </div>
          <p className="mt-3 text-xl text-gray-400">Create engaging crypto content for X with just a few clicks</p>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 glass-effect border border-[#D4AF37]/20 p-1 rounded-lg">
            <TabsTrigger value="create" className="font-medium data-[state=active]:bg-primary data-[state=active]:text-background">Create Post</TabsTrigger>
            <TabsTrigger value="preview" className="font-medium data-[state=active]:bg-primary data-[state=active]:text-background">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <div className="glass-effect rounded-xl glow p-6 border border-[#D4AF37]/20">
              <PostGenerator />
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="glass-effect rounded-xl glow p-6 border border-[#D4AF37]/20">
              <PostPreview />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
