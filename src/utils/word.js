import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, Math, MathFraction, MathRun, MathSuperScript, ImageRun } from 'docx';
import pkg from 'file-saver';
const { saveAs } = pkg;

const noBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: "auto" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
  left: { style: BorderStyle.NONE, size: 0, color: "auto" },
  right: { style: BorderStyle.NONE, size: 0, color: "auto" },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "auto" },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: "auto" },
};

const base64DataURLToArrayBuffer = (dataURL) => {
  const base64 = dataURL.split(',')[1];
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};


const normalizeSuperscripts = (str) => {
  if (!str) return str;
  const map = {
    '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
    '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
    '⁺': '+', '⁻': '-', '⁼': '=', '⁽': '(', '⁾': ')',
    'ⁿ': 'n'
  };
  return str.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿ]+/g, match => {
    let res = '^';
    for (let char of match) {
      res += map[char];
    }
    return res;
  });
};

const parseMathString = (str) => {
  const parts = [];
  const regex = /([a-zA-Z0-9]+)\^(\([^)]+\)|[+-]?\d+|[a-zA-Z])/g;
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      parts.push(new MathRun(str.substring(lastIndex, match.index)));
    }
    
    let exponent = match[2];
    if (exponent.startsWith('(') && exponent.endsWith(')')) {
      exponent = exponent.slice(1, -1);
    }
    
    parts.push(new MathSuperScript({
      children: [new MathRun(match[1])],
      superScript: [new MathRun(exponent)]
    }));
    lastIndex = regex.lastIndex;
  }
  
  if (lastIndex < str.length) {
    parts.push(new MathRun(str.substring(lastIndex)));
  }
  
  return parts;
};

const renderOptionText = (prefix, rawText, parseMath) => {
  if (!parseMath || !rawText || typeof rawText !== 'string') {
    return [new TextRun({ text: `${prefix}${rawText}`, space: 'preserve' })];
  }

  const text = normalizeSuperscripts(rawText);

  // Regex to detect fractions like x/2, x^2/3, 4/2, 1/√(2), (x+1)/2
  const fractionRegex = /((?:√?\([^)]+\))|[a-zA-Z0-9^.√]+)\s*\/\s*((?:√?\([^)]+\))|[a-zA-Z0-9^.√]+)/g;
  
  if (!text.match(fractionRegex) && !text.includes('^')) {
    return [new TextRun({ text: `${prefix}${rawText}`, space: 'preserve' })];
  }

  const children = [];
  children.push(new TextRun({ text: prefix, space: 'preserve' }));
  
  const mathChildren = [];
  let lastIndex = 0;
  let match;
  
  while ((match = fractionRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const preceding = text.substring(lastIndex, match.index);
      mathChildren.push(...parseMathString(preceding));
    }
    
    mathChildren.push(new MathFraction({
      numerator: parseMathString(match[1]),
      denominator: parseMathString(match[2])
    }));
    
    lastIndex = fractionRegex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    const trailing = text.substring(lastIndex);
    mathChildren.push(...parseMathString(trailing));
  }
  
  children.push(new Math({ children: mathChildren }));
  return children;
};

const renderQuestionText = (prefix, rawText, parseMath) => {
  if (!parseMath || !rawText || typeof rawText !== 'string') {
    return [new TextRun({ text: `${prefix}${rawText}`, space: 'preserve' })];
  }

  const text = normalizeSuperscripts(rawText);
  const fractionRegex = /((?:√?\([^)]+\))|[a-zA-Z0-9^.√]+)\s*\/\s*((?:√?\([^)]+\))|[a-zA-Z0-9^.√]+)/g;
  
  if (!text.match(fractionRegex) && !text.includes('^')) {
    return [new TextRun({ text: `${prefix}${rawText}`, space: 'preserve' })];
  }

  const children = [];
  children.push(new TextRun({ text: prefix, space: 'preserve' }));
  
  // Split text into words (2+ letters) and non-words (equations, symbols, spaces)
  const chunks = text.split(/\b([a-zA-Z]{2,})\b/g);
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (!chunk) continue;
    
    if (i % 2 === 1) {
      // Normal word (2+ letters)
      children.push(new TextRun({ text: chunk, space: 'preserve' }));
    } else {
      // Potential math block
      if (chunk.match(fractionRegex) || chunk.includes('^')) {
        const mathChildren = [];
        let lastIdx = 0;
        let match;
        // reset regex index
        fractionRegex.lastIndex = 0;
        
        while ((match = fractionRegex.exec(chunk)) !== null) {
          if (match.index > lastIdx) {
            mathChildren.push(...parseMathString(chunk.substring(lastIdx, match.index)));
          }
          mathChildren.push(new MathFraction({
            numerator: parseMathString(match[1]),
            denominator: parseMathString(match[2])
          }));
          lastIdx = fractionRegex.lastIndex;
        }
        if (lastIdx < chunk.length) {
          mathChildren.push(...parseMathString(chunk.substring(lastIdx)));
        }
        
        children.push(new Math({ children: mathChildren }));
      } else {
        // Just spaces/symbols without fractions or exponents
        children.push(new TextRun({ text: chunk, space: 'preserve' }));
      }
    }
  }
  
  return children;
};


