import { api } from "api/chat";

interface ApiResponse {
  Chats: Chat[];
  message: string;
}
interface ApiChatDetailResponse {
  chat: ChatDetails;
  success: Boolean;
}
interface ApiUserAllChats {
  messages: UserAllChats[];
  success: Boolean;
  totalPages: number;
}

interface Chat {
  _id: string;
  name: string;
  members: {
    avatar: Avatar;
    _id: string;
    name: string;
  };
  biddingId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastMessage: UserAllChats;
}

interface Avatar {
  url: string;
}

interface ChatDetails {
  _id: string;
  name: string;
  members: string[];
  biddingId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface File extends Blob {
  uri: string;
  type: string;
  name: string;
  lastModified: number;
  size: number;
}

interface UserAllChats {
  _id: string;
  sender: Sender;
  chat: string;
  content: string;
  attachments: Attachments[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Attachments {
  public_id: string;
  url: string;
  id: string;
}

interface Sender {
  _id: string;
  name: string;
  avatar: Avatar;
}

const handleGetChats = async (): Promise<{
  status: boolean;
  chats?: Chat[];
  message?: string;
}> => {
  try {
    const response = await api.get<ApiResponse>("/chat/my");

    if (response && response.data) {
      const { data } = response;
      // console.log("CHATS RESPONSE:", JSON.stringify(data));

      if (data.Chats) {
        return {
          status: true,
          chats: data.Chats,
        };
      }

      return {
        status: false,
        message: data.message || "No chats found.",
      };
    }

    return {
      status: false,
      message: "No data received from server.",
    };
  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message ||
        "An error occurred while fetching chats.",
    };
  }
};

const handleChatDetails = async (
  chatId: string
): Promise<{
  status: boolean;
  chatDetails?: ChatDetails;
  message?: string;
}> => {
  try {
    const response = await api.get<ApiChatDetailResponse>(`/chat/${chatId}`);

    if (response && response.data) {
      const { data } = response;
      // console.log("CHATS Details:", JSON.stringify(data));

      if (data.chat) {
        return {
          status: true,
          chatDetails: data.chat,
        };
      }

      return {
        status: false,
        message: "No chat details found.",
      };
    }

    return {
      status: false,
      message: "No data received from server.",
    };
  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message ||
        "An error occurred while fetching chats.",
    };
  }
};

const handleAllUserChats = async (
  chatId: string
): Promise<{
  status: boolean;
  userAllChats?: UserAllChats[];
  message?: string;
}> => {
  try {
    const response = await api.get<ApiUserAllChats>(`chat/message/${chatId}`);

    if (response && response.data) {
      const { data } = response;
      // console.log("User All Chats:", JSON.stringify(data));

      if (data.messages) {
        return {
          status: true,
          userAllChats: data.messages,
        };
      }

      return {
        status: false,
        message: "No user chats found.",
      };
    }

    return {
      status: false,
      message: "No data received from server.",
    };
  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message ||
        "An error occurred while fetching chats.",
    };
  }
};

const handleChatAttachments = async (
  chatId: string,
  profileImageFile?: File | null
): Promise<{
  status: boolean;
  data?: any;
  message?: string;
}> => {
  try {
    const formData = new FormData();
    if (profileImageFile != null) {
      formData.append('files', profileImageFile);
    }
    formData.append('chatId', chatId);
    const { data } = await api.post<any>("chat/upload", formData, {
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
    console.log(`Response FORMDATA ${JSON.stringify(formData)}`)
    console.log(`Response ${JSON.stringify(data)}`)
    return { status: false, message: data?.message || "Update failed." };
  } catch (error) {
    return { status: false, message: "An error occurred." };
  }
};


export {
  handleGetChats,
  handleChatDetails,
  handleChatAttachments,
  handleAllUserChats,
  UserAllChats,
  ChatDetails,
  Chat,
};
