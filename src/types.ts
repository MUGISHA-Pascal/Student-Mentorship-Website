export interface Coach {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    avatar?: string;
    careers: string[];
    experience: {
      career: string;
      from: string;
      to: string;
    }[];
    introVideoUrl?: string;
    rating: number;
    reviewCount: number;
    pricePerMonth: number;
    discountedPrice?: number;
    setupCompleted: boolean;
  }
  
  export interface CoachStats {
    activitiesLastWeek: number;
    mentorRate: number;
    studentsCoached: number;
    coursesProvided: number;
  }
  
  export interface Event {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    type: 'meeting' | 'course' | 'other';
  }
  
  export interface Course {
    id: string;
    title: string;
    progress: number;
    startDate: string;
  }