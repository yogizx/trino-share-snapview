
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface QRScannerProps {
  onSuccess: (result: string) => void;
  className?: string;
}

const QRScanner = ({ onSuccess, className }: QRScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const startScanner = async () => {
    try {
      setScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        scanQRCode();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera access error",
        description: "Please allow camera access to scan QR codes",
        variant: "destructive"
      });
      setScanning(false);
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  };

  const scanQRCode = () => {
    if (!scanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;

    // Simulating QR code detection - In a real app, use a QR code library
    // This is just for demo purposes
    setTimeout(() => {
      if (scanning) {
        const eventId = "event-123"; // In a real app, this would be extracted from the QR code
        onSuccess(eventId);
        stopScanner();
      }
    }, 3000);

    // In a real application, you'd implement actual QR detection here
    // Using a library like jsQR or similar
    
    if (scanning) {
      requestAnimationFrame(scanQRCode);
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="camera-container mb-4">
          {scanning ? (
            <>
              <video ref={videoRef} className="w-full rounded-lg" />
              <canvas ref={canvasRef} className="hidden" />
              <div className="camera-overlay">
                <div className="qr-scanner-frame">
                  <div className="qr-scanner-corner qr-top-left"></div>
                  <div className="qr-scanner-corner qr-top-right"></div>
                  <div className="qr-scanner-corner qr-bottom-left"></div>
                  <div className="qr-scanner-corner qr-bottom-right"></div>
                </div>
                <p className="text-white text-shadow mt-4 text-center px-4">
                  Position the QR code within the frame
                </p>
              </div>
            </>
          ) : (
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-400">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M8 8h1v1H8z" />
                  <path d="M15 8h1v1h-1z" />
                  <path d="M8 15h1v1H8z" />
                  <path d="M15 15h1v1h-1z" />
                  <path d="M12 8h1v8h-1z" />
                  <path d="M8 12h8v1H8z" />
                </svg>
                <p className="text-gray-500 mb-4">Scan the QR code to access your event photos</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          {scanning ? (
            <Button 
              variant="outline" 
              onClick={stopScanner}
              className="w-full"
            >
              Cancel Scanning
            </Button>
          ) : (
            <Button 
              onClick={startScanner}
              className="w-full bg-brand-teal hover:bg-brand-teal/90"
            >
              Scan QR Code
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QRScanner;
