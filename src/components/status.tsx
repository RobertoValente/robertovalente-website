"use client";

import { useSyncExternalStore } from "react";

// Portuguese national holidays: fixed dates, plus Good Friday, Easter and Corpus Christi.
const FIXED_HOLIDAYS = ["01-01", "04-25", "05-01", "06-10", "08-15", "10-05", "11-01", "12-01", "12-08", "12-25"];
const MOVABLE_HOLIDAYS = [-2, 0, 60]; // days from Easter Sunday
const WORK_HOURS = { start: 9, end: 18 };

// Easter Sunday (UTC midnight), with the anonymous Gregorian algorithm.
function easter(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(year, month - 1, day);
}

function isHoliday(year: number, month: number, day: number) {
  if (FIXED_HOLIDAYS.includes(`${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`)) return true;
  const fromEaster = Math.round((Date.UTC(year, month - 1, day) - easter(year)) / 86_400_000);
  return MOVABLE_HOLIDAYS.includes(fromEaster);
}

// Working on weekdays from 9:00 to 18:00 in Lisbon, except national holidays.
function isWorking(now: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Lisbon",
      weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((part) => [part.type, part.value]),
  );
  const hour = Number(parts.hour);
  const workday = !["Sat", "Sun"].includes(parts.weekday) && !isHoliday(+parts.year, +parts.month, +parts.day);
  return workday && hour >= WORK_HOURS.start && hour < WORK_HOURS.end;
}

// Re-check every minute. The snapshot is a boolean, so React only re-renders when it changes.
function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 60_000);
  return () => clearInterval(timer);
}

export function Status({ working, chilling }: { working: string; chilling: string }) {
  // Empty on the server: the status depends on the current time, so it is filled in on the client.
  const status = useSyncExternalStore(subscribe, () => isWorking(new Date()), () => null);
  return <span>{status === null ? "\u00a0" : status ? working : chilling}</span>;
}
