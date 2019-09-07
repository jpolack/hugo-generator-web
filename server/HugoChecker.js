const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function check() {
  try {
    const { stdout } = await exec('hugo version');
    console.log('Hugo is installed:', stdout);
  } catch (e) {
    await exec('brew install hugo');
  }
}

module.exports = {
  check,
};
