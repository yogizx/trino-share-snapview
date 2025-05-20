
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  title?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  watermarkText: string;
  className?: string;
}

const PhotoGallery = ({ photos, watermarkText, className }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { toast } = useToast();

  const downloadPhoto = (photo: Photo) => {
    // In a real app, you would:
    // 1. Apply watermark on the server or client side
    // 2. Generate a proper download link
    
    // For this demo, we'll just simulate the download
    toast({
      title: "Photo downloading",
      description: "Your watermarked photo is being prepared for download",
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download ready",
        description: "Your photo has been downloaded successfully",
      });
    }, 1500);
  };

  if (photos.length === 0) {
    return (
      <div className={`${className} flex flex-col items-center justify-center py-12`}>
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-300">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <h3 className="text-xl font-medium text-gray-600 mb-2">No photos found</h3>
          <p className="text-gray-500">We couldn't find any photos that match your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="photo-grid">
        {photos.map((photo) => (
          <Dialog key={photo.id}>
            <DialogTrigger asChild>
              <div 
                className="photo-item cursor-pointer shadow-md hover:shadow-lg"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img 
                  src={photo.thumbnailUrl} 
                  alt={photo.title || 'Event photo'} 
                  className="w-full h-full object-cover"
                />
                <div className="watermark">{watermarkText}</div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl w-11/12">
              <div className="relative">
                <img 
                  src={photo.url} 
                  alt={photo.title || 'Event photo'} 
                  className="w-full rounded-lg"
                />
                <div className="absolute bottom-3 right-3 text-white bg-black/50 px-2 py-1 text-sm rounded">
                  {watermarkText}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button 
                  onClick={() => downloadPhoto(photo)}
                  className="bg-brand-teal hover:bg-brand-teal/90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
