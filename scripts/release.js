// Build the site, commit and push everything, then deploy to Firebase Hosting.
// Usage: npm run release "Your commit message"
// Stops at the first step that fails, so a broken build is never committed
// and a failed push is never deployed.
const { spawnSync } = require("child_process");
const path = require("path");

function step(label, command, args) {
  console.log(`\n==> ${label}`);
  // npm and firebase are .cmd shims on Windows, so they need a shell; the commit
  // message is only ever passed as an argument array, never through a shell.
  const result = args
    ? spawnSync(command, args, { stdio: "inherit" })
    : spawnSync(command, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    console.error(`\n${label} failed, stopping.`);
    process.exit(result.status || 1);
  }
}

step("Build", "npm run build");
step("Commit and push", process.execPath, [path.join(__dirname, "git-push.js"), ...process.argv.slice(2)]);
step("Deploy to Firebase Hosting", "npm run firebase:deploy");

console.log("\nDone: built, pushed to GitHub, and deployed.");
