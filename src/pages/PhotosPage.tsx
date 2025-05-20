
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoGallery from "@/components/PhotoGallery";
import ProcessingIndicator from "@/components/ProcessingIndicator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getEventById, getPhotosByFaces, Photo } from "@/services/mockApi";

const PhotosPage = () => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [eventName, setEventName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        // Get stored event ID and detected face IDs
        const eventId = sessionStorage.getItem('eventId');
        const facesJson = sessionStorage.getItem('detectedFaces');
        
        if (!eventId || !facesJson) {
          toast({
            title: "Error",
            description: "Missing event or face data. Please start over.",
            variant: "destructive",
          });
          navigate('/scan');
          return;
        }
        
        const faceIds = JSON.parse(facesJson) as string[];
        
        // Get event details
        const event = await getEventById(eventId);
        if (!event) {
          toast({
            title: "Error",
            description: "Event not found. Please scan a valid QR code.",
            variant: "destructive",
          });
          navigate('/scan');
          return;
        }
        
        setEventName(event.name);
        
        // Get photos matching the detected faces
        const matchedPhotos = await getPhotosByFaces(eventId, faceIds);
        setPhotos(matchedPhotos);
        
      } catch (error) {
        console.error("Error loading photos:", error);
        toast({
          title: "Error",
          description: "There was an error loading your photos. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadPhotos();
  }, [navigate, toast]);
  
  const handleStartOver = () => {
    navigate('/scan');
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <ProcessingIndicator message="Finding your photos..." />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{eventName}</h1>
            <p className="text-gray-600">Here are the photos we found featuring you.</p>
          </div>
          
          <PhotoGallery 
            photos={photos} 
            watermarkText="Trino Share" 
            className="mb-8"
          />
          
          {photos.length > 0 && (
            <div className="text-center text-sm text-gray-500 mb-8">
              <p>All photos include automatic watermarking when downloaded.</p>
              <p>To request unwatermarked originals, please contact the event photographer.</p>
            </div>
          )}
          
          <div className="text-center">
            <Button onClick={handleStartOver}>
              Scan Another QR Code
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PhotosPage;
