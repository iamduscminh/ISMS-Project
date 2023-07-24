export const ticketTypes = [
  { value: "incident", label: "Incident" },
  { value: "request", label: "Request" },
];

export const ticketPriorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const ticketStatus = [
  { value: "open", label: "Open" },
  { value: "pending", label: "Pending" },
  { value: "solve", label: "Solve" },
  { value: "closed", label: "Closed" },
];

export const RANGE_VALUES = {
  YESTERDAY: "1d",
  LAST_WEEK: "7d",
  LAST_MONTH: "-30d",
  CURRENT_MONTH: "0",
  CUSTOM: "-1d",
};

export const dateRangesOptions = [
  { value: RANGE_VALUES.YESTERDAY, label: "Yesterday" },
  {
    value: RANGE_VALUES.LAST_WEEK,
    label: "Last 7 days",
    subLabel: "Mon, 1 May 2023 - Sun, 7 May 2023",
  },
  {
    value: RANGE_VALUES.LAST_MONTH,
    label: "Last month",
    subLabel: "April 2023",
  },
  {
    value: RANGE_VALUES.CURRENT_MONTH,
    label: "Current month",
    subLabel: "May 2023",
  },
  { value: RANGE_VALUES.CUSTOM, label: "Custom period" },
];
