import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function SideProfile({item}) {
  const [profile, setProfile] = React.useState(item);
  const handleClick = (val) => {};
  return (
    <>
      <Card className="mt-6 w-100 max-h-max">
        <CardHeader
          color="blue-gray"
          className="relative h-56 flex items-center justify-center"
        >
          <img
            src={item.image}
            alt="card-image"
            className="flex max-w-full h-full "
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {item.name}
          </Typography>
          <p variant="h6">{item.email}</p>
          <ul className="flex space-x-6 mt-4">
            <li>
              <a
                href={item.contacts?.github}
                target="_blank"
                className="text-gray-900 hover:text-gray-700 text-2xl"
              >
                <i className="bi bi-github"></i>
              </a>
            </li>
            <li>
              <a
                href={item.contacts?.linkedin}
                target="_blank"
                className="text-gray-900 hover:text-gray-700 text-2xl"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </li>
            <li>
              <a
                href={item.contacts?.facebook}
                target="_blank"
                className="text-gray-900 hover:text-gray-700 text-2xl"
              >
                <i className="bi bi-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href={item.contacts?.portfolio}
                target="_blank"
                className="text-gray-900 hover:text-gray-700 text-2xl"
              >
                <i className="bi bi-person-bounding-box"></i>
              </a>
            </li>
          </ul>
        </CardBody>
        <CardFooter className="pt-0"></CardFooter>
      </Card>
    </>
  );
}
