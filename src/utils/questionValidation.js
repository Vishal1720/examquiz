export const validateQuestionsData = (data) => {
  if (!data || data.length === 0) {
    throw new Error('No questions found in the uploaded Excel file.');
  }

  const requiredColumns = ['Question', 'Option A', 'Option B', 'Option C', 'Option D', 'Answer'];
  const firstRow = data[0];
  
  const missingColumns = requiredColumns.filter(col => !(col in firstRow));
  if (missingColumns.length > 0) {
    throw new Error('Invalid Excel format. Please use the provided template.');
  }

  const validAnswers = ['A', 'B', 'C', 'D'];
  const parsedQuestions = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const rowNum = i + 1; // 1-indexed for error messages

    const questionText = String(row['Question'] || '').trim();
    if (!questionText) throw new Error(`Question ${rowNum} is empty.`);

    const optionA = String(row['Option A'] || '').trim();
    if (!optionA) throw new Error(`Question ${rowNum} is missing Option A.`);

    const optionB = String(row['Option B'] || '').trim();
    if (!optionB) throw new Error(`Question ${rowNum} is missing Option B.`);

    const optionC = String(row['Option C'] || '').trim();
    if (!optionC) throw new Error(`Question ${rowNum} is missing Option C.`);

    const optionD = String(row['Option D'] || '').trim();
    if (!optionD) throw new Error(`Question ${rowNum} is missing Option D.`);

    const answer = String(row['Answer'] || '').trim().toUpperCase();
    if (!validAnswers.includes(answer)) {
      throw new Error(`Question ${rowNum} has an invalid answer. Answer must be A, B, C, or D.`);
    }

    parsedQuestions.push({
      id: Date.now() + i, // unique ID
      question: questionText,
      options: {
        A: optionA,
        B: optionB,
        C: optionC,
        D: optionD
      },
      answer: answer
    });
  }

  return parsedQuestions;
};
