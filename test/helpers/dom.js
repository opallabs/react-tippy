const {JSDOM} = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { pretendToBeVisual: true });
const {window} = jsdom;

function copyProps(src, target) {
  const props = (
    Object
      .getOwnPropertyNames(src)
      .filter(prop => typeof target[prop] === 'undefined')
      .reduce((result, prop) => Object.assign({}, result, {
        [prop]: Object.getOwnPropertyDescriptor(src, prop)
      }), {}));
  Object.defineProperties(target, props);
}

function XMLSerializer() {}

const tagNames = ['linearGradient', 'radialGradient', 'clipPath', 'textPath'];

XMLSerializer.prototype.serializeToString = node => (
  tagNames
    .reduce((prev, tagName) => (
      prev.replace(
        new RegExp(`(<|</)${tagName.toLowerCase()}\\b`, 'g'), (all, start) => start + tagName
      )), jsdom.serializeDocument(node)));

function DOMParser() {}

DOMParser.prototype.parseFromString = (string) => {
  const thisDoc = document.implementation.createHTMLDocument('');
  const body = thisDoc.body;
  body.innerHTML = string;
  let last;
  while ((last = thisDoc.lastChild)) {
    thisDoc.removeChild(last);
  }
  thisDoc.appendChild(body.firstChild);
  return thisDoc;
};

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};
global.XMLSerializer = XMLSerializer;
global.DOMParser = DOMParser;

copyProps(window, global);
