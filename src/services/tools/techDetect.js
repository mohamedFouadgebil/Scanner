// techDetect.js
const detectTech = async (target, sections) => {
  // بسيط: يعتمد على headers ووجود ملفات معروفة في النتائج
  const tech = { probable: [] };
  try {
    const headers = sections.headers?.headers || {};
    const robots = sections.robots?.robots?.body || "";

    if (headers['x-powered-by'] && /Express|Node/i.test(headers['x-powered-by'])) tech.probable.push("Node.js / Express");
    if (headers['server'] && /nginx/i.test(headers['server'])) tech.probable.push("nginx");
    if (/wp-admin/.test(robots) || /wp-content/.test(robots)) tech.probable.push("WordPress");

    // further heuristics could be added (check for /readme.html, /wp-includes etc.)
    return tech;
  } catch (e) {
    return { error: "tech detect failed: " + e.message };
  }
};

export default detectTech;
