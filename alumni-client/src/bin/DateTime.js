export const formatSmartDateTime = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isYesterday = (d1, d2) => {
    const yesterday = new Date(d2);
    yesterday.setDate(d2.getDate() - 1);
    return isSameDay(d1, yesterday);
  };

  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isSameDay(date, now)) {
    return `Today, ${timeString}`;
  } else if (isYesterday(date, now)) {
    return `Yesterday, ${timeString}`;
  } else {
    const dateString = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
    return `${dateString}, ${timeString}`;
  }
};


export const convertTo12HourFormat = (time24) => {
  const [hours, minutes] = time24.split(":");
  let hour = parseInt(hours, 10);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minutes} ${period}`;
};