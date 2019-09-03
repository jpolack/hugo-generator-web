const path = require('path');
const hugoAdapter = require('./hugoAdapter');
const zipper = require('./zipper');
const cleaner = require('./cleaner');

async function generate(req, res) {
  const siteName = `HugoSite-${Date.now()}`;

  try {
    await hugoAdapter.generateSite(siteName);
    await zipper.zip(siteName);
    cleaner.clean(siteName);
    res.download(path.resolve(`${__dirname}/../../tmp/${siteName}.zip`), 'hugo-site.zip');
  } catch (e) {
    console.error('ERROR', e);
    res.sendStatus(500);
  }
}

module.exports = {
  generate,
};
