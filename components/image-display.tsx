"use client";

import { Download, Image as ImageIcon } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { Button } from "./ui/button";

type ImageDisplayProps = {
  imageData: {
    base64: string;
    prompt: string;
    aspectRatio?: string;
  };
};

export function ImageDisplay({ imageData }: ImageDisplayProps) {
  const { base64, prompt, aspectRatio } = imageData;
  const { t } = useLocale();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:image/webp;base64,${base64}`;
    link.download = `generated-image-${Date.now()}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Determine aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "16:9":
        return "aspect-video";
      case "9:16":
        return "aspect-[9/16]";
      case "4:3":
        return "aspect-[4/3]";
      case "3:4":
        return "aspect-[3/4]";
      default:
        return "aspect-square";
    }
  };

  return (
    <div className="my-4 rounded-lg border border-border bg-muted/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-muted-foreground text-sm">
            {t.generatedImage}
          </span>
        </div>
        <Button
          className="h-8 gap-1"
          onClick={handleDownload}
          size="sm"
          variant="ghost"
        >
          <Download className="h-3 w-3" />
          <span className="text-xs">{t.download}</span>
        </Button>
      </div>

      <div
        className={`relative w-full overflow-hidden rounded-lg ${getAspectRatioClass()}`}
      >
        {/* biome-ignore lint/performance/noImgElement: Base64 images require regular img tag */}
        {/* biome-ignore lint/nursery/useImageSize: Base64 images have unknown dimensions */}
        <img
          alt={prompt}
          className="h-full w-full object-cover"
          src={`data:image/webp;base64,${base64}`}
        />
      </div>

      {prompt && (
        <p className="mt-3 text-muted-foreground text-xs italic">{prompt}</p>
      )}
    </div>
  );
}
