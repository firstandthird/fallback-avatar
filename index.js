const TextToSVG = require('text-to-svg');
const gen = require('color-generator');
const querystring = require('querystring');

const textToSVG = TextToSVG.loadSync();

function encodeOptimizedSVGDataUri(svgString) {
  const uriPayload = querystring.escape(svgString.replace(/\n+/g, ''))
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
    .replace(/%22/g, "'");

  return 'data:image/svg+xml,' + uriPayload;
}

exports.getSVG = text => {
  const letter = text[0].toUpperCase();
  const attributes = {fill: 'white'};
  const options = {x: 0, y: 0, fontSize: 20, anchor: 'left top', attributes: attributes};
  const metrics = textToSVG.getMetrics(letter, options);
  const y = (metrics.y - ((32 - metrics.height) / 2));
  const x = (metrics.x - ((32 - metrics.width) / 2));
  const path = textToSVG.getPath(letter, {
    x: 0,
    y: 0,
    fontSize: 20,
    anchor: 'left top',
    attributes: {
      fill: '#fff',
      transform: `translate(${Math.abs(x)}, ${Math.abs(y)})`
    }
  });

  return `<svg width="32" height="32" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="${gen(null, .70).hexString().toLowerCase()}" d="M 32 16C 32 24.8366 24.8366 32 16 32C 7.16344 32 0 24.8366 0 16C 0 7.16344 7.16344 0 16 0C 24.8366 0 32 7.16344 32 16Z"/>${path}</svg>`;
};

exports.getDataSVG =
    text => encodeOptimizedSVGDataUri(exports.getSVG(text));
