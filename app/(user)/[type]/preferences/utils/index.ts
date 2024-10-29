import { api } from 'api';

export interface PreferencesData {
  emailNotification: boolean;
  newsLetter: boolean;
  automatedReport: boolean;
  currency: string;
  areaUnit:string;
}


interface PreferencesResponse {
  success: boolean;
  message: string;
  response: {
    timestamp_ms: number;
    data: {
      id: string;
      userId: string;
      emailNotification: boolean;
      newsLetter: boolean;
      automatedReport: boolean;
      currency: string;
      areaUnit: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}


const handleSavePreferences = async (
  reqPreferences: PreferencesData,
): Promise<{ status: boolean; preferencesResponse?: PreferencesResponse; message?: string }> => {
  try {
    const { data } = await api.post<PreferencesResponse>('/user/preferences', reqPreferences);
    if (data?.response?.data) {
      return {
        status: true,
        preferencesResponse: data
      };
    }
    return { status: false, message: data?.message };
  } catch (error) {
    return { status: false, message: 'An error occurred.' };
  }
};

export { handleSavePreferences };