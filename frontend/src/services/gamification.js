import { ref, update, get } from "firebase/database";
import { db } from "./firebase";

/**
 * Centrally managed logic for awarding badges, XP, and updating levels.
 * This ensures consistency across the platform.
 */

export const awardXP = async (uid, currentXP, amount) => {
  const newXP = currentXP + amount;
  const newLevel = Math.floor(newXP / 200) + 1;
  
  await update(ref(db, `users/${uid}`), {
    xp: newXP,
    level: newLevel
  });
  
  return { newXP, newLevel };
};

export const checkAndAwardBadges = async (uid, profile) => {
  const earned = profile.badges || [];
  const newBadges = [...earned];
  let changed = false;

  const addBadge = (id) => {
    if (!newBadges.includes(id)) {
      newBadges.push(id);
      changed = true;
    }
  };

  // 1. First Login Badge (already handled or check here)
  addBadge("first-login");

  // 2. Beginner Badge (Complete 1 module)
  const completedMods = profile.completedModules || [];
  if (completedMods.length >= 1) addBadge("beginner");

  // 3. Intermediate Badge (Complete 3 modules)
  if (completedMods.length >= 3) addBadge("intermediate");

  // 4. Advanced Badge (Complete all modules - check against actual count)
  if (completedMods.length >= 4) addBadge("advanced");

  // 5. Quiz Master (Take 5 quizzes)
  const quizScores = profile.quizScores || {};
  if (Object.keys(quizScores).length >= 5) addBadge("quiz-master");

  // 6. Streak Badge (3+ days)
  if (profile.streak >= 3) addBadge("streak-3");

  if (changed) {
    await update(ref(db, `users/${uid}`), {
      badges: newBadges
    });
  }

  return newBadges;
};
