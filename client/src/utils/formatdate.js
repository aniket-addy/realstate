/*
|--------------------------------------------------------------------------
| FORMAT DATE
|--------------------------------------------------------------------------
| Converts a date into a clean Indian-style readable format.
|
| Examples:
| 2026-08-31 -> 31 Aug 2026
| 2026-01-15 -> 15 Jan 2026
|--------------------------------------------------------------------------
*/

export const formatDate = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

/*
|--------------------------------------------------------------------------
| FORMAT DATE & TIME
|--------------------------------------------------------------------------
|
| Example:
| 31 Aug 2026, 12:30 PM
|--------------------------------------------------------------------------
*/

export const formatDateTime = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

/*
|--------------------------------------------------------------------------
| FORMAT DATE FOR INPUT
|--------------------------------------------------------------------------
| Converts a date into YYYY-MM-DD format.
|
| Useful for:
| <input type="date" />
|--------------------------------------------------------------------------
*/

export const formatDateForInput = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/*
|--------------------------------------------------------------------------
| GET RELATIVE DATE
|--------------------------------------------------------------------------
| Examples:
| Today
| Yesterday
| 3 days ago
| 2 months ago
|--------------------------------------------------------------------------
*/

export const getRelativeDate = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  const now = new Date();

  const difference =
    now.getTime() - date.getTime();

  const oneDay =
    24 * 60 * 60 * 1000;

  const days = Math.floor(
    difference / oneDay
  );

  if (days <= 0) {
    return "Today";
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 30) {
    return `${days} days ago`;
  }

  const months = Math.floor(
    days / 30
  );

  if (months === 1) {
    return "1 month ago";
  }

  if (months < 12) {
    return `${months} months ago`;
  }

  const years = Math.floor(
    months / 12
  );

  if (years === 1) {
    return "1 year ago";
  }

  return `${years} years ago`;
};

export default formatDate;