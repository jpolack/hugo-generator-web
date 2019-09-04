const path = require('path');
const hugoAdapter = require('./hugoAdapter');
const zipper = require('./zipper');
const cleaner = require('./cleaner');

const modes = {
  DEV: 'DEV',
  PROD: 'PROD',
};

async function generate(req, res) {
  const siteName = `HugoSite-${Date.now()}`;

  const inputMode = (req.params.mode || '').toUpperCase();

  if (!modes[inputMode]) {
    res.sendStatus(400);
    return;
  }

  try {
    await hugoAdapter.generateSite(siteName);

    if (inputMode === modes.PROD) {
      await hugoAdapter.buildProd(siteName);
      await zipper.zip(path.resolve(`${__dirname}/../../tmp/${siteName}/public`), siteName);
    } else {
      await zipper.zip(path.resolve(`${__dirname}/../../tmp/${siteName}`), siteName);
    }

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
