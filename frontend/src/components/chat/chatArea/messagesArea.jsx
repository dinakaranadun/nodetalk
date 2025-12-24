import { useSelector } from "react-redux";
import { selectUser } from "../../../store/auth/authSlice";
import formatChatDate from "../../../utils/formatDate";
import { FileText, Download } from "lucide-react";
import { useRef, useEffect, useMemo } from "react";
import { useGetDMChannelQuery } from "../../../store/chat/chatSliceApi";

const MessagesArea = ({channelId }) => {
  const { data: dmMessages, isLoading, isFetching } = useGetDMChannelQuery(channelId, {
      skip: !channelId, 
      refetchOnMountOrArgChange: true, 
    });
  const currentMessages = useMemo(() => dmMessages?.data || [], [dmMessages?.data]);
  const me = useSelector(selectUser)?._id;
  const bottomRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [currentMessages?.length]);

  const isImage = (type) => type === "image";
  const isFile = (type) => type === "file" || type === "audio";

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gray-50">
      {isLoading || isFetching ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Loading messages...</p>
        </div>
      ) : currentMessages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Say Hi...👋</p>
        </div>
      ) : (
        <>
          {currentMessages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.senderId._id === me ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 py-2 sm:px-4 rounded-2xl ${
                  msg.senderId._id === me
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white text-gray-900 rounded-bl-sm shadow-sm"
                }`}
              >
                {/* Media Content */}
                {msg.mediaUrl && msg.type !== "text" && (
                  <div className={msg.content ? "mb-2 capitalize" : ""}>
                    {isImage(msg.type) ? (
                      <div className="relative group">
                        <img
                          src={msg.mediaUrl}
                          alt={msg.mediaName || "Image"}
                          loading="lazy"
                          className="max-w-full max-h-64 rounded-lg object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/image-placeholder.png";
                          }}
                        />
                      </div>
                    ) : isFile(msg.type) ? (
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          msg.senderId._id === me
                            ? "bg-blue-700 hover:bg-blue-800"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => handleDownload(msg.mediaUrl, msg.mediaName)}
                      >
                        <FileText className="text-white" size={32} />
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium truncate ${
                              msg.senderId._id === me ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {msg.mediaName || "Download File"}
                          </p>
                          {msg.mediaSize && (
                            <p
                              className={`text-xs ${
                                msg.senderId._id === me ? "text-blue-100" : "text-gray-500"
                              }`}
                            >
                              {(msg.mediaSize / 1024).toFixed(2)} KB
                            </p>
                          )}
                        </div>
                        <Download
                          className={msg.senderId._id === me ? "text-white" : "text-gray-600"}
                          size={20}
                        />
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Text Content */}
                {msg.content && (
                  <p className="text-sm break-words whitespace-pre-wrap">{msg.content}</p>
                )}

                {/* Timestamp */}
                <p
                  className={`text-xs mt-1 ${
                    msg.senderId._id === me ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {formatChatDate(msg.createdAt)}
                </p>
              </div>
            </div>
          ))}

          {/* Scroll */}
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
};

export default MessagesArea;
