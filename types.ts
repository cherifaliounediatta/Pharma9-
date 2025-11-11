
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Pharmacy {
  id: number;
  name: string;
  owner: string;
  address: string;
  neighborhood: string;
  phone: string;
  coordinates: Coordinates;
  onDuty: boolean;
  hours: {
    standard: string;
    onDuty: string;
};
  // Added for rating system
  averageRating?: number;
  ratingCount?: number;
}

export interface Review {
  id: number;
  pharmacyId: number;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
