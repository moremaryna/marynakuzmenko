// Stage all changes, commit, and push the current branch.
// Usage: npm run git:push "Your commit message"
const { spawnSync } = require("child_process");

function git(args, capture = false) {
  const result = spawnSync("git", args, { stdio: capture ? "pipe" : "inherit", encoding: "utf8" });
  if (result.error) {
    console.error(`Could not run git: ${result.error.message}`);
    process.exit(1);
  }
  return result;
}

function run(args) {
  const { status } = git(args);
  if (status !== 0) {
    console.error(`\n"git ${args.join(" ")}" failed, stopping.`);
    process.exit(status || 1);
  }
}

const message =
  process.argv.slice(2).join(" ").trim() ||
  `Site update ${new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}`;

run(["add", "."]);

// `git diff --cached --quiet` exits 0 when nothing is staged
if (git(["diff", "--cached", "--quiet"]).status === 0) {
  console.log("Nothing new to commit.");
} else {
  run(["commit", "-m", message]);
}

const hasUpstream = git(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"], true).status === 0;
run(hasUpstream ? ["push"] : ["push", "-u", "origin", "HEAD"]);
