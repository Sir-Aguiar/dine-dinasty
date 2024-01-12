export default function (socket: WebSocket) {
  socket.onmessage = (event) => {
    const { action } = JSON.parse(event.data);

    switch (action) {
      case "RUN-THREAD":
        // Run Thread
        break;

      default:
        // Nothing
        break;
    }
  };
}
