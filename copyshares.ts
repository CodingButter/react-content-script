// copyshares.ts
import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

interface CopySharesOptions {
  log: boolean;
  from: string[];
  to: string[];
}

export default function CopyShares(options: CopySharesOptions): Plugin {
  let firstLog = true;

  const log = (message: string) => {
    if (options.log) {
      if (firstLog) {
        console.log('');
        firstLog = false;
      }
      // lets style the log to look pretty
      // split the message by the word "to" and color the first path blue the word to green and the desitination parth purple
      //replace all backslashes with forward slashes
      message = message.replace(/\\/g, '/');
      const messageParts = message.split('to');
      const sourcePath = messageParts[0];
      const destinationPath = messageParts[1];

      console.log(
        `\x1b[34m${sourcePath}\x1b[0m\x1b[32mto\x1b[0m\x1b[35m${destinationPath}\x1b[0m`
      );
    }
  };

  return {
    name: 'copy-shares',
    buildStart() {
      log('Starting to copy directories...');
      options.from.forEach(sourceDir => {
        options.to.forEach(destDir => {
          const destPath = path.join(destDir, sourceDir);
          copyDirectory(sourceDir, destPath);
        });
      });
    }
  };

  function copyDirectory(src: string, dest: string) {
    fs.mkdir(dest, { recursive: true }, (err) => {
      if (err) {
        log(`Error creating directory ${dest}: ${err}`);
        return;
      }

      fs.readdir(src, { withFileTypes: true }, (err, entries) => {
        if (err) {
          log(`Error reading directory ${src}: ${err}`);
          return;
        }

        entries.forEach(entry => {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);

          if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
          } else {
            fs.copyFile(srcPath, destPath, err => {
              if (err) {
                log(`Error copying ${srcPath} to ${destPath}: ${err}`);
              } else {
                log(`Copied ${srcPath} to ${destPath}`);
              }
            });
          }
        });
      });
    });
  }
}
