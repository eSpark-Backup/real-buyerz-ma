import Toast from 'react-native-toast-message';
import {api} from 'api';

interface Creds {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  password: string;
  role: string;
}

interface Response {
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

interface User {
  userName: string;
  email?: string;
  role: string;
}

export interface UserObject {
  token: string;
  user: User;
}


const handleSignUpUser = async (
  req: Creds,
): Promise<{status: boolean; userInfo?: UserObject; message?: string}> => {
  try {
    const response = await api.post<Response>('/user/signup', {
      ...req,
    });
    if (response.data?.success) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: response?.data?.message,
        topOffset: 0,
      });
      return {status: true,userInfo: response.data.response.data};  
      } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: response?.data?.message,
        topOffset: 0,
      });
      return {status: false, message: response.data?.message};
    }
  } catch (error) {
    return {status: false};
  }
};

export {handleSignUpUser};
