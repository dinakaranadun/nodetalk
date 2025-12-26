import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/auth/authSlice";
import { setOnlineUsers } from "../store/chat/chatSlice";
import socket from "../config/socketIo";

const SocketProvider = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && !socket.connected) {
      socket.connect();
    }

    if (!isAuthenticated && socket.connected) {
      socket.disconnect();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleOnlineUsers = (users) => {
      dispatch(setOnlineUsers(users));
    };

    socket.on("getOnlineUsers", handleOnlineUsers);

    return () => {
      socket.off("getOnlineUsers", handleOnlineUsers);
    };
  }, [isAuthenticated, dispatch]);

  return children;
};

export default SocketProvider;
