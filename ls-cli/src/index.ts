#!/usr/bin/env node
import { readdir, lstat } from "node:fs";
import { promisify } from "node:util";
import chalk from "chalk";
import { join } from "node:path";

console.log(process.argv);

const path = process.argv[2] || process.cwd();

readdir(path, async (err, filenames) => {
  if (err) throw err;
  const statsPromises = filenames.map((filename) => stat(join(path, filename)));
  const allStats = await Promise.all(statsPromises);
  for (let stats of allStats) {
    const index = allStats.indexOf(stats);
    if (stats.isFile()) {
      console.log(filenames[index]);
    } else {
      console.log(chalk.bold(filenames[index]));
    }
  }
});

const stat = promisify(lstat);

// const stat = (filename: string) => {
//   return new Promise<Stats>((resolve, reject) => {
//     lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };
