
export interface Event {
  id: string;
  name: string;
  type: string;
  date: string;
  description?: string;
  location?: string;
  coverImage: string;
  photoCount: number;
}

export interface Photo {
  id: string;
  eventId: string;
  url: string;
  thumbnailUrl: string;
  faces?: string[]; // Face IDs detected in this photo
  uploadedAt: string;
}

export const mockEvents: Event[] = [
  {
    id: "event-001",
    name: "Johnson Wedding",
    type: "Wedding",
    date: "2023-06-15",
    description: "Beautiful wedding ceremony at Sunset Gardens",
    location: "Sunset Gardens, Los Angeles",
    coverImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800",
    photoCount: 8
  },
  {
    id: "event-002",
    name: "Smith Birthday Party",
    type: "Birthday Party",
    date: "2023-07-22",
    description: "40th birthday celebration",
    location: "Downtown Loft",
    coverImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800",
    photoCount: 5
  },
  {
    id: "event-003",
    name: "Tech Conference 2023",
    type: "Corporate Event",
    date: "2023-09-10",
    description: "Annual technology conference",
    location: "Convention Center",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    photoCount: 12
  }
];

export const mockPhotos: Photo[] = [
  // Wedding photos
  {
    id: "photo-001",
    eventId: "event-001",
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=300",
    faces: ["face-001", "face-002"],
    uploadedAt: "2023-06-15T14:30:00Z"
  },
  {
    id: "photo-002",
    eventId: "event-001",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=300",
    faces: ["face-001", "face-002", "face-003"],
    uploadedAt: "2023-06-15T14:35:00Z"
  },
  {
    id: "photo-003",
    eventId: "event-001",
    url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=300",
    faces: ["face-001"],
    uploadedAt: "2023-06-15T14:40:00Z"
  },
  {
    id: "photo-004",
    eventId: "event-001",
    url: "https://images.unsplash.com/photo-1595368259936-ce9bde98fd4e?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1595368259936-ce9bde98fd4e?q=80&w=300",
    faces: ["face-002", "face-004"],
    uploadedAt: "2023-06-15T15:00:00Z"
  },
  {
    id: "photo-005",
    eventId: "event-001",
    url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300",
    faces: ["face-001", "face-003", "face-004"],
    uploadedAt: "2023-06-15T15:10:00Z"
  },
  {
    id: "photo-006",
    eventId: "event-001",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=300",
    faces: ["face-003", "face-005"],
    uploadedAt: "2023-06-15T15:20:00Z"
  },
  {
    id: "photo-007",
    eventId: "event-001",
    url: "https://images.unsplash.com/photo-1509610973147-232dfea52a97?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1509610973147-232dfea52a97?q=80&w=300",
    faces: ["face-001", "face-002"],
    uploadedAt: "2023-06-15T15:30:00Z"
  },
  {
    id: "photo-008",
    eventId: "event-001",
    url: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=300",
    faces: ["face-001", "face-002", "face-003", "face-004"],
    uploadedAt: "2023-06-15T15:40:00Z"
  },
  
  // Birthday Party photos
  {
    id: "photo-009",
    eventId: "event-002",
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=300",
    faces: ["face-006", "face-007"],
    uploadedAt: "2023-07-22T19:00:00Z"
  },
  {
    id: "photo-010",
    eventId: "event-002",
    url: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=300",
    faces: ["face-006", "face-008"],
    uploadedAt: "2023-07-22T19:10:00Z"
  },
  {
    id: "photo-011",
    eventId: "event-002",
    url: "https://images.unsplash.com/photo-1573676564864-6eb9c8552f13?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1573676564864-6eb9c8552f13?q=80&w=300",
    faces: ["face-007", "face-008", "face-009"],
    uploadedAt: "2023-07-22T19:20:00Z"
  },
  {
    id: "photo-012",
    eventId: "event-002",
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=300",
    faces: ["face-006"],
    uploadedAt: "2023-07-22T19:30:00Z"
  },
  {
    id: "photo-013",
    eventId: "event-002",
    url: "https://images.unsplash.com/photo-1513262599279-d287e25f4d84?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1513262599279-d287e25f4d84?q=80&w=300",
    faces: ["face-006", "face-007", "face-008", "face-009"],
    uploadedAt: "2023-07-22T20:00:00Z"
  },
  
  // Conference photos
  {
    id: "photo-014",
    eventId: "event-003",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=300",
    faces: ["face-010", "face-011"],
    uploadedAt: "2023-09-10T09:00:00Z"
  },
  {
    id: "photo-015",
    eventId: "event-003",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=300",
    faces: ["face-010", "face-012"],
    uploadedAt: "2023-09-10T09:30:00Z"
  },
  {
    id: "photo-016",
    eventId: "event-003",
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=300",
    faces: ["face-011", "face-012", "face-013"],
    uploadedAt: "2023-09-10T10:00:00Z"
  },
  {
    id: "photo-017",
    eventId: "event-003",
    url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=300",
    faces: ["face-014"],
    uploadedAt: "2023-09-10T10:30:00Z"
  },
  {
    id: "photo-018",
    eventId: "event-003",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=300",
    faces: ["face-012", "face-013"],
    uploadedAt: "2023-09-10T11:00:00Z"
  },
  {
    id: "photo-019",
    eventId: "event-003",
    url: "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=300",
    faces: ["face-010", "face-011", "face-012"],
    uploadedAt: "2023-09-10T11:30:00Z"
  },
  {
    id: "photo-020",
    eventId: "event-003",
    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300",
    faces: ["face-015"],
    uploadedAt: "2023-09-10T13:00:00Z"
  },
  {
    id: "photo-021",
    eventId: "event-003",
    url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=300",
    faces: ["face-013", "face-015"],
    uploadedAt: "2023-09-10T14:00:00Z"
  },
  {
    id: "photo-022",
    eventId: "event-003",
    url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=300",
    faces: ["face-010", "face-011", "face-012", "face-013"],
    uploadedAt: "2023-09-10T15:00:00Z"
  },
  {
    id: "photo-023",
    eventId: "event-003",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300",
    faces: ["face-010", "face-011"],
    uploadedAt: "2023-09-10T16:00:00Z"
  },
  {
    id: "photo-024",
    eventId: "event-003",
    url: "https://images.unsplash.com/photo-1577896851628-5282c4615d85?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1577896851628-5282c4615d85?q=80&w=300",
    faces: ["face-014", "face-015"],
    uploadedAt: "2023-09-10T17:00:00Z"
  },
  {
    id: "photo-025",
    eventId: "event-003",
    url: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=800",
    thumbnailUrl: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=300",
    faces: ["face-010", "face-011", "face-014"],
    uploadedAt: "2023-09-10T17:30:00Z"
  }
];

// Mock functions for API calls
export const getEventById = (eventId: string): Promise<Event | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const event = mockEvents.find(e => e.id === eventId);
      resolve(event);
    }, 300);
  });
};

export const getPhotosByEventId = (eventId: string): Promise<Photo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const photos = mockPhotos.filter(p => p.eventId === eventId);
      resolve(photos);
    }, 500);
  });
};

export const getPhotosByFaces = (eventId: string, faceIds: string[]): Promise<Photo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const photos = mockPhotos.filter(p => {
        return p.eventId === eventId && 
              p.faces && 
              faceIds.some(faceId => p.faces?.includes(faceId));
      });
      resolve(photos);
    }, 1000);
  });
};
