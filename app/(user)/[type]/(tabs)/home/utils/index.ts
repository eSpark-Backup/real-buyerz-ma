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
  savedLeadItems: SavedLeadsItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface SavedLeadsItem {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
  updatedAt: string;
  property: SaveLeadsProperty;
  propertyType: PropertyType;
}

interface SaveLeadsProperty {
  id: string;
  userId: string;
  propertyName: string;
  propertyPrice: number | null;
  propertyArea: string;
  propertyImage?: string | null;
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
  user?: {
    id: string;
    firstName?: string;
    lastName?: string;
    address?: string | null;
    profileImage?: string | null;
    socialId?: string | null;
  };
}

export interface PropertyItem {
  id: string;
  userId: string;
  propertyName: string;
  propertyPrice: number | string | null;
  propertyArea: string;
  propertyImage?: string | null;
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
  PropertyData: PropertyDataItem[];
  user?: {
    id: string;
    firstName?: string;
    lastName?: string;
    address?: string | null;
    profileImage?: string | null;
    socialId?: string | null;
  };
}

export interface Amenity {
  id: string;
  amenetiesName: string;
  count: number | null;
  otherFeatures: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  imageKey: string;
}

export interface PropertyType {
  id: string;
  typeName: string;
  url: string;
  imageKey: string;
  createdAt: string;
  updatedAt: string;
  subTypes?: PropertySubType & PropertySubType[];
}

interface PropertySubType {
    id: string;
    typeName: string;
    url: string;
    imageKey?: string;
    createdAt: string;
    updatedAt: string;

}
export interface PropertyDataItem {
  id: string;
  propertyId: string;
  url: string;
  imageKey: string;
  type: "image" | "video";
  createdAt: string;
  updatedAt: string;
}

const handleGetAllProperties = async (params?: string): Promise<{
  status: boolean;
  data?: AllPropertiesData;
  message?: string;
}> => {
  try {
    const { data } = await api.get<FindAllPropertiesResponse>("/userProperty" + (params ?? ""));
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

interface GetAllPropertTypeResponse {
    success: boolean;
    message: string;
    response: {
      timestamp_ms: number;
      action: string;
      data: PropertyType[]  ;
    };
}


const handleGetAllPropertType = async (): Promise<{
  status: boolean;
  message?: string;
  data?: PropertyType[];
}> => {
  try {
    const { data } = await api.get<GetAllPropertTypeResponse>("/admin/propertyType");
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


interface GetAllAmenitiesResponse {
  success: boolean;
  message: string;
  response: {
    timestamp_ms: number;
    action: string;
    data: IAmenity[];
  };
}

interface IAmenity {
  id: string;
  amenetiesName: string;
  otherFeatures: string;
  createdAt: string;
  updatedAt: string;
  checked?: boolean
  count?: number
}

const handleGetAllAmenities = async (): Promise<{
  status: boolean;
  message?: string;
  data?: IAmenity[];
}> => {
  try {
    const { data } = await api.get<GetAllAmenitiesResponse>("/admin/amenities");
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
export { handleGetAllProperties, handleGetAllPropertType, handleGetAllAmenities, IAmenity };
