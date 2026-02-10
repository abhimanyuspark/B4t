import Container from "../../../components/common/Container";
import { useEffect, useState } from "react";
import { useSocket } from "../../../redux/context/SocketContext";
import { useSelector } from "react-redux";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useSocket();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      // if (user?._id === data?.id) {
      setMessages((prev) => [...prev, data]);
      // }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      id: user?._id,
      text: message,
      time: Date.now(),
    });
    setMessage("");
  };

  return (
    <div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>

      {messages.map((m, i) => (
        <p key={i}>
          {m.id} {m.text} {m.time}
        </p>
      ))}
    </div>
  );
};

const Notification = () => {
  return (
    <Container>
      <Chat />
    </Container>
  );
};

export default Notification;
