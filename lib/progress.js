// lib/progress.js
import { differenceInCalendarDays, formatISO } from 'date-fns';

export function updateStreak(lastActiveISO, nowISO) {
  if (!lastActiveISO) return { streak: 1, lastActive: nowISO };
  const diff = differenceInCalendarDays(new Date(nowISO), new Date(lastActiveISO));
  if (diff === 0) return { streak: null, lastActive: lastActiveISO }; // no change
  if (diff === 1) return { streak: 'increment', lastActive: nowISO };
  return { streak: 'reset', lastActive: nowISO };
}

export function dayCompletion(checkboxes) {
  const total = 4;
  const checked = Object.values(checkboxes).filter(Boolean).length;
  return Math.round((checked / total) * 100);
}

export function overallCompletion(days) {
  const sum = days.reduce((acc, d) => acc + dayCompletion(d.checkboxes), 0);
  return Math.round(sum / days.length);
}

export const todayISO = () => formatISO(new Date(), { representation: 'date' });
