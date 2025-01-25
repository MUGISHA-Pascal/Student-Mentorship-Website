import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card'; // Assuming these are your Card components
import { useUserStore } from '@/store/userStore';
import { useCoachStatistics } from '@/hooks/coach/home/useHomeData';

const MentorStatistics: React.FC = () => {
  const { role, fetchUser } = useUserStore();
  const [coachId, setCoachId] = useState<string>("");

  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
    };

    loadUser();
  }, [fetchUser]);

  useEffect(() => {
    if (role) setCoachId(role.id);
  }, [role]);


  const { statistics, loading, error } = useCoachStatistics(coachId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const activities = statistics?.totalActivities || 0;
  const avgRating = statistics?.avgRating || 0;
  const medals = statistics?.studentCount || 0;
  const courses = statistics?.courseCount || 0;

  const stats = [
    {
      image: '/svgs/activities.svg',
      value: activities,
      color: 'text-orange-500',
      title: 'Activities',
      status: 'All',
    },
    {
      image: '/svgs/mentors.svg',
      value: avgRating,
      color: 'text-green-500',
      title: 'Average Rate',
      status: 'Rated',
    },
    {
      image: '/svgs/medal.svg',
      value: medals,
      color: 'text-red-500',
      title: 'Students',
      status: 'Coached',
    },
    {
      image: '/svgs/courses.svg',
      value: courses,
      color: 'text-orange-500',
      title: 'Courses',
      status: 'Provided',
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 lg:gap-[5%]">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="flex items-center justify-center px-8 py-4 gap-x-3 rounded-lg text-center"
        >
          <CardContent className="flex items-center p-6">
            <div>
              <img src={stat.image} alt={stat.title} className="" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm font-medium">{stat.title}</div>
              <div className="text-xs text-muted-foreground">{stat.status}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MentorStatistics;
