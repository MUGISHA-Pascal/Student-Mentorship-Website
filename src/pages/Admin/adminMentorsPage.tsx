import React, { useState, useEffect } from 'react';
import { Search, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminStatistics from '@/components/dashboard/admin/adminStatistics';

interface Mentor {
  id: string;
  userId: string;
  bio: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    approved: boolean;
  };
  career: {
    id: string;
    title: string;
    description: string;
  }[];
}

const AdminItem: React.FC<{ mentor: Mentor; isWaitlist?: boolean; onSelect: () => void }> = ({ mentor, isWaitlist = false, onSelect }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 text-card-foreground rounded-lg mb-2 cursor-pointer bg-muted" onClick={onSelect}>
    <div className="flex items-center mb-2 sm:mb-0">
      <input type="checkbox" className="mr-4" />
      <img src="/images/avatar.png" alt={mentor.user.firstName} className="w-10 h-10 rounded-full mr-4" />
      <div>
        <div className="font-medium">{mentor.user.firstName} {mentor.user.lastName}</div>
        <div className="text-sm text-muted-foreground">{mentor.user.email}</div>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
      <div className="mb-2 sm:mb-0 sm:mr-4 px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
        {mentor.career.map(c => c.title).join(', ')}
      </div>
      {!isWaitlist && <MoreVertical className="text-muted-foreground hidden sm:block" />}
    </div>
  </div>
);

const MentorProfile: React.FC<{ mentor: Mentor }> = ({ mentor }) => (
  <div className="bg-card text-card-foreground p-6 rounded-lg">
    <img src="/images/avatar.png" alt={mentor.user.firstName} className="w-24 h-24 rounded-full mx-auto mb-4" />
    <h3 className="text-xl font-bold text-center mb-2">{mentor.user.firstName} {mentor.user.lastName}</h3>
    <p className="text-muted-foreground text-center mb-6">{mentor.career.map(c => c.title).join(', ')}</p>
    <Tabs defaultValue="personal">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="bio">Bio</TabsTrigger>
      </TabsList>
      <TabsContent value="personal" className="mt-4">
        <div className="space-y-2">
          <div><span className="font-medium">Name:</span> {mentor.user.firstName} {mentor.user.lastName}</div>
          <div><span className="font-medium">Email:</span> {mentor.user.email}</div>
          <div><span className="font-medium">Field:</span> {mentor.career.map(c => c.title).join(', ')}</div>
        </div>
      </TabsContent>
      <TabsContent value="bio">{mentor.bio}</TabsContent>
      <TabsContent value="achievements">Achievements content</TabsContent>
    </Tabs>
  </div>
);

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [waitlist, setWaitlist] = useState<Mentor[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedWaitlistMentors, setSelectedWaitlistMentors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterField, setFilterField] = useState('All')

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/admin/mentors')
      .then(res => res.json())
      .then(data => {
        const approved = data.filter((mentor: Mentor) => mentor.user.approved);
        const pending = data.filter((mentor: Mentor) => !mentor.user.approved);
        setMentors(approved);
        setWaitlist(pending);
        if (approved.length > 0) setSelectedMentor(approved[0]);
      });
  }, []);

  const handleApproval = async (mentorId: string, approve: boolean) => {
    await fetch(`http://localhost:3000/api/v1/admin/mentor/${mentorId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approve })
    });

    if (approve) {
      const approvedMentor = waitlist.find(m => m.id === mentorId);
      if (approvedMentor) {
        setMentors(prev => [...prev, approvedMentor]);
        setWaitlist(prev => prev.filter(m => m.id !== mentorId));
      }
    } else {
      setWaitlist(prev => prev.filter(m => m.id !== mentorId));
    }

    setSelectedWaitlistMentors([]);
  };

  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <AdminStatistics />
      <div className="flex flex-col lg:flex-row mt-8">
        <div className="w-full lg:w-2/3 lg:pr-6">
          <h2 className="text-xl font-semibold mb-4">Mentors List</h2>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-10 w-full sm:w-auto" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Select onValueChange={setFilterField} defaultValue="All">
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by field" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Fields</SelectItem>
                  {mentors.flatMap(m => m.career).map(c => c.title).map((title, i, arr) => arr.indexOf(title) === i ? <SelectItem key={title} value={title}>{title}</SelectItem> : null)}
                </SelectContent>
              </Select>
              <Select onValueChange={setSortBy} defaultValue="name">
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="email">Sort by Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">{mentors.map(m => <AdminItem key={m.id} mentor={m} onSelect={() => setSelectedMentor(m)} />)}</div>
        </div>
        <div className="w-full lg:w-1/3">{selectedMentor && <MentorProfile mentor={selectedMentor} />}</div>
      </div>


      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Waitlist</h2>
        {waitlist.length === 0 ? (
          <p className="text-muted-foreground">No mentors in the waitlist.</p>
        ) : (
          <div className="space-y-2">
            {waitlist.map(m => (
              <div key={m.id} className="flex items-center justify-between bg-muted p-4 rounded-lg">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-4"
                    checked={selectedWaitlistMentors.includes(m.id)}
                    onChange={() => setSelectedWaitlistMentors(prev =>
                      prev.includes(m.id) ? prev.filter(id => id !== m.id) : [...prev, m.id]
                    )}
                  />
                  <img src="/images/avatar.png" alt={m.user.firstName} className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <div className="font-medium">{m.user.firstName} {m.user.lastName}</div>
                    <div className="text-sm text-muted-foreground">{m.user.email}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => handleApproval(m.id, true)}>Approve</Button>
                  <Button variant="destructive" onClick={() => handleApproval(m.id, false)}>Reject</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
