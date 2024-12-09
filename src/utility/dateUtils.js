import { formatDistanceToNow } from "date-fns";

export const formatTimeAgo = (date) => {
  return formatDistanceToNow(date, { addSuffix: true });
};
