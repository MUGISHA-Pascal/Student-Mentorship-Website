import React, { useState, useEffect, useRef } from 'react'
import { Search, Edit2, Plus, ChevronDown, Send, ChevronLeft, ChevronRight, UserCircle, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Channel {
  id: string;
  name: string;
  unreadCount: number;
}

interface DirectMessage {
  id: string;
  name: string;
  avatar: string;
  status: string;
  unreadCount: number;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}
interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
}
// Mock WebSocket class
class MockWebSocket {
  onmessage: ((event: { data: string }) => void) | null = null;
  send(data: string) {
    // Simulate receiving a message after a short delay
    setTimeout(() => {
      if (this.onmessage) {
        const message = JSON.parse(data);
        message.id = Date.now().toString();
        message.timestamp = new Date().toLocaleTimeString();
        message.isOwn = false;
        this.onmessage({ data: JSON.stringify(message) });
      }
    }, 1000);
  }
}

const ChannelItem: React.FC<{ channel: Channel; isActive: boolean; isCollapsed: boolean }> = ({ channel, isActive, isCollapsed }) => (
  <div className={`flex items-center justify-between p-2 rounded-lg ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}>
    <div className="flex items-center">
      <span className="text-lg mr-2">#</span>
      {!isCollapsed && <span>{channel.name}</span>}
    </div>
    {channel.unreadCount > 0 && !isCollapsed && (
      <Badge variant="destructive">{channel.unreadCount}</Badge>
    )}
  </div>
)

const DirectMessageItem: React.FC<{ dm: DirectMessage; isActive: boolean; isCollapsed: boolean }> = ({ dm, isActive, isCollapsed }) => (
  <div className={`flex items-center justify-between p-2 rounded-lg ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}>
    <div className="flex items-center">
      <Avatar className="h-8 w-8 mr-2">
        <AvatarImage src={dm.avatar} alt={dm.name} />
        <AvatarFallback>{dm.name.charAt(0)}</AvatarFallback>
      </Avatar>
      {!isCollapsed && <span>{dm.name}</span>}
    </div>
    {dm.unreadCount > 0 && !isCollapsed && (
      <Badge variant="destructive">{dm.unreadCount}</Badge>
    )}
  </div>
)

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => (
  <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-[70%] p-3 rounded-lg ${message.isOwn ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
      <p className="text-sm">{message.content}</p>
      <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
    </div>
  </div>
)
const UserProfileDialog: React.FC<{ user: User }> = ({ user }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" className="w-full justify-start">
        <UserCircle className="mr-2 h-4 w-4" />
        Profile
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>User Profile</DialogTitle>
      </DialogHeader>
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">Status: {user.status}</p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)

export default function ChatsPage() {
  const [activeChannel, setActiveChannel] = useState<string>('general-music')
  const [channels] = useState<Channel[]>([
    { id: 'general-music', name: 'general-music', unreadCount: 2 },
    { id: 'random', name: 'random', unreadCount: 0 },
    { id: 'announcements', name: 'announcements', unreadCount: 1 },
  ])
  const [directMessages] = useState<DirectMessage[]>([
    { id: '1', name: 'John Evans', avatar: '/placeholder.svg?height=32&width=32', status: 'online', unreadCount: 2 },
    { id: '2', name: 'Willy Smith', avatar: '/placeholder.svg?height=32&width=32', status: 'offline', unreadCount: 0 },
    { id: '3', name: 'John Smith', avatar: '/placeholder.svg?height=32&width=32', status: 'online', unreadCount: 2 },
    { id: '4', name: 'Patrick Ihirwe', avatar: '/placeholder.svg?height=32&width=32', status: 'offline', unreadCount: 0 },
    { id: '5', name: 'Jane Smith', avatar: '/placeholder.svg?height=32&width=32', status: 'online', unreadCount: 2 },
  ])
  const [messages, setMessages] = useState<Message[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const socketRef = useRef<MockWebSocket | null>(null)
  const [currentUser] = useState<User>({
    id: 'current-user',
    name: 'Current User',
    avatar: '/placeholder.svg?height=32&width=32',
    status: 'online'
  })

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = new MockWebSocket()

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages(prevMessages => [...prevMessages, message])
    }

    // Simulate fetching messages for the active channel
    setMessages([
      { id: '1', sender: 'John Doe', content: 'Hello everyone!', timestamp: '10:30 AM', isOwn: false },
      { id: '2', sender: 'You', content: 'Hi John, how are you?', timestamp: '10:35 AM', isOwn: true },
    ])

    return () => {
      // Clean up WebSocket connection
      socketRef.current = null
    }
  }, [activeChannel])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && socketRef.current) {
      const message = {
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        isOwn: true,
      }
      socketRef.current.send(JSON.stringify(message))
      setMessages(prevMessages => [...prevMessages, { ...message, id: Date.now().toString() }])
      setNewMessage('')
    }
  }

  const handleChannelChange = (channelId: string) => {
    setActiveChannel(channelId)
    // In a real app, you'd fetch messages for the new channel here
  }

  const handleDirectMessageSelect = (dmId: string) => {
    setActiveChannel(dmId)
    // In a real app, you'd fetch messages for the selected direct message here
  }

  const filteredMessages = messages.filter(message => 
    message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.sender.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className={`border-r border-border flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className={`relative flex-grow ${isCollapsed ? 'hidden' : 'block'}`}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              className="pl-10" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="icon" onClick={toggleCollapse} className={isCollapsed ? '' : 'ml-2'}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className={`flex justify-between items-center mb-2 ${isCollapsed ? 'hidden' : 'block'}`}>
            <h2 className="font-semibold">Channels</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {channels.map(channel => (
            <div onClick={() => handleChannelChange(channel.id)} key={channel.id}>
              <ChannelItem channel={channel} isActive={activeChannel === channel.id} isCollapsed={isCollapsed} />
            </div>
          ))}
          <div className={`flex justify-between items-center mt-4 mb-2 ${isCollapsed ? 'hidden' : 'block'}`}>
            <h2 className="font-semibold">Direct Messages</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {directMessages.map(dm => (
            <div onClick={() => handleDirectMessageSelect(dm.id)} key={dm.id}>
              <DirectMessageItem dm={dm} isActive={activeChannel === dm.id} isCollapsed={isCollapsed} />
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <UserProfileDialog user={currentUser} />
          <Button variant="ghost" className="w-full justify-start mt-2">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">
              {activeChannel.startsWith('general') ? `#${activeChannel}` : activeChannel}
            </h1>
            <ChevronDown className="ml-2" />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {filteredMessages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex items-center">
            <Input 
              className="flex-1 mr-2" 
              placeholder="Type a message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
  