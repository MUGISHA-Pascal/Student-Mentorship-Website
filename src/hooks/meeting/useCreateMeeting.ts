import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useUserStore } from '@/store/userStore'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const useCreateMeeting = () => {
    const client = useStreamVideoClient()
    const { user } = useUserStore()
    const navigate = useNavigate()

    const createMeeting = async ({ dateTime, description }: { dateTime: Date; description?: string }) => {
        if (!client || !user) {
            toast("Missing client or user")
            return;
        }

        try {
            const id = crypto.randomUUID();
            const call = client.call('default', id);

            await call.getOrCreate({
                data: {
                    starts_at: dateTime.toISOString(),
                    custom: { description: description || 'Instant Meeting' },
                }
            });

            toast("Meeting Created")
            navigate(`/dashboard/meeting/${call.id}`);
        } catch (err) {
            console.error(err);
            toast("Failed to create meeting");
        }
    };

    return { createMeeting };
};
