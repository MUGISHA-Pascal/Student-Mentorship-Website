import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Mic, MicOff,AudioLines, Video,Disc, Disc2, VideoOff, ScreenShare, MessageSquare, Maximize, UserPlus, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import MeetingHeader from './MeetingHeader'
import { useNavigate } from 'react-router-dom';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  isVideoOff: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  timestamp: string;
}

const participants: Participant[] = [
  { id: '1', name: 'Jacob Jones', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', isMuted: false, isVideoOff: false },
  { id: '2', name: 'Esther Howard', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026708c', isMuted: true, isVideoOff: false },
  { id: '3', name: 'Jenny Wilson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', isMuted: false, isVideoOff: true },
  { id: '4', name: 'Robert Fox', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d', isMuted: false, isVideoOff: false },
  { id: '5', name: 'Leslie Alexander', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026708c', isMuted: false, isVideoOff: false },
  { id: '6', name: 'Guy Hawkins', avatar: 'https://i.pravatar.cc/300?u=a042581f4f29026707d', isMuted: true, isVideoOff: false },
]

const initialChatMessages: ChatMessage[] = [
  { id: '1', sender: 'Kathryn Murphy', avatar: 'https://i.pravatar.cc/167', message: 'Good afternoon, everyone.', timestamp: '11:01 AM' },
  { id: '2', sender: 'Joshua Abraham', avatar: 'https://i.pravatar.cc/280', message: "Yes, Let's start this meeting", timestamp: '11:02 AM' },
]

const MainView: React.FC = () => (
  <ScrollArea className="flex-1 p-4">
    <div className="space-y-4">
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        <img src="/images/call1.jpg?height=720&width=1280" alt="Main Speaker" className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <div> </div>
          <span className="text-white font-medium bg-gray-500 bg-opacity-20 rounded-lg px-2 py-1">Jacob Jones</span>
          <div className="flex space-x-1">
            <span className="w-1 h-4 bg-green-500 rounded-full"></span>
            <span className="w-1 h-4 bg-green-500 rounded-full"></span>
            <span className="w-1 h-4 bg-green-500 rounded-full"></span>
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-gray-500 bg-opacity-50 text-white px-2 py-1 rounded flex items-center">
          <Disc2 className="h-4 w-4 mr-1 text-red-500 bg-transparent rounded-full" />
          24:01:45
        </div>
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white bg-gray-500 bg-opacity-50 text-white px-2 py-1 rounded-full">
          <Maximize className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="absolute bottom-4 right-4 bg-gray-500 bg-opacity-50 text-white px-2 py-1 rounded-full">
          <AudioLines className="h-4 w-4" /> 
          </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {participants.slice(1).map((participant) => (
          <div key={participant.id} className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            <img src="/images/call2.jpg?height=180&width=320" alt={participant.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 flex items-center space-x-2">
              <span className="text-white text-sm">{participant.name}</span>
              {participant.isMuted && <MicOff className="h-4 w-4 text-white" />}
            </div>
            <Button variant="ghost" size="icon" className="absolute bottom-2 right-2 text-white">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  </ScrollArea>
)

const RightCard: React.FC = () => {
  const [isParticipantsExpanded, setIsParticipantsExpanded] = useState(true)
  const [isChatExpanded, setIsChatExpanded] = useState(true)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newChatMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'You',
        avatar: '/placeholder.svg?height=40&width=40',
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setChatMessages([...chatMessages, newChatMessage])
      setNewMessage('')
    }
  }

  return (
    <Card className="w-80 flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Participants</h2>
          <Button variant="ghost" size="sm" onClick={() => setIsParticipantsExpanded(!isParticipantsExpanded)}>
            {isParticipantsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        {isParticipantsExpanded && (
          <>
            <Button variant="outline" className="w-full mb-4 bg-blue-100 text-blue-500 rounded-full">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Participant
            </Button>

            
            <ScrollArea className="h-40">
              <div className="space-y-2">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback>{participant.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{participant.name}</span>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon">
                        {participant.isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon">
                        {participant.isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">Chats</h2>
          <Button variant="ghost" size="sm" onClick={() => setIsChatExpanded(!isChatExpanded)}>
            {isChatExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        {isChatExpanded && (
          <>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-2">
                    <Avatar>
                      <AvatarImage src={message.avatar} alt={message.sender} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{message.sender}</p>
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" size="icon" className='rounded-full text-white bg-blue-500'>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}

<Button variant="outline" className="w-full flex items-center justify-center gap-2 bg-blue-200 text-blue-500 p-3 rounded-lg hover:bg-blue-600">
<UserPlus className="h-4 w-4 mr-2" />
Add Participant
</Button>

const MeetingControls: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bottom-0 left-0 right-0 flex justify-center p-4 border-t">
      <div className="flex space-x-2">
      <Button variant="outline" size="icon" className='rounded-full text-white bg-blue-500'>
        <Mic className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className='rounded-full text-white bg-blue-500'>
        <Video className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className='rounded-full text-blue-500'>
        <ScreenShare className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className='rounded-full text-red-500 bg-red-100'>
        <Disc className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className='rounded-full text-blue-500'>
        <MessageSquare className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className='rounded-full text-blue-500'>
        <Maximize className="h-4 w-4" />
        </Button>
        <Button 
          variant="destructive"
          onClick={() => navigate('/dashboard/coach/home')}
        >
          End Call
        </Button>
      </div>
    </div>
  )
}

export default function MeetingPage() {
  const headerProps = {
    title: "Software Development Life Cycle Course",
    startTime: "2:00 pm",
    duration: "2hrs",
    participants: participants.map(p => ({
      id: p.id,
      name: p.name,
      avatar: p.avatar
    })),
    moderator: {
      name: "Adam Joseph",
      avatar: "https://i.pravatar.cc/225",
      role: "Moderator"
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <MeetingHeader {...headerProps} />
      <div className="flex-1 flex overflow-hidden">
        <MainView />
        <RightCard />
      </div>
      <MeetingControls />
    </div>
  )
}