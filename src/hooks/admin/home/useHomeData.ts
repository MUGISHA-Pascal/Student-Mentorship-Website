import { getAdminStatistics } from "@/services/admin/adminService";
import { useState, useEffect } from "react";

interface AdminStatistics {
    studentCount: number;
    mentorCount: number;
    courseCount: number;
    cohortCount: number;
    approvedStudents: number;
    waitlistedStudents: number;
    approvedMentors: number;
    waitlistedMentors: number;
  }

const useAdminStatistics = () => {
    const [statistics, setStatistics] = useState<AdminStatistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const data = await getAdminStatistics();                
                setStatistics(data);
            } catch (err) {
                setError("Failed to load statistics");
                console.error("Failed to load statistics:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    return { statistics, loading, error };
};

export default useAdminStatistics;
