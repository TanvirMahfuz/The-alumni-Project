import Education from "../time-line/Education/Education.jsx"
import Experience from "../time-line/Experience/Experience.jsx";
import HaveWorkedIn from "../time-line/HaveWorkedIn/HaveWorkedIn.jsx";
import Participation from "../time-line/Participation/Participation.jsx";
import TabEmpty from "../TabEmpty/TabEmpty.jsx";

function TimelineSection({user}){
    const hasAny =
      user?.education?.length > 0 ||
      user?.jobExperience?.length > 0 ||
      user?.haveWorkedIn?.length > 0 ||
      user?.participatedIn?.length > 0;

    if (!hasAny) {
      return <TabEmpty title="Profile" message="No profile details added yet." />;
    }

    return (
      <>
        {user?.education?.length > 0 && <Education data={user.education} />}
        {user?.jobExperience?.length > 0 && (
          <Experience data={user.jobExperience} />
        )}
        {user?.haveWorkedIn?.length > 0 && (
          <HaveWorkedIn data={user.haveWorkedIn} />
        )}
        {user?.participatedIn?.length > 0 && (
          <Participation data={user.participatedIn} />
        )}

      </>
    );
}

export default TimelineSection
