
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockEvents } from "@/services/mockEvents";
import { Upload } from "lucide-react";

const eventTypes = [
  "Wedding",
  "Corporate Event",
  "Birthday Party",
  "Conference",
  "Graduation",
  "Family Portrait",
  "Fashion Shoot",
  "Other"
];

const EventForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = eventId !== "new";
  
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    date: "",
    location: "",
    description: "",
    coverImage: ""
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true";
    
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }
    
    // If editing, fetch event data
    if (isEditing && eventId) {
      const eventToEdit = mockEvents.find(event => event.id === eventId);
      
      if (eventToEdit) {
        setFormData({
          name: eventToEdit.name,
          type: eventToEdit.type,
          date: eventToEdit.date,
          location: eventToEdit.location || "",
          description: eventToEdit.description || "",
          coverImage: eventToEdit.coverImage
        });
        
        setImagePreview(eventToEdit.coverImage);
      } else {
        // Event not found
        toast({
          title: "Event not found",
          description: "The event you are trying to edit does not exist.",
          variant: "destructive"
        });
        
        navigate("/admin/dashboard");
      }
    }
  }, [eventId, isEditing, navigate, toast]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate the form
    if (!formData.name || !formData.type || !formData.date || !formData.coverImage) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and upload a cover image.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // In a real app, this would make an API call to save the event
    setTimeout(() => {
      toast({
        title: isEditing ? "Event updated" : "Event created",
        description: `"${formData.name}" has been successfully ${isEditing ? "updated" : "created"}.`,
      });
      
      setIsSubmitting(false);
      navigate("/admin/dashboard");
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {isEditing ? "Edit Event" : "Create New Event"}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Event Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="Enter event name" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Event Type *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Event Date *</Label>
                <Input 
                  id="date" 
                  name="date" 
                  type="date" 
                  value={formData.date} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleInputChange} 
                  placeholder="Enter event location" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Enter event description" 
                className="h-32" 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Cover Image *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="aspect-video max-h-60 overflow-hidden rounded-md mx-auto">
                      <img 
                        src={imagePreview} 
                        alt="Cover preview" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => document.getElementById('coverImage')?.click()}
                    >
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center py-4">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => document.getElementById('coverImage')?.click()}
                    >
                      Select Image
                    </Button>
                  </div>
                )}
                <Input 
                  id="coverImage" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange} 
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/admin/dashboard")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-brand-teal hover:bg-brand-teal/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Saving...</span>
                ) : isEditing ? (
                  <span>Update Event</span>
                ) : (
                  <span>Create Event</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventForm;
