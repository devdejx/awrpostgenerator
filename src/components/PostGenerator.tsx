
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
  };
