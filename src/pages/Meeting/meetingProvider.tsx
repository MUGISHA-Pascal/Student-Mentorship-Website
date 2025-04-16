// import { StreamVideoClient } from '@stream-io/video-react-sdk';
// import { useUserStore } from '@/store/userStore';


// export const initializeMeetingClient = async () => {
//   const { user, role, fetchUser } = useUserStore.getState();

//   if (!user) await fetchUser();

//   // const apiKey = process.env.VITE_APP_STREAM_API_KEY;
//   const apiKey = import.meta.env.VITE_APP_STREAM_API_KEY;
//   // const apiKey = "cguqadxjn23g";
//   if (!apiKey) {
//     throw new Error('Missing VITE_APP_STREAM_API_KEY in environment variables.');
//   }
// const token = localStorage.getItem("authToken")
// console.log(token);

//   const client = new StreamVideoClient({
//     apiKey,
//     user: {
//       id: user?.id ?? '',
//       name: `${user?.firstName} ${user?.lastName}`,
//       image: role?.image ?? '',
//     },
//     // token: localStorage.getItem('authToken') || '',
//     token: token || '',
//   });

//   return client;
// };


// import { StreamVideoClient } from '@stream-io/video-react-sdk';
// import { useUserStore } from '@/store/userStore';
// import axios from 'axios'; // Ensure axios is installed (npm install axios)

// export const initializeMeetingClient = async () => {
//   const { user, role, fetchUser } = useUserStore.getState();

//   if (!user) await fetchUser();

//   const apiKey = import.meta.env.VITE_APP_STREAM_API_KEY;
//   if (!apiKey) {
//     console.log("No api key");
//     throw new Error('Missing VITE_APP_STREAM_API_KEY in environment variables.');

//   }

//   // Fetch the token from your backend
//   const fetchToken = async (userId: string | undefined) => {
//     try {
//       const response = await axios.post(`http://localhost:3000/api/stream/generate-stream-token`, {
//         userId,
//       });
//       return response.data.token;
//     } catch (error) {
//       console.error('Error fetching token from backend:', error);
//       throw new Error('Failed to fetch Stream token from backend.');
//     }
//   };

//   const token = await fetchToken(user?.id);
//   // console.log('Generated Token:', token);

//   const client = new StreamVideoClient({
//     apiKey,
//     user: {
//       id: user?.id ?? '',
//       name: `${user?.firstName} ${user?.lastName}`,
//       image: role?.image ?? '',
//     },
//     token,
//   });

//   return client;
// };


import { StreamVideoClient } from '@stream-io/video-react-sdk';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';

export const initializeMeetingClient = async () => {
  const { user, role, fetchUser } = useUserStore.getState();

  if (!user) await fetchUser();

  const apiKey = import.meta.env.VITE_APP_STREAM_API_KEY;
  if (!apiKey) {
    console.log("No api key");
    throw new Error('Missing VITE_APP_STREAM_API_KEY in environment variables.');
  }

  const fetchToken = async (userId: string | undefined) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/stream/generate-stream-token`, {
        userId,
      });
      return response.data.token;
    } catch (error) {
      console.error('Error fetching token from backend:', error);
      throw new Error('Failed to fetch Stream token from backend.');
    }
  };

  const token = await fetchToken(user?.id);

  // Use getOrCreateInstance to avoid creating multiple clients
  const client = StreamVideoClient.getOrCreateInstance({
    apiKey,
    user: {
      id: user?.id ?? '',
      name: `${user?.firstName} ${user?.lastName}`,
      image: role?.image ?? '',
    },
    token,
  });

  return client;
};