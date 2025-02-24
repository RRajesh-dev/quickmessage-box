
import React, { useState } from 'react';
import { Send, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const messageTemplates = [
  {
    id: 1,
    title: "Professional Introduction",
    content: "Hi, I noticed your profile and would love to connect to discuss potential opportunities in our field."
  },
  {
    id: 2,
    title: "Follow-up",
    content: "Thank you for connecting! I'd be interested in scheduling a brief call to discuss how we might collaborate."
  },
  {
    id: 3,
    title: "Project Inquiry",
    content: "I'm reaching out regarding potential project opportunities. Would you be open to a conversation about how we might work together?"
  }
];

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleTemplateSelect = (content: string) => {
    setMessage(content);
    toast.success("Template loaded");
  };

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsSending(true);
    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Message sent successfully!");
    setMessage("");
    setIsSending(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
            className="w-full min-h-[120px] p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100"
                  >
                    Templates
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[300px]">
                  {messageTemplates.map((template) => (
                    <DropdownMenuItem
                      key={template.id}
                      className="flex flex-col items-start py-2 px-4 cursor-pointer"
                      onClick={() => handleTemplateSelect(template.content)}
                    >
                      <span className="font-medium text-sm">{template.title}</span>
                      <span className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {template.content}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              onClick={handleSend}
              disabled={isSending || !message.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition-all"
            >
              {isSending ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
