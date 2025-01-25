import { useCallStateHooks } from '@stream-io/video-react-sdk';

export default function useMeetingState() {
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();

  const callingState = useCallCallingState();
  console.log("Calling state ",callingState);
  
  const participantCount = useParticipantCount();

  return { callingState, participantCount };
}
