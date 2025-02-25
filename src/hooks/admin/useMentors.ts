/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { approveMentor, getMentors, rejectMentor, removeMentor } from "@/services/admin/mentorsService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface Career {
    id: string;
    title: string;
    description: string;
}

interface WorkExperience {
    id: string;
    position: string;
    company: string;
    startDate: string;
    endDate: string;
}

interface Mentor {
    id: string;
    bio: string | null;
    image: string | null;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        approved: boolean;
        dob: string | null;
        gender: string | null;
        role: string;
        filledForm: boolean;
        filledProfile: boolean;
        createdAt: string;
    };
    career: Career[];
    workExperience: WorkExperience[];
}

export const useMentors = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [approvedMentors, setApprovedMentors] = useState<Mentor[]>([]);
    const [pendingMentors, setPendingMentors] = useState<Mentor[]>([]);
    const [mentorsLoading, setMentorsLoading] = useState<boolean>(true);
    const [mentorsError, setMentorsError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 50;

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                setMentorsLoading(true);
                const data = await getMentors(page, itemsPerPage);

                const formattedMentors: Mentor[] = data.data.map((mentor: any) => ({
                    id: mentor.id,
                    bio: mentor.bio || null,
                    image: mentor.image || null,
                    user: {
                        id: mentor.user.id,
                        firstName: mentor.user.firstName,
                        lastName: mentor.user.lastName,
                        email: mentor.user.email,
                        approved: mentor.user.approved,
                        dob: mentor.user.dob || null,
                        gender: mentor.user.gender || null,
                        role: mentor.user.role,
                        filledForm: mentor.user.filledForm,
                        filledProfile: mentor.user.filledProfile,
                        createdAt: mentor.user.createdAt,
                    },
                    career: mentor.career?.map((c: any) => ({
                        id: c.id,
                        title: c.title,
                        description: c.description,
                    })) || [],
                    workExperience: mentor.workExperience?.map((we: any) => ({
                        id: we.id,
                        position: we.position,
                        company: we.company,
                        startDate: we.startDate,
                        endDate: we.endDate,
                    })) || [],
                }));

                setMentors(formattedMentors);
                setApprovedMentors(formattedMentors.filter((mentor) => mentor.user.approved));
                setPendingMentors(formattedMentors.filter((mentor) => !mentor.user.approved));
            } catch (err) {
                console.error("Failed to fetch mentors:", err);
                setMentorsError("Failed to fetch mentors");
            } finally {
                setMentorsLoading(false);
            }
        };

        fetchMentors();
    }, [page]);

    return { mentors, approvedMentors, setApprovedMentors, pendingMentors, setPendingMentors, mentorsLoading, mentorsError, setPage };
};


// export const useApproveMentor = () => {
//     const [isApproving, setIsApproving] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);

//     const approve = async (mentorId: string) => {
//         setIsApproving(true);
//         try {
//             const response = await approveMentor(mentorId);
//             setSuccessMessage(response.message);
//             toast.success("Mentor approved successfully!");
//         } catch (err) {
//             setError("Failed to approve mentor");
//             toast.error("Failed to approve mentor");
//         } finally {
//             setIsApproving(false);
//         }
//     };

//     return { approve, isApproving, error, successMessage };
// };


// export const useRejectMentor = () => {
//     const [isRejecting, setIsRejecting] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);

//     const reject = async (mentorId: string) => {
//         setIsRejecting(true);
//         try {
//             const response = await rejectMentor(mentorId);
//             setSuccessMessage(response.message);
//             toast.success("Mentor rejected successfully!");
//         } catch (err) {
//             setError("Failed to reject mentor");
//             toast.error("Failed to reject mentor");
//         } finally {
//             setIsRejecting(false);
//         }
//     };

//     return { reject, isRejecting, error, successMessage };
// };


// export const useRemoveMentor = () => {
//     const [isRemoving, setIsRemoving] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);

//     const remove = async (mentorId: string) => {
//         setIsRemoving(true);
//         try {
//             const response = await removeMentor(mentorId);
//             setSuccessMessage(response.message);
//             toast.success("Mentor removed successfully!");
//         } catch (err) {
//             setError("Failed to remove mentor");
//             toast.error("Failed to remove mentor");
//         } finally {
//             setIsRemoving(false);
//         }
//     };

//     return { remove, isRemoving, error, successMessage };
// };

export const useApproveMentor = () => {
    const [approvingMentorId, setApprovingMentorId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const approve = async (mentorId: string, updateMentorLists: (mentorId: string) => void) => {
        setApprovingMentorId(mentorId);
        try {
            const response = await approveMentor(mentorId);
            setSuccessMessage(response.message);
            toast.success("Mentor approved successfully!");

            // Update UI immediately
            updateMentorLists(mentorId);
        } catch (err) {
            setError("Failed to approve mentor");
            toast.error("Failed to approve mentor");
        } finally {
            setApprovingMentorId(null);
        }
    };

    return { approve, approvingMentorId, error, successMessage };
};

export const useRejectMentor = () => {
    const [rejectingMentorId, setRejectingMentorId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const reject = async (mentorId: string, updateMentorLists: (mentorId: string) => void) => {
        setRejectingMentorId(mentorId);
        try {
            const response = await rejectMentor(mentorId);
            setSuccessMessage(response.message);
            toast.success("Mentor rejected successfully!");

            // Update UI immediately
            updateMentorLists(mentorId);
        } catch (err) {
            setError("Failed to reject mentor");
            toast.error("Failed to reject mentor");
        } finally {
            setRejectingMentorId(null);
        }
    };

    return { reject, rejectingMentorId, error, successMessage };
};

export const useRemoveMentor = () => {
    const [removingMentorId, setRemovingMentorId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const remove = async (mentorId: string, updateMentorLists: (mentorId: string) => void) => {
        setRemovingMentorId(mentorId);
        try {
            const response = await removeMentor(mentorId);
            setSuccessMessage(response.message);
            toast.success("Mentor removed successfully!");

            // Update UI immediately
            updateMentorLists(mentorId);
        } catch (err) {
            setError("Failed to remove mentor");
            toast.error("Failed to remove mentor");
        } finally {
            setRemovingMentorId(null);
        }
    };

    return { remove, removingMentorId, error, successMessage };
};