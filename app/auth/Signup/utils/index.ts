import Toast from "react-native-toast-message";
import { api } from "api";
import { err } from "react-native-svg";

interface Creds {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  password: string;
  role: string;
  profileImage: string | "";
  socialId: string | "";
}

interface Response {
  success: boolean;
  message: string;
  response: {
    timestamp_ms: number;
    data: {
      token: string | UserObject;
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
  isSocialLogin: boolean
): Promise<{ status: boolean; userInfo?: UserObject; message?: string }> => {
  try {
    const filteredReq: Partial<Creds> = {
      firstName: req.firstName,
      lastName: req.lastName,
      email: req.email,
      role: req.role,
      profileImage: req.profileImage,
      socialId: req.socialId,
    };

    if (req.password != "") {
      filteredReq.password = req.password;
    }
    if (req.mobileNumber != "") {
      filteredReq.mobileNumber = req.mobileNumber;
    }
    const response = await api.post<Response>("/user/signup", {
      ...filteredReq,
    });
    console.log("Reponse signup " + JSON.stringify(response));
    if (response.data?.success) {
      if (isSocialLogin) {
        return {
          status: true,
          userInfo: response.data.response.data.token as UserObject,
        };
      } else {
        return {
          status: true,
          userInfo: response.data.response.data as UserObject,
        };
      }
    } else {
      return { status: false, message: response.data?.message };
    }
  } catch (error) {
    console.log("Error signup " + error);
    return { status: false };
  }
};

export { handleSignUpUser };
