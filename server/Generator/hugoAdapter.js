const util = require('util');
const exec = util.promisify(require('child_process').exec);

function generateSite(siteName) {
  // return exec(`hugo new site tmp/${siteName}`);
  return exec(`mkdir -p tmp && cp -R hugo-examplePage tmp/${siteName}`);
}

function buildProd(siteName) {
  return exec(`cd tmp/${siteName} && hugo`);
}

module.exports = {
  generateSite,
  buildProd,
};
