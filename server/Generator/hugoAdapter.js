const util = require('util');
const exec = util.promisify(require('child_process').exec);

function generateSite(siteName) {
  return exec(`hugo new site tmp/${siteName}`);
}

module.exports = {
  generateSite,
};
