import { ApiGPT } from "../../services/OpenAI/API";
import { SaveAnswers } from "../../services/OpenAI/message/SaveAnswers";

export default function (socket: WebSocket) {
  console.log("Connected");
  socket.onclose = (event) => {
    console.log("Socket closed");
  };
  socket.onmessage = async (event) => {
    const { action } = JSON.parse(event.data);

    if (action === "RUN-STATUS") {
      const { threadId, runId } = JSON.parse(event.data);

      const interval = setInterval(() => {
        ApiGPT.beta.threads.runs.retrieve(threadId, runId).then(({ status }) => {
          if (status === "completed") {
            SaveAnswers(threadId)
              .then(() => {
                socket.send(JSON.stringify({ status }));
                socket.close();
              })
              .finally(() => {
                clearInterval(interval);
              });
          } else {
            socket.send(JSON.stringify({ status }));
          }
        });
      }, 2000);
    }
  };
}
