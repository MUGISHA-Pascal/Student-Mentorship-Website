import CoachIntro from '@/components/dashboard/student/coachIntro'
import MentorExperience from '@/components/dashboard/student/mentorExperience'
import Reviews from '@/components/dashboard/student/reviews'
import coachImage from "/images/mentor_profile.png";

export default function StudentMentorProfil() {
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <img src="/images/profil1.png?height=300&width=300" alt="Dr. Marcus" className="w-full h-auto rounded-lg mb-4" />
              <h2 className="text-2xl font-bold mb-2">Dr. Marcus</h2>
              <div className="flex items-center mb-4">
                {renderStars(3)}
                <span className="ml-2 text-sm text-blue-600">31 Reviews</span>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Full Name:</strong> Dr. John Doe</p>
                <p><strong>Phone Number:</strong> +250 780 000 000</p>
                <p><strong>Specialisation:</strong> Experience</p>
              </div>
              <p className="mt-4 text-sm">Bio info about the coach on his background and also some expreince info to give the student and more about info. about info can be added to make the student interested in the coach</p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Experience Timeline</h3>
                <Button variant="outline" size="sm" className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </div>
              {renderExperienceTimeline()}
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
            <StatCard icon={<BookOpen className="h-6 w-6 text-orange-500" />} value="12" label="Courses" subtitle="Provided" />
            </Card>
            <Card>
            <StatCard icon={<Users className="h-6 w-6 text-green-500" />} value="80%" label="Mentor-rate" subtitle="Last week" />
            </Card>          
          </div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">31 Reviews</h3>
              <div className="mb-4">
                <Textarea
                  placeholder="Add a review"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="w-full mb-2"
                />
                <div className="flex justify-between items-center">
                  <div className="flex">
                    {renderStars(0)}
                  </div>
                  <Button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>Post</Button>
                </div>
              </div>
              {renderReviews()}
              <Button variant="outline" className="w-full mt-4">Hide All</Button>
            </CardContent>
          </Card>
        </div>
      </div> */}
      <CoachIntro
        image={coachImage}
        name="Dr. Marcus"
        fullName="Dr. John Doe"
        phoneNumber="+250 780 000 000"
        specialization="IT Monetization"
        bio="Bio info about the coach on his background and also some experience info to give the student more interest."
        reviews={31}
      />
      <MentorExperience />
      <Reviews />
    </div>
  )
}