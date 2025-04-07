
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import PostGenerator from "@/components/PostGenerator";
import PostPreview from "@/components/PostPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gray-50 dot-pattern py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
          <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-6 md:mb-0">
            <div className={`${isMobile ? 'h-48 w-48' : 'h-64 w-64'} flex items-center justify-center glow`}>
              <img 
                src="/lovable-uploads/3f38e58d-70db-4dce-89fa-f41ee30228c0.png" 
                alt="AWR Lifestyle Logo" 
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          
          <div className="w-full md:w-2/3 text-center md:text-right mt-4 md:mt-0">
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-extrabold text-gray-800 mb-2 sm:mb-3`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
                All Will Retire
              </span> 
              <span className="text-gray-800"> Post Generator</span>
            </h1>
            <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>Create engaging crypto content for X with just a few clicks</p>
          </div>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 glass-effect border border-blue-200 p-1 rounded-lg">
            <TabsTrigger value="create" className="font-medium data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">Create Post</TabsTrigger>
            <TabsTrigger value="preview" className="font-medium data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <PostGenerator />
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <PostPreview />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
