import React, { useEffect, useState } from "react";
import "./styles/chatroom.css";
import io from "socket.io-client";
import queryString from "query-string";

let socket;

const Chatroom = ({ location }) => {
  const defaultRoom = "room1";

  const [name, setName] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  socket = io("localhost:2000");

  useEffect(() => {
    const { email } = queryString.parse(location.search);
    console.log("name=", socket);
    setName(email);

    console.log("name=", name);
    socket.emit("join", { name, defaultRoom }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [location.search, name]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);
      console.log(messages);
      setUsers(message.user);
      console.log(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", { name, message, defaultRoom }, () =>
        setMessage("")
      );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header bg-dark text-white">chatbox</div>

            <div className="card-body">
              {messages.map((message, i) => (
                <div key={i}>
                  <div
                    className={
                      message.user === name ? "  ownMessage" : " otherMessage"
                    }
                  >
                    {message.text}
                  </div>{" "}
                  {message.user}
                </div>
              ))}
            </div>
            <div className="card-footer">
              <form>
                <input
                  type="text"
                  name="message"
                  placeholder="Say something!"
                  className="form-control"
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                />
                <button
                  onClick={sendMessage}
                  className="form-control"
                  className="btn btn-block bg-dark text-white"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chatroom;
