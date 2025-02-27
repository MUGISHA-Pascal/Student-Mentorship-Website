/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Search, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminStatistics from '@/components/dashboard/admin/adminStatistics';
import { useApprovedMentors, useApproveMentor, usePendingMentors, useRejectMentor, useRemoveMentor } from '@/hooks/admin/useMentors';

const AdminItem: React.FC<{ mentor: any; onSelect: () => void; isSelected: boolean }> = ({ mentor, onSelect, isSelected }) => (
  <div
    className={
      `flex flex-col sm:flex-row sm:items-center justify-between p-4 text-card-foreground rounded-lg mb-2 cursor-pointer ${isSelected ? 'bg-gray-300' : 'bg-muted'}`
    }
    onClick={onSelect}
  >
    <div className="flex items-center mb-2 sm:mb-0">
      <input type="checkbox" className="mr-4" />
      <img src="/images/avatar.png" alt={mentor.user.firstName} className="w-10 h-10 rounded-full mr-4" />
      <div>
        <div className="font-medium">{mentor.user.firstName} {mentor.user.lastName}</div>
        <div className="text-sm text-muted-foreground">{mentor.user.email}</div>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:mt-0">
      <div className={`mb-2 sm:mb-0 sm:mr-4 px-3 py-1 text-secondary-foreground rounded-full ${isSelected ? 'bg-gray-300' : ''}`}>
        {mentor.career.map((c: any) => c.title).join(', ')}
      </div>
      <MoreVertical className="text-muted-foreground hidden sm:block" />
    </div>
  </div>
);

const MentorProfile: React.FC<{ mentor: any; isRemoving: boolean; removeMentor: (id: string) => void }> = ({ mentor, isRemoving, removeMentor }) => (
  <div className="bg-card text-card-foreground p-6 rounded-lg">
    <img src="/images/avatar.png" alt={mentor.user.firstName} className="w-24 h-24 rounded-full mx-auto mb-4" />
    <h3 className="text-xl font-bold text-center mb-2">{mentor.user.firstName} {mentor.user.lastName}</h3>
    <p className="text-muted-foreground text-center mb-6">
      {mentor.career?.map((c: any) => c.title).join(', ') ?? 'No career specified'}
    </p>
    <Tabs defaultValue="personal">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="bio">Bio</TabsTrigger>
        <TabsTrigger value="career">Career</TabsTrigger>
      </TabsList>
      <TabsContent value="personal" className="mt-4">
        <div className="space-y-2">
          <div><span className="font-semibold">Email:</span> {mentor.user.email}</div>
          <div className="flex justify-between">
            <div><span className="font-semibold">DOB:</span> {mentor.user.dob} </div>
            <div><span className="font-semibold">Gender:</span> {mentor.user.gender}</div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="bio">{mentor.bio}</TabsContent>
      <TabsContent value="career">
        {mentor.career?.map((c: any) => c.title).join(', ') ?? 'No career specified'}
      </TabsContent>
    </Tabs>
    <div className="mt-3 space-x-2 flex flex-col sm:flex-row">
      <Button
        variant="destructive"
        onClick={() => removeMentor(mentor.user.id)}
        disabled={isRemoving}
      >
        {isRemoving ? "Removing..." : "Remove"}
      </Button>
    </div>
  </div>
);

