const propsReader = require('properties-reader');

const i18n = {
  ['en-US']: propsReader('./test/i18n/en-us/messages.properties'),
  ['es-US']: propsReader('./test/i18n/es-us/messages.properties')
};

module.exports = i18n;
