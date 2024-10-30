import { api } from 'api';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  response: T;
}

interface ReqSendOtp {
  phoneNumber: string;
}

export interface ReqVerifyOTP {
  emailPhone: string;
  otp: string;
  hash: string;
  password: String
}

export interface PasswordResetEmailRequest {
  email: string;
}

interface ResponseDataSendOtp {
  otphash: string;
}

interface ResponseDataVerifyOTP {
  phoneNumber: string;
}

interface ResponseDataResetLink {
  timestamp_ms: number;
  action: string;
  data: ResponseDataSendOtp;
}


const handleApiError = (error: any): { status: boolean; message: string } => {
  if (error.response?.data?.message) {
    return { status: false, message: error.response.data.message };
  }
  return { status: false, message: 'Something went wrong, please try again later.' };
};


const handleSendOTP = async (
  req: ReqSendOtp
): Promise<{ status: boolean; data?: ResponseDataSendOtp; message: string }> => {
  try {
    const response = await api.put<ApiResponse<ResponseDataSendOtp>>('user/send-otp', req);
    if (response.data?.success) {
      return { status: true, data: response.data.response, message: response.data.message };
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
    const response = await api.post<ApiResponse<ResponseDataVerifyOTP>>('user/verify-otp', req);
    if (response.data?.success) {
      return { status: true, message: response.data.message };
    } else {
      return { status: false, message: response?.data?.message ?? 'An error occurred' };
    }
  } catch (error) {
    return handleApiError(error);
  }
};

const handlePasswordResetEmail = async (
  req: PasswordResetEmailRequest
): Promise<{ status: boolean; data?:ResponseDataSendOtp, message: string }> => {
  try {
    const response = await api.post<ApiResponse<ResponseDataResetLink>>('/user/resetPassword', req);
    if (response.data?.success) {
      return { status: true, data:response.data.response.data, message: response.data.message };
    } else {
      return { status: false, message: response?.data?.message ?? 'An error occurred' };
    }
  } catch (error) {
    return handleApiError(error);
  }
};

export { handleSendOTP, handleVerifyOTP, handlePasswordResetEmail };
