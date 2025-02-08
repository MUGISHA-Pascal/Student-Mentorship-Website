import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, } from 'lucide-react'
import { useUserStore } from '@/store/userStore'
import { useBlogs, useCoachActivities } from '@/hooks/coach/home/useHomeData'
import DashboardAdminOverview from '@/components/dashboard/admin/dashboardAdminOverview'
import useAdminStatistics from '@/hooks/admin/home/useHomeData'
import AdminGraph from '@/components/dashboard/admin/adminGraph'


interface UpcomingEventProps {
  title: string;
  subtitle: string;
}

export const UpcomingEvent: React.FC<UpcomingEventProps> = ({ title, subtitle }) => (
  <Card className="mb-4 bg-card text-card-foreground">
    <CardContent className="flex items-center p-4">
      <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full mr-4">
        <GraduationCap className="h-6 w-6 text-orange-500 dark:text-orange-300" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </CardContent>
  </Card>
)



export default function HomePage() {
  const { user, role, fetchUser } = useUserStore();
  
  const [currentDate] = useState(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  });
  const [coachId, setCoachId] = useState<string>('');
  const { blogs, loading, error } = useBlogs({ order: 'asc', page: 1, limit: 8 });


  useEffect(() => {
    const loadUser = async () => {
      if (!role) {
        await fetchUser();
      }
      if (role) {
        setCoachId(role.id);
      }
    };

    const timeout = setTimeout(loadUser, 1000);

    return () => clearTimeout(timeout);
  }, [fetchUser, role]);


  const fullName = user ? `${user?.firstName} ${user?.lastName}` : "Loading...";
  const { groupedActivities, todayActivities } = useCoachActivities(coachId);


  const { statistics } = useAdminStatistics()


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-0 lg:p-6 md:p-5 space-y-6 bg-background text-foreground">
      <DashboardAdminOverview
        name={fullName}
        currentDate={currentDate}
        currentTask={todayActivities.length > 0 ? todayActivities[0].name : "No task today"}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          {statistics ? (
            <AdminGraph />
          ) : (
            <p>Loading statistics...</p>
          )}
        </Card>

        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Upcoming</CardTitle>
              <a href="/admin/dashboard/calendar" className="text-blue-500 font-medium">Full Calendar</a>
            </div>
          </CardHeader>
          <CardContent>
            {groupedActivities.upcoming.length > 0 ? (
              groupedActivities.upcoming.map((activity) => (
                <UpcomingEvent
                  key={activity.id}
                  title={activity.name}
                  subtitle={`Scheduled on ${new Date(activity.date).toLocaleDateString()}`}
                />
              ))
            ) : (
              <p>No upcoming activities</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>What is New?</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading blogs...</p>
          ) : error ? (
            <p>Error loading blogs: {error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 gap-4">
              {blogs.map((blog) => (
                <Card key={blog.id} className="bg-card text-card-foreground">
                  <CardContent className="p-0">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-lg">{blog.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-3">{blog.description}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Created on: {new Date(blog.dateCreated).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}