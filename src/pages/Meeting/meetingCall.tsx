import { useEffect, useState } from 'react';
import { StreamVideo, StreamCall, StreamVideoClient, Call } from '@stream-io/video-react-sdk'; 
import MeetingLayout from './meetingLayout';
import { initializeMeetingClient } from './meetingProvider';
import { useUserStore } from '@/store/userStore';

export default function MeetingCall() {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);  
  const { user } = useUserStore();

  useEffect(() => {
    const setupClient = async () => {
      if (!user?.id) {
        console.error("User ID is not available. Cannot create a meeting.");
        return;
      }

      const clientInstance = await initializeMeetingClient();
      const callInstance = clientInstance.call('default', user?.id);
      await callInstance.join({ create: true });

      setClient(clientInstance);
      setCall(callInstance);
    };

    setupClient();
  }, [user?.id]);

  if (!client || !call) {
    return <div>Loading meeting...</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MeetingLayout />
      </StreamCall>
    </StreamVideo>
  );
}