export const generateQuestionPaperWord = async (questions, settings) => {
  const children = [];
  const template = settings.template || 'classic';
  const isClassic = template === 'classic';
  const isCompact = template === 'compact';

  // Header Section
  if (settings.logo) {
    try {
      const logoBuffer = base64DataURLToArrayBuffer(settings.logo);
      children.push(new Paragraph({
        children: [
          new ImageRun({
            data: logoBuffer,
            transformation: {
              width: 80,
              height: 80,
            },
          }),
        ],
        alignment: isClassic ? AlignmentType.CENTER : AlignmentType.LEFT,
        spacing: { after: 100 }
      }));
    } catch (err) {
      console.error("Error adding logo to word doc", err);
    }
  }

  if (settings.institutionName) {
    children.push(new Paragraph({
      text: settings.institutionName.toUpperCase(),
      heading: HeadingLevel.HEADING_1,
      alignment: isClassic ? AlignmentType.CENTER : AlignmentType.LEFT,
      spacing: { after: 100 }
    }));
  }

  if (settings.examTitle) {
    children.push(new Paragraph({
      text: settings.examTitle.toUpperCase(),
      heading: HeadingLevel.HEADING_2,
      alignment: isClassic ? AlignmentType.CENTER : AlignmentType.LEFT,
      spacing: { after: 200 }
    }));
  }

  // Info details
  if (isCompact) {
    if (settings.subject) children.push(new Paragraph({ children: [new TextRun({ text: `Subject: ${settings.subject}`, bold: true })] }));
    if (settings.date) children.push(new Paragraph({ text: `Date: ${settings.date}` }));
    if (settings.duration) children.push(new Paragraph({ text: `Duration: ${settings.duration}` }));
    if (settings.totalMarks) children.push(new Paragraph({ text: `Total Marks: ${settings.totalMarks}` }));
    children.push(new Paragraph({ text: 'Name: _______________________', spacing: { before: 100 } }));
    children.push(new Paragraph({ text: 'Reg No: _____________________', spacing: { after: 100 } }));
  } else {
    const createRow = (leftText, rightText, isBold = false) => {
      return new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: leftText, bold: isBold })] })],
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: noBorders
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: rightText, bold: isBold })], alignment: AlignmentType.RIGHT })],
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: noBorders
          })
        ]
      });
    };

    const rows = [];
    if (settings.subject || settings.date) {
      rows.push(createRow(settings.subject ? `Subject: ${settings.subject}` : '', settings.date ? `Date: ${settings.date}` : '', true));
    }
    if (settings.duration || settings.totalMarks) {
      rows.push(createRow(settings.duration ? `Duration: ${settings.duration}` : '', settings.totalMarks ? `Total Marks: ${settings.totalMarks}` : ''));
    }
    
    // Add some spacing before name/reg
    rows.push(new TableRow({ children: [new TableCell({ children: [new Paragraph({ text: "" })], borders: noBorders, columnSpan: 2 })] }));
    rows.push(createRow('Name: _______________________________________', 'Register No: _________________________________'));
    
    if (rows.length > 0) {
      children.push(new Table({
        rows,
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: noBorders,
      }));
    }
  }

  // Divider Line
  children.push(new Paragraph({
    border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } },
    spacing: { after: 200 }
  }));

  // Instructions
  if (settings.instructions) {
    children.push(new Paragraph({
      children: [
        new TextRun({ text: 'Instructions:\n', bold: true }),
        new TextRun({ text: settings.instructions })
      ],
      border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } },
      spacing: { after: 200, before: 100 }
    }));
  }

  questions.forEach((q, index) => {
    const optLayout = q.optionsLayout && q.optionsLayout !== 'default' ? q.optionsLayout : (settings.optionsLayout || '1-col');
    const actualLayout = isCompact && optLayout === '4-col' ? '2-col' : optLayout;
    const numCols = actualLayout === '4-col' ? 4 : actualLayout === '2-col' ? 2 : 1;
    children.push(new Paragraph({
      children: renderQuestionText(`${index + 1}. `, q.question, settings.parseMathQuestion),
      spacing: { before: 200, after: 100 }
    }));

    if (numCols === 1) {
      ['A', 'B', 'C', 'D'].forEach(k => {
        children.push(new Paragraph({
          children: renderOptionText(`${k}. `, q.options[k], settings.parseMath),
          indent: { left: 720 },
          spacing: { before: 80, after: 80 }
        }));
      });
    } else if (numCols === 2) {
      children.push(new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: renderOptionText(`A. `, q.options['A'], settings.parseMath), spacing: { before: 80, after: 80 } })], width: { size: 50, type: WidthType.PERCENTAGE }, borders: noBorders }),
              new TableCell({ children: [new Paragraph({ children: renderOptionText(`B. `, q.options['B'], settings.parseMath), spacing: { before: 80, after: 80 } })], width: { size: 50, type: WidthType.PERCENTAGE }, borders: noBorders })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: renderOptionText(`C. `, q.options['C'], settings.parseMath), spacing: { before: 80, after: 80 } })], width: { size: 50, type: WidthType.PERCENTAGE }, borders: noBorders }),
              new TableCell({ children: [new Paragraph({ children: renderOptionText(`D. `, q.options['D'], settings.parseMath), spacing: { before: 80, after: 80 } })], width: { size: 50, type: WidthType.PERCENTAGE }, borders: noBorders })
            ]
          })
        ],
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: noBorders,
        margins: { left: 720 }
      }));
    } else if (numCols === 4) {
      children.push(new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: renderOptionText(`A. `, q.options['A'], settings.parseMath), spacing: { before: 80, after: 80 } })], width: { size: 25, type: WidthType.PERCENTAGE }, borders: noBorders }),
              new TableCell({ children: [new Paragraph({ children: renderOptionText(`B. `, q.options['B'], settings.parseMath), spacing: { before: 80, after: 80 } })], width: { size: 25, type: WidthType.PERCENTAGE }, borders: noBorders }),
              new TableCell({ children: [new Paragraph({ children: renderOptionText(`C. `, q.options['C'], settings.parseMath), spacing: { before: 80, after: 80 } })], width: { size: 25, type: WidthType.PERCENTAGE }, borders: noBorders }),
              new TableCell({ children: [new Paragraph({ children: renderOptionText(`D. `, q.options['D'], settings.parseMath), spacing: { before: 80, after: 80 } })], width: { size: 25, type: WidthType.PERCENTAGE }, borders: noBorders })
            ]
          })
        ],
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: noBorders,
        margins: { left: 720 }
      }));
    }
  });

  const doc = new Document({
    sections: [{
      properties: {},
      children: children
    }]
  });

  const blob = await Packer.toBlob(doc);
  const filename = settings.subject 
    ? `${settings.subject.replace(/[^a-z0-9]/gi, '_')}_Question_Paper.docx` 
    : 'Question_Paper.docx';
    
  saveAs(blob, filename);
};

