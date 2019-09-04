const fs = require('fs');
const archiver = require('archiver');

function zip(zippablePath, siteName) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(`tmp/${siteName}.zip`);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    output.on('close', () => {
      resolve(`${archive.pointer()} total bytes.archiver has been finalized and the output file descriptor has closed.`);
    });

    output.on('end', () => {
      reject(new Error('Data has been drained'));
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.log('WARN', err);
      } else {
        reject(err);
      }
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    archive.directory(zippablePath, siteName);

    archive.finalize();
  });
}

module.exports = {
  zip,
};
