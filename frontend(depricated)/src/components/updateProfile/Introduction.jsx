import React,{useState} from "react";
import { Input,Checkbox } from "@material-tailwind/react";
import { useUserUpdateStore } from "../../store/useUserUpdateStore.js";
import { useAuthStore } from "../../store/useUserStore.js";

function Introduction({ formData, setFormData }) {
  const { authUser } = useAuthStore();
  const [name, setName] = useState(authUser.name ?? "");
  const [session, setSession] = useState(authUser.session ?? "");
  const [email, setEmail] = useState(authUser.email ?? "");
  const [bio, setBio] = useState(authUser.bio ?? "");
  const [availableForWork, setAvailableForWork] = useState(
    authUser.availableForWork ?? false
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          variant="standard"
          label="Name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleChange(e);
          }}
        />
        <Input
          variant="standard"
          label="Session"
          name="session"
          value={session}
          onChange={(e) => {
            setSession(e.target.value);
            handleChange(e);
          }}
        />
        <Input
          variant="standard"
          label="Email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleChange(e);
          }}
        />
      </div>

      <Input
        variant="standard"
        label="Bio"
        name="bio"
        value={bio}
        onChange={(e) => {
          setBio(e.target.value);
          handleChange(e);
        }}
      />
      <Checkbox
        label="Available for work"
        name="availableForWork"
        checked={availableForWork}
        onChange={(e) => {
          setAvailableForWork(e.target.checked)
          setFormData({ ...formData, availableForWork: e.target.checked });
        }}
      />
    </>
  );
}

export default Introduction;
