function Avatar({ avatar }) {
  return (
    <div className="rounded-full h-17 w-17 p-1 bg-gray-500 flex justify-center items-center overflow-hidden">
      <img
        src={avatar}
        alt=""
        className="rounded-full h-full w-full object-cover"
      />
    </div>
  );
}
export default Avatar;
