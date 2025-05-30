"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Calendar, Plus, Link, Video, Clock, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Alert,
  AlertDescription,
} from "../../../../pages/Admin/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock interfaces - replace with your actual types
interface User {
  id: string;
  role: string;
  name?: string;
}

interface Call {
  id: string;
  url?: string;
}

// Mock hooks - replace with your actual implementations
const useStreamVideoClient = () => {
  return {
    call: (type: string, id: string) => ({
      id,
      getOrCreate: async (data: any) => {
        // Mock implementation
        console.log("Creating call with data:", data);
        return Promise.resolve();
      },
    }),
  };
};

const useUserStore = () => {
  return {
    user: { id: "1", role: "mentor", name: "John Doe" } as User,
    fetchUser: () => Promise.resolve(),
  };
};

const useNavigate = () => {
  return (path: string) => {
    console.log("Navigating to:", path);
    // Mock navigation
  };
};

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

interface HomeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  handleClick?: () => void;
  className?: string;
}

const HomeCard = ({
  icon,
  title,
  description,
  handleClick,
  className,
}: HomeCardProps) => {
  return (
    <Card
      onClick={handleClick}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/20",
        "bg-gradient-to-br from-background to-muted/30",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  image?: React.ReactNode;
  className?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  handleClick,
  buttonText = "Confirm",
  buttonIcon,
  image,
  className,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("sm:max-w-[500px]", className)}>
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            {image && (
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                {image}
              </div>
            )}
            <DialogTitle className="text-xl font-semibold text-center">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-center">
                {description}
              </DialogDescription>
            )}
          </div>
        </DialogHeader>

        {children && <div className="space-y-4 py-4">{children}</div>}

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          {handleClick && (
            <Button onClick={handleClick} className="w-full sm:w-auto">
              {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
              {buttonText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const MeetingTypeList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetails, setCallDetails] = useState<Call>();
  const [isLoading, setIsLoading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const { user, fetchUser } = useUserStore();
  const userId = user?.id || null;

  useEffect(() => {
    if (!userId) {
      fetchUser();
    }
  }, [userId, fetchUser]);

  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) {
      toast({
        title: "Error",
        description: "Unable to create meeting. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      if (meetingState === "isScheduleMeeting" && !values.dateTime) {
        toast({
          title: "Error",
          description: "Please select a date and time",
          variant: "destructive",
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) {
        throw new Error("Failed to create a call");
      }

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (meetingState === "isInstantMeeting") {
        const role =
          user?.role?.toLowerCase() === "coach"
            ? "mentor"
            : user?.role?.toLowerCase();
        navigate(`/${role}/dashboard/meeting/${call.id}`);
      }

      toast({
        title: "Success",
        description: "Meeting created successfully!",
      });
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast({
        title: "Error",
        description: "Failed to create meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinMeeting = () => {
    if (!values.link.trim()) {
      toast({
        title: "Error",
        description: "Please enter a meeting link",
        variant: "destructive",
      });
      return;
    }

    try {
      const meetingId = values.link.split("/").pop();
      if (!meetingId) {
        throw new Error("Invalid meeting link");
      }

      let role = user?.role?.toLowerCase() || "student";
      if (role === "coach") role = "mentor";

      navigate(`/${role}/dashboard/meeting/${meetingId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid meeting link. Please check and try again.",
        variant: "destructive",
      });
    }
  };

  const copyMeetingLink = async () => {
    if (!callDetails) return;

    try {
      const role =
        user?.role?.toLowerCase() === "coach"
          ? "mentor"
          : user?.role?.toLowerCase();
      const baseURL =
        typeof window !== "undefined" ? window.location.origin : "";
      const meetingLink = `${baseURL}/${role}/dashboard/meeting/${callDetails.id}`;

      await navigator.clipboard.writeText(meetingLink);
      setLinkCopied(true);

      toast({
        title: "Success",
        description: "Meeting link copied to clipboard!",
      });

      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Meeting Center</h1>
        <p className="text-muted-foreground">
          Start an instant meeting, schedule for later, or join an existing
          meeting
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <HomeCard
          icon={<Plus size={24} />}
          title="New Meeting"
          description="Start an instant meeting right now"
          handleClick={() => setMeetingState("isInstantMeeting")}
        />

        <HomeCard
          icon={<Link size={24} />}
          title="Join Meeting"
          description="Join a meeting via invitation link"
          handleClick={() => setMeetingState("isJoiningMeeting")}
        />

        <HomeCard
          icon={<Calendar size={24} />}
          title="Schedule Meeting"
          description="Plan and schedule your meeting"
          handleClick={() => setMeetingState("isScheduleMeeting")}
        />
      </div>

      {/* Schedule Meeting Modal */}
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Schedule Meeting"
          description="Set up your meeting details"
          handleClick={createMeeting}
          buttonText={isLoading ? "Creating..." : "Create Meeting"}
          buttonIcon={<Calendar size={16} />}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Meeting Description</Label>
              <Textarea
                id="description"
                placeholder="Enter meeting description..."
                value={values.description}
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="datetime">Date and Time</Label>
              <Input
                id="datetime"
                type="datetime-local"
                value={values.dateTime.toISOString().slice(0, 16)}
                onChange={(e) =>
                  setValues({ ...values, dateTime: new Date(e.target.value) })
                }
                min={new Date().toISOString().slice(0, 16)}
              />
              <p className="text-xs text-muted-foreground">
                Selected: {formatDateTime(values.dateTime)}
              </p>
            </div>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
            setCallDetails(undefined);
            setValues(initialValues);
          }}
          title="Meeting Scheduled!"
          description="Your meeting has been created successfully"
          handleClick={copyMeetingLink}
          buttonText={linkCopied ? "Copied!" : "Copy Meeting Link"}
          buttonIcon={linkCopied ? <Check size={16} /> : <Copy size={16} />}
          image={<Check size={24} className="text-green-600" />}
        >
          <div className="space-y-4">
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <strong>Scheduled for:</strong>{" "}
                {formatDateTime(values.dateTime)}
              </AlertDescription>
            </Alert>

            {values.description && (
              <div className="space-y-2">
                <Label>Description</Label>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                  {values.description}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label>Meeting ID</Label>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="font-mono">
                  {callDetails.id}
                </Badge>
              </div>
            </div>
          </div>
        </MeetingModal>
      )}

      {/* Instant Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start Instant Meeting"
        description="Your meeting will begin immediately"
        buttonText={isLoading ? "Starting..." : "Start Meeting"}
        buttonIcon={<Video size={16} />}
        handleClick={createMeeting}
        image={<Video size={24} className="text-primary" />}
      />

      {/* Join Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Join Meeting"
        description="Enter the meeting link to join"
        buttonText="Join Meeting"
        buttonIcon={<Link size={16} />}
        handleClick={handleJoinMeeting}
      >
        <div className="space-y-2">
          <Label htmlFor="meeting-link">Meeting Link</Label>
          <Input
            id="meeting-link"
            placeholder="https://example.com/meeting/..."
            value={values.link}
            onChange={(e) => setValues({ ...values, link: e.target.value })}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Paste the complete meeting link you received
          </p>
        </div>
      </MeetingModal>
    </div>
  );
};

export default MeetingTypeList;
