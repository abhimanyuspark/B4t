import { createContext, useContext, useEffect } from "react";
import socket from "../services/socket";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    // 🔐 attach token if you use auth
    // const token = localStorage.getItem("token");

    // if (token) {
    //   socket.auth = { token };
    // }

    // 🔌 connect once
    socket.connect();
    // console.log("Socket connected");

    socket.on("connect_error", (err) => {
      console.error("Socket error:", err.message);
    });

    return () => {
      // 🔌 disconnect when app unmounts
      socket.disconnect();
      // console.log("Socket disconnected");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// custom hook (clean usage)
export const useSocket = () => {
  return useContext(SocketContext);
};
