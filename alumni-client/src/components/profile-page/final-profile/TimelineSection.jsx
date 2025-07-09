import Education from "./time-line/Education.jsx"
import Experience from "./time-line/Experience.jsx";
import HaveWorkedIn from "./time-line/HaveWorkedIn.jsx";
import Participation from "./time-line/Participation.jsx";

function TimelineSection({user}){
    console.log(user)
    return (
      <>
        {user?.education.length > 0 && <Education data={user.education} />}
        {user?.jobExperience.length > 0 && (
          <Experience data={user.jobExperience} />
        )}
        {user?.haveWorkedIn.length > 0 && (
          <HaveWorkedIn data={user.haveWorkedIn} />
        )}
        {user?.participatedIn.length > 0 && (
          <Participation data={user.participatedIn} />
        )}
      </>
    );
}

export default TimelineSection
