import { useState } from 'react';
import { Copy, Check, FileText } from 'lucide-react';

export const JnanaSudhaEndpoint = ({ onContinue, onBack }) => {
  const [copied, setCopied] = useState(false);

  const promptText = `Convert the uploaded Word (.docx) question paper into an Excel (.xlsx) file with exactly these columns:

| Question | Option A | Option B | Option C | Option D | Answer |

## 1. SOURCE STRUCTURE

The Word document contains a table with:

\`QUESTIONS| AK\`

The \`QUESTIONS\` column contains each complete question followed by four options:

\`a. ...\`
\`b. ...\`
\`c. ...\`
\`d. ...\`

The \`AK\` column contains the correct answer as a number.

Process the **entire document**, including all pages and all questions.

---

## 2. SPLIT QUESTION AND OPTIONS

For every question, identify the option boundaries:

* \`a.\` = start of Option A
* \`b.\` = start of Option B
* \`c.\` = start of Option C
* \`d.\` = start of Option D

Use this exact structure:

* Everything before \`a.\` → **Question**
* Everything between \`a.\` and \`b.\` → **Option A**
* Everything between \`b.\` and \`c.\` → **Option B**
* Everything between \`c.\` and \`d.\` → **Option C**
* Everything after \`d.\` → **Option D**

**Do not put any options inside the Question column.**

Question text may span multiple Word lines. Combine wrapped/multiple lines belonging to the same question into one Question cell without changing the wording.

---

## 3. ANSWER MAPPING

The \`AK\` value is the authoritative answer key.

Use only this mapping:

\`1 → A\`
\`2 → B\`
\`3 → C\`
\`4 → D\`

Do **not** solve or calculate any question.

---

## 4. MATHEMATICAL EQUATIONS — CRITICAL

The Word document may contain Microsoft Word Equation Editor equations stored as **OMML**.

Normal text extraction may lose equation content. Therefore, when equations are present or text extraction appears incomplete, inspect the underlying DOCX XML/OMML.

Check structures such as:

\`m:oMath\`
\`m:oMathPara\`
\`m:r\`
\`m:t\`
\`m:f\`
\`m:sSup\`
\`m:sSub\`
\`m:sSubSup\`
\`m:rad\`
\`m:d\`
\`m:acc\`
\`m:nary\`

Reconstruct the equation based on its actual Word content.

**Never assume that an empty or incomplete extracted value means the Word equation is empty.**

Convert equations into readable Excel text while preserving their mathematical meaning.

Examples:

\`x²/64 − y²/36 = 1\`

\`√x\`

\`5/4\`

\`sin θ\`

\`cos θ\`

\`a² + b² = c²\`

---

## 5. PRESERVE EVERY MATHEMATICAL CHARACTER

Do not silently remove, simplify, normalize, or replace mathematical characters.

Preserve all characters that are visibly part of the original equation, including:

\`{ } [ ] ( )\`

\`+ − - ± × ÷\`

\`= ≠ ≈ ≤ ≥ < >\`

\`/ ^ _\`

\`° ′ ″\`

superscripts and subscripts

Greek letters

\`√ ∞\`

\`∪ ∩\`

absolute-value bars

fractions

roots

brackets

braces

interval notation

set notation

vectors

matrices

mathematical operators

special Unicode mathematical symbols

### Braces and brackets are especially important

If the original Word equation contains:

\`{−∞, 1] ∪ [2, ∞}\`

the Excel cell must preserve:

\`{−∞, 1] ∪ [2, ∞}\`

Do not output an incomplete version such as:

\`−∞, 1] ∪ [2, ∞\`

or:

\`1] ∪ [2\`

Opening and closing \`{ } [ ] ( )\` characters must not be lost.

---

## 6. PRESERVE SUPERSCRIPTS AND SUBSCRIPTS

Preserve mathematical formatting using readable Unicode where possible.

For example:

\`x²\` not \`x2\`

\`y₁\` not \`y1\`

\`aₙ\` not \`an\`

\`x² + y² = z²\`

---

## 7. DO NOT MODIFY CONTENT

This is a **format-conversion task only**.

Do not:

* rewrite questions
* correct grammar
* solve questions
* simplify formulas
* change numerical values
* change units
* change option wording
* invent missing content
* invent formulas
* remove mathematical symbols
* remove brackets or braces
* remove question numbering

Preserve the original content as accurately as possible.

---

## 8. VALIDATION

Before creating the Excel file, verify:

1. Every question in the Word document was processed.
2. Every question has exactly four options.
3. No option remains in the Question column.
4. Every question has an AK value.
5. Every AK value is converted using \`1=A, 2=B, 3=C, 4=D\`.
6. Mathematical equations were checked for missing content.
7. Braces \`{}\`, brackets \`[]\`, parentheses \`()\`, superscripts, subscripts, symbols, and other mathematical characters were preserved.
8. The number of exported rows matches the number of questions found.

If any question or mathematical expression cannot be extracted reliably, **do not silently omit it**. Identify the affected question number and explain what could not be recovered.

## 9. OUTPUT

Create the \`.xlsx\` file with exactly these six columns:

\`Question | Option A | Option B | Option C | Option D | Answer\`

One question per row.

Do not add extra sheets, extra columns, explanations, styling requirements, formatting requirements, or unrelated information.

Final response should only report:

* Questions found
* Questions exported
* Answer mapping: \`1=A, 2=B, 3=C, 4=D\`
* Word equations processed
* Validation status
* Download link`;

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
