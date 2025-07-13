import React from 'react';
import { FaCopy, FaExternalLinkAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface ChatGPTEmbedProps {
  prompt: string;
}

const ChatGPTEmbed: React.FC<ChatGPTEmbedProps> = ({ prompt }) => {
  const copyPromptToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success('Prompt copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy prompt');
    }
  };

  const openChatGPT = () => {
    const chatGPTUrl = 'https://chat.openai.com/chat';
    window.open(chatGPTUrl, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Today's Reflection
        </h3>
        <p className="text-gray-600 text-sm">
          Take time to contemplate this question and journal your thoughts
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
        <p className="text-gray-700 leading-relaxed">{prompt}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={copyPromptToClipboard}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <FaCopy className="mr-2" />
          Copy Prompt
        </button>
        <button
          onClick={openChatGPT}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaExternalLinkAlt className="mr-2" />
          Open ChatGPT
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          💡 Tip: Copy the prompt and paste it into ChatGPT for a guided reflection session
        </p>
      </div>
    </div>
  );
};

export default ChatGPTEmbed; 