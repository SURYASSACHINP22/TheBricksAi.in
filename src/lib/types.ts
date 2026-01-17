export type VerificationStatus = "VERIFIED" | "PARTIALLY_VERIFIED" | "USER_DECLARED";
export type LandType = "NA" | "Residential" | "Agricultural";
export type DocumentType = "7/12" | "Registry" | "Sale Deed" | "Other";
export type PropertySource = "BrickAi Project" | "Verified Developer" | "Individual Owner";
export type AmenityCategory = "Hospital" | "School" | "Transport" | "Grocery" | "Stationery";

export interface PropertyDocument {
  documentId: string;
  documentType: DocumentType;
  documentFileUrl: string;
  uploadedAt: string;
}

export interface Property {
  propertyId: string;
  title: string;
  ownerName: string;
  source: PropertySource;
  
  surveyNumber: string;
  gatNumber: string;
  plotNumber: string;
  landType: LandType;

  village: string;
  city: string;
  taluka: string;
  district: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;

  areaSqFt: number;
  boundaryDescription: string;
  roadAccess: boolean;
  cornerPlot: boolean;

  documents: PropertyDocument[];

  verificationStatus: VerificationStatus;
  verificationNote: string;
  
  price: number;
  pricePerSqFt: number;

  createdAt: string;
  updatedAt: string;
  createdByUserId: string;
  
  imageUrl: string;
  imageHint: string;

  amenities: Amenity[];
  priceHistory: { date: string; price: number }[];
}

export interface Amenity {
  name: string;
  category: AmenityCategory;
  distance: number; // in km
  travelTime: number; // in minutes
  rating: number; // out of 5
  address: string;
}

export interface User {
  userId: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  role: "USER";
  ownedProperties: string[];
  listedProperties: string[];
}
