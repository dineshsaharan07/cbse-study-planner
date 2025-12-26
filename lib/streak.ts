import type { DayItem } from '../app/dashboard/page';

export function calculateStreak(plan: DayItem[]): number {
  let streak = 0;
  for (let i = plan.length - 1; i >= 0; i--) {
    const completed = Object.values(plan[i].checkboxes).some(Boolean);
    if (completed) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
