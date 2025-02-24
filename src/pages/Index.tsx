
import MessageInput from "@/components/MessageInput";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Messages</h1>
        <MessageInput />
      </div>
    </div>
  );
};

export default Index;
