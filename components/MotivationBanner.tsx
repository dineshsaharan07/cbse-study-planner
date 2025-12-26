'use client';

type Props = {
  day: number;
};

export default function MotivationBanner({ day }: Props) {
  const quotes = [
    "Every small step counts — tick your boxes today 🔥",
    "Consistency builds champions, keep going 🚀",
    "Your effort today is your success tomorrow 💯",
    "Stay focused, stay strong, stay streaked ✨",
    "Learning daily is the secret weapon 📖",
    "Push through — you’re closer than you think 🏆",
    "Discipline today, freedom tomorrow 🌟",
    "One checkbox ticked = one victory 🎯",
    "Your streak is your superpower ⚡",
    "Keep the fire alive, don’t break momentum 🔥",
    "Revision sharpens memory — keep revising 📚",
    "PYQs are gold, solve them daily 💎",
    "Every topic mastered adds confidence 💪",
    "Stay steady, success loves consistency 🌱",
    "Your streak is proof of your dedication 🕊️",
    "Mock papers = real exam practice 📝",
    "Don’t stop now, you’re halfway there 🚀",
    "Celebrate progress, not perfection 🎉",
    "Your effort inspires others 🌟",
    "Keep ticking, keep winning 🏆",
    "Physics, Chemistry, Maths — conquer all three ⚡",
    "Revision + PYQ = unbeatable combo 🔥",
    "Stay consistent, streak is your shield 🛡️",
    "Every day is a chance to grow 🌱",
    "Push harder, exams are near 🎯",
    "Your streak is your story 📖",
    "Mock papers reveal your strength 💪",
    "Stay calm, stay focused, stay streaked 🕊️",
    "Weak areas repaired = strong results 🛠️",
    "Consistency beats talent every time 🌟",
    "Final lap — give it your all 🏁",
    "Revision is the key to confidence 🔑",
    "Stay streaked, stay unstoppable 🚀",
    "Every checkbox is a step closer 🎯",
    "Your streak is your exam weapon ⚡",
    "Mock papers sharpen your edge 📝",
    "Repair weak spots, build strength 💪",
    "Consolidate knowledge, trust yourself 🌟",
    "You’ve come far, don’t stop now 🔥",
    "Day 40 — you’re exam‑ready, celebrate 🎉"
  ];

  const quote = quotes[(day - 1) % quotes.length];

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center py-3 rounded-lg shadow-md mt-4">
      <h2 className="text-lg font-bold">Day {day}</h2>
      <p className="text-sm">{quote}</p>
    </div>
  );
}
