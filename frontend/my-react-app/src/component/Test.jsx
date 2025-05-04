// React component to handle Socket.IO notifications
import React, { useEffect } from "react";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
  useEffect(() => {
    const socket = io("http://localhost:3000", {
      auth: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3M2ZkYTA1LWY3MDItNDkyOC05MTIzLWJjMDRhYWJmZTVlMCIsImlhdCI6MTc0NjMzODMxNiwiZXhwIjoxNzQ2MzQxOTE2fQ.neLosgAE04bOyV5DYqZ00dLmi9V8e-zWWLD8WmhcWCY",
      },
    });

    socket.on("connection", () => {
      console.log("user connected");
    });

    socket.on("notifications", (msg) => {
      toast.info(msg);
    });

    socket.on("data", (msg) => {
      toast.info(msg);
    });

    socket.on("remainder", (msg) => {
      console.log(msg);
      toast.info(`${msg.remainderType} \n ${msg.message}`);
    });

    return () => {
      socket.off("disconnect");
    };
  }, []);

  return (
    <div>
      <h1>Real-time Notifications</h1>
      <ToastContainer />
    </div>
  );
};

export default Test;
