import CoachIntro from "../../../components/dashboard/student/coachIntro"
import MentorExperience from "../../../components/dashboard/student/mentorExperience";
import Reviews from "../../../components/dashboard/student/reviews";
import coachImage from "/images/mentor_profile.png";

const MentorStudent = () => {
  return (
    <div>
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

export default MentorStudent