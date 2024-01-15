import { useChatContext } from "../../../contexts/Chat";
import AssistantMessage from "../AssistantMessage/AssistantMessage";
import Message from "../Message/Message";

export const ChatHistory: React.FC = () => {
  const { chatMessages, runStatus } = useChatContext();

  return (
    <div className="chat-messages">
      {chatMessages.map(
        ({ content, messageId, role }) => role === "user" && <Message content={content} key={messageId} />,
      )}
      {runStatus === "in_progress" && (
        <div className="ai-loader">
          <header>
            <span className={`w-5 h-5 rounded-full bg-orange-400`}></span>
            <span className="font-semibold">Chef Chico</span>
          </header>
          <div className="spinner"></div>
        </div>
      )}
      {chatMessages.map(
        ({ content, messageId, role }) =>
          role === "assistant" && (
            <AssistantMessage
              ingredients={JSON.parse(content).ingredients}
              prepare={JSON.parse(content).prepare}
              key={messageId}
            />
          ),
      )}
    </div>
  );
};
