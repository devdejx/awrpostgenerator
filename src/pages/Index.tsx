
import { useState } from "react";
import PostGenerator from "@/components/PostGenerator";
import PostPreview from "@/components/PostPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">X Post Generator</span>
          </h1>
          <p className="mt-2 text-xl text-gray-600 max-w-2xl mx-auto">
            Create engaging posts for X with powerful crypto hashtags and targeted profiles
          </p>
          <div className="mt-6 max-w-md mx-auto flex justify-center">
            <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary">
              All Will Retire
            </span>
          </div>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="create" className="text-base py-3">Create Post</TabsTrigger>
            <TabsTrigger value="preview" className="text-base py-3">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <div className="modern-card p-6">
              <PostGenerator />
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="modern-card p-6">
              <PostPreview />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
