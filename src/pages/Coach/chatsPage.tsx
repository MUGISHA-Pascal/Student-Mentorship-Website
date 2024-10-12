import React, { useState } from 'react'
import { Search, Edit2, Plus, ChevronDown, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

const ChannelItem: React.FC<{ channel: Channel; isActive: boolean }> = ({ channel, isActive }) => (
  <div className={`flex items-center justify-between p-2 rounded-lg ${isActive ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
    <div className="flex items-center">
      <span className="text-lg mr-2">#</span>
      <span>{channel.name}</span>
    </div>
    {channel.unreadCount > 0 && (
      <Badge variant="destructive">{channel.unreadCount}</Badge>
    )}
  </div>
)

const DirectMessageItem: React.FC<{ dm: DirectMessage; isActive: boolean }> = ({ dm, isActive }) => (
  <div className={`flex items-center justify-between p-2 rounded-lg ${isActive ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
    <div className="flex items-center">
      <Avatar className="h-8 w-8 mr-2">
        <AvatarImage src={dm.avatar} alt={dm.name} />
        <AvatarFallback>{dm.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <span>{dm.name}</span>
    </div>
    {dm.unreadCount > 0 && (
      <Badge variant="destructive">{dm.unreadCount}</Badge>
    )}
  </div>
)

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => (
  <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-[70%] p-3 rounded-lg ${message.isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
      <p className="text-sm">{message.content}</p>
      <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
    </div>
  </div>
)

export default function ChatsPage() {
  const [activeChannel] = useState<string>('general-music')
  const [channels] = useState<Channel[]>([
    { id: 'general-music', name: 'general-music', unreadCount: 2 },
  ])
  const [directMessages] = useState<DirectMessage[]>([
    { id: '1', name: 'John Evans', avatar: '/placeholder.svg?height=32&width=32', status: 'online', unreadCount: 2 },
    { id: '2', name: 'Willy Smith', avatar: '/placeholder.svg?height=32&width=32', status: 'offline', unreadCount: 0 },
    { id: '3', name: 'John Smith', avatar: '/placeholder.svg?height=32&width=32', status: 'online', unreadCount: 2 },
    { id: '4', name: 'Patrick Ihirwe', avatar: '/placeholder.svg?height=32&width=32', status: 'offline', unreadCount: 0 },
    { id: '5', name: 'Jane Smith', avatar: '/placeholder.svg?height=32&width=32', status: 'online', unreadCount: 2 },
  ])
  const [messages] = useState<Message[]>([
    { id: '1', sender: 'John Doe', content: 'How are you doing guys? Can you be able to get at the office tomorrow to discuss some stuffs?', timestamp: '10:30 AM', isOwn: false },
    { id: '2', sender: 'You', content: 'How are you doing guys? Can you be able to get at the office tomorrow to discuss some stuffs?', timestamp: '10:35 AM', isOwn: true },
    { id: '3', sender: 'John Doe', content: 'Message. Lorem ipsum dolor.', timestamp: '10:40 AM', isOwn: false },
    { id: '4', sender: 'You', content: 'Message. Lorem ipsum dolor.', timestamp: '10:45 AM', isOwn: true },
  ])

  return (
    <div className="flex h-screen bg-white">
      <div className="w-64 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input className="pl-10" placeholder="Search" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Channels</h2>
            <Button variant="ghost" size="sm" className="text-blue-500">
              Clear All
            </Button>
          </div>
          {channels.map(channel => (
            <ChannelItem key={channel.id} channel={channel} isActive={activeChannel === channel.id} />
          ))}
          <div className="flex justify-between items-center mt-4 mb-2">
            <h2 className="font-semibold">Direct Messages</h2>
            <Button variant="ghost" size="sm" className="text-blue-500">
              Clear All
            </Button>
          </div>
          {directMessages.map(dm => (
            <DirectMessageItem key={dm.id} dm={dm} isActive={activeChannel === dm.id} />
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">Chats</h1>
            <ChevronDown className="ml-2" />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center">
            <Input className="flex-1 mr-2" placeholder="Type a message..." />
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
            <Button size="icon" className="ml-2">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}