import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge'; // Added Badge import
import { MessageCircle, Send, Search } from 'lucide-react'; 
import { cn } from '@/lib/utils'; 
import { toast } from 'sonner'; // Added toast import

// Mock data types
interface MockMessage {
  id: string;
  sender: string; // 'user' or 'other'
  text: string;
  timestamp: string;
}

interface MockConversation {
  id: string;
  userName: string;
  avatarFallback: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  messages: MockMessage[];
}

// Generate mock conversations
const generateMockConversations = (count: number = 5): MockConversation[] => {
  const conversations: MockConversation[] = [];
  const users = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
  for (let i = 0; i < count; i++) {
    const userName = users[i % users.length];
    const messageCount = Math.floor(Math.random() * 10) + 5;
    const messages: MockMessage[] = [];
    let lastTimestamp = Date.now() - Math.random() * 1000 * 60 * 60 * 24; // Start up to a day ago

    for (let j = 0; j < messageCount; j++) {
       lastTimestamp += Math.random() * 1000 * 60 * 5; // Add up to 5 mins between messages
       messages.push({
         id: `msg_${i}_${j}`,
         sender: Math.random() > 0.4 ? 'user' : 'other', // More messages from 'other' usually
         text: `This is mock message ${j + 1} in conversation ${i + 1}. Lorem ipsum dolor sit amet.`,
         timestamp: new Date(lastTimestamp).toISOString(),
       });
    }
    
    conversations.push({
      id: `conv_${i}`,
      userName: userName,
      avatarFallback: userName.substring(0, 2).toUpperCase(),
      lastMessage: messages[messages.length - 1].text,
      lastMessageTime: new Date(messages[messages.length - 1].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unreadCount: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : undefined,
      messages: messages,
    });
  }
  return conversations;
};

const MessagesPage = () => {
  const [conversations] = useState<MockConversation[]>(generateMockConversations(7));
  const [selectedConversation, setSelectedConversation] = useState<MockConversation | null>(conversations[0] || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const filteredConversations = conversations.filter(conv => 
    conv.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
     e.preventDefault();
     if (!newMessage.trim() || !selectedConversation) return;
     
     // Simulate sending message (add to local state)
     const message: MockMessage = {
       id: `msg_new_${Date.now()}`,
       sender: 'user',
       text: newMessage,
       timestamp: new Date().toISOString(),
     };
     
     // Update the selected conversation's messages
     // In a real app, this would involve API calls and state updates
     setSelectedConversation(prev => prev ? ({
        ...prev,
        messages: [...prev.messages, message],
        lastMessage: message.text,
        lastMessageTime: new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
     }) : null);
     
     // Update the main conversations list as well (for last message preview)
     // This part is tricky with mock data, ideally backend handles this
     
     setNewMessage(''); 
     // toast.success("Message sent (mock)"); // Toast already imported
  };

  // Helper function to get user initials (assuming it's defined elsewhere or add it here)
  const getInitials = (name?: string | null): string => {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <div className="container mx-auto px-0 py-8 h-[calc(100vh-theme(spacing.24))]"> {/* Adjusted height */}
      <Card className="h-full flex flex-col md:flex-row overflow-hidden">
        {/* Conversation List */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold mb-2">Chats</h2>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search chats..." 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {filteredConversations.map(conv => (
                <Button 
                  key={conv.id} 
                  variant={selectedConversation?.id === conv.id ? "secondary" : "ghost"} 
                  className="w-full justify-start h-auto py-3 px-2"
                  onClick={() => setSelectedConversation(conv)}
                >
                  <Avatar className="h-9 w-9 mr-3">
                    <AvatarFallback>{conv.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left overflow-hidden">
                    <div className="flex justify-between items-center">
                       <p className="font-medium text-sm truncate">{conv.userName}</p>
                       <span className="text-xs text-muted-foreground">{conv.lastMessageTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                       {conv.unreadCount && conv.unreadCount > 0 && (
                         <Badge className="h-5 px-1.5 text-xs">{conv.unreadCount}</Badge>
                       )}
                    </div>
                  </div>
                </Button>
              ))}
               {filteredConversations.length === 0 && (
                  <p className="p-4 text-center text-sm text-muted-foreground">No chats found.</p>
               )}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center space-x-3">
                 <Avatar className="h-9 w-9">
                    <AvatarFallback>{selectedConversation.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                     <p className="font-medium">{selectedConversation.userName}</p>
                     {/* Add online status indicator if needed */}
                  </div>
              </div>
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4 space-y-4 bg-muted/20">
                 {selectedConversation.messages.map((msg) => (
                   <div 
                     key={msg.id} 
                     className={cn(
                       "flex items-end space-x-2",
                       msg.sender === 'user' ? "justify-end" : "justify-start"
                     )}
                   >
                     {msg.sender !== 'user' && (
                       <Avatar className="h-6 w-6">
                         <AvatarFallback className="text-xs">{selectedConversation.avatarFallback}</AvatarFallback>
                       </Avatar>
                     )}
                     <div 
                       className={cn(
                         "max-w-[70%] rounded-lg px-3 py-2 text-sm",
                         msg.sender === 'user' 
                           ? "bg-primary text-primary-foreground" 
                           : "bg-muted"
                       )}
                     >
                       {msg.text}
                       <p className={cn(
                          "text-xs mt-1",
                          msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground text-left'
                       )}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </p>
                     </div>
                      {msg.sender === 'user' && (
                       <Avatar className="h-6 w-6">
                         <AvatarFallback className="text-xs">{getInitials()}</AvatarFallback> {/* Use current user initials */}
                       </Avatar>
                     )}
                   </div>
                 ))}
              </ScrollArea>
              {/* Message Input */}
              <div className="p-4 border-t">
                 <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                   <Input 
                     placeholder="Type your message..." 
                     className="flex-1" 
                     value={newMessage}
                     onChange={(e) => setNewMessage(e.target.value)}
                   />
                   <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                     <Send className="h-4 w-4" />
                   </Button>
                 </form>
              </div>
            </>
          ) : (
            // Placeholder when no conversation is selected
            <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground bg-muted/20">
              <MessageCircle className="h-16 w-16 mb-4 opacity-50" />
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// Removed duplicate getInitials function

export default MessagesPage;
