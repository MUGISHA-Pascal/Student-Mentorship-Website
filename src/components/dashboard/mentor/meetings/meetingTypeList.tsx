import { useEffect, useState } from 'react'
import HomeCard from './homeCard'
import MeetingModal from './meetingModal'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from 'react-toastify'
import { Textarea } from '@/components/ui/textarea'
import ReactDatePicker from 'react-datepicker';
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/userStore'

const initialValues = {
    dateTime: new Date(),
    description: '',
    link: '',
};


const MeetingTypeList = () => {
    const navigate = useNavigate();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
    >(undefined);
    const [values, setValues] = useState(initialValues);
    const [callDetails, setCallDetails] = useState<Call>();

    // const { user } = useUser();
    const { user, fetchUser } = useUserStore();
    // console.log('user:', user);
    
    const userId = user?.id || null;

    useEffect(() => {
        if (!userId) {
            fetchUser();
        }
    }, [userId, fetchUser]);

    const client = useStreamVideoClient();

    const createMeeting = async () => {
        console.log('It is clicked');
        if (!client || !user) {
            console.log('Client or user is missing, cannot create meeting');
            return;
        };


        try {
            if (!values.dateTime) {
                toast("Please select a date and time");
                return;
            }

            const id = crypto.randomUUID();
            console.log('Meeting ID:', id);
            const call = client.call('default', id);

            if (!call) {
                console.error('Failed to create a call');
                throw new Error('Failed to create a call');
            };

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            });
            setCallDetails(call);

            if (!values.description) {
                navigate(`/mentor/dashboard/meeting/${call.id}`);
            }
            toast("Meeting Created");

        } catch (error) {
            console.log(error);
            toast("Failed to create Meeting");
        }
    }

    const meetingLink = `http://localhost:3000/api/v1/meeting/${callDetails?.id}`;
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                icon='Plus'
                title="New Meeting"
                description="Start an instant meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
            />
            <HomeCard
                icon='Link'
                title="Join Meeting"
                description="via invitation link"
                handleClick={() => setMeetingState('isJoiningMeeting')}
            />
            <HomeCard
                icon='Calendar'
                title="Schedule Meeting"
                description="Plan your meeting"
                handleClick={() => setMeetingState('isScheduleMeeting')}
            />
            <HomeCard
                icon='Video'
                title="View Recordings"
                description="Meeting Recordings"
                handleClick={() => navigate('/recordings')}
            />

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Create Meeting"
                    handleClick={createMeeting}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-sky-2">
                            Add a description
                        </label>
                        <Textarea
                            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={(e) =>
                                setValues({ ...values, description: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-sky-2">
                            Select Date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Meeting created"
                    className="text-center"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast("Link copied")
                    }}
                    image='/icons/checked.svg'
                    buttonIcon='/icons/copy.svg'
                    buttonText='Copy Meeting Link'
                />
            )}

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => navigate(values.link)}
            >
                <Input
                    placeholder="Meeting link"
                    className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e) => setValues({ ...values, link: e.target.value })}
                />
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList