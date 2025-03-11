import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
import React from "react";
import axios from "axios";
import {SuccessAlert} from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import {useNavigate} from "react-router-dom";
import Layout from "../laytout/layout";

function CreatePost() {
  const [formData, setFormData] = React.useState({description: "", images: []});
  const [selectedImages, setSelectedImages] = React.useState([]); // Array for image previews
  const [loading, setLoading] = React.useState(false); // Loading state
  const [alert, setAlert] = React.useState({type: "", message: ""}); // Alert state
  const navigate = useNavigate(); // Use navigate hook here

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({type: "", message: ""});

    const data = new FormData();
    data.append("description", formData.description); // Fixed the formData field name
    formData.images.forEach((image) => data.append("images", image));

    try {
      const res = await axios.post("/api/api/v1/post/createPost", data, {
        headers: {"Content-Type": "multipart/form-data"},
      });
      console.log("Success:", res);
      setAlert({type: "success", message: "Post created successfully!"});

      setTimeout(() => {
        navigate("/home"); // Redirect after success
      }, 1000);
    } catch (err) {
      console.error("Error:", err.message);
      setAlert({type: "error", message: "Failed to create post. Try again!"});
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    setSelectedImages((prev) => [...prev, ...imageUrls]);
  };

  // Remove selected image
  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    const updatedFormData = {...formData};
    updatedImages.splice(index, 1); // Remove image from preview
    updatedFormData.images.splice(index, 1); // Remove image from form data

    setSelectedImages(updatedImages);
    setFormData(updatedFormData);
  };

  return (
    <Layout>
      <div className="w-full flex justify-center absolute z-[1000] top-0">
        {alert.type === "success" && <SuccessAlert val={true} />}
        {alert.type === "error" && <ErrorAlert val={true} />}
      </div>
      <div className="w-full m-5 mt-20 flex items-center justify-center">
        <Card className="mt-6 w-3/4">
          <CardHeader>
            <Typography className="text-center p-3" variant="h1">
              Create Post Card
            </Typography>
          </CardHeader>

          <CardBody>
            <Textarea
              label="Description"
              name="description" // Fixed the name to match state
              value={formData.description}
              onChange={handleChange}
              className="min-h-[250px]"
            />
            <Input
              label="Images"
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </CardBody>

          {/* Display all selected images with a remove option */}
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedImages.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`Selected ${index}`}
                    className="w-full h-auto rounded-lg shadow"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </CardBody>

          <CardBody className="flex justify-center">
            {loading ? (
              <Button loading={true}>Loading</Button>
            ) : (
              <Button onClick={handleSubmit} className="w-1/3">
                Submit Post
              </Button>
            )}
            {/* <Button onClick={handleSubmit} className="w-1/3" disabled={loading}>
              {loading ? "Submitting..." : "Submit Post"}
            </Button> */}
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}

export default CreatePost;
