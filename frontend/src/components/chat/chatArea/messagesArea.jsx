import { useSelector } from "react-redux";
import { selectUser } from "../../../store/auth/authSlice";
import formatChatDate from "../../../utils/formatDate";
import { FileText, Download } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useGetDMChannelQuery } from "../../../store/chat/chatSliceApi";
import socket from "../../../config/socketIo";
import { useHandleDownlaod } from "../../../hooks/handleDownload";

const MessagesArea = ({ channelId, userId }) => {
  const { data: dmMessages, isLoading, isFetching } =
    useGetDMChannelQuery(userId, {
      skip: !userId,
      refetchOnMountOrArgChange: true,
    });

  // Store all socket messages with their channelId
  const [socketMessages, setSocketMessages] = useState([]);
  const me = useSelector(selectUser)?._id;
  const bottomRef = useRef(null);

  const { handleDownload } = useHandleDownlaod();

  // Filter socket messages for current channel and combine with API data
  const currentMessages = [
    ...(dmMessages?.data || []),
    ...socketMessages.filter(msg => msg.channelId === channelId)
  ];

  useEffect(() => {
    if (!socket || !channelId) return;

    const handleNewMessage = (newMessage) => {
      if (newMessage.channelId !== channelId) return;

      setSocketMessages((prev) => {
        const exists = prev.some((msg) => msg._id === newMessage._id);
        if (exists) return prev;
        return [...prev, newMessage];
      });
    };

    socket.on("message", handleNewMessage);

    return () => {
      socket.off("message", handleNewMessage);
    };
  }, [channelId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length]);

  const isImage = (type) => type === "image";
  const isFile = (type) => type === "file" || type === "audio";

  const isMyMessage = (msg) => {
    if (!me || !msg?.senderId) return false;

    if (typeof msg.senderId === "string") {
      return msg.senderId === me;
    }

    return msg.senderId?._id === me;
  };

  const handleDownloadFile = async (url, filename) => {
    handleDownload(url, filename);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gray-50">
      {isLoading || isFetching ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Loading messages...</p>
        </div>
      ) : currentMessages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Say Hi... 👋</p>
        </div>
      ) : (
        <>
          {currentMessages.map((msg) => {
            const isMe = isMyMessage(msg);

            return (
              <div
                key={msg._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 py-2 sm:px-4 rounded-2xl ${
                    isMe
                      ? "bg-purple-600 text-white rounded-br-sm"
                      : "bg-white text-gray-900 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {/* Media */}
                  {msg.mediaUrl && msg.type !== "text" && (
                    <div className={msg.content ? "mb-2" : ""}>
                      {isImage(msg.type) ? (
                        <img
                          src={msg.mediaUrl}
                          alt={msg.mediaName || "Image"}
                          loading="lazy"
                          className="max-w-full max-h-64 rounded-lg object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/image-placeholder.png";
                          }}
                        />
                      ) : isFile(msg.type) ? (
                        <div
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                            isMe
                              ? "bg-purple-700 hover:bg-purple-800"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                          onClick={() =>
                            handleDownloadFile(msg.mediaUrl, msg.mediaName)
                          }
                        >
                          <FileText
                            className={isMe ? "text-white" : "text-gray-600"}
                            size={32}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {msg.mediaName || "Download file"}
                            </p>
                            {msg.mediaSize && (
                              <p className="text-xs opacity-70">
                                {(msg.mediaSize / 1024).toFixed(2)} KB
                              </p>
                            )}
                          </div>
                          <Download size={20} />
                        </div>
                      ) : null}
                    </div>
                  )}

                  {/* Text */}
                  {msg.content && (
                    <p className="text-sm break-words whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  )}

                  {/* Time */}
                  <p
                    className={`text-xs mt-1 ${
                      isMe ? "text-purple-200" : "text-gray-500"
                    }`}
                  >
                    {formatChatDate(msg.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
};

export default MessagesArea;