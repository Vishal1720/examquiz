import { useState } from 'react';
import { Copy, Check, FileText } from 'lucide-react';

export const JnanaSudhaEndpoint = ({ onContinue, onBack }) => {
  const [copied, setCopied] = useState(false);

  const promptText = `I have uploaded a Word (.docx) question paper.

Convert this Word document into an Excel (.xlsx) file using the exact format below:

| Question | Option A | Option B | Option C | Option D | Answer |

SOURCE WORD DOCUMENT STRUCTURE

The Word document has a fixed table structure:

QUESTIONS | AK

The QUESTIONS column contains BOTH:

The complete question
Four options: a, b, c, d

The AK column contains the correct answer as a number.

For example, the Word document may contain:

QUESTIONS

The distance between the foci of a hyperbola is 20 and its eccentricity is 5/4. Its equation is

a. [formula]
b. [formula]
c. [formula]
d. None of these

AK

1

Convert it to:

Question:
The distance between the foci of a hyperbola is 20 and its eccentricity is 5/4. Its equation is

Option A:
[formula]

Option B:
[formula]

Option C:
[formula]

Option D:
None of these

Answer:
A

IMPORTANT: DO NOT PUT OPTIONS IN THE QUESTION COLUMN

The QUESTIONS cell contains the question AND options, but in the Excel output they MUST be separated.

The final Excel columns MUST be:

A = Question
B = Option A
C = Option B
D = Option C
E = Option D
F = Answer

The Question column must contain ONLY the question text.

The four options must be placed separately in Option A, Option B, Option C and Option D.

WORD EQUATIONS / FORMULAS

This is extremely important.

The options and questions may contain mathematical formulas created using the Microsoft Word Equation Editor.

These formulas may be stored as:

Word Equation objects
OMML
m:oMath
m:oMathPara
fractions
superscripts
subscripts
roots
Greek symbols
mathematical operators

Normal DOCX text extraction may NOT return these formulas correctly.

Therefore, inspect the underlying Word document structure/XML when necessary and recover the actual mathematical expressions.

DO NOT assume that an empty extracted value means the formula is missing.

For example, if Word visually contains:

x²/64 − y²/36 = 1

the Excel cell must contain:

x²/64 − y²/36 = 1

Do not leave the cell blank.

Preserve mathematical meaning and notation as accurately as possible.

Use readable notation such as:

x²
y²
√x
a² + b² = c²
5/4
sin θ
cos θ

OPTION SEPARATION

Inside the QUESTIONS column, identify:

a.
b.
c.
d.

as the four option boundaries.

Everything before a. belongs to the Question.

Everything between a. and b. belongs to Option A.

Everything between b. and c. belongs to Option B.

Everything between c. and d. belongs to Option C.

Everything after d. belongs to Option D.

For example:

The equation of the hyperbola is

a. x²/64 − y²/36 = 1
b. x²/16 − y²/9 = 1
c. x²/36 − y²/64 = 1
d. None of these

must become:

Question	Option A	Option B	Option C	Option D
The equation of the hyperbola is	x²/64 − y²/36 = 1	x²/16 − y²/9 = 1	x²/36 − y²/64 = 1	None of these

ANSWER COLUMN

The AK column contains numeric answer values.

Convert them using this exact mapping:

1 → A
2 → B
3 → C
4 → D

Do NOT calculate or solve the questions to determine the answer.

The value in the AK column is the authoritative answer key.

For example:

AK = 1 → Answer = A
AK = 2 → Answer = B
AK = 3 → Answer = C
AK = 4 → Answer = D

MULTI-LINE QUESTIONS

Questions may span multiple lines in the Word document.

Combine the lines into one Question cell while preserving the original wording.

For example:

An arc is in the form of a semi-ellipse. It is
8m wide and 2m high at the centre. Find
the height of the arc at a point 1.5m from
one end

should become one Question cell containing the complete question.

Do not accidentally treat wrapped lines as separate questions.

PRESERVE THE ORIGINAL CONTENT

Do NOT:

rewrite questions
simplify questions
solve questions
change the wording
remove mathematical expressions
remove units
change numerical values
change option wording
invent missing options
invent formulas

The purpose is format conversion, not question editing.

PROCESS THE ENTIRE DOCUMENT

Process every question in the uploaded Word document.

Do not process only the first page.

Do not stop after a particular number of questions.

Determine the total number of questions from the document and export all of them.

VALIDATION BEFORE CREATING THE EXCEL

Before generating the final Excel file, verify:

Every question was extracted.
Every question has four options.
Question text does not contain the options.
Word Equation/OMML formulas have been extracted.
Every question has an AK value.
Every AK value is correctly converted using:
1=A, 2=B, 3=C, 4=D
The number of Excel question rows matches the number of questions in the Word document.
No mathematical formula was silently dropped.
Question numbering is preserved.

EXCEL FORMAT

Create a clean .xlsx file with exactly these columns:

Question | Option A | Option B | Option C | Option D | Answer

Use:

Bold header row
Wrapped text
Top vertical alignment
Appropriate column widths
Freeze the first row
Autofilter
One question per row

Do not add unnecessary sheets.

FINAL RESPONSE

After creating the Excel file, provide the download link.

Also report:

Questions found: [number]
Questions exported: [number]
Answer mapping: 1=A, 2=B, 3=C, 4=D
Word equations processed: Yes
Validation: Passed

If any question or formula cannot be extracted correctly, DO NOT silently omit it. Clearly identify the affected question number before producing the final file.`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-sm">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Convert JnanaSudha Word Format
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          We use ChatGPT to convert your Word document into our supported Excel format while preserving all mathematical formulas correctly.
        </p>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-3xl space-y-8">
        
        {/* Step 1: Format Reference */}
        <section>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm flex items-center justify-center">1</span>
            Verify Your Format
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Make sure your document matches the JnanaSudha format below (QUESTIONS and AK columns).
          </p>
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-center p-4">
            <img 
              src="/jnanasudhawordformat.png" 
              alt="JnanaSudha Word Format Example" 
              className="max-w-full h-auto rounded-lg shadow-sm border border-slate-200 dark:border-slate-800"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden text-slate-400 dark:text-slate-500 text-center p-8 flex-col items-center justify-center w-full">
              <FileText className="w-12 h-12 mb-2 opacity-50" />
              <p>Image not found. Ensure <b>jnanasudhawordformat.png</b> is placed in the public folder.</p>
            </div>
          </div>
        </section>

        {/* Step 2: Copy Prompt */}
        <section>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm flex items-center justify-center">2</span>
            Copy the Prompt
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Copy the text below and paste it into ChatGPT, then upload your Word document there. ChatGPT will give you an Excel file.
          </p>
          <div className="relative bg-slate-900 rounded-xl p-4 md:p-6 overflow-hidden border border-slate-800">
            <button 
              onClick={copyPrompt}
              className="absolute top-4 right-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all flex items-center gap-2 text-sm font-semibold border border-white/10"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
            <div className="h-64 overflow-y-auto text-sm text-slate-300 font-mono pr-4 scrollbar-thin">
              <pre className="whitespace-pre-wrap font-sans">{promptText}</pre>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow active:scale-95"
        >
          &larr; Back
        </button>
        <button
          onClick={onContinue}
          className="px-8 py-3 bg-sky-600 dark:bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-700 dark:hover:bg-sky-600 transition-all shadow-md hover:shadow-lg hover:shadow-sky-500/20 dark:hover:shadow-sky-500/10 active:scale-95"
        >
          Continue to Upload
        </button>
      </div>
    </div>
  );
};
