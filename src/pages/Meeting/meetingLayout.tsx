/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useCall, CallingState, useCallStateHooks } from '@stream-io/video-react-sdk';
// // import useMeetingState from '@/hooks/meeting/useMeetingState';

// export default function MeetingLayout() {
//   // const call = useCall();
//   // const { callingState, participantCount } = useMeetingState();
//   // console.log(callingState);

//   const { useCallCallingState, useParticipantCount } = useCallStateHooks();

//     const callingState = useCallCallingState();
//     const participantCount = useParticipantCount();


//   if (callingState !== CallingState.JOINED) {
//     return <div>Loading call state...</div>;
//   }

//   return (
//     <div>
//       Call
//        {/* "{call?.id}"  */}
//       has {participantCount} participants.
//     </div>
//   );
// }

// import {
//   CallControls,
//   CallingState,
//   SpeakerLayout,
//   StreamCall,
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
//   useCallStateHooks,
//   User,
// } from '@stream-io/video-react-sdk';

// import '@stream-io/video-react-sdk/dist/css/styles.css';
// import './style.css';
// import axios from 'axios';
// import { useUserStore } from '@/store/userStore';

// // const apiKey = 'mmhfdzb5evj2';
// // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0tpLUFkaS1NdW5kaSIsInVzZXJfaWQiOiJLaS1BZGktTXVuZGkiLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTczNjQ0NDQyNSwiZXhwIjoxNzM3MDQ5MjI1fQ.7SyVVwXN4E3Z95uVrFlyiWQU65gZjy4xNVyDjRNsHiY';
// // const userId = 'Ki-Adi-Mundi';
// const callId = 'htadSGT2lPWi';

// // const userr: User = {
// //   id: userId,
// //   name: 'Elissa',
// //   image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
// // };





// const apiKeyy = import.meta.env.VITE_APP_STREAM_API_KEY;

// const fetchToken = async (userId: string | undefined) => {
//   try {
//     const response = await axios.post(`https://api.goyoungafrica.org/api/stream/generate-stream-token`, {
//       userId,
//     });
//     return response.data.token;
//   } catch (error) {
//     console.error('Error fetching token from backend:', error);
//     throw new Error('Failed to fetch Stream token from backend.');
//   }
// };

// const { user, fetchUser } = useUserStore.getState()
// const tokenn = await fetchToken(user?.id);
// if (!user) await fetchUser ();

// const userrr: User = {
//   id: user?.id ?? '',
//   name: `${user?.firstName}`,
//   image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
// };




// const client = new StreamVideoClient({ apiKeyy, userrr, tokenn });
// const call = client.call('default', user?.id);
// call.join({ create: true });

// export default function App() {
//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <MyUILayout />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

// export const MyUILayout = () => {
//   const { useCallCallingState } = useCallStateHooks();
//   const callingState = useCallCallingState();

//   if (callingState !== CallingState.JOINED) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <StreamTheme>
//       <SpeakerLayout participantsBarPosition='bottom' />
//       <CallControls />
//     </StreamTheme>
//   );
// };

// import {
//   CallControls,
//   CallingState,
//   SpeakerLayout,
//   StreamCall,
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
//   useCallStateHooks,
//   User,
// } from '@stream-io/video-react-sdk';

// import '@stream-io/video-react-sdk/dist/css/styles.css';
// import './style.css';
// import axios from 'axios';
// import { useUserStore } from '@/store/userStore';
// import { useEffect, useState } from 'react';

// const callId = 'htadSGT2lPWi';

// const apiKey = import.meta.env.VITE_APP_STREAM_API_KEY;

// const fetchToken = async (userId: string | undefined): Promise<string> => {
//   try {
//     const response = await axios.post(`https://api.goyoungafrica.org/api/stream/generate-stream-token`, {
//       userId,
//     });
//     return response.data.token;
//   } catch (error) {
//     console.error('Error fetching token from backend:', error);
//     throw new Error('Failed to fetch Stream token from backend.');
//   }
// };

// const initializeClient = async (): Promise<StreamVideoClient> => {
//   const { user, fetchUser } = useUserStore.getState();

//   if (!user) {
//     await fetchUser();
//   }

//   const token = await fetchToken(user?.id);

//   const userObject: User = {
//     id: user?.id ?? '',
//     name: user?.firstName ?? 'Unknown User',
//     image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
//   };

//   const client = new StreamVideoClient({
//     apiKey,
//     user: userObject,
//     token,
//   });

//   const call = client.call('default', callId);
//   await call.join({ create: true });

//   return client;
// };

// export default function App() {
//   const [client, setClient] = useState<StreamVideoClient | null>(null);

//   useEffect(() => {
//     const setupClient = async () => {
//       try {
//         const initializedClient = await initializeClient();
//         setClient(initializedClient);
//       } catch (error) {
//         console.error('Error initializing Stream client:', error);
//       }
//     };

//     setupClient();
//   }, []);

//   if (!client) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={client.call('default', callId)}>
//         <MyUILayout />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

// export const MyUILayout = () => {
//   const { useCallCallingState } = useCallStateHooks();
//   const callingState = useCallCallingState();

//   if (callingState !== CallingState.JOINED) {
//     console.log(callingState);    
//     return <div>Loading...</div>;
//   }

//   return (
//     <StreamTheme>
//       <SpeakerLayout participantsBarPosition='bottom' />
//       <CallControls />
//     </StreamTheme>
//   );
// };


import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import './style.css';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';

const apiKey = import.meta.env.VITE_APP_STREAM_API_KEY;

const fetchToken = async (userId: string | undefined): Promise<string> => {
  try {
    const response = await axios.post(`https://api.goyoungafrica.org/api/stream/generate-stream-token`, {
      userId,
    });
    return response.data.token;
  } catch (error) {
    console.error('Error fetching token from backend:', error);
    throw new Error('Failed to fetch Stream token from backend.');
  }
};

const initializeClient = async (): Promise<{ client: StreamVideoClient; callId: string }> => {
  const { user, fetchUser } = useUserStore.getState();

  if (!user) {
    await fetchUser();
  }

  const token = await fetchToken(user?.id);
  // console.log('Generated token:', token);


  const userObject: User = {
    id: user?.id ?? '',
    name: user?.firstName ?? 'Unknown User',
    image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
  };

  const client = StreamVideoClient.getOrCreateInstance({
    apiKey,
    user: userObject,
    token,
  });

  const callId = user?.id ?? 'default-call-id'; // Use user.id as callId
  // const call = client.call('default', callId);
  // await call.join({ create: true });
  const call = client.call('default', callId);
  // console.log('Call state before join:', call.state);
  try {
    const joinResult = await call.join({ create: true });
    // console.log('Join result:', joinResult);
    // console.log('Call state after join:', call.state);
  } catch (error) {
    console.error('Error during call.join:', error);
  }


  return { client, callId };
};

export default function App() {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [callId, setCallId] = useState<string | null>(null);

  useEffect(() => {
    const setupClient = async () => {
      try {
        const { client: initializedClient, callId: initializedCallId } = await initializeClient();
        setClient(initializedClient);
        setCallId(initializedCallId);
      } catch (error) {
        console.error('Error initializing Stream client:', error);
      }
    };

    setupClient();
  }, []);

  if (!client || !callId) {
    return <div>Loading...</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={client.call('default', callId)}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    // console.log('Current calling state:', callingState);
    return <div>Connecting to the call...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};

