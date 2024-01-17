import { ThreadQueryRepository } from "../../repositories/Thread/ThreadQueryRepository";
import { SaveAnswers } from "../../services/OpenAI/message/SaveAnswers";
import { CheckRunStatus } from "../../services/OpenAI/run/CheckStatus";

export default function (socket: WebSocket) {
  console.log("Connected");

  socket.onclose = (event) => {
    console.log("Socket closed");
  };

  socket.onmessage = async (event) => {
    const { action, authToken } = JSON.parse(event.data);

    if (!authToken) return socket.close();

    if (action === "RUN-STATUS") {
      const { threadId, runId } = JSON.parse(event.data);

      let response: any = { action: "RUN-STATUS" };

      const interval = setInterval(() => {
        CheckRunStatus({ runId, threadId }).then(({ status }) => {
          if (status === "completed") {
            SaveAnswers(threadId)
              .then(() => {
                response.status = status;
                socket.send(JSON.stringify(response));
                socket.close();
              })
              .catch((error) => {
                response.error = error.message;
                socket.send(JSON.stringify(response));
                clearInterval(interval);
                socket.close();
              })
              .finally(() => {
                clearInterval(interval);
              });
          } else {
            response.status = status;
            socket.send(JSON.stringify(response));
          }
        });
      }, 2000);
    }
  };
}
