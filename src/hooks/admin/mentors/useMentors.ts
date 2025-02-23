import { useState, useEffect } from "react";
import { getMentors } from "@/services/admin/adminService";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    approved: boolean;
}

interface Mentor {
    id: string;
    userId: string;
    bio: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export const useMentors = (approvedStatus: boolean = true) => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                setLoading(true);
                const data: Mentor[] = await getMentors();
                const filteredMentors = data.filter(
                    (mentor) => mentor.user.approved === approvedStatus
                );
                setMentors(filteredMentors);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, [approvedStatus]);

    return { mentors, loading, error };
};
