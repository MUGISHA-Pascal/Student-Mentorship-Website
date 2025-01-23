import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import { getAllBlogs, getCoachActivities, getCoachStatistics } from '@/services/coach/coachService';

interface WeeklyStat {
  week: string;
  count: number;
}

interface CoachStatistics {
  studentCount: number;
  courseCount: number;
  completedActivities: number;
  ongoingActivities: number;
  upcomingActivities: number;
  avgRating: number;
  totalActivities: number;
  weeklyStats?: WeeklyStat[];
}


interface Activity {
  id: string;
  name: string;
  createdAt: string;
  status: 'DONE' | 'ONGOING' | 'UPCOMING';
  image: string;
  coachId: string;
  date: string;
}

export interface GroupedActivities {
  upcoming: Activity[];
  ongoing: Activity[];
  done: Activity[];
}

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
  dateCreated: string;
}

interface BlogParams {
  sortBy?: string;
  order?: string;
  page?: number;
  limit?: number;
}

export const useCoachStatistics = (coachId: string) => {
  const [statistics, setStatistics] = useState<CoachStatistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coachId) return;

    const fetchStatistics = async () => {
      try {
        setLoading(true);

        const data = await getCoachStatistics(coachId);


        const totalActivities =
          (data.completedActivities || 0) + (data.ongoingActivities || 0) + (data.upcomingActivities || 0);

        setStatistics({
          weeklyStats: data.weeklyStats || [],
          studentCount: data.studentCount || 0,
          courseCount: data.courseCount || 0,
          completedActivities: data.completedActivities || 0,
          ongoingActivities: data.ongoingActivities || 0,
          upcomingActivities: data.upcomingActivities || 0,
          avgRating: data.avgRating || 0,
          totalActivities,
        });

      } catch (err) {
        setError("Failed to load statistics");
        console.error("Failed to load statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [coachId]);

  return { statistics, loading, error };
};


export const useCoachActivities = (coachId: string) => {
  const [groupedActivities, setGroupedActivities] = useState<GroupedActivities>({
    upcoming: [],
    ongoing: [],
    done: [],
  });
  const [ongoingCourses, setOngoingCourses] = useState<Activity[]>([]);
  const [todayActivities, setTodayActivities] = useState<Activity[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [activitiesByDate, setActivitiesByDate] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!coachId) return;

    const fetchActivities = async () => {
      try {
        setLoading(true);
        const activities: Activity[] = await getCoachActivities(coachId);

        // Group activities by their status
        const grouped = activities.reduce<GroupedActivities>(
          (acc, activity) => {
            if (activity.status === 'UPCOMING') acc.upcoming.push(activity);
            else if (activity.status === 'ONGOING') acc.ongoing.push(activity);
            else if (activity.status === 'DONE') acc.done.push(activity);
            return acc;
          },
          { upcoming: [], ongoing: [], done: [] }
        );

        setGroupedActivities(grouped);

        setOngoingCourses(grouped.ongoing);

        const currentDate = dayjs().format('YYYY-MM-DD');
        const today = activities.filter((activity) =>
          dayjs(activity.date).isSame(currentDate, 'day')
        );
        setTodayActivities(today);

        const oneWeekAgo = dayjs().subtract(7, 'days');
        const recent = activities.filter((activity) =>
          dayjs(activity.createdAt).isAfter(oneWeekAgo)
        );
       
        setRecentActivities(recent);

        setActivitiesByDate([]);
      } catch (err) {
        setError('Failed to load activities');
        console.error('Failed to load activities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [coachId]);

  const filterActivitiesByDate = (date: Date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const allActivities = [
      ...groupedActivities.upcoming,
      ...groupedActivities.ongoing,
      ...groupedActivities.done,
    ];
    const filtered = allActivities.filter((activity) =>
      dayjs(activity.date).isSame(formattedDate, 'day')
    );
    setActivitiesByDate(filtered);
  };

  return { groupedActivities, ongoingCourses, todayActivities, recentActivities, activitiesByDate, filterActivitiesByDate, loading, error };
};


export const useBlogs = (initialParams: BlogParams = {}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogs({
          order: initialParams.order || 'asc',
          page: initialParams.page || 1,
          limit: initialParams.limit || 8,
        });
        setBlogs(data.data);
      } catch (err) {
        setError('Failed to load blogs');
        console.error('Failed to load blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
};