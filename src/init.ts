import { execSync } from 'child_process';
import { Buffer } from 'buffer';
(() => {
  const ip = execSync("ifconfig | grep 'inet ' | grep -Fv 127.0.0.1 | awk '{print $2}'");
  console.log(`ifconfig: ${Buffer.from(ip).toString().trim()}`);

  const cmtMsg = execSync("git reflog -1 | sed 's/^.*: //' | cat");
  const cmtHash = execSync('git rev-parse --short HEAD');
  const cmtDate = execSync("git log -1 --date=format:'%Y/%m/%d %T' --format='%ad' | cat");
  process.env.lastCommitMessage = Buffer.from(cmtMsg).toString().trim();
  process.env.lastCommitHash = Buffer.from(cmtHash).toString().trim();
  process.env.lastCommitDate = Buffer.from(cmtDate).toString().trim();
})();
