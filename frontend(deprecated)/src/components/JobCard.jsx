import React from "react";
import {Card, CardBody, Typography} from "@material-tailwind/react";

function JobCard({user}) {
  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
      <Card className="mt-6 max-w-full min-h-max w-full bg-[#212121]">
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-white"
          >
            Job Experience
          </Typography>
          <Typography className="text-white">
            {Array.isArray(user.jobExperience)
              ? user.jobExperience.map((job, index) => (
                  <div key={index}>
                    <strong>{job.title}</strong> at {job.company} for{" "}
                    {job.years} years
                  </div>
                ))
              : user.jobExperience}
          </Typography>
        </CardBody>
      </Card>

      <Card className="mt-6 max-w-full min-h-max w-full bg-[#212121]">
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-white"
          >
            Currently Working In
          </Typography>
          <Typography className="text-white">
            {user.currentlyWorkingIn}
          </Typography>
        </CardBody>
      </Card>

      <Card className="mt-6 max-w-full min-h-max w-full bg-[#212121]">
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-white"
          >
            Have Worked In
          </Typography>
          <Typography className="text-white">{user.haveWorkedIn}</Typography>
        </CardBody>
      </Card>

      <Card className="mt-6 max-w-full min-h-max w-full bg-[#212121]">
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-white"
          >
            Future Interests
          </Typography>
          <Typography className="text-white">{user.futureInterests}</Typography>
        </CardBody>
      </Card>
    </div>
  );
}

export default JobCard;
