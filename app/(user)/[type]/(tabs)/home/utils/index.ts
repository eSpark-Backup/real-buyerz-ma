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
  PropertyData: PropertyDataItem[];
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
  isFavourite: boolean;
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
  subTypes?: PropertySubType[];
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

interface findAgentProfileData {
  success: boolean;
  message: string;
  response: {
    timestamp_ms: number;
    action: string;
    data: AgentProfileData;
  };
}

interface AgentProfileData {
  agent: AgentData;
  organizedProperties: OrganizedProperties;
  recentProperties: PropertyItem[];
}

export interface AgentData {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  bio: string;
  profileImage: string;
}

export interface OrganizedProperties {
  Rent?: {
    count:number;
    Residential?: OrganizedCategory;
    Commercial?: OrganizedCategory;
  };
  Sale?: {
    count:number;
    Residential?: OrganizedCategory;
    Commercial?: OrganizedCategory;
  };
}

export interface OrganizedCategory {
  [propertyType: string]: {
    count: number;
    properties: PropertyItem[];
  };
}

const handleGetAllProperties = async (params?: string): Promise<{
  status: boolean;
  data?: AllPropertiesData;
  message?: string;
}> => {
  try {
    const endpoint = params?.trim() === 'agent'? `/property`: '/userProperty';
    const { data } = await api.get<FindAllPropertiesResponse>(endpoint);
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

const handleDeleteProperty = async (propertyID:string): Promise<{ status: boolean; message?: string }> => {
  try {
    const { data } = await api.delete<FindAllPropertiesResponse>(`/userProperty/${propertyID}`);
    if (data?.success) {
      return {
        status: true
      };
    }
    return { status: false, message: data?.message || 'No data found.' };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'An error occurred while fetching favorites.';
    return { status: false, message: errorMessage };
  }
};

interface GetAllPropertTypeResponse {
  success: boolean;
  message: string;
  response: {
    timestamp_ms: number;
    action: string;
    data: PropertyType[];
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

const handleGetAdminProfile = async (agentId: string): Promise<{
  status: boolean;
  message?: string;
  data?: findAgentProfileData;
}> => {
  try {
    console.log("agentID "+agentId)
    const { data } = await api.get<findAgentProfileData>(`/property/agent/${agentId}`);
    console.log("organizedProperties"+ JSON.stringify(data))
    if (data?.success) {
      return {
        status: true,
        data: data,
      };
    }

    return { status: false, message: data?.message };
  } catch (error) {
    console.log("organizedProperties"+ JSON.stringify(error))
    return { status: false, message: "An error occurred." };
  }
};

export { handleGetAllProperties, handleGetAllPropertType,handleDeleteProperty, handleGetAllAmenities, IAmenity,handleGetAdminProfile };