export default function AdminMentorsPage() {
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);
  const [approvedSearchQuery, setApprovedSearchQuery] = useState('');
  const [waitlistSearchQuery, setWaitlistSearchQuery] = useState('');
  const [approvedFilter, setApprovedFilter] = useState('All');
  const [waitlistFilter, setWaitlistFilter] = useState('All');
  const [approvedSortBy, setApprovedSortBy] = useState('name');
  const [waitlistSortBy, setWaitlistSortBy] = useState('name');
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const { approvingMentorId, approve } = useApproveMentor();
  const { rejectingMentorId, reject } = useRejectMentor();
  const { removingMentorId, remove } = useRemoveMentor();

  const { approvedMentors, setApprovedMentors, approvedPage, setApprovedPage, totalApprovedPages } = useApprovedMentors();
  const { pendingMentors, setPendingMentors, pendingPage, setPendingPage, totalPendingPages } = usePendingMentors();



  const updateMentorLists = (mentorId: string) => {
    setPendingMentors((prev) => prev.filter(m => m.user.id !== mentorId));
    const mentorToMove = pendingMentors.find(m => m.user.id === mentorId);
    if (mentorToMove) {
      setApprovedMentors((prev) => [...prev, mentorToMove]);
    }
  };

  const handleRemoveMentor = async (mentorId: string) => {
    await remove(mentorId, (updatedId) => {
      setApprovedMentors(prev => prev.filter(m => m.user.id !== updatedId));
      const mentorToReAdd = approvedMentors.find(m => m.user.id === updatedId);
      if (mentorToReAdd) {
        setPendingMentors(prev => [...prev, mentorToReAdd]);
      }
    });
    setSelectedMentor(null);
  };

  const filteredAndSortedApprovedMentors = approvedMentors
    .filter(m => {
      const nameMatch = `${m.user.firstName} ${m.user.lastName}`.toLowerCase().includes(approvedSearchQuery.toLowerCase());
      const emailMatch = m.user.email.toLowerCase().includes(approvedSearchQuery.toLowerCase());
      const careerMatch = approvedFilter === 'All' || m.career.some(c => c.title === approvedFilter);
      return (nameMatch || emailMatch) && careerMatch;
    })
    .sort((a, b) => {
      if (approvedSortBy === 'name') return a.user.firstName.localeCompare(b.user.firstName);
      if (approvedSortBy === 'email') return a.user.email.localeCompare(b.user.email);
      return 0;
    });

  const filteredAndSortedWaitlistMentors = pendingMentors
    .filter(m => {
      const nameMatch = `${m.user.firstName} ${m.user.lastName}`.toLowerCase().includes(waitlistSearchQuery.toLowerCase());
      const emailMatch = m.user.email.toLowerCase().includes(waitlistSearchQuery.toLowerCase());
      const careerMatch = waitlistFilter === 'All' || m.career.some(c => c.title === waitlistFilter);
      return (nameMatch || emailMatch) && careerMatch;
    })
    .sort((a, b) => {
      if (waitlistSortBy === 'name') return a.user.firstName.localeCompare(b.user.firstName);
      if (waitlistSortBy === 'email') return a.user.email.localeCompare(b.user.email);
      return 0;
    });

  const handleApprovedPageChange = async (newPage: number) => {
    if (newPage > 0 && newPage <= totalApprovedPages) {
      console.log(`Changing to page ${newPage}`);
      setIsLoadingNextPage(true);
      setApprovedPage(newPage);
      setIsLoadingNextPage(false);
    }
  };

  const handleWaitlistPageChange = async (newPage: number) => {
    if (newPage > 0 && newPage <= totalPendingPages) {
      console.log(`Changing to page ${newPage}`);
      setIsLoadingNextPage(true);
      setPendingPage(newPage);
      setPendingMentors(pendingMentors)
      setIsLoadingNextPage(false);
      console.log(`Approved page after changing to page ${newPage}`, pendingMentors);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <AdminStatistics />
      <div>
        <div className="flex flex-col lg:flex-row mt-8">
          <div className="w-full lg:w-2/3 lg:pr-6">
            <h2 className="text-xl font-semibold mb-4">Mentors List</h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-10 w-full sm:w-auto" placeholder="Search" value={approvedSearchQuery} onChange={e => setApprovedSearchQuery(e.target.value)} />
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto xl:mt-0 lg:mt-0 md:mt-0 mt-2">
                <Select onValueChange={setApprovedFilter} defaultValue="All">
                  <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by career" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Careers</SelectItem>
                    {approvedMentors
                      .filter(m => m && m.career)
                      .flatMap(m => m.career?.map(c => c.title) ?? [])
                      .filter((title, i, arr) => arr.indexOf(title) === i)
                      .map(title => <SelectItem key={title} value={title}>{title}</SelectItem>)
                    }
                  </SelectContent>
                </Select>
                <Select onValueChange={setApprovedSortBy} defaultValue="name">
                  <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="email">Sort by Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              {filteredAndSortedApprovedMentors.length > 0 ? (
                filteredAndSortedApprovedMentors.map(m => (
                  <AdminItem
                    key={m.id}
                    mentor={m}
                    onSelect={() => setSelectedMentor(m)}
                    isSelected={selectedMentor?.id === m.id}
                  />
                ))
              ) : (
                <div className="h-20 text-muted-foreground flex items-center justify-center">No such approved mentors found.</div>
              )}

            </div>
          </div>
          <div className="w-full lg:w-1/3">{selectedMentor && <MentorProfile mentor={selectedMentor} isRemoving={removingMentorId === selectedMentor?.user.id} removeMentor={handleRemoveMentor} />}</div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            onClick={() => handleApprovedPageChange(approvedPage - 1)}
            disabled={approvedPage === 1 || isLoadingNextPage}
          >
            Previous
          </Button>
          <span>Page {approvedPage} of {totalApprovedPages}</span>
          <Button
            variant="outline"
            onClick={() => handleApprovedPageChange(approvedPage + 1)}
            disabled={approvedPage >= totalApprovedPages || isLoadingNextPage}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Waitlist</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10 w-full sm:w-auto" placeholder="Search" value={waitlistSearchQuery} onChange={e => setWaitlistSearchQuery(e.target.value)} />
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto xl:mt-0 lg:mt-0 md:mt-0 mt-2">
            <Select onValueChange={setWaitlistFilter} defaultValue="All">
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by career" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Careers</SelectItem>
                {[...new Set([...approvedMentors, ...pendingMentors].flatMap(m => m.career?.map(c => c.title) ?? []))]
                  .map(title => <SelectItem key={title} value={title}>{title}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select onValueChange={setWaitlistSortBy} defaultValue="name">
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="email">Sort by Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {pendingMentors.length === 0 ? (
          <p className="text-muted-foreground">No mentors in the waitlist.</p>
        ) : (
          <div className="space-y-2">
            {filteredAndSortedWaitlistMentors.length > 0 ? (
              filteredAndSortedWaitlistMentors.map(m => (
                <div key={m.id} className="flex items-center justify-between bg-muted p-4 rounded-lg">
                  <div className="flex items-center">
                    {/* <input
                      type="checkbox"
                      className="mr-4"
                      checked={selectedWaitlistMentors.includes(m.id)}
                      onChange={() => setSelectedWaitlistMentors(prev =>
                        prev.includes(m.id) ? prev.filter(id => id !== m.id) : [...prev, m.id]
                      )}
                    /> */}
                    <img src="/images/avatar.png" alt={m.user.firstName} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                      <div className="font-medium">{m.user.firstName} {m.user.lastName}</div>
                      <div className="text-sm text-muted-foreground">{m.user.email}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => approve(m.user.id, updateMentorLists)}
                      disabled={approvingMentorId === m.user.id}
                    >
                      {approvingMentorId === m.user.id ? "Approving..." : "Approve"}
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => reject(m.user.id, updateMentorLists)}
                      disabled={rejectingMentorId === m.user.id}
                    >
                      {rejectingMentorId === m.user.id ? "Rejecting..." : "Reject"}
                    </Button>
                  </div>
                </div>
              ))) : (
              <div className="text-muted-foreground text-center flex justify-center items-center h-28">No such waitlisted mentors found.</div>
            )}

            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={() => handleWaitlistPageChange(pendingPage - 1)}
                disabled={pendingPage === 1 || isLoadingNextPage}
              >
                Previous
              </Button>
              <span>Page {pendingPage} of {totalPendingPages}</span>
              <Button
                variant="outline"
                onClick={() => handleWaitlistPageChange(pendingPage + 1)}
                disabled={pendingPage >= totalPendingPages || isLoadingNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
