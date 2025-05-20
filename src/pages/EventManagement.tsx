
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoUpload from "@/components/PhotoUpload";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { mockEvents, mockPhotos } from "@/services/mockEvents";
import { FileEdit, Upload, QrCode, Image, ShieldCheck } from "lucide-react";

const EventManagement = () => {
  const { eventId } = useParams<{eventId: string}>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<any | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [accessMode, setAccessMode] = useState<"face" | "full">("face");
  
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
        // Get photos for this event
        const eventPhotos = mockPhotos.filter(photo => photo.eventId === eventId);
        setPhotos(eventPhotos);
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
  
  const handleEditEvent = () => {
    navigate(`/admin/event/edit/${eventId}`);
  };
  
  const handleGenerateQR = (mode: "face" | "full") => {
    setAccessMode(mode);
    setIsQRModalOpen(true);
  };
  
  const handlePhotoUploadSuccess = (newPhotos: any[]) => {
    setPhotos(prev => [...prev, ...newPhotos]);
    toast({
      title: "Upload successful",
      description: `${newPhotos.length} photos have been uploaded.`
    });
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
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">{event.name}</h1>
              <p className="text-gray-500">{event.type} • {event.date} • {photos.length} photos</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={handleEditEvent}
              >
                <FileEdit className="mr-2 h-4 w-4" />
                Edit Event
              </Button>
              <Button 
                className="bg-brand-teal hover:bg-brand-teal/90"
                onClick={() => navigate(`/admin/event/${eventId}/upload`)}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Photos
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="photos">
            <TabsList className="mb-6">
              <TabsTrigger value="photos" className="text-base">
                <Image className="mr-2 h-4 w-4" />
                Photos
              </TabsTrigger>
              <TabsTrigger value="qrcodes" className="text-base">
                <QrCode className="mr-2 h-4 w-4" />
                QR Codes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="photos">
              {photos.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Image className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-600 mb-2">No photos yet</h3>
                    <p className="text-gray-500 mb-4">Upload photos to get started.</p>
                    <Button 
                      onClick={() => navigate(`/admin/event/${eventId}/upload`)}
                      className="bg-brand-teal hover:bg-brand-teal/90"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photos
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Event Photos ({photos.length})</h2>
                    <Button 
                      onClick={() => navigate(`/admin/event/${eventId}/upload`)}
                      variant="outline"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload More
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div key={photo.id || index} className="aspect-square overflow-hidden rounded-md">
                        <img 
                          src={photo.thumbnailUrl || photo.url} 
                          alt={`Event photo ${index + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="qrcodes">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                      <CardTitle>Face Recognition Access</CardTitle>
                    </div>
                    <CardDescription>
                      Guests scan this QR code to access photos where their face appears. 
                      They will need to take a selfie for face recognition.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center mb-6">
                      <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center w-full">
                        <QrCode className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-sm text-gray-500">Generate QR code to display</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-brand-teal hover:bg-brand-teal/90"
                      onClick={() => handleGenerateQR("face")}
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      Generate QR Code
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Full Event Access</CardTitle>
                    <CardDescription>
                      Guests scan this QR code to access all photos from the event.
                      No face recognition required.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center mb-6">
                      <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center w-full">
                        <QrCode className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-sm text-gray-500">Generate QR code to display</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleGenerateQR("full")}
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      Generate QR Code
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      
      <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Event QR Code</DialogTitle>
            <DialogDescription>
              {accessMode === "face" 
                ? "Guests will need to take a selfie for face recognition to view their photos."
                : "Guests will be able to view all event photos without face recognition."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-4">
            <QRCodeDisplay 
              eventId={eventId || ""}
              accessMode={accessMode}
              eventName={event.name}
            />
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 mb-2">
                Display this QR code at your event for guests to scan
              </p>
              <Button 
                onClick={() => setIsQRModalOpen(false)}
                className="mt-2"
                variant="outline"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventManagement;
