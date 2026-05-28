/**
 * Export Markdown from origin/ to DOCX.
 * Mermaid → PNG via mermaid.ink (same as PDF script).
 * Styled HTML → html-to-docx (same table/font styles as PDF).
 *
 * Usage: node export-to-docx.js <filename>
 * Example: node export-to-docx.js CLINICADENTALGOYANC_PROPOSAL.md
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { marked } = require('marked');
const HTMLtoDOCX = require('html-to-docx');

const fileName = process.argv[2];

if (!fileName) {
  console.error('❌ Provide a filename: node export-to-docx.js <file.md>');
  process.exit(1);
}

const fileBaseName = fileName.endsWith('.md') ? fileName.replace('.md', '') : fileName;
const inputFileName = fileName.endsWith('.md') ? fileName : `${fileName}.md`;

const INPUT_FILE = path.join(__dirname, 'origin', inputFileName);
const EXPORT_DIR = path.join(__dirname, 'export');
const OUTPUT_FILE = path.join(EXPORT_DIR, `${fileBaseName}.docx`);
const TEMP_DIR = path.join(EXPORT_DIR, `.${fileBaseName.toLowerCase()}-docx-temp`);

if (!fs.existsSync(INPUT_FILE)) {
  console.error(`❌ Not found: ${INPUT_FILE}`);
  process.exit(1);
}

if (!fs.existsSync(EXPORT_DIR)) fs.mkdirSync(EXPORT_DIR, { recursive: true });
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

async function downloadBase64(diagramCode, index) {
  const encoded = Buffer.from(diagramCode).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  const url = `https://mermaid.ink/img/${encoded}?theme=default&bgColor=white`;
  const imageFile = path.join(TEMP_DIR, `diagram-${index}.png`);

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(imageFile);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        return reject(new Error(`mermaid.ink returned ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const base64 = fs.readFileSync(imageFile).toString('base64');
        resolve(base64);
      });
    }).on('error', reject);
  });
}

async function extractMermaidDiagrams(content) {
  const mermaidRegex = /```mermaid\s*\n([\s\S]*?)\n```/g;
  const matches = [];
  let match;
  let index = 0;

  while ((match = mermaidRegex.exec(content)) !== null) {
    matches.push({ fullMatch: match[0], diagramCode: match[1].trim(), index: index++ });
  }

  console.log(`Found ${matches.length} Mermaid diagrams`);
  let modifiedContent = content;

  for (const { fullMatch, diagramCode, index } of matches) {
    const MAX_RETRIES = 3;
    let success = false;

    for (let attempt = 1; attempt <= MAX_RETRIES && !success; attempt++) {
      try {
        console.log(`  📊 Diagram ${index} (attempt ${attempt}/${MAX_RETRIES})...`);
        const base64 = await downloadBase64(diagramCode, index);
        const isPie = diagramCode.trim().toLowerCase().startsWith('pie');
        const width = isPie ? '220px' : '480px';
        const imgTag = `\n<img src="data:image/png;base64,${base64}" style="max-width:${width};display:block;margin:12px auto;" />\n`;
        modifiedContent = modifiedContent.replace(fullMatch, imgTag);
        console.log(`  ✅ Diagram ${index} converted`);
        success = true;
      } catch (err) {
        console.error(`  ❌ Diagram ${index} attempt ${attempt}:`, err.message);
        if (attempt < MAX_RETRIES) await new Promise(r => setTimeout(r, attempt * 2000));
      }
    }

    if (!success) {
      modifiedContent = modifiedContent.replace(fullMatch, `\n> *[Diagram ${index} unavailable]*\n`);
    }
  }

  return modifiedContent;
}

async function convertToDocx(content) {
  marked.setOptions({ breaks: true, gfm: true });
  const htmlBody = marked.parse(content);

  const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Calibri', 'Segoe UI', sans-serif;
      font-size: 11pt;
      color: #222222;
      line-height: 1.6;
    }
    h1 { font-size: 18pt; color: #1a2e44; margin: 0 0 6pt; }
    h2 { font-size: 14pt; color: #1a2e44; margin: 18pt 0 4pt; border-bottom: 1px solid #cccccc; padding-bottom: 2pt; }
    h3 { font-size: 12pt; color: #1a2e44; margin: 12pt 0 3pt; }
    h4 { font-size: 11pt; color: #1a2e44; margin: 8pt 0 2pt; }
    p  { margin: 4pt 0 8pt; }
    ul, ol { margin: 4pt 0 8pt; padding-left: 18pt; }
    li { margin: 2pt 0; }
    hr { border: none; border-top: 1px solid #cccccc; margin: 12pt 0; }
    blockquote {
      margin: 8pt 0 8pt 12pt;
      padding: 4pt 8pt;
      border-left: 3px solid #aaaaaa;
      color: #555555;
      font-style: italic;
    }
    a { color: #1a5eb8; text-decoration: none; }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 10pt 0;
      font-size: 10pt;
    }
    th {
      background-color: #1a2e44;
      color: #ffffff;
      font-weight: bold;
      padding: 6pt 8pt;
      text-align: left;
      border: 1px solid #1a2e44;
    }
    td {
      padding: 5pt 8pt;
      border: 1px solid #d0d0d0;
      color: #222222;
    }
    tr:nth-child(even) td { background-color: #f2f5f8; }
    tr:nth-child(odd)  td { background-color: #ffffff; }
    img { max-width: 100%; height: auto; }
    code {
      font-family: 'Courier New', monospace;
      font-size: 9.5pt;
      background: #f4f4f4;
      padding: 1pt 3pt;
    }
    pre {
      background: #f4f4f4;
      padding: 8pt;
      font-size: 9.5pt;
      font-family: 'Courier New', monospace;
    }
  </style>
</head>
<body>
${htmlBody}
</body>
</html>`;

  console.log('📄 Converting to DOCX...');

  const docxBuffer = await HTMLtoDOCX(fullHtml, null, {
    table: { row: { cantSplit: true } },
    footer: true,
    pageNumber: true,
    font: 'Calibri',
    fontSize: 22,
    margins: {
      top: 1440,
      right: 1800,
      bottom: 1440,
      left: 1800,
    },
  });

  fs.writeFileSync(OUTPUT_FILE, docxBuffer);
  console.log(`✅ Done: ${OUTPUT_FILE}`);
}

(async () => {
  console.log(`📄 Reading ${inputFileName}...`);
  const content = fs.readFileSync(INPUT_FILE, 'utf-8');

  const modifiedContent = await extractMermaidDiagrams(content);
  await convertToDocx(modifiedContent);

  setTimeout(() => {
    try {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
      console.log('🧹 Temp files cleaned');
    } catch { /* ignore */ }
  }, 500);
})();
