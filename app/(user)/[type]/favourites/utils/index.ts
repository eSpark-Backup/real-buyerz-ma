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
  data: PropertyResponse[];
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


const handleGetFavorite = async (): Promise<{ status: boolean; properties?: PropertyResponse[]; message?: string }> => {
  try {
    const { data } = await api.get<ApiResponse>('/userProperty/request');
    if (data?.response?.data) {
      console.log(`Idhar: ${JSON.stringify(data)}`);
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

const handleSaveFavoriteProperty = async (propertyId: string): Promise<{ status: boolean; properties?: ApiResponse; message?: string }> => {
  try {
    const { data } = await api.post<ApiResponse>(`/userProperty/${propertyId}`);
    if (data?.response?.data) {
      return {
        status: true,
        properties: data
      };
    }
    return { status: false, message: data?.message };
  } catch (error) {
    return { status: false, message: 'An error occurred.' };
  }
};

export { handleGetFavorite, handleSaveFavoriteProperty };