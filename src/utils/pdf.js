import { jsPDF } from 'jspdf';

// jsPDF's standard fonts (Helvetica, Times) do not support Unicode characters like ₹ and π.
// Passing them causes incorrect width calculations leading to huge letter spacing in PDF viewers.
const sanitizeText = (str) => {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/₹/g, 'Rs. ')
    .replace(/π/g, 'pi')
    .replace(/[\u2018\u2019]/g, "'") // smart single quotes
    .replace(/[\u201C\u201D]/g, '"') // smart double quotes
    .replace(/\u2013|\u2014/g, '-') // en dash, em dash
    .replace(/\u2026/g, '...') // ellipsis
    .replace(/[^\x00-\xFF]/g, '?'); // replace other unsupported characters
};

export const generateQuestionPaperPDF = (questions, settings) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPos = margin;
  let currentColumn = 0;

  const template = settings.template || 'classic';
  const isClassic = template === 'classic';
  const isCompact = template === 'compact';
  const isLgs = template === 'lgs';
  
  const fontName = isClassic ? 'times' : 'helvetica';
  const colGap = 10;
  const textColWidth = isCompact ? (contentWidth - colGap) / 2 : contentWidth;

  const getX = () => margin + (currentColumn * (textColWidth + colGap));

  const checkPageBreak = (neededSpace = 10) => {
    if (yPos + neededSpace > pageHeight - margin) {
      if (isCompact && currentColumn === 0) {
        currentColumn = 1;
        yPos = margin;
      } else {
        doc.addPage();
        currentColumn = 0;
        yPos = margin;
      }
    }
  };

  const addText = (text, fontSize, isBold = false, align = 'left', customWidth = null, indent = 0) => {
    doc.setFontSize(fontSize);
    doc.setFont(fontName, isBold ? 'bold' : 'normal');
    
    const sanitized = sanitizeText(text);
    const targetWidth = customWidth || (textColWidth - indent);
    const lines = doc.splitTextToSize(sanitized, targetWidth);
    const lineHeight = fontSize * 0.4;
    
    for (let i = 0; i < lines.length; i++) {
      checkPageBreak(lineHeight);
      
      const xPos = align === 'center' && !isCompact
        ? (pageWidth - doc.getTextWidth(lines[i])) / 2
        : getX() + indent;
        
      doc.text(lines[i], xPos, yPos);
      yPos += lineHeight;
    }
  };

  // Header Section
  if (isLgs) {
    const lgsHeaderHeight = 35; 
    const leftWidth = contentWidth * 0.2;
    const midWidth = contentWidth * 0.6;
    const rightWidth = contentWidth * 0.2;

    doc.setLineWidth(0.5);
    doc.rect(margin, yPos, contentWidth, lgsHeaderHeight);
    
    doc.line(margin + leftWidth, yPos, margin + leftWidth, yPos + lgsHeaderHeight);
    doc.line(margin + leftWidth + midWidth, yPos, margin + leftWidth + midWidth, yPos + lgsHeaderHeight);
    
    const midHeaderHalf = lgsHeaderHeight * 0.45;
    doc.line(margin + leftWidth, yPos + midHeaderHalf, margin + leftWidth + midWidth, yPos + midHeaderHalf);
    doc.line(margin + leftWidth + (midWidth / 2), yPos + midHeaderHalf, margin + leftWidth + (midWidth / 2), yPos + lgsHeaderHeight);

    if (settings.logo) {
      try {
        const imgProps = doc.getImageProperties(settings.logo);
        const logoHeight = 15;
        const logoWidth = (imgProps.width / imgProps.height) * logoHeight;
        const xPos = margin + (leftWidth - logoWidth) / 2;
        doc.addImage(settings.logo, imgProps.fileType, xPos, yPos + 3, logoWidth, logoHeight);
      } catch (e) {}
    }
    if (settings.department) {
      doc.setFontSize(10);
      doc.setFont(fontName, 'bold');
      const deptText = sanitizeText(settings.department.toUpperCase());
      const txtWidth = doc.getTextWidth(deptText);
      doc.text(deptText, margin + (leftWidth - txtWidth) / 2, yPos + 25);
    }

    if (settings.logo2) {
      try {
        const imgProps = doc.getImageProperties(settings.logo2);
        const logoHeight = 18;
        const logoWidth = (imgProps.width / imgProps.height) * logoHeight;
        const xPos = margin + leftWidth + midWidth + (rightWidth - logoWidth) / 2;
        doc.addImage(settings.logo2, imgProps.fileType, xPos, yPos + 8, logoWidth, logoHeight);
      } catch (e) {}
    }

    if (settings.institutionName) {
      doc.setFontSize(14);
      doc.setFont(fontName, 'bold');
      const instText = sanitizeText(settings.institutionName.toUpperCase());
      const txtWidth = doc.getTextWidth(instText);
      doc.text(instText, margin + leftWidth + (midWidth - txtWidth) / 2, yPos + 10);
    }

    doc.setFontSize(11);
    let leftBoxY = yPos + midHeaderHalf + 7;
    if (settings.examTitle) {
      const examText = sanitizeText(settings.examTitle.toUpperCase());
      const txtWidth = doc.getTextWidth(examText);
      doc.text(examText, margin + leftWidth + (midWidth / 4) - (txtWidth / 2), leftBoxY);
      leftBoxY += 5;
    }
    if (settings.date) {
      const dateText = sanitizeText(`DATE: ${settings.date}`);
      const txtWidth = doc.getTextWidth(dateText);
      doc.text(dateText, margin + leftWidth + (midWidth / 4) - (txtWidth / 2), leftBoxY);
    }

    if (settings.subject) {
      doc.setFontSize(11);
      const subjText = sanitizeText(settings.subject.toUpperCase());
      const lines = doc.splitTextToSize(subjText, (midWidth / 2) - 4);
      let rightBoxY = yPos + midHeaderHalf + 7;
      for (let i = 0; i < lines.length; i++) {
        const txtWidth = doc.getTextWidth(lines[i]);
        doc.text(lines[i], margin + leftWidth + (midWidth / 2) + (midWidth / 4) - (txtWidth / 2), rightBoxY);
        rightBoxY += 5;
      }
    }

    yPos += lgsHeaderHeight + 10;
  } else {
    if (settings.logo) {
      try {
        const imgProps = doc.getImageProperties(settings.logo);
        const logoHeight = 20;
        const logoWidth = (imgProps.width / imgProps.height) * logoHeight;
        const xPos = isClassic ? (pageWidth - logoWidth) / 2 : margin;
        
        doc.addImage(settings.logo, imgProps.fileType, xPos, yPos, logoWidth, logoHeight);
        yPos += logoHeight + 5;
      } catch (e) {
        console.error("Failed to add logo to PDF", e);
      }
    }

    if (settings.institutionName) {
      addText(settings.institutionName.toUpperCase(), 16, true, isClassic ? 'center' : 'left');
      yPos += 5;
    }
    
    if (settings.examTitle) {
      addText(settings.examTitle.toUpperCase(), 14, true, isClassic ? 'center' : 'left');
      yPos += 5;
    }

    const infoFontSize = isCompact ? 9 : 11;
    doc.setFontSize(infoFontSize);
    doc.setFont(fontName, 'normal');
    yPos += 5;
    
    if (isCompact) {
      if (settings.subject) { addText(`Subject: ${settings.subject}`, infoFontSize, true); yPos += 2; }
      if (settings.date) { addText(`Date: ${settings.date}`, infoFontSize); yPos += 2; }
      if (settings.duration) { addText(`Duration: ${settings.duration}`, infoFontSize); yPos += 2; }
      if (settings.totalMarks) { addText(`Total Marks: ${settings.totalMarks}`, infoFontSize); yPos += 2; }
      yPos += 4;
      addText('Name: _______________________', infoFontSize); yPos += 2;
      addText('Reg No: _____________________', infoFontSize); yPos += 4;
      doc.setLineWidth(0.5);
      doc.line(getX(), yPos, getX() + textColWidth, yPos);
      yPos += 6;
    } else {
      if (settings.subject) doc.text(sanitizeText(`Subject: ${settings.subject}`), margin, yPos);
      if (settings.date) doc.text(sanitizeText(`Date: ${settings.date}`), pageWidth - margin - doc.getTextWidth(sanitizeText(`Date: ${settings.date}`)), yPos);
      
      yPos += 6;
      if (settings.duration) doc.text(sanitizeText(`Duration: ${settings.duration}`), margin, yPos);
      if (settings.totalMarks) doc.text(sanitizeText(`Total Marks: ${settings.totalMarks}`), pageWidth - margin - doc.getTextWidth(sanitizeText(`Total Marks: ${settings.totalMarks}`)), yPos);
      
      yPos += 10;
      doc.text('Name: _______________________________________', margin, yPos);
      doc.text('Register No: _________________________________', pageWidth - margin - 85, yPos);
      
      yPos += 10;
      doc.setLineWidth(0.5);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;
    }
  }

  // Instructions
  if (settings.instructions) {
    addText('Instructions:', infoFontSize + 1, true);
    yPos += 2;
    addText(settings.instructions, infoFontSize, false);
    yPos += 4;
    doc.line(getX(), yPos, getX() + textColWidth, yPos);
    yPos += 8;
  }

  // Questions
  const qFontSize = isCompact ? 10 : 11;
  const optLayout = settings.optionsLayout || '1-col';
  // If compact mode, force 1-col or 2-col to prevent crowding
  const actualLayout = isCompact && optLayout === '4-col' ? '2-col' : optLayout;
  const numCols = actualLayout === '4-col' ? 4 : actualLayout === '2-col' ? 2 : 1;
  const optColWidth = (textColWidth - 8) / numCols;
  const optionIndent = 8;

  questions.forEach((q, index) => {
    checkPageBreak(20);

    const questionText = `${index + 1}. ${q.question}`;
    addText(questionText, qFontSize, false);
    
    yPos += 2;
    
    let optKeys = ['A', 'B', 'C', 'D'];
    let currentRowY = yPos;
    let nextRowY = yPos;

    for (let i = 0; i < optKeys.length; i++) {
      const opt = optKeys[i];
      const text = `${opt}. ${q.options[opt]}`;
      const colIndex = i % numCols;
      
      if (colIndex === 0 && i !== 0) {
        currentRowY = nextRowY;
      }
      
      doc.setFontSize(qFontSize);
      doc.setFont(fontName, 'normal');
      
      const sanitizedOpt = sanitizeText(text);
      const lines = doc.splitTextToSize(sanitizedOpt, optColWidth - 2); 
      
      const xPos = getX() + optionIndent + (colIndex * optColWidth);
      let tempY = currentRowY;
      
      for (let l = 0; l < lines.length; l++) {
        checkPageBreak(qFontSize * 0.4);
        // Recalculate X if we page-broke to column 1
        const currentX = getX() + optionIndent + (colIndex * optColWidth);
        doc.text(lines[l], currentX, tempY);
        tempY += qFontSize * 0.4;
      }
      if (tempY > nextRowY) {
        nextRowY = tempY;
      }
    }
    
    yPos = nextRowY + (isCompact ? 4 : 6); 
  });

  // Page Numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setFont(fontName, 'normal');
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }

  const filename = settings.subject 
    ? `${sanitizeText(settings.subject).replace(/[^a-z0-9]/gi, '_')}_Question_Paper.pdf` 
    : 'Question_Paper.pdf';
    
  doc.save(filename);
};

