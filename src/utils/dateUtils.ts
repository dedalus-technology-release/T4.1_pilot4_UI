import { format } from "date-fns";
export const formatDate = (date: string) => {
  //   return format(date, "yyyy-MM-dd HH:mm");
  return format(date, "dd-MM-yyyy HH:mm");
};
