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
const last2Week = getPreviousDay(today, -14);
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
    LAST_WEEK: "-7d",
    PAST_14_DAYS: "-14d",
    LAST_MONTH: "-30d",
};
export const RANGE_VALUES_NUMBER = {
    LAST_WEEK: -7,
    PAST_14_DAYS: -14,
    LAST_MONTH: -30,
};
export const dateRangesOptions = [{
        value: RANGE_VALUES.LAST_WEEK,
        label: "Past 7 days",
        subLabel: `${formatDate(lastWeek - 1)} - ${formatDate(today)}`,
        number: 7,
    },
    {
        value: RANGE_VALUES.PAST_14_DAYS,
        label: `Past 14 days`,
        subLabel: `${formatDate(last2Week - 1)} - ${formatDate(today)}`,
        number: 14,
    },
    {
        value: RANGE_VALUES.LAST_MONTH,
        label: "Past 30 days",
        subLabel: `${formatDate(lastMonthDay - 1)} - ${formatDate(today)}`,
        number: 30,
    },
];