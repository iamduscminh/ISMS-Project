function formatDate(date) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);

  const [month, day, year] = formattedDate.split(" ");

  const capitalizedMonth = month.toUpperCase();

  return `${day} ${capitalizedMonth} ${year}`;
}
function getPreviousDay(date, number) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() + number);

  return previous;
}
const monthOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const today = new Date();
const yesterday = getPreviousDay(today, -1);
const lastWeek = getPreviousDay(today, -7);
const lastMonthDay = getPreviousDay(today, -30);
const currentMonth = monthOfYear[today.getMonth()];
const lastMonth = monthOfYear[today.getMonth() - 1];
export const ticketTypes = [
  { value: "incident", label: "Incident" },
  { value: "request", label: "Service Request" },
  { value: "change", label: "Change" },
  { value: "problem", label: "Problem" },
];

export const ticketPriorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgency", label: "Urgency" },
];

export const ticketStatus = [
  { value: "open", label: "Open" },
  { value: "pending", label: "Pending" },
  { value: "inProgress", label: "In Progress" },
  { value: "closed", label: "Closed" },
  { value: "cancel", label: "Cancel" },
  { value: "resolve", label: "Resolve" },
];

export const changeTypes = [
  { value: "incident", label: "Incident" },
  { value: "request", label: "Service Request" },
  { value: "change", label: "Change" },
  { value: "problem", label: "Problem" },
];

export const changePriorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgency", label: "Urgency" },
];

export const changeStatus = [
  { value: "open", label: "Open" },
  { value: "pending", label: "Pending" },
  { value: "inProgress", label: "In Progress" },
  { value: "closed", label: "Closed" },
  { value: "cancel", label: "Cancel" },
  { value: "resolve", label: "Resolve" },
];

export const problemImpact = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const RANGE_VALUES = {
  YESTERDAY: "1d",
  LAST_WEEK: "7d",
  LAST_MONTH: "-30d",
  CURRENT_MONTH: "0",
  CUSTOM: "-1d",
};

export const dateRangesOptions = [
  {
    value: RANGE_VALUES.YESTERDAY,
    label: `Yesterday`,
    subLabel: `Yesterday (${formatDate(yesterday)})`,
  },
  {
    value: RANGE_VALUES.LAST_WEEK,
    label: "Last 7 days",
    subLabel: `${formatDate(lastWeek)} - ${formatDate(today)}`,
  },
  {
    value: RANGE_VALUES.LAST_MONTH,
    label: "Last month",
    subLabel: `${lastMonth}`,
  },
  {
    value: RANGE_VALUES.CURRENT_MONTH,
    label: "Current month",
    subLabel: `${currentMonth}`,
  },
  { value: RANGE_VALUES.CUSTOM, label: "Custom period" },
];
