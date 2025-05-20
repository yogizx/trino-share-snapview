
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileEdit, Plus, Image, QrCode, Calendar } from "lucide-react";
import { mockEvents } from "@/services/mockEvents";

interface Event {
  id: string;
  name: string;
  type: string;
  date: string;
  coverImage: string;
  photoCount: number;
}

const AdminDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true";
    
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }
    
    // Load mock events
    setEvents(mockEvents);
  }, [navigate]);
  
  const handleCreateEvent = () => {
    navigate("/admin/event/new");
  };
  
  const handleManageEvent = (eventId: string) => {
    navigate(`/admin/event/${eventId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Photographer Dashboard</h1>
            <Button 
              onClick={handleCreateEvent}
              className="bg-brand-teal hover:bg-brand-teal/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-brand-teal mr-4" />
                  <span className="text-3xl font-bold">{events.length}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Image className="h-8 w-8 text-brand-teal mr-4" />
                  <span className="text-3xl font-bold">
                    {events.reduce((sum, event) => sum + event.photoCount, 0)}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">QR Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <QrCode className="h-8 w-8 text-brand-teal mr-4" />
                  <span className="text-3xl font-bold">{events.length * 2}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">Your Events</h2>
          
          {events.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No events yet</h3>
                <p className="text-gray-500 mb-4">Create your first event to get started.</p>
                <Button 
                  onClick={handleCreateEvent}
                  className="bg-brand-teal hover:bg-brand-teal/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={event.coverImage} 
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="text-xl font-semibold mb-1">{event.name}</h3>
                    <div className="text-sm text-gray-500 mb-3">
                      <p>{event.type} • {event.date}</p>
                      <p>{event.photoCount} photos</p>
                    </div>
                    <Button 
                      onClick={() => handleManageEvent(event.id)}
                      className="w-full"
                      variant="outline"
                    >
                      <FileEdit className="mr-2 h-4 w-4" />
                      Manage Event
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
