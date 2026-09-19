import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const mdPath = path.resolve('public/cv.md');
const pdfPath = path.resolve('public/cv.pdf');
const tempHtmlPath = path.resolve('public/temp_cv.html');

const mdContent = fs.readFileSync(mdPath, 'utf-8');

function parseMarkdown(md) {
  const lines = md.split(/\r?\n/);
  let html = '';
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (!line) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      continue;
    }

    if (line === '---') {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += '<hr />\n';
      continue;
    }

    if (line.startsWith('# ')) {
      if (inList) { html += '</ul>\n'; inList = false; }
      html += `<h1 class="cv-name">${line.substring(2)}</h1>\n`;
      continue;
    }

    if (line.startsWith('## ')) {
      if (inList) { html += '</ul>\n'; inList = false; }
      const text = line.substring(3);
      if (i === 1 || text.includes('Ingeniero de Sistemas')) {
        html += `<div class="cv-title">${text}</div>\n`;
      } else {
        html += `<h2 class="cv-section-title">${text}</h2>\n`;
      }
      continue;
    }

    if (line.startsWith('### ')) {
      if (inList) { html += '</ul>\n'; inList = false; }
      html += `<h3 class="cv-job-title">${line.substring(4)}</h3>\n`;
      continue;
    }

    if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul class="cv-list">\n';
        inList = true;
      }
      let itemText = line.substring(2);
      // Format bold text
      itemText = itemText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html += `  <li>${itemText}</li>\n`;
      continue;
    }

    // Regular paragraphs or subheaders
    if (inList) {
      html += '</ul>\n';
      inList = false;
    }

    let text = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (text.includes('|') && (text.includes('@') || text.includes('LinkedIn') || text.includes('Tarija'))) {
      html += `<div class="cv-contact">${text}</div>\n`;
    } else {
      html += `<p class="cv-paragraph">${text}</p>\n`;
    }
  }

  if (inList) {
    html += '</ul>\n';
  }

  return html;
}

const bodyHtml = parseMarkdown(mdContent);

const fullHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Curriculum Vitae - Daniel Mancilla Tejerina</title>
  <style>
    @page {
      size: letter;
      margin: 8mm 14mm 8mm 14mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', Helvetica, Arial, sans-serif;
      color: #1e293b;
      background: #ffffff;
      font-size: 9.3pt;
      line-height: 1.4;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .cv-name {
      font-size: 19pt;
      font-weight: 800;
      letter-spacing: 0.8px;
      color: #090e17;
      text-transform: uppercase;
      margin-bottom: 2pt;
    }
    .cv-title {
      font-size: 10.3pt;
      font-weight: 700;
      color: #0284c7;
      margin-bottom: 3pt;
      letter-spacing: 0.2px;
    }
    .cv-contact {
      font-size: 8.8pt;
      color: #475569;
      margin-bottom: 2.5pt;
      line-height: 1.35;
      font-weight: 500;
    }
    hr {
      border: none;
      border-top: 1px solid #cbd5e1;
      margin: 5pt 0 5pt 0;
    }
    .cv-section-title {
      font-size: 10.8pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      border-bottom: 1.5px solid #0284c7;
      padding-bottom: 2pt;
      margin-top: 6pt;
      margin-bottom: 3.5pt;
    }
    .cv-job-title {
      font-size: 9.6pt;
      font-weight: 700;
      color: #0f172a;
      margin-top: 3.5pt;
      margin-bottom: 1pt;
    }
    .cv-paragraph {
      font-size: 9pt;
      color: #334155;
      margin-bottom: 3pt;
      line-height: 1.36;
      text-align: justify;
    }
    .cv-list {
      margin-left: 14pt;
      margin-bottom: 3.5pt;
    }
    .cv-list li {
      font-size: 8.9pt;
      color: #334155;
      margin-bottom: 1.8pt;
      line-height: 1.32;
    }
    strong {
      color: #0f172a;
      font-weight: 700;
    }
  </style>
</head>
<body>
  ${bodyHtml}
</body>
</html>`;

fs.writeFileSync(tempHtmlPath, fullHtml, 'utf-8');

const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];

let browserPath = edgePaths.find(p => fs.existsSync(p));

if (!browserPath) {
  console.error('No headless browser found to print PDF.');
  process.exit(1);
}

try {
  if (fs.existsSync(pdfPath)) {
    fs.unlinkSync(pdfPath);
  }

  const fileUrl = `file:///${tempHtmlPath.replace(/\\/g, '/')}`;
  const cmd = `"${browserPath}" --headless=new --disable-gpu --no-sandbox --print-to-pdf="${pdfPath}" --no-pdf-header-footer "${fileUrl}"`;
  console.log('Generating PDF via headless browser...');
  execSync(cmd, { stdio: 'inherit', timeout: 15000 });

  // Wait a moment for file flush
  let attempts = 0;
  while (!fs.existsSync(pdfPath) && attempts < 20) {
    execSync('powershell -Command "Start-Sleep -Milliseconds 200"');
    attempts++;
  }

  if (fs.existsSync(pdfPath)) {
    const stats = fs.statSync(pdfPath);
    console.log(`✅ Successfully generated ${pdfPath} (${stats.size} bytes)`);
  } else {
    console.error('❌ Failed to generate PDF');
    process.exit(1);
  }
} finally {
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }
}
