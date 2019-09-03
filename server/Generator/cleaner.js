const del = require('del');

function clean(siteName) {
  del.sync([`tmp/${siteName}`]);
}

module.exports = {
  clean,
};
