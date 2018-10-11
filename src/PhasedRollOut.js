function hashString(str) {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function phasedRollOutExpiredForForUser(username) {
    const rollOutConfig = SdkConfig.get().phasedRollOut;
    if (!rollOutConfig) {
        return true;
    }
    if (!Number.isFinite(rollOutConfig.offset) || !Number.isFinite(rollOutConfig.period)) {
        console.error("phased rollout is misconfigured, offset and/or period are not numbers", rollOutConfig);
    }

    const hash = hashString(username, now);
    //ms -> min, enable users with minute granularity
    const bucketRatio = 1000 * 60;
    const buckedCount = rollOutConfig.period / bucketRatio;
    const userBucket = hash % buckedCount;
    const offsetMs = rollOutConfig.offset;
    const userMs = userBucket * bucketRatio;
    const enableTimestamp = offsetMs + userMs;
    if (enableTimestamp >= now) {
        
    }
}