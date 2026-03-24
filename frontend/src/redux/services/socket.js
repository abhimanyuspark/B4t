import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_STATIC_URL, {
  autoConnect: false,
  transports: ["websocket"],
});

export default socket;
