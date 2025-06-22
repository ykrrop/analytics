export const formatDayOfYear = (dayOfYear?: number): string => {
  if (!dayOfYear || dayOfYear <= 0 || dayOfYear > 365) return "-";

  const date = new Date(2023, 0);
  date.setDate(dayOfYear);

  const day = date.getDate();

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const monthName = months[date.getMonth()];

  return `${day} ${monthName}`;
};

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);
  return `${day}.${month}.${year}`;
}
