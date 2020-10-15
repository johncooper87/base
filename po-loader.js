//@ts-nocheck

const { parse } = require('ttag-cli/dist/src/lib/parser');
const { iterateTranslations, convert2Compact } = require('ttag-cli/dist/src/lib/utils');

module.exports = function po2json(source) {
  //@ts-ignore
  //this.cacheable();

  let poData = parse(source);

  const pretty = true;
  const nostrip = false;
  const format = "compact";

  const messages = iterateTranslations(poData.translations);
  if (!nostrip) {
      const header = messages.next().value;
      delete header.comments;
      for (const msg of messages) {
          delete msg.comments;
      }
  }
  if (format === "compact") {
      poData = convert2Compact(poData);
  }

  return 'module.exports = ' +  JSON.stringify(poData, null, pretty ? 2 : 0);
}