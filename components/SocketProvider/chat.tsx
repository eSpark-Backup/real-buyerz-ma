import { UserAllChats } from "app/(user)/[type]/inbox/utils";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import Toast from "react-native-toast-message";
import { io, Socket } from "socket.io-client";
import { storage } from "store/mmkv";

export interface IncomingMessage {
  message: {
    content: string;
    _id: string;
    sender: {
      _id: string;
      name: string;
    };
    chat: string;
    createdAt: string;
  };
  chatId: string;
}

interface ChatMessage {
  chatId: string;
  members: string[];
  messages: string;
}

interface ChatTyping {
  chatId: string;
  members: string[];
}

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  error: Error | null;
  newMessageReceived: ChatMessage | null;
  newAttachments: any | null;
  startTypingReceived: Boolean;
  newMessageAlertReceived: any;
  sendMessage: (chatMessage: ChatMessage) => void;
  startTyping: (chatMessage: ChatTyping) => void;
  stopTyping: (chatMessage: ChatTyping) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
  error: null,
  newMessageReceived: null,
  newAttachments: null,
  startTypingReceived: false,
  newMessageAlertReceived: null,
  sendMessage: () => {},
  startTyping: () => {},
  stopTyping: () => {},
});

export const useChatSocket = () => useContext(SocketContext);

interface SocketChatProviderProps {
  children: ReactNode;
  authToken: string | null;
}

export const SocketChatProvider: React.FC<SocketChatProviderProps> = ({
  children,
  authToken,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [newMessageReceived, setNewMessageReceived] = useState<any>(null);
  const [newMessageAlertReceived, setNewMessageAlertRecieved] =
    useState<any>(null);
  const [newAttachments, setNewAttachments] = useState<any>(null);
  const [startTypingReceived, setStartTyping] = useState<boolean>(false);

  useEffect(() => {
    if (!authToken) return;

    const socketInstance = io(
      "https://dev-express-realbuyerz.esparkconsultants.com/socket",
      {
        extraHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
        transports: ["websocket"],
      }
    );

    socketInstance.on("connect", () => {
      console.log("Socket.IO Chat connected");
      setConnected(true);
      setError(null);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket.IO Chat disconnected");
      setConnected(false);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket.IO Chat connection error:", err);
      setError(err);
    });

    socketInstance.on("NEW_MESSAGE", (chatMessage: ChatMessage) => {
      console.log("New message received:", chatMessage);
      setNewMessageReceived(chatMessage);
    });
    socketInstance.on("NEW_ATTACHMENT", (chatMessage: any) => {
      console.log("New message received:", chatMessage);
      // setNewAttachments(chatMessage);
    });
    socketInstance.on("START_TYPING", (chatMessage: ChatTyping) => {
      console.log("START_TYPING received:", chatMessage);
      setStartTyping(true);
    });
    socketInstance.on("STOP_TYPING", (chatMessage: ChatTyping) => {
      console.log("STOP_TYPING received:", chatMessage);
      setStartTyping(false);
    });

    socketInstance.on("NEW_MESSAGE_ALERT", (data) => {
      let alertCount = new Map<string, number>(
        JSON.parse(storage.getString("alertCount") || "[]")
      );
      const currentCount = alertCount.get(data.chatId) || 0;
      alertCount.set(data.chatId, currentCount + 1);
      storage.set("alertCount", JSON.stringify([...alertCount]));
      setNewMessageAlertRecieved(data);
      setTimeout(() => {
        setNewMessageAlertRecieved(null);
      }, 500);
      console.log("Alert Count Stored:", storage.getString("alertCount"));
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setSocket(null);
      setConnected(false);
    };
  }, [authToken]);

  const sendMessage = (chatMessage: ChatMessage) => {
    if (socket && connected) {
      socket.emit("NEW_MESSAGE", chatMessage);
      console.log("Message sent:", chatMessage);
    } else {
      console.error("Socket Chat is not connected");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to send message. Please check your connection.",
      });
    }
  };
  const startTyping = (ChatTyping: ChatTyping) => {
    if (socket && connected) {
      socket.emit("START_TYPING", ChatTyping);
      console.log("START_TYPING Message sent:", ChatTyping);
    } else {
      console.error("Socket Chat is not connected");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to send message. Please check your connection.",
      });
    }
  };
  const stopTyping = (ChatTyping: ChatTyping) => {
    if (socket && connected) {
      socket.emit("STOP_TYPING", ChatTyping);
      console.log("STOP_TYPING Message sent:", ChatTyping);
    } else {
      console.error("Socket Chat is not connected");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to send message. Please check your connection.",
      });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        error,
        newMessageReceived,
        newAttachments,
        startTypingReceived,
        newMessageAlertReceived,
        sendMessage,
        startTyping,
        stopTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
