import { api } from 'api';

interface Creds {
  email: string;
  password: string;
}

interface User {
  userName: string;
  email?: string;
  role: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  response: {
    timestamp_ms: number;
    data: {
      token: string;
      user: User;
    };
  };
}

export interface UserObject {
  token: string;
  user: User;
}

const handleLoginUser = async (
  creds: Creds,
): Promise<{ status: boolean; userInfo?: UserObject; message?: string }> => {
  try {
    const { data } = await api.post<AuthResponse>('/user/login', creds);
    console.log("LOGIN RESPONSE "+JSON.stringify(data))
    if (data?.response?.data?.token) {
      return {
        status: true,
        userInfo: data.response.data
      };
    }

    return { status: false, message: data?.message };
  } catch (error) {
    return { status: false, message: 'An error occurred.' };
  }
};

export { handleLoginUser };