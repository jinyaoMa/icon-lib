let fontCarrier = require('font-carrier');
let fs = require('fs');

let font = fontCarrier.create();

const svgPath = './src/svg/';

const cssTemplatePath = './src/template.css';

const htmlTemplatePath = './src/template.html';

const targetFontsPath = './build/font/font-mustom';

const targetCssPath = './build/css/font-mustom.css';

const targetHtmlPath = './build/index.html';

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
      htmlTemp += `<div class="icon"><i class="${fontFamilyClass} ${className}"></i><span>${className}</span></div>`;
    }
  });

  font.output({
    path: targetFontsPath
  });

  fs.writeFileSync(targetCssPath, css);
  fs.writeFileSync(targetHtmlPath, html.replace('<!--MUSTOM-->', htmlTemp));
});