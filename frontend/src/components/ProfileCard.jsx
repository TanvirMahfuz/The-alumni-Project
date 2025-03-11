export default function ProfileCard({user}) {
  return (
    <div className="m-10 w-100">
      <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
        <div className="relative mx-auto w-36 rounded-full">
          <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
          <img
            className="mx-auto rounded-full object-cover"
            style={{height: "150px", width: "150px"}}
            src={
              user.image !== ""
                ? user.image
                : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            }
            alt="Profile"
          />
        </div>
        <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
          {user.name}
        </h1>
        <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
          {user.currentlyWorkingIn}
        </h3>
        <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
          {user.bio}
        </p>
        <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
          <li className="flex items-center py-3 text-sm">
            <span>Status</span>
            <span className="ml-auto">
              <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                Open for side gigs
              </span>
            </span>
          </li>
          <li className="flex items-center py-3 text-sm">
            <span>Joined On</span>
            <span className="ml-auto">Apr 08, 2022</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
