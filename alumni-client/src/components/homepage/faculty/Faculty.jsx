import React from "react";
// Assuming FacultyCard is in the same directory, otherwise adjust the path.
import FacultyCard from "./FacultyCard/FacultyCard.jsx";
import StaffCard from "./staffcard/StaffCard.jsx";
import { useFacultyStore } from "../../../store/useFacultyStore.js";
import EmptyState, { PAGE_SHELL } from "../../common/EmptyState/EmptyState.jsx";
import { FaChalkboardTeacher } from "react-icons/fa";
function Faculty() {
  const { faculty, fetchFaculty } = useFacultyStore();
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    fetchFaculty().finally(() => setLoaded(true));
  }, [fetchFaculty]);

  const staffData = {
    name: "John Smith",
    position: "Lab Manager",
    department: "School of Engineering",
    image: "/path/to/staff-image.jpg", // Use a real path or URL
    email: "john.smith@university.edu",
    phone: "(123) 987-6543",
    officeLocation: "Engineering Building, Room 101",
    isActive: true,
  };

  if (loaded && !faculty?.length) {
    return (
      <div className={PAGE_SHELL}>
        <EmptyState
          offsetForHeader
          icon={FaChalkboardTeacher}
          title="No Faculty Listed"
          message="Faculty members haven't been added yet. Please check back later."
        />
      </div>
    );
  }

  return (
    <div className={PAGE_SHELL}>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 mt-4">
        {faculty?.length > 0 &&
          faculty.map((person, index) => {
            return <FacultyCard key={index} {...person} />;
          })}
      </div>
    </div>
  );
}

export default Faculty;
