import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
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

export const generateQuestionPaperWord = async (questions, settings) => {
  const children = [];
  const template = settings.template || 'classic';
  const isClassic = template === 'classic';
  const isCompact = template === 'compact';

  // Header Section
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

  // Questions
  const optLayout = settings.optionsLayout || '1-col';
  const actualLayout = isCompact && optLayout === '4-col' ? '2-col' : optLayout;
  const numCols = actualLayout === '4-col' ? 4 : actualLayout === '2-col' ? 2 : 1;

  questions.forEach((q, index) => {
    children.push(new Paragraph({
      children: [
        new TextRun({ text: `${index + 1}. ${q.question}` })
      ],
      spacing: { before: 200, after: 100 }
    }));

    if (numCols === 1) {
      ['A', 'B', 'C', 'D'].forEach(k => {
        children.push(new Paragraph({
          text: `${k}. ${q.options[k]}`,
          indent: { left: 720 },
        }));
      });
    } else if (numCols === 2) {
      children.push(new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ text: `A. ${q.options['A']}` })], width: { size: 50, type: WidthType.PERCENTAGE }, borders: noBorders }),
              new TableCell({ children: [new Paragraph({ text: `B. ${q.options['B']}` })], width: { size: 50, type: WidthType.PERCENTAGE }, borders: noBorders })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ text: `C. ${q.options['C']}` })], width: { size: 50, type: WidthType.PERCENTAGE }, borders: noBorders }),
              new TableCell({ children: [new Paragraph({ text: `D. ${q.options['D']}` })], width: { size: 50, type: WidthType.PERCENTAGE }, borders: noBorders })
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
              new TableCell({ children: [new Paragraph({ text: `A. ${q.options['A']}` })], width: { size: 25, type: WidthType.PERCENTAGE }, borders: noBorders }),
              new TableCell({ children: [new Paragraph({ text: `B. ${q.options['B']}` })], width: { size: 25, type: WidthType.PERCENTAGE }, borders: noBorders }),
              new TableCell({ children: [new Paragraph({ text: `C. ${q.options['C']}` })], width: { size: 25, type: WidthType.PERCENTAGE }, borders: noBorders }),
              new TableCell({ children: [new Paragraph({ text: `D. ${q.options['D']}` })], width: { size: 25, type: WidthType.PERCENTAGE }, borders: noBorders })
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
        new TableCell({ children: [new Paragraph({ text: answerText })] })
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
