
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoUpload from "@/components/PhotoUpload";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { mockEvents } from "@/services/mockEvents";

const PhotoUploadPage = () => {
  const { eventId } = useParams<{eventId: string}>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<any | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true";
    
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }
    
    // Find the event
    if (eventId) {
      const foundEvent = mockEvents.find(e => e.id === eventId);
      
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        toast({
          title: "Event not found",
          description: "The event you're looking for does not exist.",
          variant: "destructive"
        });
        navigate("/admin/dashboard");
      }
    }
  }, [eventId, navigate, toast]);

  const handleUploadSuccess = (uploadedPhotos: any[]) => {
    toast({
      title: "Upload complete",
      description: `${uploadedPhotos.length} photos uploaded successfully.`
    });
    
    navigate(`/admin/event/${eventId}`);
  };

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center py-20">
            <p>Loading event...</p>
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
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/admin/event/${eventId}`)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Upload Photos</h1>
              <p className="text-gray-500">{event.name}</p>
            </div>
          </div>
          
          <PhotoUpload 
            eventId={eventId || ""} 
            onSuccess={handleUploadSuccess}
          />
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Images will be optimized automatically after upload.</p>
            <p>Supported formats: JPG, PNG, GIF. Maximum file size: 10MB.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PhotoUploadPage;
