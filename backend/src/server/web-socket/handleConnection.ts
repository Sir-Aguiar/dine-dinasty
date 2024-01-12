import { ApiGPT } from "../../services/OpenAI/API";
import { SaveAnswers } from "../../services/OpenAI/message/SaveAnswers";

export default function (socket: WebSocket) {
  socket.onmessage = async (event) => {
    const { action } = JSON.parse(event.data);

    if (action === "RUN-STATUS") {
      const { threadId, runId } = JSON.parse(event.data);

      const interval = setInterval(() => {
        ApiGPT.beta.threads.runs.retrieve(threadId, runId).then(({ status }) => {
          socket.send(JSON.stringify({ status }));

          if (status === "completed") {
            SaveAnswers(threadId);
            clearInterval(interval);
          }
        });
      }, 2000);
    }
  };
}
