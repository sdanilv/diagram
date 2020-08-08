import { DAY, WEEK, YEAR } from "./constant";

export const formattedDate = (type, dateInString) => {
  const date = new Date(dateInString);
  switch (type) {
    case YEAR:
      return date.toLocaleDateString("ru-RU", {
        month: "short",
      });
    case DAY:
      return date.getHours();
    case WEEK:
      return date.toLocaleDateString("ru-RU");
    default:
      return date.toLocaleDateString("ru-RU", {
        month: "short",
        day: "numeric",
      });
  }
};
