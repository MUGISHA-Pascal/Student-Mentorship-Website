import React, { createContext, useContext, useState, useEffect } from 'react';
import { Coach, CoachStats, Event, Course } from '../types';

interface CoachContextType {
  coach: Coach | null;
  stats: CoachStats;
  events: Event[];
  currentCourse: Course | null;
  updateCoach: (data: Partial<Coach>) => void;
  updateStats: (data: Partial<CoachStats>) => void;
  addEvent: (event: Event) => void;
  removeEvent: (eventId: string) => void;
  updateCourse: (data: Partial<Course>) => void;
}

const CoachContext = createContext<CoachContextType | null>(null);

export const CoachProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coach, setCoach] = useState<Coach | null>(null);
  const [stats, setStats] = useState<CoachStats>({
    activitiesLastWeek: 0,
    mentorRate: 0,
    studentsCoached: 0,
    coursesProvided: 0,
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Fetch initial coach data from localStorage or API
    const storedCoach = localStorage.getItem('coach');
    if (storedCoach) {
      setCoach(JSON.parse(storedCoach));
    }
  }, []);

  const updateCoach = (data: Partial<Coach>) => {
    setCoach(prev => {
      const updated = prev ? { ...prev, ...data } : { ...data } as Coach;
      localStorage.setItem('coach', JSON.stringify(updated));
      return updated;
    });
  };

  const updateStats = (data: Partial<CoachStats>) => {
    setStats(prev => ({ ...prev, ...data }));
  };

  const addEvent = (event: Event) => {
    setEvents(prev => [...prev, event]);
  };

  const removeEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const updateCourse = (data: Partial<Course>) => {
    setCurrentCourse(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <CoachContext.Provider value={{
      coach,
      stats,
      events,
      currentCourse,
      updateCoach,
      updateStats,
      addEvent,
      removeEvent,
      updateCourse,
    }}>
      {children}
    </CoachContext.Provider>
  );
};

export const useCoach = () => {
  const context = useContext(CoachContext);
  if (!context) {
    throw new Error('useCoach must be used within a CoachProvider');
  }
  return context;
};