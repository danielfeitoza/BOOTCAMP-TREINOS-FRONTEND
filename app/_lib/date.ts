import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const APP_TIMEZONE = process.env.APP_TIMEZONE ?? "America/Sao_Paulo";

export function getTodayInAppTimezone() {
  return dayjs().tz(APP_TIMEZONE).format("YYYY-MM-DD");
}
