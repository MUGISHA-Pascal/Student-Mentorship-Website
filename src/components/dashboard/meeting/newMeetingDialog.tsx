import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface NewMeetingDialogProps {
    trigger?: React.ReactNode;
}

const NewMeetingDialog = ({ trigger }: NewMeetingDialogProps) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const createInstantMeeting = () => {
        setOpen(false);
        navigate("/admin/meeting/new?instant=true");
    };

    const scheduleMeeting = () => {
        setOpen(false);
        navigate("/admin/meeting/new");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            {open && (
                <div className="fixed inset-0 bg-black/50 z-40" />
            )}
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create a Meeting</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4 py-4">
                    <Button
                        onClick={createInstantMeeting}
                        className="flex items-center justify-start gap-3 h-auto py-6 text-left"
                        variant="outline"
                    >
                        <Clock className="h-8 w-8 text-blue-500" />
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Instant Meeting</h3>
                            <p className="text-sm text-muted-foreground">
                                Start a meeting right now
                            </p>
                        </div>
                    </Button>

                    <Button
                        onClick={scheduleMeeting}
                        className="flex items-center justify-start gap-3 h-auto py-6 text-left"
                        variant="outline"
                    >
                        <Calendar className="h-8 w-8 text-green-500" />
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Schedule for Later</h3>
                            <p className="text-sm text-muted-foreground">
                                Plan a meeting for a future date and time
                            </p>
                        </div>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default NewMeetingDialog;