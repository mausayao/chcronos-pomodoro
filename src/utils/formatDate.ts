import { format } from "date-fns";

export function formatDate(timeInmilis: number) {
  const date = new Date(timeInmilis);

  return format(date, "dd/MM/yyyy HH:mm");
}
