import { useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import { useSocket } from "../../../redux/context/SocketContext";
import { useSelector } from "react-redux";
import Container from "../../../components/common/Container";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

const ChatList = ({ bookingId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useSocket();
  const { user } = useSelector((state) => state.auth);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_${bookingId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [bookingId]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      if (bookingId === data?.bookingId) {
        setMessages((prev) => {
          const updated = [...prev, data];
          // Save to localStorage
          localStorage.setItem(`chat_${bookingId}`, JSON.stringify(updated));
          return updated;
        });
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [bookingId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    const newMessage = {
      bookingId: bookingId,
      id: user?._id,
      text: message,
      time: Date.now(),
    };
    socket.emit("sendMessage", newMessage);
    setMessage("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      sendMessage();
    }
  };

  const Text = ({ m }) => {
    return (
      <div className="flex flex-col">
        <span>{m.text}</span>
        <span>{new Date(m.time).toLocaleTimeString()}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-2">
        <ul className="flex gap-2 flex-col">
          {messages.map((m, i) => {
            if (m.id === user?._id) {
              return (
                <li className="flex justify-end w-full" key={i}>
                  <div className="px-2 py-1 rounded-xl bg-green-400">
                    <Text m={m} />
                  </div>
                </li>
              );
            } else {
              return (
                <li className="flex justify-start w-full" key={i}>
                  <div className="px-2 py-1 rounded-xl bg-gray-300">
                    <Text m={m} />
                  </div>
                </li>
              );
            }
          })}
          <div ref={messagesEndRef} />
        </ul>
      </div>

      <form
        onSubmit={onSubmit}
        className="fixed bg-white shadow-3xl shadow-gray-400 bottom-16 left-0 sm:left-70 sm:w-268 w-full"
      >
        <div className="flex gap-2 px-2 py-1 w-full">
          <div className="flex-1">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button className="flex-0 py-0!" type="submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

const Chat = () => {
  const { id } = useParams();

  return (
    <Container className="min-h-0! h-[calc(100vh-13.5rem)]!">
      <ChatList bookingId={id} />
    </Container>
  );
};

export default Chat;
