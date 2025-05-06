import { api } from 'api';
import { Amenity, PropertyDataItem, PropertyType } from '../../(tabs)/home/utils';

interface ApiResponse {
  success: boolean;
  message: string;
  response: ResponseData;
}

interface ResponseData {
  timestamp_ms: number;
  action: string;
  data: ModifiedProperties;
}
interface ModifiedProperties {
  modifiedProperties: PropertyResponse[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface PropertyResponse {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
  updatedAt: string;
  property: PropertyDetails;
  propertyType: PropertyType;
}

export interface PropertyDetails {
  id: string;
  userId: string;
  propertyName: string;
  propertyPrice: number;
  propertyArea: string;
  purpose: string;
  propertyAddress: string;
  propertyCity: string;
  propertyZip: string;
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
  PropertyData: PropertyDataItem[];
  amenities: Amenity[];
}


const handleGetFavorite = async (type?: string, page: number = 1, pageSize: number = 50) => {
  try {
    const endpoint = type?.trim() === 'agent' ? `/property/request` : '/userProperty/request';
    const { data } = await api.get<ApiResponse>(endpoint, { page: page, pageSize: pageSize });
    if (data?.response?.data) {
      console.log(`Idhar: ${JSON.stringify(data.response.data)}`);
      return {
        status: true,
        properties: data.response.data,
      };
    }
    console.log(`URLs: ${JSON.stringify(data)}`);
    return { status: false, message: data?.message || 'No data found.' };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'An error occurred while fetching favorites.';
    return { status: false, message: errorMessage };
  }
};

const handleSaveFavoriteProperty = async (propertyId: string,type?: string): Promise<{ status: boolean; properties?: ApiResponse; message?: string }> => {
  try {
    console.log("User type "+ type)
    const endpoint = type?.trim() === 'agent'? `/property/${propertyId}`: `/userProperty/${propertyId}`;
    const { data } = await api.post<ApiResponse>(endpoint);
    if (data?.response?.data) {
      return {
        status: true,
        properties: data
      };
    }
    console.log("Save Favorite "+JSON.stringify(data))
    return { status: false, message: data?.message };
  } catch (error) {
    return { status: false, message: 'An error occurred.' };
  }
};

export { handleGetFavorite, handleSaveFavoriteProperty };