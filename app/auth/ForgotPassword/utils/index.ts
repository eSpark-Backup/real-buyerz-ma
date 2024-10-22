import Toast from 'react-native-toast-message';
import { api } from 'api';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  response: T;
}

interface ReqSendOtp {
  phoneNumber: string;
}

interface ReqVerifyOTP {
  phoneNumber: string;
  otp: string;
  hash: string;
}

interface PasswordResetEmailLink {
  to: string;
}

interface ReqResetPassword {
  password: string;
  oldPassword: string;
}

interface ResponseDataSendOtp {
  phoneNumber: string;
}

interface ResponseDataVerifyOTP {
  phoneNumber: string;
}

interface ResponseDataResetLink {
  timestamp_ms: number;
  action: string;
  data: null;
}

interface ResponseDataResetPassword {
  success: boolean;
  message: string;
}

const handleApiError = (error: any): { status: boolean; message: string } => {
  if (error.response?.data?.message) {
    return { status: false, message: error.response.data.message };
  }
  return { status: false, message: 'Something went wrong, please try again later.' };
};


const handleSendOTP = async (
  req: ReqSendOtp
): Promise<{ status: boolean; message: string }> => {
  try {
    const response = await api.put<ApiResponse<ResponseDataSendOtp>>('user/send-otp', req);
    if (response.data?.success) {
      return { status: true, message: response.data.message };
    } else {
      return { status: false, message: response?.data?.message ?? 'An error occurred' };
    }
  } catch (error) {
    return handleApiError(error);
  }
};

const handleVerifyOTP = async (
  req: ReqVerifyOTP
): Promise<{ status: boolean; message: string }> => {
  try {
    const response = await api.put<ApiResponse<ResponseDataVerifyOTP>>('user/verify-otp', req);
    if (response.data?.success) {
      return { status: true, message: response.data.message };
    } else {
      return { status: false, message: response?.data?.message ?? 'An error occurred' };
    }
  } catch (error) {
    return handleApiError(error);
  }
};

const handlePasswordResetEmailLink = async (
  req: PasswordResetEmailLink
): Promise<{ status: boolean; message: string }> => {
  try {
    const response = await api.put<ApiResponse<ResponseDataResetLink>>('/user/password-reset-email-link', req);
    if (response.data?.success) {
      return { status: true, message: response.data.message };
    } else {
      return { status: false, message: response?.data?.message ?? 'An error occurred' };
    }
  } catch (error) {
    return handleApiError(error);
  }
};

const handleResetPass = async (
  req: ReqResetPassword
): Promise<{ status: boolean; message: string }> => {
  try {
    const response = await api.post<ApiResponse<ResponseDataResetPassword>>('user/reset-password', req);
    if (response.data?.success) {
      return { status: true, message: response.data.message };
    } else {
      return { status: false, message: response?.data?.message ?? 'An error occurred' };
    }
  } catch (error) {
    return handleApiError(error);
  }
};

const showToast = (status: boolean, message: string) => {
  if (status) {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: message,
    });
  } else {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
    });
  }
};

export { handleSendOTP, handleVerifyOTP, handlePasswordResetEmailLink, handleResetPass, showToast };
