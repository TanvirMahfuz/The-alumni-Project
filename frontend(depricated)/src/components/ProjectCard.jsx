import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
const ProjectCard = ({project}) => {
  return (
    <Card className="mt-6 w-96 bg-[#212121]">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2  text-white">
          {project.projectName}
        </Typography>
        <Typography className="text-white">
          {project.projectDescription}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href={project.projectLink} className="inline-block">
          <Button
            size="sm"
            className="flex items-center gap-2 text-white bg-[#dda15e]"
          >
            github
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
