
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QRScanner from "@/components/QRScanner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ScanPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleQRSuccess = (eventId: string) => {
    // Store the event ID in session storage
    sessionStorage.setItem('eventId', eventId);
    
    toast({
      title: "QR Code Scanned Successfully",
      description: "Please take a selfie to find your photos.",
    });
    
    // Navigate to the selfie page
    navigate(`/selfie`);
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
