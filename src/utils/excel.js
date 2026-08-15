import * as XLSX from 'xlsx';
import { sampleQuestions } from './sampleExcel.js';

export const downloadSampleExcel = () => {
  const data = sampleQuestions.map((q) => ({
    Question: q.question,
    'Option A': q.options.A,
    'Option B': q.options.B,
    'Option C': q.options.C,
    'Option D': q.options.D,
    Answer: q.answer,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Maths Questions');

  XLSX.writeFile(workbook, 'maths_quiz_questions_template.xlsx');
};

export const parseExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        resolve(jsonData);
      } catch (error) {
        reject(new Error('Failed to parse Excel file. It might be corrupted.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };

    reader.readAsArrayBuffer(file);
  });
};
