import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAuthStore} from "../store/useUserStore";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

export function LogInCard() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {isLoggingIn,logIn} = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const res = await logIn(formData);
      if(res){
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    } 
    
  };

  return (
    
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Email"
          size="lg"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Password"
          size="lg"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth onClick={handleSubmit}>
          Sign In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Typography
            as="a"
            href="/register"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Sign up
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
}
