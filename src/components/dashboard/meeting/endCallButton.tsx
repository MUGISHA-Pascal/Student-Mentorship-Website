import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EndCallButton = () => {
    const navigate = useNavigate();
    const call = useCall();

    if (!call)
        throw new Error(
            'useStreamCall must be used within a StreamCall component.',
        );

    // https://getstream.io/video/docs/react/guides/call-and-participant-state/#participant-state-3
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const isMeetingOwner =
        localParticipant &&
        call.state.createdBy &&
        localParticipant.userId === call.state.createdBy.id;

    if (!isMeetingOwner) return null;

    const endCall = async () => {
        await call.endCall();
        navigate('../');
        toast("Meeting Ended!")
    };

    return (
        <Button onClick={endCall} className="bg-red-500">
            End call for everyone
        </Button>
    );
};

export default EndCallButton;