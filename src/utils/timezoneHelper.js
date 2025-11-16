import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

[utc, timezone, customParseFormat].forEach((plugin) =>
  dayjs.extend(plugin)
);

export const toTimezone = (date, tz) => dayjs(date).tz(tz);
export const now = (tz) => dayjs().tz(tz);
export const formatDate = (date, tz, format = "YYYY-MM-DD HH:mm:ss") =>
  dayjs(date).tz(tz).format(format);
export const parse = (dateString, tz) => dayjs.tz(dateString, tz);
export const toUTC = (date) => dayjs(date).utc();
export const getTimezoneAbbr = (tz) => dayjs().tz(tz).format("z");
export const isPast = (date, tz) =>
  dayjs(date).tz(tz).isBefore(dayjs().tz(tz));
export const isToday = (date, tz) =>
  dayjs(date).tz(tz).isSame(dayjs().tz(tz), "day");
export const toInputDate = (date, tz) =>
  dayjs(date).tz(tz).format("YYYY-MM-DD");
export const toInputTime = (date, tz) =>
  dayjs(date).tz(tz).format("HH:mm");
export const combineDateTime = (dateStr, timeStr, tz) =>
  dayjs.tz(`${dateStr} ${timeStr}`, tz).toDate();

export const TimezoneHelper = {
  toTimezone,
  now,
  format: formatDate,
  parse,
  toUTC,
  getTimezoneAbbr,
  isPast,
  isToday,
  toInputDate,
  toInputTime,
  combineDateTime,
};
