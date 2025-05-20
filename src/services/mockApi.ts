
// Mock data for the app

export interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  title?: string;
  faces: string[]; // IDs representing detected faces in the photo
}

export interface Event {
  id: string;
  name: string;
  date: string;
  photos: Photo[];
}

// Sample photos with different face groups
const mockPhotos: Photo[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    thumbnailUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300",
    title: "Group photo at the reception",
    faces: ["face1", "face2", "face3"]
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    thumbnailUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300",
    title: "Scenic wedding backdrop",
    faces: ["face2", "face4"]
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300",
    title: "Outdoor venue",
    faces: ["face1", "face5"]
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    thumbnailUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300",
    title: "Nature shot",
    faces: ["face3", "face5"]
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300",
    title: "Evening celebration",
    faces: ["face1", "face4"]
  }
];

// Sample event
const mockEvent: Event = {
  id: "event-123",
  name: "Johnson Wedding",
  date: "2023-06-15",
  photos: mockPhotos
};

// Mock API functions

// Simulate getting event data by ID
export const getEventById = (eventId: string): Promise<Event | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (eventId === mockEvent.id) {
        resolve(mockEvent);
      } else {
        resolve(null);
      }
    }, 1000);
  });
};

// Simulate face recognition analysis
export const analyzeFace = (imageDataUrl: string): Promise<string[]> => {
  return new Promise((resolve) => {
    // Simulated face analysis - in a real app, this would call a facial recognition API
    setTimeout(() => {
      // For demo, we'll randomly determine which faces are detected
      // This simulates the face recognition match
      const detectedFaces = ["face1", "face3"];
      resolve(detectedFaces);
    }, 2000);
  });
};

// Get photos matching a set of face IDs
export const getPhotosByFaces = (eventId: string, faceIds: string[]): Promise<Photo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (eventId === mockEvent.id) {
        // Filter photos that contain at least one of the detected faces
        const matchedPhotos = mockEvent.photos.filter(photo => 
          photo.faces.some(face => faceIds.includes(face))
        );
        resolve(matchedPhotos);
      } else {
        resolve([]);
      }
    }, 1000);
  });
};
