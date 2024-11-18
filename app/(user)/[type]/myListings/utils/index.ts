import { api } from "api";


export interface Amenity {
  name: string,
  count: number,
  imageUrl: string
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
  propertyID: string,
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
  propertyStatus: boolean,
  amenity: []
  amenities: string
}

export interface ImageFile extends Blob {
  uri: string;
  type: string;
  name: string;
}

const handleCreatePropertiesAndProposal = async (reqPropertyData: ReqPropertyData, type: string): Promise<{
  status: boolean;
  data?: PropertyResponse;
  message?: string;
}> => {
  try {
    let requestData: any = {};
    const formData = new FormData();
    Object.keys(reqPropertyData).forEach(key => {
      const value = reqPropertyData[key as keyof ReqPropertyData];
      if (type === 'user') {
        if (key === 'propertyID' || key === 'image' || key === 'video') {
          return;
        }
        requestData[key] = value;
      } else {
        if(key==='propertyID'){
          formData.append('userPropertyId', value as string)
        }
        else if (key === 'image') {
          const images = value as ImageFile[];
          images.forEach((image) => {
            formData.append('image', image);
          });
        } else if (key === 'video') {
          const videos = value as string[];
          videos.forEach((video) => {
            formData.append('video', video);
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
      }
    });
    console.log(`formData ${JSON.stringify(formData)}`);

    const endpoint = type === 'user' ? '/userProperty' : reqPropertyData?.propertyID && reqPropertyData.propertyID.trim() !== '' ? `/bidding/singleProperty` : '/property';
    console.log(`endPoint ${endpoint}`)
    const { data } = type === 'user' ? await api.post<PropertyResponse>(endpoint, requestData) : await api.post<PropertyResponse>(endpoint, formData, {
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

const handleDraftProperty = async (propertyId: string): Promise<{ status: boolean; properties?: PropertyResponse; message?: string }> => {
  try {
    const formData = new FormData();
    formData.append('propertyStatus', 'false');
    const { data } = await api.put<PropertyResponse>(`/property/${propertyId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("Draft  " + JSON.stringify(formData))

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

export { handleCreatePropertiesAndProposal, handleDraftProperty };
