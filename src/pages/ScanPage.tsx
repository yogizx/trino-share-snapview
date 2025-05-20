
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QRScanner from "@/components/QRScanner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ScanPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [accessMode, setAccessMode] = useState<"face" | "full">("face");
  
  useEffect(() => {
    // Check if the page was opened with eventId and access mode parameters
    // This would happen when a QR code is scanned
    const eventId = searchParams.get('eventId');
    const hasFaceParam = searchParams.get('face') === 'true';
    const hasFullParam = searchParams.get('full') === 'true';
    
    if (eventId) {
      // Store the event ID
      sessionStorage.setItem('eventId', eventId);
      
      // Determine access mode
      if (hasFullParam) {
        // Full access mode - go directly to photos
        sessionStorage.setItem('accessMode', 'full');
        navigate('/photos');
      } else if (hasFaceParam) {
        // Face recognition mode - go to selfie page
        sessionStorage.setItem('accessMode', 'face');
        navigate('/selfie');
      }
    }
  }, [navigate, searchParams]);
  
  const handleQRSuccess = (eventId: string) => {
    // Store the event ID in session storage
    sessionStorage.setItem('eventId', eventId);
    sessionStorage.setItem('accessMode', accessMode);
    
    toast({
      title: "QR Code Scanned Successfully",
      description: accessMode === "face" 
        ? "Please take a selfie to find your photos."
        : "Redirecting you to the photo gallery.",
    });
    
    // Navigate based on access mode
    if (accessMode === "face") {
      navigate(`/selfie`);
    } else {
      navigate('/photos');
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-center">Scan QR Code</CardTitle>
              <CardDescription className="text-center">
                Scan the QR code displayed at your event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QRScanner onSuccess={handleQRSuccess} />
            </CardContent>
          </Card>
          
          <div className="text-center text-sm text-gray-500">
            <p>Having trouble with the QR code?</p>
            <p>Make sure you're in a well-lit area and your camera is clean.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScanPage;
