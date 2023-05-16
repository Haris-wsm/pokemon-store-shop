import { io } from "socket.io-client";

const socketInit = () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  return io(process.env.NEXT_PUBLIC_BACKEND_DOMAIN, options);
};

export default socketInit;
