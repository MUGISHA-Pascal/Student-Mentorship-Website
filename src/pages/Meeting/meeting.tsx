import MeetingRoom from '@/components/dashboard/meeting/meetingRoom';
import MeetingSetup from '@/components/dashboard/meeting/meetingSetup';
import { useGetCallById } from '@/hooks/meeting/useGetCallById';
import { useUserStore } from '@/store/userStore';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { Levels } from 'react-activity';
import { useParams } from 'react-router-dom';


const Meeting = () => {
    const { id } = useParams<{ id: string }>();
    const { user, fetchUser, loading } = useUserStore();
    const userId = user?.id || null;

    useEffect(() => {
        if (!userId) {
            fetchUser(); // Fetch user data if not already available
        }
    }, [userId, fetchUser]);


    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const { call, isCallLoading } = useGetCallById(id ?? '');

    if (loading || !user || isCallLoading) return
    <div className='w-full h-full flex items-center justify-center'>
        <Levels speed={0.9} />
    </div>;

    return (
        <main className="h-screen w-full">
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? (
                        <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                    ) : (
                        <MeetingRoom />
                    )}
                </StreamTheme>
            </StreamCall>
        </main>
    )
}

export default Meeting