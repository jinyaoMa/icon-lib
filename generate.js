let fontCarrier = require('font-carrier');
let fs = require('fs');

const len = 1024;

const font = fontCarrier.create({
  id: 'font-mustom',
  horizAdvX: len,
  vertAdvY: len
});

font.setFontface({
  fontFamily: 'Font Mustom',
  unitsPerEm: len,
  ascent: 0.8 * len,
  descent: -0.2 * len
});

const svgPath = './src/svg/';

const cssTemplatePath = './src/template.css';

const htmlTemplatePath = './src/template.html';

const targetFontsPath = './docs/font/font-mustom';

const targetCssPath = './docs/css/font-mustom.css';

const targetHtmlPath = './docs/index.html';

const fontFamilyClass = 'fm';

const prefix = `${fontFamilyClass}-`;

const uniOffset = 0x78;

fs.readdir(svgPath, (err, files) => {
  if (err) {
    return console.error(err);
  }

  let css = fs.readFileSync(cssTemplatePath).toString();
  let html = fs.readFileSync(htmlTemplatePath).toString();
  let htmlTemp = '';
  files.forEach((file, i) => {
    if (file.endsWith('.svg')) {
      let fPath = svgPath + file;
      let num = (uniOffset + i).toString(16);
      let svg = fs.readFileSync(fPath).toString();
      let className = prefix + file.replace('.svg', '');
      font.setSvg(`&#x${num};`, svg);
      css += `.${className}:before{content:'\\${num}'}`;
      htmlTemp += `<div class="icon"><i class="${fontFamilyClass} ${className} ${fontFamilyClass}-fh"></i><span>${className}</span></div>`;
    }
  });

  font.output({
    path: targetFontsPath
  });

  fs.writeFileSync(targetCssPath, css);
  fs.writeFileSync(targetHtmlPath, html.replace('<!--MUSTOM-->', htmlTemp));
});