export const generateAnswerKeyPDF = (questions, settings) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;
  
  const template = settings.template || 'classic';
  const fontName = template === 'classic' ? 'times' : 'helvetica';

  const addText = (text, fontSize, isBold = false, align = 'left') => {
    doc.setFontSize(fontSize);
    doc.setFont(fontName, isBold ? 'bold' : 'normal');
    const sanitized = sanitizeText(text);
    if (align === 'center') {
      const textWidth = doc.getTextWidth(sanitized);
      doc.text(sanitized, (pageWidth - textWidth) / 2, yPos);
    } else {
      doc.text(sanitized, margin, yPos);
    }
    yPos += fontSize * 0.4;
  };

  if (settings.logo) {
    try {
      const imgProps = doc.getImageProperties(settings.logo);
      const logoHeight = 20;
      const logoWidth = (imgProps.width / imgProps.height) * logoHeight;
      const xPos = (pageWidth - logoWidth) / 2;
      
      doc.addImage(settings.logo, imgProps.fileType, xPos, yPos, logoWidth, logoHeight);
      yPos += logoHeight + 5;
    } catch (e) {
      console.error("Failed to add logo to Answer Key PDF", e);
    }
  }

  if (settings.institutionName) {
    addText(settings.institutionName.toUpperCase(), 16, true, 'center');
    yPos += 5;
  }
  
  addText('ANSWER KEY', 14, true, 'center');
  yPos += 8;
  
  doc.setFontSize(11);
  doc.setFont(fontName, 'normal');
  if (settings.subject) {
    doc.text(sanitizeText(`Subject: ${settings.subject}`), margin, yPos);
    yPos += 6;
  }
  if (settings.examTitle) {
    doc.text(sanitizeText(`Exam: ${settings.examTitle}`), margin, yPos);
    yPos += 8;
  }
  
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  // Table Header
  doc.setFont(fontName, 'bold');
  doc.text('Q.No.', margin + 10, yPos);
  doc.text('Answer', margin + 40, yPos);
  doc.text('Answer Details', margin + 70, yPos);
  yPos += 6;
  
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  doc.setFont(fontName, 'normal');
  
  questions.forEach((q, index) => {
    if (yPos > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      
      doc.setFont(fontName, 'bold');
      doc.text('Q.No.', margin + 10, yPos);
      doc.text('Answer', margin + 40, yPos);
      doc.text('Answer Details', margin + 70, yPos);
      yPos += 6;
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;
      doc.setFont(fontName, 'normal');
    }

    doc.text(`${index + 1}`, margin + 10, yPos);
    doc.text(sanitizeText(q.answer), margin + 40, yPos);
    
    const answerText = q.options[q.answer];
    let truncated = answerText;
    if (truncated.length > 60) {
      truncated = truncated.substring(0, 57) + '...';
    }
    doc.text(sanitizeText(truncated), margin + 70, yPos);
    
    yPos += 7;
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }

  const filename = settings.subject 
    ? `${sanitizeText(settings.subject).replace(/[^a-z0-9]/gi, '_')}_Answer_Key.pdf` 
    : 'Answer_Key.pdf';
    
  doc.save(filename);
};
