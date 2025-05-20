
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Download } from "lucide-react";

interface QRCodeDisplayProps {
  eventId: string;
  accessMode: "face" | "full";
  eventName: string;
  className?: string;
}

const QRCodeDisplay = ({ eventId, accessMode, eventName, className }: QRCodeDisplayProps) => {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);

  // Generate a URL that would be used by the QR code
  const generateQRUrl = () => {
    // In a real app, this would be your actual domain
    const baseUrl = window.location.origin;
    const accessParam = accessMode === "face" ? "face=true" : "full=true";
    return `${baseUrl}/scan?eventId=${eventId}&${accessParam}`;
  };

  const handleDownload = () => {
    setDownloading(true);
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "QR Code Downloaded",
        description: "The QR code has been downloaded successfully."
      });
      setDownloading(false);
    }, 1500);
    
    // In a real app, this would trigger an actual download
    // of the QR code image
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {/* 
          In a real app, this would be an actual QR code image
          generated using a QR code library like qrcode.react
          For now, we'll just use a placeholder
        */}
        <div className="w-64 h-64 bg-gray-100 flex items-center justify-center">
          <div className="w-48 h-48 border-8 border-brand-teal rounded-lg grid grid-cols-3 grid-rows-3 p-2">
            <div className="border-4 border-brand-teal rounded-tl-lg w-full h-full"></div>
            <div className="border-t-4 border-brand-teal w-full h-full"></div>
            <div className="border-4 border-brand-teal rounded-tr-lg w-full h-full"></div>
            
            <div className="border-l-4 border-brand-teal w-full h-full"></div>
            <div className="bg-brand-teal rounded-full w-full h-full flex items-center justify-center text-white font-bold">
              {accessMode === "face" ? "AI" : "All"}
            </div>
            <div className="border-r-4 border-brand-teal w-full h-full"></div>
            
            <div className="border-4 border-brand-teal rounded-bl-lg w-full h-full"></div>
            <div className="border-b-4 border-brand-teal w-full h-full"></div>
            <div className="border-4 border-brand-teal rounded-br-lg w-full h-full"></div>
          </div>
        </div>
        
        <div className="text-center mt-2 text-sm text-gray-600">
          <p>{eventName}</p>
          <p>{accessMode === "face" ? "Face Recognition" : "Full Access"}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <Button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-brand-teal hover:bg-brand-teal/90"
        >
          <Download className="mr-2 h-4 w-4" />
          {downloading ? "Downloading..." : "Download QR Code"}
        </Button>
      </div>
      
      <p className="mt-4 text-xs text-gray-500 max-w-xs text-center">
        QR code link: {generateQRUrl()}
      </p>
    </div>
  );
};

export default QRCodeDisplay;
