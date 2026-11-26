// Empty placeholder for profile tabs, matching the Photos tab style.
export default function TabEmpty({ title, message }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}
