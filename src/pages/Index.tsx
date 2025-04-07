
import { useState } from "react";
import PostGenerator from "@/components/PostGenerator";
import PostPreview from "@/components/PostPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background hero-pattern py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full awr-gradient flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">AWR</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                All Will Retire
              </span> 
              <span className="text-white"> Post Generator</span>
            </h1>
          </div>
          <p className="mt-3 text-xl text-gray-400">Create engaging crypto content for X with just a few clicks</p>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-card/50 border border-border p-1 rounded-lg">
            <TabsTrigger value="create" className="font-medium data-[state=active]:bg-primary">Create Post</TabsTrigger>
            <TabsTrigger value="preview" className="font-medium data-[state=active]:bg-primary">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <div className="bg-card rounded-xl card-shadow p-6 border border-border">
              <PostGenerator />
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="bg-card rounded-xl card-shadow p-6 border border-border">
              <PostPreview />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

