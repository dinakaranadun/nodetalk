import { X } from 'lucide-react';
import React from 'react'
 
const emojis = [
    '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂',
    '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛',
    '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏',
    '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩',
    '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
    '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
    '👆', '👇', '☝️', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️',
    '🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '🥈', '🥉', '⭐', '🌟',
    '💯', '🔥', '✨', '💥', '💫', '💢', '💦', '💨', '🕳️', '💬'
  ];


const EmojiPicker = ({emojiPickerRef,setShowEmojiPicker,handleEmojiClick}) => {
  return (
    <div
        ref={emojiPickerRef}
        className="absolute bottom-16 left-12 bg-white border-2 border-gray-200 rounded-lg shadow-2xl p-3 z-50"
        style={{ width: '280px', maxHeight: '320px' }}
        >
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700">Emojis</h3>
             <button
             onClick={() => setShowEmojiPicker(false)}
             className="text-gray-400 hover:text-gray-600 transition-colors"
             >
            <X size={16} />
            </button>
        </div>
        <div className="grid grid-cols-8 gap-1 overflow-y-auto" style={{ maxHeight: '240px' }}>
            {emojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleEmojiClick(emoji)}
              className="text-2xl p-2 hover:bg-gray-100 rounded transition-colors"
              title={emoji}
            >
                {emoji}
            </button>
            ))}
        </div>
    </div>
  )
}

export default EmojiPicker;
