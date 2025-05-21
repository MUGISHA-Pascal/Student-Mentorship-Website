import CoachIntro from "@/components/dashboard/student/coachIntro";
import MentorExperience from "@/components/dashboard/student/mentorExperience";
import Reviews from "@/components/dashboard/student/reviews";
import coachImage from "/images/mentor_profile.png";

export default function StudentMentorProfil() {
  const { user }: { user: any } = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  console.log("user in the mentor profile", user);
  if (user.coach == null || user.coach.length() == 0) {
    return <div>no mentors</div>;
  } else {
    return (
      <div className="container mx-auto px-4 py-8">
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
    );
  }
}
