
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Camera } from "lucide-react";

interface SelfieCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  className?: string;
}

const SelfieCapture = ({ onCapture, className }: SelfieCaptureProps) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera access error",
        description: "Please allow camera access to take a selfie",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const captureSelfie = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get image data URL
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageDataUrl);
    stopCamera();
  };

  const retakeSelfie = () => {
    setCapturedImage(null);
    startCamera();
  };

  const confirmSelfie = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="camera-container mb-4">
          {cameraActive ? (
            <video ref={videoRef} className="w-full rounded-lg" autoPlay playsInline />
          ) : capturedImage ? (
            <img src={capturedImage} alt="Your selfie" className="w-full rounded-lg" />
          ) : (
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-6">
                <Camera className="mx-auto mb-4 text-gray-400 h-12 w-12" />
                <p className="text-gray-500 mb-4">Take a selfie to find your photos</p>
              </div>
            </div>
          )}
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        <div className="space-y-3">
          {capturedImage ? (
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={retakeSelfie}
                className="w-full"
              >
                Retake
              </Button>
              <Button 
                onClick={confirmSelfie}
                className="w-full bg-brand-teal hover:bg-brand-teal/90"
              >
                Use This Photo
              </Button>
            </div>
          ) : cameraActive ? (
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={stopCamera}
                className="w-full"
              >
                Cancel
              </Button>
              <Button 
                onClick={captureSelfie}
                className="w-full"
              >
                Take Selfie
              </Button>
            </div>
          ) : (
            <Button 
              onClick={startCamera}
              className="w-full bg-brand-teal hover:bg-brand-teal/90"
            >
              Take a Selfie
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SelfieCapture;
