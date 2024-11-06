import { api } from "api";


export interface Amenity{
  name:string,
  count:number,
  imageUrl:string
}

interface PropertyResponse {
  success: boolean;
  message: string;
  response: {
    timestamp_ms: number;
    data: any
  };
}

export interface ReqPropertyData {
  propertyName: string,
  propertySubTypeId: string,
  propertyPrice: string,
  propertyArea: string,
  purpose: string,
  propertyAddress: string,
  propertyCity: string,
  propertyZip: string,
  propertyDescription: string,
  longitude: string,
  latitude: string,
  image: ImageFile[],
  video: [],
  propertyStatus: string,
  amenity: []
  amenities: string
}

export interface ImageFile extends Blob {
  uri: string;
  type: string;
  name: string;
}

const handleCreateProperties = async (reqPropertyData: ReqPropertyData): Promise<{
  status: boolean;
  data?: PropertyResponse;
  message?: string;
}> => {
  try {
    const formData = new FormData();
    
    Object.keys(reqPropertyData).forEach(key => {
      const value = reqPropertyData[key as keyof ReqPropertyData];
      
      if (key === 'image') {
        const images = value as ImageFile[];
        images.forEach((image) => {
          formData.append('image', image);
        });
      } else if (key === 'amenity') {
        const amenities = value as Amenity[];
        formData.append('amenity', JSON.stringify(amenities));
      } else if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}`, item);
        });
      } else {
        formData.append(key, value as string);
      }
    });

    console.log('FormData contents:', formData);
    const { data } = await api.post<PropertyResponse>("/property", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('API Response:', data);

    if (data?.success) {
      return {
        status: true,
        data: data,
      };
    }

    return { status: false, message: data?.message };
  } catch (error) {
    console.error('API Error:', error);
    return { status: false, message: "An error occurred." };
  }
};

export { handleCreateProperties };
