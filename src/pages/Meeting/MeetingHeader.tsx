import { MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Props {
  title: string;
  startTime: string;
  duration: string;
  participants: Array<{
    id: string;
    avatar: string;
    name: string;
  }>;
  moderator: {
    name: string;
    avatar: string;
    role: string;
  };
}

export default function MeetingHeader({ 
  title, 
  startTime, 
  duration,
  participants,
  moderator 
}: Props) {
  const displayedParticipants = participants.slice(0, 4);
  const remainingCount = Math.max(0, participants.length - 4);

  return (
    <div className="bg-background border-b border-border px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
          <img src="/icons/logo.svg" alt="" />
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-medium">GOYA Call</span>
          </div>
        </div>
        <div className="h-6 w-px bg-border" />
        <div>
          <h1 className="font-medium">{title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Started at {startTime}</span>
            <span>·</span>
            <span>Scheduled for {duration}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center -space-x-2">
          {displayedParticipants.map((participant) => (
            <Avatar key={participant.id}>
              <AvatarImage src={participant.avatar} alt={participant.name} />
              <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
          {remainingCount > 0 && (
            <Badge variant="secondary">+{remainingCount}</Badge>
          )}
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={moderator.avatar} alt={moderator.name} />
            <AvatarFallback>{moderator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-medium">{moderator.name}</div>
            <div className="text-muted-foreground">{moderator.role}</div>
          </div>
        </div>

        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}