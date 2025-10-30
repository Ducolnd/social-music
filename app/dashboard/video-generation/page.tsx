'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { searchPexelsPhotos } from '@/lib/api/pexels';
import { generateGeminiCaptions } from '@/lib/api/gemini';
import type { Photo } from 'pexels';
import type { FinalVariant } from '@/lib/types/post-generation';
import { Check, CheckCircle2, Loader2, Search, Sparkles } from 'lucide-react';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface PostGenerationState {
  step: Step;
  context: string;
  initialCaptions: string[];
  selectedImage: Photo | null;
  imageSearchQuery: string;
  imageSearchResults: Photo[];
  isSearchingImages: boolean;
  captionQuery: string;
  generatedCaptions: string[];
  isGeneratingCaptions: boolean;
  selectedCaptions: string[];
  finalVariants: FinalVariant[];
  selectedVariants: string[];
}

// Mock user context - in the future this will come from settings
const MOCK_USER_CONTEXT = 'Music producer creating electronic dance music content for TikTok';

export default function PostGenerationPage() {
  const [state, setState] = useState<PostGenerationState>({
    step: 1,
    context: MOCK_USER_CONTEXT,
    initialCaptions: [],
    selectedImage: null,
    imageSearchQuery: '',
    imageSearchResults: [],
    isSearchingImages: false,
    captionQuery: '',
    generatedCaptions: [],
    isGeneratingCaptions: false,
    selectedCaptions: [],
    finalVariants: [],
    selectedVariants: [],
  });

  // Step 1: Generate initial caption options (mock)
  const handleGenerateInitialCaptions = () => {
    const mockCaptions = [
      'Drop the beat 🎵',
      'Late night vibes 🔥',
      'This hits different',
      'Mood: Elevated',
      'Can\'t stop vibing',
    ];
    setState((prev) => ({
      ...prev,
      initialCaptions: mockCaptions,
      step: 2,
    }));
  };

  // Step 2: Search Pexels images
  const handleSearchImages = async () => {
    if (!state.imageSearchQuery.trim()) return;

    setState((prev) => ({ ...prev, isSearchingImages: true }));

    try {
      const result = await searchPexelsPhotos({
        query: state.imageSearchQuery,
        per_page: 10,
        orientation: 'portrait',
      });

      setState((prev) => ({
        ...prev,
        imageSearchResults: result.photos,
        isSearchingImages: false,
      }));
    } catch (error) {
      console.error('Error searching images:', error);
      setState((prev) => ({ ...prev, isSearchingImages: false }));
      alert('Failed to search images. Please try again.');
    }
  };

  // Step 3: Select image
  const handleSelectImage = (photo: Photo) => {
    setState((prev) => ({
      ...prev,
      selectedImage: photo,
      step: 4,
    }));
  };

  // Step 4: Generate captions with Gemini
  const handleGenerateCaptions = async () => {
    if (!state.captionQuery.trim()) return;

    setState((prev) => ({ ...prev, isGeneratingCaptions: true }));

    try {
      const result = await generateGeminiCaptions({
        context: state.context,
        keyword: state.captionQuery,
      });

      setState((prev) => ({
        ...prev,
        generatedCaptions: result.captions,
        isGeneratingCaptions: false,
      }));
    } catch (error) {
      console.error('Error generating captions:', error);
      setState((prev) => ({ ...prev, isGeneratingCaptions: false }));
      alert('Failed to generate captions. Please try again.');
    }
  };

  // Step 5: Select captions
  const handleToggleCaption = (caption: string) => {
    setState((prev) => {
      const isSelected = prev.selectedCaptions.includes(caption);
      const newSelected = isSelected
        ? prev.selectedCaptions.filter((c) => c !== caption)
        : prev.selectedCaptions.length < 5
          ? [...prev.selectedCaptions, caption]
          : prev.selectedCaptions;

      return { ...prev, selectedCaptions: newSelected };
    });
  };

  const handleProceedToPreview = () => {
    if (!state.selectedImage || state.selectedCaptions.length === 0) return;

    const variants: FinalVariant[] = state.selectedCaptions.map((caption, index) => ({
      id: `variant-${index}`,
      image: state.selectedImage!,
      caption,
    }));

    setState((prev) => ({
      ...prev,
      finalVariants: variants,
      selectedVariants: variants.map((v) => v.id),
      step: 6,
    }));
  };

  // Step 6: Select variants and post
  const handleToggleVariant = (variantId: string) => {
    setState((prev) => {
      const isSelected = prev.selectedVariants.includes(variantId);
      const newSelected = isSelected
        ? prev.selectedVariants.filter((id) => id !== variantId)
        : [...prev.selectedVariants, variantId];

      return { ...prev, selectedVariants: newSelected };
    });
  };

  const handlePostToTikTok = () => {
    // TODO: Implement actual TikTok posting
    console.log('Posting to TikTok:', state.selectedVariants);
    setState((prev) => ({ ...prev, step: 7 }));
  };

  const handleStartOver = () => {
    setState({
      step: 1,
      context: MOCK_USER_CONTEXT,
      initialCaptions: [],
      selectedImage: null,
      imageSearchQuery: '',
      imageSearchResults: [],
      isSearchingImages: false,
      captionQuery: '',
      generatedCaptions: [],
      isGeneratingCaptions: false,
      selectedCaptions: [],
      finalVariants: [],
      selectedVariants: [],
    });
  };

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
        <p className="text-muted-foreground">
          Generate engaging social media content with AI-powered captions
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4, 5, 6, 7].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                state.step >= step
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-muted bg-background text-muted-foreground'
              }`}
            >
              {state.step > step ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{step}</span>
              )}
            </div>
            {step < 7 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  state.step > step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Initial Caption Options */}
      {state.step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Generate Caption Options</CardTitle>
            <CardDescription>
              Based on your page context, we'll generate some caption options for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Your Page Context:</p>
              <p className="text-sm text-muted-foreground">{state.context}</p>
            </div>
            <Button onClick={handleGenerateInitialCaptions} className="w-full">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Caption Options
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Search Images */}
      {state.step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Search for Images</CardTitle>
            <CardDescription>
              Search for images on Pexels to use in your post. We'll show you 10 results in a Pinterest-style grid.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search for images (e.g., 'music', 'dance', 'nightlife')"
                value={state.imageSearchQuery}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, imageSearchQuery: e.target.value }))
                }
                onKeyDown={(e) => e.key === 'Enter' && handleSearchImages()}
              />
              <Button
                onClick={handleSearchImages}
                disabled={state.isSearchingImages || !state.imageSearchQuery.trim()}
              >
                {state.isSearchingImages ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>

            {state.imageSearchResults.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                {state.imageSearchResults.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer group hover:ring-2 hover:ring-primary transition-all"
                    onClick={() => handleSelectImage(photo)}
                  >
                    <img
                      src={photo.src.medium}
                      alt={photo.alt || photo.photographer}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Image Selected */}
      {state.step === 3 && state.selectedImage && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Image Selected</CardTitle>
            <CardDescription>You've selected an image. Proceeding to caption generation...</CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Step 4: Generate Captions */}
      {state.step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 4: Generate Captions</CardTitle>
            <CardDescription>
              Enter a keyword or describe what you want to post about, and we'll generate 5 caption options using AI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.selectedImage && (
              <div className="relative aspect-[9/16] max-w-xs rounded-lg overflow-hidden">
                <img
                  src={state.selectedImage.src.medium}
                  alt={state.selectedImage.alt || state.selectedImage.photographer}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex gap-2">
              <Input
                placeholder="What do you want to post about? (e.g., 'late night vibes', 'weekend energy')"
                value={state.captionQuery}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, captionQuery: e.target.value }))
                }
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateCaptions()}
              />
              <Button
                onClick={handleGenerateCaptions}
                disabled={state.isGeneratingCaptions || !state.captionQuery.trim()}
              >
                {state.isGeneratingCaptions ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </Button>
            </div>

            {state.generatedCaptions.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium mb-4">Select up to 5 captions you like:</p>
                <div className="space-y-2">
                  {state.generatedCaptions.map((caption, index) => {
                    const isSelected = state.selectedCaptions.includes(caption);
                    return (
                      <button
                        key={index}
                        onClick={() => handleToggleCaption(caption)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-muted hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{caption}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {state.selectedCaptions.length > 0 && (
                  <Button
                    onClick={handleProceedToPreview}
                    className="w-full mt-6"
                    disabled={state.selectedCaptions.length === 0}
                  >
                    Proceed to Preview ({state.selectedCaptions.length} selected)
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 6: Preview Variants */}
      {state.step === 6 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 6: Preview & Select</CardTitle>
            <CardDescription>
              Preview your post variants. Select one or more to post to TikTok.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.finalVariants.map((variant) => {
                const isSelected = state.selectedVariants.includes(variant.id);
                return (
                  <div
                    key={variant.id}
                    className={`relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      isSelected ? 'border-primary ring-2 ring-primary' : 'border-muted'
                    }`}
                    onClick={() => handleToggleVariant(variant.id)}
                  >
                    <img
                      src={variant.image.src.medium}
                      alt={variant.image.alt || variant.image.photographer}
                      className="w-full h-full object-cover"
                    />
                    {/* TikTok-style caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-semibold text-lg">{variant.caption}</p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4">
              <Button
                onClick={handlePostToTikTok}
                disabled={state.selectedVariants.length === 0}
                className="flex-1"
              >
                Post to TikTok ({state.selectedVariants.length} selected)
              </Button>
              <Button variant="outline" onClick={handleStartOver}>
                Start Over
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 7: Success */}
      {state.step === 7 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">🎉 Success!</CardTitle>
            <CardDescription className="text-center">
              Your post has been created successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Post Created Successfully</p>
              <p className="text-sm text-muted-foreground mb-6">
                Your post has been scheduled for TikTok. You can view it in your posts dashboard.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={handleStartOver}>Create Another Post</Button>
                <Button variant="outline" onClick={() => window.location.href = '/dashboard/posts'}>
                  View Posts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

