export const connectSocket = () => {
  const socket = new WebSocket("ws://localhost:8080");

  return socket;
};
