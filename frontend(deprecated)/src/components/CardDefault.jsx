import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function CardDefault({user}) {
  console.log("from default card ",user);

  return (
    <>
      <Card className=" bg-white mt-6  max-w-100 min-h-max w-full ">
        <CardHeader
          color="blue-gray"
          className="relative h-56 flex items-center justify-center "
        >
          <img src={(user.image)?user.image:""} alt="card-image" className="h-full" />
        </CardHeader>
        <CardBody className="">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {(user.name)?user.name:''}
          </Typography>
          <Typography className="overflow-clip">{(user.bio)?user.bio:""}</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            className="flex items-center gap-2 "
          >
            Read More{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
