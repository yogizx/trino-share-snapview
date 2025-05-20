
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, X, Check } from "lucide-react";
import ProcessingIndicator from "@/components/ProcessingIndicator";

interface PhotoUploadProps {
  eventId: string;
  onSuccess: (uploadedPhotos: any[]) => void;
  className?: string;
}

const PhotoUpload = ({ eventId, onSuccess, className }: PhotoUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    
    // Process each selected file
    Array.from(selectedFiles).forEach(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file.`,
          variant: "destructive"
        });
        return;
      }
      
      newFiles.push(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        setPreviews([...previews, ...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
    
    setFiles([...files, ...newFiles]);
    e.target.value = ''; // Reset file input
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one photo to upload.",
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) {
          clearInterval(interval);
          return 99; // Close to 100% but not quite there
        }
        return prev + Math.random() * 15;
      });
    }, 500);
    
    // Simulate successful upload after a delay
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // In a real app, we would have response data from the server
      // with the uploaded photo details including URLs
      const uploadedPhotos = files.map((file, index) => ({
        id: `photo-${Date.now()}-${index}`,
        eventId,
        url: previews[index],
        thumbnailUrl: previews[index],
        uploadedAt: new Date().toISOString()
      }));
      
      onSuccess(uploadedPhotos);
      
      // Reset state
      setFiles([]);
      setPreviews([]);
      setUploading(false);
      setProgress(0);
    }, 3000);
  };

  return (
    <Card className={className}>
      <CardContent className="p-6">
        {uploading ? (
          <div className="py-4">
            <ProcessingIndicator message={`Uploading photos (${Math.round(progress)}%)`} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center justify-center py-4">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  JPG, PNG or GIF (max. 10MB per file)
                </p>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                Select Photos
              </Button>
              <input 
                id="photo-upload" 
                type="file" 
                accept="image/*" 
                multiple 
                className="hidden" 
                onChange={handleFileSelect} 
              />
            </div>
            
            {previews.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Selected Photos ({previews.length})</h3>
                  <Button 
                    className="bg-brand-teal hover:bg-brand-teal/90"
                    onClick={handleUpload}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload All Photos
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img 
                        src={preview} 
                        alt={`Preview ${index}`} 
                        className="w-full h-full object-cover rounded-md" 
                      />
                      <button 
                        className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;
