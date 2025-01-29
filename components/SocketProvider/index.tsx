import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface SocketContextType {
  socket: WebSocket | null;
  connected: boolean;
  error: Error | Event | null;
  newLoginMessage: any;
  sendMessage: (message: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
  error: null,
  newLoginMessage: null,
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
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<Error | Event | null>(null);
  const [newLoginMessage, setNewLoginMessage] = useState<any>(null);

  useEffect(() => {
    let ws: WebSocket | null = null;

    const connectWebSocket = () => {
      console.log("authtoken"+authToken)
      if (!authToken) return;

      try {
        ws = new WebSocket("ws://52.55.77.181/socket/", `Bearer ${authToken}`);
        console.log("connecting")

        ws.onopen = () => {
          console.log("WebSocket connected");
          setConnected(true);
          setError(null);
        };

        ws.onclose = () => {
          console.log("WebSocket disconnected");
          setConnected(false);
        };

        ws.onerror = (err: Event) => {
          console.error("WebSocket error:", err);
          setError(err);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.event === "NEW_LOGIN") {
              console.log("New login event received:", data);
              setNewLoginMessage(data);
            }
          } catch (err) {
            console.error("Error parsing message:", err);
          }
        };

        setSocket(ws);
      } catch (err) {
        console.error("WebSocket connection error:", err);
        setError(err as Error);
      }
    };

    connectWebSocket();

    // Cleanup function
    return () => {
      if (ws) {
        ws.close();
        setSocket(null);
        setConnected(false);
      }
    };
  }, [authToken]);

  const sendMessage = (message: string) => {
    if (socket && connected) {
      socket.send(message);
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
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};