export const generateAnswerKeyWord = async (questions, settings) => {
  const children = [];

  if (settings.logo) {
    try {
      const logoBuffer = base64DataURLToArrayBuffer(settings.logo);
      children.push(new Paragraph({
        children: [
          new ImageRun({
            data: logoBuffer,
            transformation: {
              width: 80,
              height: 80,
            },
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      }));
    } catch (err) {
      console.error("Error adding logo to answer key doc", err);
    }
  }

  if (settings.institutionName) {
    children.push(new Paragraph({
      text: settings.institutionName.toUpperCase(),
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 }
    }));
  }

  children.push(new Paragraph({
    text: 'ANSWER KEY',
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 }
  }));

  if (settings.subject) {
    children.push(new Paragraph({
      text: `Subject: ${settings.subject}`,
      spacing: { after: 100 }
    }));
  }

  if (settings.examTitle) {
    children.push(new Paragraph({
      text: `Exam: ${settings.examTitle}`,
      spacing: { after: 200 }
    }));
  }

  // Divider Line
  children.push(new Paragraph({
    border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } },
    spacing: { after: 200 }
  }));

  const tableRows = [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Q.No.', bold: true })] })], width: { size: 15, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Answer', bold: true })] })], width: { size: 15, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Answer Details', bold: true })] })], width: { size: 70, type: WidthType.PERCENTAGE } })
      ]
    })
  ];

  questions.forEach((q, index) => {
    const answerText = q.options[q.answer];
    tableRows.push(new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ text: `${index + 1}` })] }),
        new TableCell({ children: [new Paragraph({ text: q.answer })] }),
        new TableCell({ children: [new Paragraph({ children: renderOptionText('', answerText, settings.parseMath) })] })
      ]
    }));
  });

  children.push(new Table({
    rows: tableRows,
    width: { size: 100, type: WidthType.PERCENTAGE }
  }));

  const doc = new Document({
    sections: [{
      properties: {},
      children: children
    }]
  });

  const blob = await Packer.toBlob(doc);
  const filename = settings.subject 
    ? `${settings.subject.replace(/[^a-z0-9]/gi, '_')}_Answer_Key.docx` 
    : 'Answer_Key.docx';
    
  saveAs(blob, filename);
};
