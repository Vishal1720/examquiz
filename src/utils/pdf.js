import { jsPDF } from 'jspdf';

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
    
    const targetWidth = customWidth || (textColWidth - indent);
    const lines = doc.splitTextToSize(text, targetWidth);
    const lineHeight = fontSize * 0.4;
    
    const startY = yPos;
    let tempY = startY;

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
  if (settings.institutionName) {
    addText(settings.institutionName.toUpperCase(), 16, true, isClassic ? 'center' : 'left');
    yPos += 5;
  }
  
  if (settings.examTitle) {
    addText(settings.examTitle.toUpperCase(), 14, true, isClassic ? 'center' : 'left');
    yPos += 5;
  }

  // Info details
  const infoFontSize = isCompact ? 9 : 11;
  doc.setFontSize(infoFontSize);
  doc.setFont(fontName, 'normal');
  yPos += 5;
  
  // To keep info compact in 2-column mode, we just stack it
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
    if (settings.subject) doc.text(`Subject: ${settings.subject}`, margin, yPos);
    if (settings.date) doc.text(`Date: ${settings.date}`, pageWidth - margin - doc.getTextWidth(`Date: ${settings.date}`), yPos);
    
    yPos += 6;
    if (settings.duration) doc.text(`Duration: ${settings.duration}`, margin, yPos);
    if (settings.totalMarks) doc.text(`Total Marks: ${settings.totalMarks}`, pageWidth - margin - doc.getTextWidth(`Total Marks: ${settings.totalMarks}`), yPos);
    
    yPos += 10;
    doc.text('Name: _______________________________________', margin, yPos);
    doc.text('Register No: _________________________________', pageWidth - margin - 85, yPos);
    
    yPos += 10;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;
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
      const lines = doc.splitTextToSize(text, optColWidth - 2); 
      
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
    ? `${settings.subject.replace(/[^a-z0-9]/gi, '_')}_Question_Paper.pdf` 
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
    if (align === 'center') {
      const textWidth = doc.getTextWidth(text);
      doc.text(text, (pageWidth - textWidth) / 2, yPos);
    } else {
      doc.text(text, margin, yPos);
    }
    yPos += fontSize * 0.4;
  };

  if (settings.institutionName) {
    addText(settings.institutionName.toUpperCase(), 16, true, 'center');
    yPos += 5;
  }
  
  addText('ANSWER KEY', 14, true, 'center');
  yPos += 8;
  
  doc.setFontSize(11);
  doc.setFont(fontName, 'normal');
  if (settings.subject) {
    doc.text(`Subject: ${settings.subject}`, margin, yPos);
    yPos += 6;
  }
  if (settings.examTitle) {
    doc.text(`Exam: ${settings.examTitle}`, margin, yPos);
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
    doc.text(q.answer, margin + 40, yPos);
    
    const answerText = q.options[q.answer];
    let truncated = answerText;
    if (truncated.length > 60) {
      truncated = truncated.substring(0, 57) + '...';
    }
    doc.text(truncated, margin + 70, yPos);
    
    yPos += 7;
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }

  const filename = settings.subject 
    ? `${settings.subject.replace(/[^a-z0-9]/gi, '_')}_Answer_Key.pdf` 
    : 'Answer_Key.pdf';
    
  doc.save(filename);
};
