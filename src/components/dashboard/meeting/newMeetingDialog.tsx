import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MeetingModal from "../mentor/meetings/meetingModal";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/userStore";

interface NewMeetingDialogProps {
    trigger?: React.ReactNode;
}

const initialValues = {
    dateTime: new Date(),
    description: '',
    link: '',
};

const NewMeetingDialog = ({ trigger }: NewMeetingDialogProps) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
    >(undefined);
    const [values, setValues] = useState(initialValues);
    const { user } = useUserStore();

    const handleIsJoiningMeeting = () => {
        setOpen(false);
        setMeetingState('isJoiningMeeting');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {open && (
                <div className="fixed inset-0 bg-black/50 z-40" />
            )}
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                {/* <DialogHeader>
                    <DialogTitle>Create a Meeting</DialogTitle>
                </DialogHeader> */}
                <div className="grid grid-cols-1 gap-4 py-4">
                    <Button
                        onClick={handleIsJoiningMeeting}
                        className="flex items-center justify-start gap-3 h-auto py-6 text-left"
                        variant="outline"
                    >
                        <div className="flex items-center justify-center bg-muted size-10 rounded-xl">
                            <Link size={27} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Join A Meeting</h3>
                            <p className="text-sm text-muted-foreground">
                                Via Invitation link
                            </p>
                        </div>
                    </Button>
                </div>
            </DialogContent>
            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                // handleClick={() => navigate(values.link)}
                handleClick={() => {
                    const meetingId = values.link.split('/').pop(); // Extract UUID from full link
                    let role = user?.role?.toLowerCase() || 'student'; // default fallback                  
                    if (role === 'coach') role = 'mentor'; // normalize 'coach' to 'mentor'                  
                    navigate(`/${role}/dashboard/meeting/${meetingId}`);
                }}
            >
                <Input
                    placeholder="Meeting link"
                    className="border-none bg-popover focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e) => setValues({ ...values, link: e.target.value })}
                />
            </MeetingModal>
        </Dialog>
    );
};

export default NewMeetingDialog;