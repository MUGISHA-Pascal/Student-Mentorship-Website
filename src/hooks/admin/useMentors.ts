/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getMentors } from "@/services/admin/mentorsService";
import { useState, useEffect } from "react";

interface Mentor {
  id: string;
  bio: string;
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
}

export const useMentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [approvedMentors, setApprovedMentors] = useState<Mentor[]>([]);
  const [pendingMentors, setPendingMentors] = useState<Mentor[]>([]);
  const [mentorsLoading, setMentorsLoading] = useState<boolean>(true); // More specific name
  const [mentorsError, setMentorsError] = useState<string | null>(null); // More specific error name

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setMentorsLoading(true);
        const data = await getMentors();

        const formattedMentors: Mentor[] = data.map((mentor: any) => ({
          id: mentor.id,
          bio: mentor.bio,
          image: mentor.image,
          user: {
            id: mentor.user.id,
            firstName: mentor.user.firstName,
            lastName: mentor.user.lastName,
            email: mentor.user.email,
            approved: mentor.user.approved,
            dob: mentor.user.dob,
            gender: mentor.user.gender,
            role: mentor.user.role,
            filledForm: mentor.user.filledForm,
            filledProfile: mentor.user.filledProfile,
            createdAt: mentor.user.createdAt,
          },
        }));

        setMentors(formattedMentors);
        setApprovedMentors(formattedMentors.filter((mentor) => mentor.user.approved));
        setPendingMentors(formattedMentors.filter((mentor) => !mentor.user.approved));
      } catch (err) {
        setMentorsError("Failed to fetch mentors");
      } finally {
        setMentorsLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return { mentors, approvedMentors, pendingMentors, mentorsLoading, mentorsError };
};
