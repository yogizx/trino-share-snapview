
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SelfieCapture from "@/components/SelfieCapture";
import ProcessingIndicator from "@/components/ProcessingIndicator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { analyzeFace } from "@/services/mockApi";

const SelfiePage = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if we have an event ID
    const eventId = sessionStorage.getItem('eventId');
    if (!eventId) {
      toast({
        title: "Error",
        description: "No event found. Please scan a QR code first.",
        variant: "destructive",
      });
      navigate('/scan');
    }
  }, [navigate, toast]);
  
  const handleSelfieCapture = async (imageDataUrl: string) => {
    try {
      setProcessing(true);
      
      // Store the selfie in session storage for display purposes
      sessionStorage.setItem('selfieImage', imageDataUrl);
      
      // Analyze the face to get face IDs
      const detectedFaces = await analyzeFace(imageDataUrl);
      
      if (detectedFaces.length > 0) {
        // Store the detected face IDs in session storage
        sessionStorage.setItem('detectedFaces', JSON.stringify(detectedFaces));
        
        // Navigate to the results page
        navigate('/photos');
      } else {
        toast({
          title: "No faces detected",
          description: "We couldn't detect any faces in your selfie. Please try again.",
          variant: "destructive",
        });
        setProcessing(false);
      }
    } catch (error) {
      console.error("Error processing selfie:", error);
      toast({
        title: "Processing error",
        description: "There was an error analyzing your selfie. Please try again.",
        variant: "destructive",
      });
      setProcessing(false);
    }
  };
  
  if (processing) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <ProcessingIndicator message="Analyzing your selfie..." />
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
        <div className="max-w-md mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-center">Take a Selfie</CardTitle>
              <CardDescription className="text-center">
                We'll use facial recognition to find photos of you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SelfieCapture onCapture={handleSelfieCapture} />
            </CardContent>
          </Card>
          
          <div className="text-center text-sm text-gray-500">
            <p>For best results, face the camera directly in good lighting.</p>
            <p>Your selfie is only used for facial recognition and is not stored permanently.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SelfiePage;
