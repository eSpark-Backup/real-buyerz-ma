import { api } from "api";

interface FindAllPropertiesResponse {
  success: boolean;
  message: string;
  response: {
    timestamp_ms: number;
    action: string;
    data: AllPropertiesData;
  };
}

export interface AllPropertiesData {
  items: PropertyItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface PropertyItem {
  id: string;
  userId: string;
  propertyName: string;
  propertyPrice: number | null;
  propertyArea: string;
  propertyImage: string | null; 
  purpose: string;
  propertyAddress: string;
  propertyCity: string;
  propertyZip: string | null;
  propertyDescription: string;
  longitude: string;
  latitude: string;
  propertyBy: string;
  proposalCount: number;
  propertyStatus: boolean;
  isFeatured: boolean;
  isDeleted: boolean;
  propertyTypeId: string;
  createdAt: string;
  updatedAt: string;
  amenities: Amenity[];
  propertyType: PropertyType;
  PropertyData: PropertyDataItem[]
}

interface Amenity {
  id: string;
  amenetiesName: string;
  count: number | null;
  otherFeatures: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  imageKey: string;
}

interface PropertyType {
  id: string;
  subTypeName: string;
  propertyTypeId: string;
  url: string;
  imageKey: string;
  createdAt: string;
  updatedAt: string;
  propertyType: {
    id: string;
    typeName: string;
    url: string;
    imageKey: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface PropertyDataItem {
  id: string;
  propertyId: string;
  url: string;
  imageKey: string;
  type: "image" | "video";
  createdAt: string;
  updatedAt: string;
}

const handleGetAllProperties = async (): Promise<{
  status: boolean;
  data?: AllPropertiesData;
  message?: string;
}> => {
  try {
    const { data } = await api.get<FindAllPropertiesResponse>("/userProperty");
    if (data?.success) {
      return {
        status: true,
        data: data.response.data,
      };
    }

    return { status: false, message: data?.message };
  } catch (error) {
    return { status: false, message: "An error occurred." };
  }
};

export { handleGetAllProperties };
