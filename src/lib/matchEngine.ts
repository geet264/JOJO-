import { UserProfile, JobPost } from '@/types';

export function calculateJobMatch(
  profile: UserProfile,
  job: Omit<JobPost, 'matchScore' | 'matchedSkills' | 'missingSkills'>
): { matchScore: number; matchedSkills: string[]; missingSkills: string[] } {
  const profileSkillNames = profile.skills.map((s) => s.name.toLowerCase().trim());
  const userSkillMap = new Map<string, number>();
  
  profile.skills.forEach((s) => {
    const weight = s.level === 'Expert' ? 1.0 : s.level === 'Intermediate' ? 0.8 : 0.6;
    userSkillMap.set(s.name.toLowerCase().trim(), weight);
  });

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  let skillScoreTotal = 0;
  const totalRequired = job.requiredSkills.length;

  job.requiredSkills.forEach((reqSkill) => {
    const reqClean = reqSkill.toLowerCase().trim();
    // Check direct or substring match
    const matched = profileSkillNames.find(
      (ps) => ps === reqClean || ps.includes(reqClean) || reqClean.includes(ps)
    );

    if (matched) {
      matchedSkills.push(reqSkill);
      const weight = userSkillMap.get(matched) || 0.8;
      skillScoreTotal += weight;
    } else {
      missingSkills.push(reqSkill);
    }
  });

  // Base skill match (0 to 70 points)
  const skillRatio = totalRequired > 0 ? skillScoreTotal / totalRequired : 1;
  const skillPoints = skillRatio * 70;

  // Title / target title relevance (0 to 20 points)
  const jobTitleLower = job.title.toLowerCase();
  const titleMatch = profile.targetTitles.some((t) =>
    jobTitleLower.includes(t.toLowerCase()) || t.toLowerCase().includes(jobTitleLower)
  ) || jobTitleLower.includes(profile.currentTitle.toLowerCase());
  const titlePoints = titleMatch ? 20 : 8;

  // Experience appropriateness (0 to 10 points)
  let expPoints = 8;
  const expNumbers = job.experienceRequired.match(/\d+/g);
  if (expNumbers && expNumbers.length > 0) {
    const minExp = parseInt(expNumbers[0], 10);
    if (profile.yearsOfExperience >= minExp) {
      expPoints = 10;
    } else if (profile.yearsOfExperience >= minExp - 1) {
      expPoints = 6;
    } else {
      expPoints = 3;
    }
  }

  const matchScore = Math.min(100, Math.round(skillPoints + titlePoints + expPoints));

  return {
    matchScore,
    matchedSkills,
    missingSkills,
  };
}

export function enrichJobsWithMatchScores(profile: UserProfile, jobs: JobPost[]): JobPost[] {
  return jobs.map((job) => {
    const { matchScore, matchedSkills, missingSkills } = calculateJobMatch(profile, job);
    return {
      ...job,
      matchScore,
      matchedSkills,
      missingSkills,
    };
  });
}
