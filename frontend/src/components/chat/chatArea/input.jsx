import { Paperclip, Send, Smile, X, FileText } from 'lucide-react';
import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import EmojiPicker from './emoji';

const filePreview = () => (
  <div className="mb-3 relative inline-block">
          {fileType === 'image' ? (
            <div className="relative">
              <img
                src={filePreview}
                alt="Preview"
                className="max-w-xs max-h-32 rounded-lg border-2 border-gray-300 object-cover"
              />
              <button
                onClick={removeFile}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-lg border-2 border-gray-300 max-w-xs">
              <FileText className="text-red-500 flex-shrink-0" size={24} />
              <span className="text-sm text-gray-700 truncate flex-1">
                {filePreview}
              </span>
              <button
                onClick={removeFile}
                className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors flex-shrink-0"
                aria-label="Remove PDF"
              >
                <X size={14} />
              </button>
            </div>
        )}
      </div>
)


const Input = forwardRef(({ message, setMessage, handleSendMessage, fileRef }, ref) => {
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  // Expose reset function to parent
  useImperativeHandle(ref, () => ({
    resetFile: () => {
      setFilePreview(null);
      setFileType(null);
      if (fileRef.current) {
        fileRef.current.value = '';
      }
    }
  }));

 

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = file.type;
    
    if (type.startsWith('image/')) {
      setFileType('image');
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result);
      reader.readAsDataURL(file);
    } else if (type === 'application/pdf') {
      setFileType('pdf');
      setFilePreview(file.name);
    }
  };

  const removeFile = () => {
    setFilePreview(null);
    setFileType(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t border-gray-200 p-3 sm:p-4 bg-white relative">
      {/* File Preview */}
      {filePreview && (
        <div className="mb-3 relative inline-block">
          {fileType === 'image' ? (
            <div className="relative">
              <img
                src={filePreview}
                alt="Preview"
                className="max-w-xs max-h-32 rounded-lg border-2 border-gray-300 object-cover"
              />
              <button
                onClick={removeFile}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-lg border-2 border-gray-300 max-w-xs">
              <FileText className="text-red-500 flex-shrink-0" size={24} />
              <span className="text-sm text-gray-700 truncate flex-1">
                {filePreview}
              </span>
              <button
                onClick={removeFile}
                className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors flex-shrink-0"
                aria-label="Remove PDF"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Input Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <input
          type="file"
          ref={fileRef}
          onChange={handleFileChange}
          accept="image/*,application/pdf"
          className="hidden"
        />
        
        <button
          onClick={() => fileRef.current?.click()}
          className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Attach file"
        >
          <Paperclip size={20} />
        </button>

        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full transition-colors relative"
          aria-label="Add emoji"
        >
          <Smile size={20} />
        </button>

        {/* Emoji Picker Popup */}
        {showEmojiPicker && (
          <EmojiPicker emojiPickerRef={emojiPickerRef} setShowEmojiPicker={setShowEmojiPicker} handleEmojiClick={handleEmojiClick} />
        )}

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 sm:px-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />

        <button
          onClick={handleSendMessage}
          disabled={!message.trim() && !filePreview}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  )
})

export default Input;