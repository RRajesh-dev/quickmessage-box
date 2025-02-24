import React, { useState } from 'react';
import { Plus, Send, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Template {
  id: number;
  title: string;
  content: string;
}

const defaultTemplates: Template[] = [
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
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);
  const [newTemplate, setNewTemplate] = useState({ title: "", content: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTemplateSelect = (content: string) => {
    setMessage(content);
    toast.success("Template loaded");
  };

  const handleAddTemplate = () => {
    if (!newTemplate.title.trim() || !newTemplate.content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    const newTemplateWithId = {
      ...newTemplate,
      id: templates.length + 1,
    };

    setTemplates([...templates, newTemplateWithId]);
    setNewTemplate({ title: "", content: "" });
    setIsDialogOpen(false);
    toast.success("Template added successfully");
  };

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsSending(true);

    try {
      // Find LinkedIn's message input and send button
      const linkedInInput = document.querySelector('.msg-form__contenteditable');
      const sendButton = document.querySelector('.msg-form__send-button');

      if (!linkedInInput || !sendButton) {
        throw new Error('LinkedIn message elements not found');
      }

      // Set the message text in LinkedIn's input
      const inputEvent = new InputEvent('input', { bubbles: true });
      linkedInInput.textContent = message;
      linkedInInput.dispatchEvent(inputEvent);

      // Click LinkedIn's send button
      sendButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      toast.success("Message sent successfully!");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message");
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
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
                  {templates.map((template) => (
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
                  <DropdownMenuSeparator />
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-2 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Template
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Template</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Title</label>
                          <Input
                            placeholder="Enter template title"
                            value={newTemplate.title}
                            onChange={(e) =>
                              setNewTemplate((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Content</label>
                          <textarea
                            className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Enter template content"
                            value={newTemplate.content}
                            onChange={(e) =>
                              setNewTemplate((prev) => ({
                                ...prev,
                                content: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <Button
                          className="w-full"
                          onClick={handleAddTemplate}
                        >
                          Add Template
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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
