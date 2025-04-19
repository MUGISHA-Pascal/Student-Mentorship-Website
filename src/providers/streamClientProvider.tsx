import { useStreamToken } from '@/hooks/meeting/useStreamToken';
import { useUserStore } from '@/store/userStore';
import {
    StreamVideo,
    StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
import { Levels } from 'react-activity';


// const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const API_KEY = "khhdcjqnbqqn";

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();

    const { user, fetchUser, loading } = useUserStore();
    console.log('user:', user);

    const userId = user?.id || null;

    useEffect(() => {
        if (!userId) {
            fetchUser();
        }
    }, [userId, fetchUser]);
    const { fetchStreamToken } = useStreamToken();

    useEffect(() => {
        if (loading || !user) return;
        if (!API_KEY) throw new Error('Stream API key missing')

        const client = new StreamVideoClient({
            apiKey: API_KEY,
            user: {
                id: user?.id,
                name: user.firstName,
            },
            tokenProvider: fetchStreamToken,
        })

        setVideoClient(client);
    }, [user, loading, fetchStreamToken]);

    if (!videoClient) return
    <div className='w-full h-full flex items-center justify-center'>
        <Levels speed={0.5} />
    </div>;
    return (
        <StreamVideo client={videoClient}>
            {children}
        </StreamVideo>
    );
};

export default StreamVideoProvider;