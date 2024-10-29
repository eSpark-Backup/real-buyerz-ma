import { api } from 'api';
import { File } from '..';
import { PreferencesData } from 'app/(user)/[type]/preferences/utils';

interface UserResponse {
  success: boolean;
  message: string;
  response: {
    timestamp_ms: number;
    data: UserProfileData
  };
}

export interface UserProfileData {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  mobileNumber: string
  landlineNumber: string;
  city: string;
  bio: string;
  whatsapp: string;
  country: string;
  address: string;
  isVerified: boolean;
  socialId: string;
  profileImage: string;
  profileVisibility: boolean;
  role: string;
  preferences: PreferencesData | null;
}

export interface ChangePassword {
  password: string;
  oldPassword: string;
}


const handleGetUserProfile = async (): Promise<{
  status: boolean;
  data?: UserProfileData;
  message?: string;
}> => {
  try {
    const { data } = await api.get<UserResponse>("/user/userProfile");
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

const handleUpdateUserProfile = async (
  userProfileData: UserProfileData,
  profileImageFile?: File | null
): Promise<{
  status: boolean;
  data?: UserProfileData;
  message?: string;
}> => {
  try {
    const formData = new FormData();

    Object.keys(userProfileData).forEach(key => {
      if (key === 'profileImage' || key === 'email' || key === 'mobileNumber' || key === 'role' || key === 'id' || key === 'preferences') return;
      const value = userProfileData[key as keyof UserProfileData];
      if (typeof value === 'string' && value !== undefined) {
        formData.append(key, value);
      } else if (typeof value === 'boolean') {
        formData.append(key, value.toString());
      } else {
        console.warn(`Skipping ${key}: expected a string but got ${typeof value}`);
      }
    });

    if (profileImageFile != null) {
      formData.append('image', profileImageFile);
    }

    const { data } = await api.post<UserResponse>("/user/update", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (data?.success) {
      return {
        status: true,
        data: data.response.data,
      };
    }
    console.log(`Response ${JSON.stringify(data)}`)
    return { status: false, message: data?.message || "Update failed." };
  } catch (error) {
    return { status: false, message: "An error occurred." };
  }
};

const handleUserChangePassword = async (
  changePassword: ChangePassword,
): Promise<{ status: boolean; message?: string }> => {
  try {
    const { data } = await api.post<UserResponse>('user/reset-password', changePassword);
    return { status: data?.success || false, message: data?.message };
  } catch (error) {
    return { status: false, message: 'An error occurred.' };
  }
};



export { handleGetUserProfile, handleUpdateUserProfile, handleUserChangePassword };
