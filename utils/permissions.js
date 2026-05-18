const ROLE_HIERARCHY = {
  staff: 1,
  mod: 2,
  admin: 3,
  "co-owner": 4,
  owner: 5
};

// Role IDs (your actual Discord role IDs)
const ROLE_IDS = {
  owner: "1471852831379292383",
  "co-owner": "1496009013312229466",
  admin: "1496120671959384185",
  mod: "1496009578192830604",
  staff: "882649775932059679"
};

function getUserLevel(member) {
  if (!member) return 0;

  const roles = member.roles?.cache;
  if (!roles) return 0;

  let level = 0;

  for (const [roleName, roleId] of Object.entries(ROLE_IDS)) {
    if (roles.has(roleId)) {
      const roleLevel = ROLE_HIERARCHY[roleName] || 0;
      level = Math.max(level, roleLevel);
    }
  }

  return level;
}

function hasPermission(member, requiredRole) {
  const userLevel = getUserLevel(member);
  const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;

  return userLevel >= requiredLevel;
}

module.exports = {
  hasPermission,
  getUserLevel
};