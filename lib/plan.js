// lib/plan.js
export function generatePlan(startDateISO) {
  const subjects = ['Maths', 'Physics', 'Chemistry', 'English'];
  const date = new Date(startDateISO);
  const days = [];

  for (let d = 1; d <= 40; d++) {
    const dayDate = new Date(date);
    dayDate.setDate(date.getDate() + (d - 1));

    const phase =
      d <= 18 ? 'Syllabus' :
      d <= 26 ? 'Revision+PYQ' :
      d <= 34 ? 'Mock Papers' :
      d <= 38 ? 'Weak Repair' : 'Consolidation';

    const tasks = {
      syllabus: phase === 'Syllabus' || phase === 'Weak Repair',
      revision: phase !== 'Syllabus',
      pyq: phase !== 'Consolidation',
      samplePaper: phase.includes('Mock') || d % 2 === 0,
    };

    days.push({
      day: d,
      date: dayDate.toISOString().slice(0, 10),
      phase,
      targets: {
        Maths: d <= 6 ? 'Limits→AOD' :
               d <= 12 ? 'Integrals→AOI' :
               d <= 18 ? 'DE→Vectors→3D' : 'Mixed drills',
        Physics: d <= 6 ? 'Electrostatics→Current' :
                 d <= 12 ? 'Magnetism→EMI' :
                 d <= 18 ? 'Optics→Modern' : 'Mixed drills',
        Chemistry: d <= 6 ? 'Kinetics→Electro' :
                   d <= 12 ? 'Solutions→Surface' :
                   d <= 18 ? 'Organic core' : 'Mixed drills',
        English: 'Reading/Writing + Literature',
      },
      checkboxes: {
        syllabus: false,
        revision: false,
        pyq: false,
        samplePaper: false,
      },
    });
  }
  return days;
}
