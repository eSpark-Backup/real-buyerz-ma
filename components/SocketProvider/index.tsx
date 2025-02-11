import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import Toast from "react-native-toast-message";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  error: Error | null;
  newLoginMessage: any;
  refetchChats: Boolean;
  sendMessage: (message: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
  error: null,
  newLoginMessage: null,
  refetchChats: false,
  sendMessage: () => {},
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
  authToken: string | null;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  authToken,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [newLoginMessage, setNewLoginMessage] = useState<any>(null);
  const [refetchChats, setNewRefetchChats] = useState<Boolean>(false);

  useEffect(() => {
    console.log("authToken:", authToken);
    if (!authToken) return;

    const socketInstance = io("https://dev-nest-realbuyerz.esparkconsultants.com/socket", {
      extraHeaders: {
      Authorization: `Bearer ${authToken}`
      },
      transports: ['websocket']
    });

    socketInstance.on("connect", () => {
      console.log("Socket.IO connected");
      setConnected(true);
      setError(null);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket.IO disconnected");
      setConnected(false);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket.IO connection error:", err);
      setError(err);
    });

    socketInstance.on("NEW_LOGIN", (data) => {
      console.log("New login event received:", data);
      setNewLoginMessage(data);
    });
    socketInstance.on("REFETCH_CHATS", (data) => {
      console.log("REFETCH_CHATS:", data);
      setNewRefetchChats(true);
      setTimeout(() => setNewRefetchChats(false), 100);
    });

    socketInstance.on("NEW_BIDDING", (data) => {
      console.log("NEW_BIDDING:", data);
      setTimeout(() => {
        Toast.show({
          type: "info",
          text1: data.title || "New Bidding Alert",
          text2: data.message || "A new bid has been placed!",
          position: "top",
          visibilityTime: 4000,
          autoHide: true,
        });
      }, 100);
    });
    
    console.log("socketInstance:", socketInstance);
    setSocket(socketInstance);

    // return () => {
    //   socketInstance.disconnect();
    //   setSocket(null);
    //   setConnected(false);
    // };
  }, [authToken]);

  const sendMessage = (message: string) => {
    if (socket && connected) {
      socket.emit('message', message);
    } else {
      console.error("Socket is not connected");
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        error,
        newLoginMessage,
        refetchChats,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
