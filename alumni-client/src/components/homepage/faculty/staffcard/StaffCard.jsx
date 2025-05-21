function StaffCard({
  name,
  position,
  department,
  image,
  email,
  phone,
  officeLocation,
  isActive,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full object-cover mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600 text-sm">{position}</p>
      <p className="text-gray-600 text-sm mb-2">{department}</p>
      <p className="text-gray-700 text-sm">
        Email:{" "}
        <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
          {email}
        </a>
      </p>
      <p className="text-gray-700 text-sm">Phone: {phone}</p>
      <p className="text-gray-700 text-sm">Office: {officeLocation}</p>
      <p
        className={
          isActive ? "text-green-600 text-sm" : "text-red-600 text-sm"
        }>
        {isActive ? "Active" : "Inactive"}
      </p>
    </div>
  );
};
export default StaffCard;
