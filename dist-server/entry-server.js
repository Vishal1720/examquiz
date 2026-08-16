import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { ArrowLeft, BookOpen, CheckSquare, Code2, Download, Edit2, ExternalLink, Eye, FileSpreadsheet, FileText, Github, Keyboard, Linkedin, List, MonitorPlay, Plus, Settings, Trash2, Upload, UploadCloud, X } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
//#region src/components/Header.jsx
var Header = ({ onReset }) => {
	return /* @__PURE__ */ jsx("header", {
		className: "glass sticky top-0 z-50",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4 h-20 flex items-center justify-between",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3 text-sky-600 group cursor-default",
				children: [/* @__PURE__ */ jsx("div", {
					className: "p-2.5 bg-sky-50 rounded-xl group-hover:bg-sky-100 transition-colors",
					children: /* @__PURE__ */ jsx(BookOpen, { className: "w-6 h-6 text-sky-600" })
				}), /* @__PURE__ */ jsxs("h1", {
					className: "text-2xl font-extrabold text-slate-800 tracking-tight",
					children: ["Paper", /* @__PURE__ */ jsx("span", {
						className: "bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-amber-500",
						children: "QuizMaker"
					})]
				})]
			}), onReset && /* @__PURE__ */ jsx("button", {
				onClick: onReset,
				className: "text-sm font-semibold text-slate-500 hover:text-sky-600 px-4 py-2 rounded-lg hover:bg-sky-50 transition-all active:scale-95",
				"aria-label": "Start a new quiz",
				children: "Start New Quiz"
			})]
		})
	});
};
//#endregion
//#region src/components/StepIndicator.jsx
var StepIndicator = ({ currentStep, onStepClick, highestAccessibleStep = 5, isMobile = false }) => {
	const steps = [
		{
			id: 1,
			name: "Add Questions",
			icon: Upload
		},
		{
			id: 2,
			name: "Questions",
			icon: List
		},
		{
			id: 3,
			name: "Settings",
			icon: Settings
		},
		{
			id: 4,
			name: "Preview",
			icon: Eye
		},
		{
			id: 5,
			name: "Download",
			icon: Download
		}
	];
	return /* @__PURE__ */ jsx("div", {
		className: `${isMobile ? "py-2 pb-6" : "py-8"} overflow-x-auto relative z-10 scrollbar-hide`,
		children: /* @__PURE__ */ jsxs("div", {
			className: `flex justify-between items-center relative ${isMobile ? "w-full max-w-md mx-auto px-6" : "min-w-max px-8"}`,
			children: [!isMobile && /* @__PURE__ */ jsx("div", {
				className: "absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-10 rounded-full overflow-hidden",
				children: /* @__PURE__ */ jsx("div", {
					className: "h-full bg-sky-500 transition-all duration-700 ease-out",
					style: { width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }
				})
			}), steps.map((step) => {
				const isActive = currentStep === step.id;
				const isPast = currentStep > step.id;
				const Icon = step.icon;
				const isAccessible = step.id <= highestAccessibleStep;
				return /* @__PURE__ */ jsxs("div", {
					className: `flex flex-col items-center gap-3 relative ${isAccessible ? "cursor-pointer group" : "opacity-70 cursor-not-allowed"}`,
					onClick: () => {
						if (isAccessible && onStepClick) onStepClick(step.id);
					},
					role: isAccessible ? "button" : "presentation",
					tabIndex: isAccessible ? 0 : -1,
					"aria-label": `Go to step ${step.id}: ${step.name}`,
					children: [/* @__PURE__ */ jsx("div", {
						className: `${isMobile ? "w-10 h-10" : "w-12 h-12"} rounded-full flex items-center justify-center transition-all duration-500 shadow-sm
                  ${isActive ? "bg-sky-600 text-white shadow-sky-500/30 shadow-lg scale-110 ring-4 ring-sky-100" : isPast ? "bg-sky-100 text-sky-600 group-hover:bg-sky-200" : "bg-white text-slate-400 border-2 border-slate-200 group-hover:border-sky-300 group-hover:text-sky-500"}`,
						children: /* @__PURE__ */ jsx(Icon, { className: `${isMobile ? "w-4 h-4" : "w-5 h-5"} ${isActive ? "animate-pulse" : ""}` })
					}), /* @__PURE__ */ jsx("span", {
						className: `${isMobile ? "text-[10px] -bottom-4" : "text-sm -bottom-7"} font-semibold transition-colors duration-300 absolute whitespace-nowrap ${isActive ? "text-sky-600" : isPast ? "text-slate-700" : "text-slate-400 group-hover:text-slate-600"}`,
						children: step.name
					})]
				}, step.id);
			})]
		})
	});
};
//#endregion
//#region src/components/MethodSelector.jsx
var MethodSelector = ({ onSelect }) => {
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-4xl mx-auto pt-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "text-center mb-8 animate-fade-in-up",
			children: [/* @__PURE__ */ jsxs("h2", {
				className: "text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight leading-tight",
				children: ["How would you like to ", /* @__PURE__ */ jsx("span", {
					className: "bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-amber-500",
					children: "add questions?"
				})]
			}), /* @__PURE__ */ jsx("p", {
				className: "text-lg text-slate-600 max-w-2xl mx-auto",
				children: "Choose the method that works best for you."
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 md:grid-cols-2 gap-6 px-4",
			children: [/* @__PURE__ */ jsxs("button", {
				onClick: () => onSelect("excel"),
				className: "group relative p-6 glass-card rounded-3xl text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-500/20 border-2 border-transparent hover:border-sky-400 overflow-hidden",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }),
					/* @__PURE__ */ jsx("div", {
						className: "w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm",
						children: /* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-7 h-7" })
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "text-xl font-bold text-slate-800 mb-2 group-hover:text-sky-700 transition-colors",
						children: "Upload Excel File"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-slate-600 leading-relaxed mb-4",
						children: "Already have your questions in an Excel sheet? Upload it and we'll instantly convert it into a beautiful PDF."
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2 text-sm font-semibold text-sky-600",
						children: ["Upload file", /* @__PURE__ */ jsx("span", {
							className: "group-hover:translate-x-1 transition-transform",
							children: "→"
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("button", {
				onClick: () => onSelect("manual"),
				className: "group relative p-6 glass-card rounded-3xl text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/20 border-2 border-transparent hover:border-amber-400 overflow-hidden",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" }),
					/* @__PURE__ */ jsx("div", {
						className: "w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm",
						children: /* @__PURE__ */ jsx(Keyboard, { className: "w-7 h-7" })
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-700 transition-colors",
						children: "Write Manually"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-slate-600 leading-relaxed mb-4",
						children: "Don't have a file ready? Write or paste your questions directly into our easy-to-use editor."
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2 text-sm font-semibold text-amber-600",
						children: ["Start typing", /* @__PURE__ */ jsx("span", {
							className: "group-hover:translate-x-1 transition-transform",
							children: "→"
						})]
					})
				]
			})]
		})]
	});
};
//#endregion
//#region src/utils/sampleExcel.js
var sampleQuestions = [
	{
		question: "What is 25% of 240?",
		options: {
			A: "40",
			B: "50",
			C: "60",
			D: "80"
		},
		answer: "C"
	},
	{
		question: "If x + 7 = 15, what is the value of x?",
		options: {
			A: "6",
			B: "7",
			C: "8",
			D: "9"
		},
		answer: "C"
	},
	{
		question: "What is the area of a rectangle whose length is 12 cm and breadth is 5 cm?",
		options: {
			A: "17 cm²",
			B: "34 cm²",
			C: "60 cm²",
			D: "120 cm²"
		},
		answer: "C"
	},
	{
		question: "A number is increased from 80 to 100. What is the percentage increase?",
		options: {
			A: "20%",
			B: "25%",
			C: "30%",
			D: "40%"
		},
		answer: "B"
	},
	{
		question: "What is the average of 10, 20, 30, 40 and 50?",
		options: {
			A: "25",
			B: "30",
			C: "35",
			D: "40"
		},
		answer: "B"
	},
	{
		question: "What is the probability of getting a head when a fair coin is tossed once?",
		options: {
			A: "0",
			B: "1/4",
			C: "1/2",
			D: "1"
		},
		answer: "C"
	},
	{
		question: "If 3x = 24, what is the value of x?",
		options: {
			A: "6",
			B: "7",
			C: "8",
			D: "9"
		},
		answer: "C"
	},
	{
		question: "What is the simple interest on ₹5,000 at 10% per annum for 2 years?",
		options: {
			A: "₹500",
			B: "₹750",
			C: "₹1,000",
			D: "₹1,500"
		},
		answer: "C"
	},
	{
		question: "The ratio of boys to girls is 3:2. If there are 30 boys, how many girls are there?",
		options: {
			A: "15",
			B: "20",
			C: "25",
			D: "30"
		},
		answer: "B"
	},
	{
		question: "A car travels at 60 km/h. How far will it travel in 3 hours?",
		options: {
			A: "120 km",
			B: "150 km",
			C: "180 km",
			D: "200 km"
		},
		answer: "C"
	},
	{
		question: "What is 3/4 + 1/8?",
		options: {
			A: "5/8",
			B: "7/8",
			C: "1",
			D: "9/8"
		},
		answer: "B"
	},
	{
		question: "What is the HCF of 24 and 36?",
		options: {
			A: "6",
			B: "8",
			C: "12",
			D: "18"
		},
		answer: "C"
	},
	{
		question: "What is the square root of 144?",
		options: {
			A: "10",
			B: "11",
			C: "12",
			D: "14"
		},
		answer: "C"
	},
	{
		question: "If the perimeter of a square is 40 cm, what is the length of each side?",
		options: {
			A: "5 cm",
			B: "8 cm",
			C: "10 cm",
			D: "12 cm"
		},
		answer: "C"
	},
	{
		question: "A shopkeeper buys an item for ₹800 and sells it for ₹1,000. What is the profit percentage?",
		options: {
			A: "20%",
			B: "25%",
			C: "30%",
			D: "40%"
		},
		answer: "B"
	},
	{
		question: "Solve: 2x + 5 = 17.",
		options: {
			A: "5",
			B: "6",
			C: "7",
			D: "8"
		},
		answer: "B"
	},
	{
		question: "What is the circumference of a circle with radius 7 cm? Use π = 22/7.",
		options: {
			A: "22 cm",
			B: "44 cm",
			C: "49 cm",
			D: "154 cm"
		},
		answer: "B"
	},
	{
		question: "If 5 workers can complete a task in 12 days, how many days would 10 workers take to complete the same task, assuming they work at the same rate?",
		options: {
			A: "4 days",
			B: "5 days",
			C: "6 days",
			D: "8 days"
		},
		answer: "C"
	},
	{
		question: "What is the median of the numbers 5, 8, 12, 15 and 20?",
		options: {
			A: "8",
			B: "10",
			C: "12",
			D: "15"
		},
		answer: "C"
	},
	{
		question: "A train travels 240 km in 4 hours. What is its average speed?",
		options: {
			A: "40 km/h",
			B: "50 km/h",
			C: "60 km/h",
			D: "80 km/h"
		},
		answer: "C"
	}
];
//#endregion
//#region src/utils/excel.js
var downloadSampleExcel = () => {
	const data = sampleQuestions.map((q) => ({
		Question: q.question,
		"Option A": q.options.A,
		"Option B": q.options.B,
		"Option C": q.options.C,
		"Option D": q.options.D,
		Answer: q.answer
	}));
	const worksheet = XLSX.utils.json_to_sheet(data);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Maths Questions");
	XLSX.writeFile(workbook, "maths_quiz_questions_template.xlsx");
};
var parseExcelFile = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, { type: "array" });
				const firstSheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[firstSheetName];
				resolve(XLSX.utils.sheet_to_json(worksheet, { defval: "" }));
			} catch (error) {
				reject(/* @__PURE__ */ new Error("Failed to parse Excel file. It might be corrupted."));
			}
		};
		reader.onerror = () => {
			reject(/* @__PURE__ */ new Error("Failed to read the file."));
		};
		reader.readAsArrayBuffer(file);
	});
};
//#endregion
//#region src/utils/questionValidation.js
var validateQuestionsData = (data) => {
	if (!data || data.length === 0) throw new Error("No questions found in the uploaded Excel file.");
	const requiredColumns = [
		"Question",
		"Option A",
		"Option B",
		"Option C",
		"Option D",
		"Answer"
	];
	const firstRow = data[0];
	if (requiredColumns.filter((col) => !(col in firstRow)).length > 0) throw new Error("Invalid Excel format. Please use the provided template.");
	const validAnswers = [
		"A",
		"B",
		"C",
		"D"
	];
	const parsedQuestions = [];
	for (let i = 0; i < data.length; i++) {
		const row = data[i];
		const rowNum = i + 1;
		const questionText = String(row["Question"] || "").trim();
		if (!questionText) throw new Error(`Question ${rowNum} is empty.`);
		const optionA = String(row["Option A"] || "").trim();
		if (!optionA) throw new Error(`Question ${rowNum} is missing Option A.`);
		const optionB = String(row["Option B"] || "").trim();
		if (!optionB) throw new Error(`Question ${rowNum} is missing Option B.`);
		const optionC = String(row["Option C"] || "").trim();
		if (!optionC) throw new Error(`Question ${rowNum} is missing Option C.`);
		const optionD = String(row["Option D"] || "").trim();
		if (!optionD) throw new Error(`Question ${rowNum} is missing Option D.`);
		const answer = String(row["Answer"] || "").trim().toUpperCase();
		if (!validAnswers.includes(answer)) throw new Error(`Question ${rowNum} has an invalid answer. Answer must be A, B, C, or D.`);
		parsedQuestions.push({
			id: Date.now() + i,
			question: questionText,
			options: {
				A: optionA,
				B: optionB,
				C: optionC,
				D: optionD
			},
			answer
		});
	}
	return parsedQuestions;
};
//#endregion
//#region src/components/ExcelUploader.jsx
var ExcelUploader = ({ onUploadSuccess }) => {
	const [isDragging, setIsDragging] = useState(false);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const handleDragOver = (e) => {
		e.preventDefault();
		setIsDragging(true);
	};
	const handleDragLeave = (e) => {
		e.preventDefault();
		setIsDragging(false);
	};
	const processFile = async (file) => {
		if (!file) return;
		setError(null);
		if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
			setError("Please upload a valid Excel file (.xlsx or .xls)");
			return;
		}
		setIsLoading(true);
		try {
			onUploadSuccess(validateQuestionsData(await parseExcelFile(file)), file.name);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};
	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		processFile(file);
	};
	const handleFileInput = (e) => {
		const file = e.target.files[0];
		processFile(file);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-4xl mx-auto space-y-10 text-center pt-8",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "animate-fade-in-up",
				children: [
					/* @__PURE__ */ jsxs("h2", {
						className: "text-4xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight",
						children: [
							"Turn your ",
							/* @__PURE__ */ jsx("span", {
								className: "text-gradient",
								children: "Excel data"
							}),
							" into a professional question paper."
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-slate-500 mb-8 text-lg",
						children: "Start by downloading our sample template, fill it with your questions, and upload it back here."
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: downloadSampleExcel,
						className: "inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition-all shadow-sm hover:shadow-md active:scale-95 group",
						children: [/* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-5 h-5 text-slate-400 group-hover:text-sky-500 transition-colors" }), "Download Sample Template"]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative group",
				children: [/* @__PURE__ */ jsx("div", { className: `absolute -inset-1 bg-gradient-to-r from-sky-400 to-amber-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isDragging ? "opacity-75 duration-200" : ""}` }), /* @__PURE__ */ jsxs("div", {
					onDragOver: handleDragOver,
					onDragLeave: handleDragLeave,
					onDrop: handleDrop,
					className: `relative border-2 border-dashed rounded-[2rem] p-8 md:p-16 transition-all duration-300 backdrop-blur-xl ${isDragging ? "border-sky-500 bg-sky-50/90 shadow-2xl shadow-sky-500/20 scale-[1.02]" : "border-slate-300 bg-white/80 hover:border-sky-400 hover:bg-slate-50/90"}`,
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "relative",
							children: /* @__PURE__ */ jsx(UploadCloud, { className: `w-16 h-16 mx-auto mb-6 transition-all duration-500 ${isDragging ? "text-sky-500 scale-110 animate-float" : "text-slate-300 group-hover:text-sky-400"}` })
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xl font-bold text-slate-800 mb-2",
							children: "Drag & Drop your Excel file"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-slate-500 mb-8 font-medium",
							children: "or click to browse from your computer"
						}),
						/* @__PURE__ */ jsxs("label", {
							htmlFor: "excel-upload",
							className: "inline-block cursor-pointer",
							children: [/* @__PURE__ */ jsx("input", {
								id: "excel-upload",
								type: "file",
								className: "hidden",
								accept: ".xlsx, .xls",
								onChange: handleFileInput
							}), /* @__PURE__ */ jsx("span", {
								className: "inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 rounded-xl text-sm font-semibold text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 active:translate-y-0",
								children: isLoading ? "Processing..." : "Select File"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-slate-400 mt-6 font-medium tracking-wide uppercase",
							children: "Supports .xlsx and .xls"
						})
					]
				})]
			}),
			error && /* @__PURE__ */ jsx("div", {
				className: "p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium shadow-sm animate-fade-in-up",
				children: error
			})
		]
	});
};
//#endregion
//#region src/components/QuestionCard.jsx
var QuestionCard = ({ question, index, onEdit, onDelete }) => {
	return /* @__PURE__ */ jsx("div", {
		className: "bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col sm:flex-row justify-between items-start gap-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ jsxs("h3", {
						className: "text-lg font-medium text-gray-900 mb-4 whitespace-pre-wrap",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-gray-500 mr-2",
							children: [
								"Question ",
								index + 1,
								"."
							]
						}), question.question]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-3 mb-4",
						children: [
							"A",
							"B",
							"C",
							"D"
						].map((opt) => /* @__PURE__ */ jsxs("div", {
							className: `p-3 rounded-lg border text-sm ${question.answer === opt ? "border-green-200 bg-green-50 text-green-900" : "border-gray-100 bg-gray-50 text-gray-700"}`,
							children: [/* @__PURE__ */ jsxs("span", {
								className: "font-semibold mr-2",
								children: [opt, "."]
							}), /* @__PURE__ */ jsx("span", {
								className: "whitespace-pre-wrap",
								children: question.options[opt]
							})]
						}, opt))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "text-sm font-medium text-gray-600",
						children: ["Correct Answer: ", /* @__PURE__ */ jsx("span", {
							className: "text-green-600 font-bold ml-1",
							children: question.answer
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-row sm:flex-col gap-2 w-full sm:w-auto justify-end sm:justify-start mt-4 sm:mt-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100",
				children: [/* @__PURE__ */ jsx("button", {
					onClick: onEdit,
					className: "p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors",
					title: "Edit Question",
					"aria-label": `Edit Question ${index + 1}`,
					children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
				}), /* @__PURE__ */ jsx("button", {
					onClick: onDelete,
					className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors",
					title: "Delete Question",
					"aria-label": `Delete Question ${index + 1}`,
					children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
				})]
			})]
		})
	});
};
//#endregion
//#region src/components/QuestionEditor.jsx
var QuestionEditor = ({ initialData, onSave, onCancel }) => {
	const [formData, setFormData] = useState(initialData || {
		id: Date.now(),
		question: "",
		options: {
			A: "",
			B: "",
			C: "",
			D: ""
		},
		answer: "A"
	});
	const handleChange = (field, value) => {
		if ([
			"A",
			"B",
			"C",
			"D"
		].includes(field)) setFormData({
			...formData,
			options: {
				...formData.options,
				[field]: value
			}
		});
		else setFormData({
			...formData,
			[field]: value
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.question.trim() || !formData.options.A.trim() || !formData.options.B.trim() || !formData.options.C.trim() || !formData.options.D.trim()) {
			alert("Please fill in all fields before saving.");
			return;
		}
		onSave(formData);
	};
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: handleSubmit,
		className: "space-y-4",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
				className: "block text-sm font-medium text-gray-700 mb-1",
				children: "Question"
			}), /* @__PURE__ */ jsx("textarea", {
				required: true,
				rows: 3,
				value: formData.question,
				onChange: (e) => handleChange("question", e.target.value),
				className: "w-full rounded-lg border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all",
				placeholder: "Enter question text here..."
			})] }),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4",
				children: [
					"A",
					"B",
					"C",
					"D"
				].map((opt) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
					className: "block text-sm font-medium text-gray-700 mb-1",
					children: ["Option ", opt]
				}), /* @__PURE__ */ jsx("input", {
					type: "text",
					required: true,
					value: formData.options[opt],
					onChange: (e) => handleChange(opt, e.target.value),
					className: "w-full rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all",
					placeholder: `Enter option ${opt}`
				})] }, opt))
			}),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
				className: "block text-sm font-medium text-gray-700 mb-1",
				children: "Correct Answer"
			}), /* @__PURE__ */ jsx("select", {
				value: formData.answer,
				onChange: (e) => handleChange("answer", e.target.value),
				className: "w-full md:w-48 rounded-lg border-gray-300 border p-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all bg-white",
				children: [
					"A",
					"B",
					"C",
					"D"
				].map((opt) => /* @__PURE__ */ jsxs("option", {
					value: opt,
					children: ["Option ", opt]
				}, opt))
			})] }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-3 justify-end pt-4 border-t border-gray-100",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: onCancel,
					className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors",
					children: "Cancel"
				}), /* @__PURE__ */ jsx("button", {
					type: "submit",
					className: "px-4 py-2 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-lg hover:bg-sky-700 transition-colors shadow-sm",
					children: initialData ? "Save Changes" : "Add Question"
				})]
			})
		]
	});
};
//#endregion
//#region src/components/QuestionList.jsx
var QuestionList = ({ questions, setQuestions, onNext, onBack }) => {
	const [editingId, setEditingId] = useState(null);
	const [isAdding, setIsAdding] = useState(false);
	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this question?")) setQuestions(questions.filter((q) => q.id !== id));
	};
	const handleSave = (updatedQuestion) => {
		setQuestions(questions.map((q) => q.id === updatedQuestion.id ? updatedQuestion : q));
		setEditingId(null);
	};
	const handleAdd = (newQuestion) => {
		setQuestions([...questions, newQuestion]);
		setIsAdding(false);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6",
				children: [/* @__PURE__ */ jsxs("h2", {
					className: "text-3xl font-extrabold text-slate-900 tracking-tight",
					children: ["Questions ", /* @__PURE__ */ jsx("span", {
						className: "text-sky-600 bg-sky-50 px-3 py-1 rounded-full text-lg ml-2",
						children: questions.length
					})]
				}), /* @__PURE__ */ jsxs("button", {
					onClick: () => setIsAdding(true),
					className: "inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all shadow-sm active:scale-95",
					children: [/* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }), "Add Question"]
				})]
			}),
			isAdding && /* @__PURE__ */ jsxs("div", {
				className: "bg-white p-6 rounded-2xl border border-slate-200 shadow-md shadow-sky-500/5 mb-6 animate-fade-in-up",
				children: [/* @__PURE__ */ jsxs("h3", {
					className: "text-lg font-bold text-slate-800 mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ jsx("div", { className: "w-2 h-6 bg-sky-500 rounded-full" }), "Add New Question"]
				}), /* @__PURE__ */ jsx(QuestionEditor, {
					onSave: handleAdd,
					onCancel: () => setIsAdding(false)
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "space-y-4",
				children: questions.map((q, index) => /* @__PURE__ */ jsx("div", {
					className: "transition-all duration-300",
					children: editingId === q.id ? /* @__PURE__ */ jsx("div", {
						className: "bg-white p-6 rounded-2xl border border-sky-200 shadow-md shadow-sky-500/10 ring-2 ring-sky-500/20",
						children: /* @__PURE__ */ jsx(QuestionEditor, {
							initialData: q,
							onSave: handleSave,
							onCancel: () => setEditingId(null)
						})
					}) : /* @__PURE__ */ jsx(QuestionCard, {
						question: q,
						index,
						onEdit: () => setEditingId(q.id),
						onDelete: () => handleDelete(q.id)
					})
				}, q.id))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-end gap-3 pt-8 border-t border-slate-200/60 mt-8",
				children: [/* @__PURE__ */ jsx("button", {
					onClick: onBack,
					className: "px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all shadow-sm hover:shadow active:scale-95",
					children: "Back"
				}), /* @__PURE__ */ jsx("button", {
					onClick: onNext,
					disabled: questions.length === 0,
					className: "px-8 py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700 transition-all shadow-md hover:shadow-lg hover:shadow-sky-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100",
					children: "Continue to Settings"
				})]
			})
		]
	});
};
//#endregion
//#region src/components/PaperSettings.jsx
var PaperSettings = ({ settings, setSettings, onNext, onBack }) => {
	const handleChange = (field, value) => {
		setSettings((prev) => ({
			...prev,
			[field]: value
		}));
	};
	const handleLogoUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				handleChange("logo", reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	const removeLogo = () => {
		handleChange("logo", "");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-5xl mx-auto",
		children: [
			/* @__PURE__ */ jsxs("h2", {
				className: "text-3xl font-extrabold text-slate-900 mb-8 tracking-tight flex items-center gap-3",
				children: [/* @__PURE__ */ jsx("span", {
					className: "w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center",
					children: /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-sky-500" })
				}), "Paper Settings"]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "glass-card p-8 sm:p-10 rounded-3xl",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-8",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "md:col-span-2 grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-6",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "logo-upload",
								className: "block text-sm font-semibold text-slate-700 mb-2",
								children: "College Logo"
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative group rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors w-full aspect-square flex flex-col items-center justify-center overflow-hidden",
								children: [settings.logo ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("img", {
									src: settings.logo,
									alt: "Logo",
									className: "w-full h-full object-contain p-2"
								}), /* @__PURE__ */ jsx("button", {
									onClick: removeLogo,
									className: "absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
									"aria-label": "Remove Logo",
									children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" })
								})] }) : /* @__PURE__ */ jsxs("div", {
									className: "text-center p-2 text-slate-400",
									children: [/* @__PURE__ */ jsx(Upload, { className: "w-6 h-6 mx-auto mb-1" }), /* @__PURE__ */ jsxs("span", {
										className: "text-xs text-center block leading-tight mt-1",
										children: [
											"Upload",
											/* @__PURE__ */ jsx("br", {}),
											"Logo"
										]
									})]
								}), /* @__PURE__ */ jsx("input", {
									id: "logo-upload",
									type: "file",
									accept: "image/*",
									onChange: handleLogoUpload,
									className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
									title: "Upload Logo"
								})]
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ jsx("label", {
									htmlFor: "institutionName",
									className: "block text-sm font-semibold text-slate-700 mb-2",
									children: "Institution Name"
								}), /* @__PURE__ */ jsx("input", {
									id: "institutionName",
									type: "text",
									value: settings.institutionName || "",
									onChange: (e) => handleChange("institutionName", e.target.value),
									placeholder: "e.g. Poornaprajna Institute of Management",
									className: "w-full rounded-xl border-slate-200 border bg-white/50 p-3 text-slate-800 focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-slate-400"
								})]
							})]
						}),
						[
							{
								id: "institutionName",
								label: "Institution Name",
								placeholder: "e.g. Poornaprajna Institute of Management"
							},
							{
								id: "subject",
								label: "Subject",
								placeholder: "e.g. Mathematics"
							},
							{
								id: "examTitle",
								label: "Exam / Quiz Title",
								placeholder: "e.g. Mathematics Internal Assessment"
							},
							{
								id: "date",
								label: "Date",
								type: "date"
							},
							{
								id: "duration",
								label: "Duration",
								placeholder: "e.g. 30 Minutes"
							},
							{
								id: "totalMarks",
								label: "Total Marks",
								type: "number",
								placeholder: "e.g. 20"
							}
						].slice(1).map((f) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							htmlFor: f.id,
							className: "block text-sm font-semibold text-slate-700 mb-2",
							children: f.label
						}), /* @__PURE__ */ jsx("input", {
							id: f.id,
							type: f.type || "text",
							value: settings[f.id] || "",
							onChange: (e) => handleChange(f.id, e.target.value),
							placeholder: f.placeholder,
							className: "w-full rounded-xl border-slate-200 border bg-white/50 p-3 text-slate-800 focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-slate-400"
						})] }, f.id)),
						/* @__PURE__ */ jsxs("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "instructions",
								className: "block text-sm font-semibold text-slate-700 mb-2",
								children: "Instructions"
							}), /* @__PURE__ */ jsx("textarea", {
								id: "instructions",
								rows: 3,
								value: settings.instructions,
								onChange: (e) => handleChange("instructions", e.target.value),
								placeholder: "e.g. Answer all questions. Select the most appropriate answer.",
								className: "w-full rounded-xl border-slate-200 border bg-white/50 p-3 text-slate-800 focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all resize-y placeholder:text-slate-400"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "md:col-span-1",
							children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "template",
								className: "block text-sm font-semibold text-slate-700 mb-2",
								children: "Paper Template"
							}), /* @__PURE__ */ jsxs("select", {
								id: "template",
								value: settings.template || "classic",
								onChange: (e) => handleChange("template", e.target.value),
								className: "w-full rounded-xl border-slate-200 border bg-white/50 p-3 text-slate-800 focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all appearance-none cursor-pointer",
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "classic",
										children: "Classic Academic"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "modern",
										children: "Modern Assessment"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "compact",
										children: "Compact (2-Column)"
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "md:col-span-1",
							children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "optionsLayout",
								className: "block text-sm font-semibold text-slate-700 mb-2",
								children: "Options Layout"
							}), /* @__PURE__ */ jsxs("select", {
								id: "optionsLayout",
								value: settings.optionsLayout || "1-col",
								onChange: (e) => handleChange("optionsLayout", e.target.value),
								className: "w-full rounded-xl border-slate-200 border bg-white/50 p-3 text-slate-800 focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all appearance-none cursor-pointer",
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "1-col",
										children: "1 Column (Stacked)"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "2-col",
										children: "2 Columns (Side-by-side)"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "4-col",
										children: "4 Columns (Inline)"
									})
								]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-end gap-3 pt-8 border-t border-slate-200/60 mt-8",
				children: [/* @__PURE__ */ jsx("button", {
					onClick: onBack,
					className: "px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all shadow-sm hover:shadow active:scale-95",
					children: "Back"
				}), /* @__PURE__ */ jsx("button", {
					onClick: onNext,
					className: "px-8 py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700 transition-all shadow-md hover:shadow-lg hover:shadow-sky-500/20 active:scale-95",
					children: "Preview & Download"
				})]
			})
		]
	});
};
//#endregion
//#region src/components/QuizPreview.jsx
var QuizPreview = ({ questions, settings }) => {
	const isClassic = settings.template === "classic";
	const isCompact = settings.template === "compact";
	return /* @__PURE__ */ jsxs("div", {
		className: `w-full max-w-[794px] mx-auto bg-white shadow-2xl shadow-slate-900/10 border border-slate-200 rounded mb-8 text-black relative ${isClassic ? "font-serif" : "font-sans"} before:absolute before:-inset-1 before:bg-white before:rounded-sm before:-z-10 before:shadow-md before:rotate-[0.5deg] after:absolute after:-inset-1 after:bg-white after:rounded-sm after:-z-20 after:shadow-sm after:-rotate-[0.5deg]`,
		style: {
			minHeight: "1123px",
			padding: "10mm"
		},
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: `mb-6 ${isClassic ? "flex flex-col items-center text-center" : "flex items-center gap-4 text-left border-b-2 border-gray-800 pb-4"}`,
				children: [settings.logo && /* @__PURE__ */ jsx("img", {
					src: settings.logo,
					alt: "College Logo",
					className: `object-contain shrink-0 ${isClassic ? "h-24 mb-4" : "h-20"}`
				}), /* @__PURE__ */ jsxs("div", {
					className: !isClassic ? "flex-1" : "",
					children: [settings.institutionName && /* @__PURE__ */ jsx("h1", {
						className: "text-xl font-bold uppercase mb-2",
						children: settings.institutionName
					}), settings.examTitle && /* @__PURE__ */ jsx("h2", {
						className: "text-lg font-bold uppercase mb-2",
						children: settings.examTitle
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: `flex justify-between items-end mb-4 text-[15px] ${!isClassic && "bg-gray-50 p-4 rounded-sm border border-gray-200"}`,
				children: [/* @__PURE__ */ jsxs("div", { children: [settings.subject && /* @__PURE__ */ jsxs("div", {
					className: "mb-1",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold",
							children: "Subject:"
						}),
						" ",
						settings.subject
					]
				}), settings.duration && /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-semibold",
						children: "Duration:"
					}),
					" ",
					settings.duration
				] })] }), /* @__PURE__ */ jsxs("div", {
					className: "text-right",
					children: [settings.date && /* @__PURE__ */ jsxs("div", {
						className: "mb-1",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-semibold",
								children: "Date:"
							}),
							" ",
							settings.date
						]
					}), settings.totalMarks && /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-semibold",
							children: "Total Marks:"
						}),
						" ",
						settings.totalMarks
					] })]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between items-end mb-4 mt-6 text-[15px]",
				children: [/* @__PURE__ */ jsx("div", { children: "Name: _______________________________________" }), /* @__PURE__ */ jsx("div", { children: "Register No: _________________________________" })]
			}),
			/* @__PURE__ */ jsx("hr", { className: "border-gray-400 mb-4" }),
			settings.instructions && /* @__PURE__ */ jsxs("div", {
				className: "mb-6 text-[15px]",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "font-bold mb-1",
						children: "Instructions:"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "whitespace-pre-wrap",
						children: settings.instructions
					}),
					/* @__PURE__ */ jsx("hr", { className: "border-gray-400 mt-4" })
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: `${isCompact ? "columns-2 gap-8 space-y-0 text-[13px]" : "space-y-6 text-[15px]"}`,
				children: questions.map((q, index) => /* @__PURE__ */ jsxs("div", {
					className: `${isCompact ? "break-inside-avoid mb-6" : ""}`,
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex gap-2 mb-2",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "font-semibold whitespace-nowrap",
							children: [index + 1, "."]
						}), /* @__PURE__ */ jsx("p", {
							className: "whitespace-pre-wrap",
							children: q.question
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: `ml-6 mt-2 ${settings.optionsLayout === "2-col" ? "grid grid-cols-2 gap-2" : settings.optionsLayout === "4-col" ? "grid grid-cols-4 gap-2" : "space-y-2"}`,
						children: [
							"A",
							"B",
							"C",
							"D"
						].map((opt) => /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "font-medium",
								children: [opt, "."]
							}), /* @__PURE__ */ jsx("span", {
								className: "whitespace-pre-wrap",
								children: q.options[opt]
							})]
						}, opt))
					})]
				}, q.id))
			})
		]
	});
};
//#endregion
//#region src/utils/pdf.js
var sanitizeText = (str) => {
	if (str === null || str === void 0) return "";
	return String(str).replace(/₹/g, "Rs. ").replace(/π/g, "pi").replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, "\"").replace(/\u2013|\u2014/g, "-").replace(/\u2026/g, "...").replace(/[^\x00-\xFF]/g, "?");
};
var generateQuestionPaperPDF = (questions, settings) => {
	const doc = new jsPDF("p", "mm", "a4");
	const pageWidth = doc.internal.pageSize.getWidth();
	const pageHeight = doc.internal.pageSize.getHeight();
	const margin = 20;
	const contentWidth = pageWidth - 40;
	let yPos = margin;
	let currentColumn = 0;
	const template = settings.template || "classic";
	const isClassic = template === "classic";
	const isCompact = template === "compact";
	const fontName = isClassic ? "times" : "helvetica";
	const colGap = 10;
	const textColWidth = isCompact ? (contentWidth - colGap) / 2 : contentWidth;
	const getX = () => margin + currentColumn * (textColWidth + colGap);
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
	const addText = (text, fontSize, isBold = false, align = "left", customWidth = null, indent = 0) => {
		doc.setFontSize(fontSize);
		doc.setFont(fontName, isBold ? "bold" : "normal");
		const sanitized = sanitizeText(text);
		const targetWidth = customWidth || textColWidth - indent;
		const lines = doc.splitTextToSize(sanitized, targetWidth);
		const lineHeight = fontSize * .4;
		for (let i = 0; i < lines.length; i++) {
			checkPageBreak(lineHeight);
			const xPos = align === "center" && !isCompact ? (pageWidth - doc.getTextWidth(lines[i])) / 2 : getX() + indent;
			doc.text(lines[i], xPos, yPos);
			yPos += lineHeight;
		}
	};
	if (settings.logo) try {
		const imgProps = doc.getImageProperties(settings.logo);
		const logoHeight = 20;
		const logoWidth = imgProps.width / imgProps.height * logoHeight;
		const xPos = isClassic ? (pageWidth - logoWidth) / 2 : margin;
		doc.addImage(settings.logo, imgProps.fileType, xPos, yPos, logoWidth, logoHeight);
		yPos += 25;
	} catch (e) {
		console.error("Failed to add logo to PDF", e);
	}
	if (settings.institutionName) {
		addText(settings.institutionName.toUpperCase(), 16, true, isClassic ? "center" : "left");
		yPos += 5;
	}
	if (settings.examTitle) {
		addText(settings.examTitle.toUpperCase(), 14, true, isClassic ? "center" : "left");
		yPos += 5;
	}
	const infoFontSize = isCompact ? 9 : 11;
	doc.setFontSize(infoFontSize);
	doc.setFont(fontName, "normal");
	yPos += 5;
	if (isCompact) {
		if (settings.subject) {
			addText(`Subject: ${settings.subject}`, infoFontSize, true);
			yPos += 2;
		}
		if (settings.date) {
			addText(`Date: ${settings.date}`, infoFontSize);
			yPos += 2;
		}
		if (settings.duration) {
			addText(`Duration: ${settings.duration}`, infoFontSize);
			yPos += 2;
		}
		if (settings.totalMarks) {
			addText(`Total Marks: ${settings.totalMarks}`, infoFontSize);
			yPos += 2;
		}
		yPos += 4;
		addText("Name: _______________________", infoFontSize);
		yPos += 2;
		addText("Reg No: _____________________", infoFontSize);
		yPos += 4;
		doc.setLineWidth(.5);
		doc.line(getX(), yPos, getX() + textColWidth, yPos);
		yPos += 6;
	} else {
		if (settings.subject) doc.text(sanitizeText(`Subject: ${settings.subject}`), margin, yPos);
		if (settings.date) doc.text(sanitizeText(`Date: ${settings.date}`), pageWidth - margin - doc.getTextWidth(sanitizeText(`Date: ${settings.date}`)), yPos);
		yPos += 6;
		if (settings.duration) doc.text(sanitizeText(`Duration: ${settings.duration}`), margin, yPos);
		if (settings.totalMarks) doc.text(sanitizeText(`Total Marks: ${settings.totalMarks}`), pageWidth - margin - doc.getTextWidth(sanitizeText(`Total Marks: ${settings.totalMarks}`)), yPos);
		yPos += 10;
		doc.text("Name: _______________________________________", margin, yPos);
		doc.text("Register No: _________________________________", pageWidth - margin - 85, yPos);
		yPos += 10;
		doc.setLineWidth(.5);
		doc.line(margin, yPos, pageWidth - margin, yPos);
		yPos += 8;
	}
	if (settings.instructions) {
		addText("Instructions:", infoFontSize + 1, true);
		yPos += 2;
		addText(settings.instructions, infoFontSize, false);
		yPos += 4;
		doc.line(getX(), yPos, getX() + textColWidth, yPos);
		yPos += 8;
	}
	const qFontSize = isCompact ? 10 : 11;
	const optLayout = settings.optionsLayout || "1-col";
	const actualLayout = isCompact && optLayout === "4-col" ? "2-col" : optLayout;
	const numCols = actualLayout === "4-col" ? 4 : actualLayout === "2-col" ? 2 : 1;
	const optColWidth = (textColWidth - 8) / numCols;
	const optionIndent = 8;
	questions.forEach((q, index) => {
		checkPageBreak(20);
		const questionText = `${index + 1}. ${q.question}`;
		addText(questionText, qFontSize, false);
		yPos += 2;
		let optKeys = [
			"A",
			"B",
			"C",
			"D"
		];
		let currentRowY = yPos;
		let nextRowY = yPos;
		for (let i = 0; i < optKeys.length; i++) {
			const opt = optKeys[i];
			const text = `${opt}. ${q.options[opt]}`;
			const colIndex = i % numCols;
			if (colIndex === 0 && i !== 0) currentRowY = nextRowY;
			doc.setFontSize(qFontSize);
			doc.setFont(fontName, "normal");
			const sanitizedOpt = sanitizeText(text);
			const lines = doc.splitTextToSize(sanitizedOpt, optColWidth - 2);
			getX() + optionIndent + colIndex * optColWidth;
			let tempY = currentRowY;
			for (let l = 0; l < lines.length; l++) {
				checkPageBreak(qFontSize * .4);
				const currentX = getX() + optionIndent + colIndex * optColWidth;
				doc.text(lines[l], currentX, tempY);
				tempY += qFontSize * .4;
			}
			if (tempY > nextRowY) nextRowY = tempY;
		}
		yPos = nextRowY + (isCompact ? 4 : 6);
	});
	const pageCount = doc.internal.getNumberOfPages();
	for (let i = 1; i <= pageCount; i++) {
		doc.setPage(i);
		doc.setFontSize(10);
		doc.setFont(fontName, "normal");
		doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: "center" });
	}
	const filename = settings.subject ? `${sanitizeText(settings.subject).replace(/[^a-z0-9]/gi, "_")}_Question_Paper.pdf` : "Question_Paper.pdf";
	doc.save(filename);
};
var generateAnswerKeyPDF = (questions, settings) => {
	const doc = new jsPDF("p", "mm", "a4");
	const pageWidth = doc.internal.pageSize.getWidth();
	const pageHeight = doc.internal.pageSize.getHeight();
	const margin = 20;
	let yPos = margin;
	const fontName = (settings.template || "classic") === "classic" ? "times" : "helvetica";
	const addText = (text, fontSize, isBold = false, align = "left") => {
		doc.setFontSize(fontSize);
		doc.setFont(fontName, isBold ? "bold" : "normal");
		const sanitized = sanitizeText(text);
		if (align === "center") {
			const textWidth = doc.getTextWidth(sanitized);
			doc.text(sanitized, (pageWidth - textWidth) / 2, yPos);
		} else doc.text(sanitized, margin, yPos);
		yPos += fontSize * .4;
	};
	if (settings.logo) try {
		const imgProps = doc.getImageProperties(settings.logo);
		const logoHeight = 20;
		const logoWidth = imgProps.width / imgProps.height * logoHeight;
		const xPos = (pageWidth - logoWidth) / 2;
		doc.addImage(settings.logo, imgProps.fileType, xPos, yPos, logoWidth, logoHeight);
		yPos += 25;
	} catch (e) {
		console.error("Failed to add logo to Answer Key PDF", e);
	}
	if (settings.institutionName) {
		addText(settings.institutionName.toUpperCase(), 16, true, "center");
		yPos += 5;
	}
	addText("ANSWER KEY", 14, true, "center");
	yPos += 8;
	doc.setFontSize(11);
	doc.setFont(fontName, "normal");
	if (settings.subject) {
		doc.text(sanitizeText(`Subject: ${settings.subject}`), margin, yPos);
		yPos += 6;
	}
	if (settings.examTitle) {
		doc.text(sanitizeText(`Exam: ${settings.examTitle}`), margin, yPos);
		yPos += 8;
	}
	doc.setLineWidth(.5);
	doc.line(margin, yPos, pageWidth - margin, yPos);
	yPos += 8;
	doc.setFont(fontName, "bold");
	doc.text("Q.No.", 30, yPos);
	doc.text("Answer", 60, yPos);
	doc.text("Answer Details", 90, yPos);
	yPos += 6;
	doc.line(margin, yPos, pageWidth - margin, yPos);
	yPos += 8;
	doc.setFont(fontName, "normal");
	questions.forEach((q, index) => {
		if (yPos > pageHeight - margin) {
			doc.addPage();
			yPos = margin;
			doc.setFont(fontName, "bold");
			doc.text("Q.No.", 30, yPos);
			doc.text("Answer", 60, yPos);
			doc.text("Answer Details", 90, yPos);
			yPos += 6;
			doc.line(margin, yPos, pageWidth - margin, yPos);
			yPos += 8;
			doc.setFont(fontName, "normal");
		}
		doc.text(`${index + 1}`, 30, yPos);
		doc.text(sanitizeText(q.answer), 60, yPos);
		let truncated = q.options[q.answer];
		if (truncated.length > 60) truncated = truncated.substring(0, 57) + "...";
		doc.text(sanitizeText(truncated), 90, yPos);
		yPos += 7;
	});
	const pageCount = doc.internal.getNumberOfPages();
	for (let i = 1; i <= pageCount; i++) {
		doc.setPage(i);
		doc.setFontSize(10);
		doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: "center" });
	}
	const filename = settings.subject ? `${sanitizeText(settings.subject).replace(/[^a-z0-9]/gi, "_")}_Answer_Key.pdf` : "Answer_Key.pdf";
	doc.save(filename);
};
//#endregion
//#region src/components/DownloadButtons.jsx
var DownloadButtons = ({ questions, settings }) => {
	const handleDownloadPaper = () => generateQuestionPaperPDF(questions, settings);
	const handleDownloadKey = () => generateAnswerKeyPDF(questions, settings);
	const handleDownloadBoth = () => {
		handleDownloadPaper();
		setTimeout(() => {
			handleDownloadKey();
		}, 500);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col sm:flex-row gap-4 justify-center",
		children: [
			/* @__PURE__ */ jsxs("button", {
				onClick: handleDownloadPaper,
				className: "inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-indigo-500 rounded-xl text-sm font-bold text-indigo-700 hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:translate-y-0",
				children: [/* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }), "Question Paper PDF"]
			}),
			/* @__PURE__ */ jsxs("button", {
				onClick: handleDownloadKey,
				className: "inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-emerald-500 rounded-xl text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:translate-y-0",
				children: [/* @__PURE__ */ jsx(CheckSquare, { className: "w-5 h-5" }), "Answer Key PDF"]
			}),
			/* @__PURE__ */ jsxs("button", {
				onClick: handleDownloadBoth,
				className: "inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-brand-600 to-indigo-600 rounded-xl text-sm font-bold text-white hover:from-brand-500 hover:to-indigo-500 transition-all shadow-md hover:shadow-xl hover:shadow-brand-500/30 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 relative overflow-hidden group",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" }),
					/* @__PURE__ */ jsx(Download, { className: "w-5 h-5 relative z-10" }),
					/* @__PURE__ */ jsx("span", {
						className: "relative z-10",
						children: "Download Both"
					})
				]
			})
		]
	});
};
//#endregion
//#region src/components/AboutPage.jsx
var AboutPage = ({ onBack }) => {
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-4xl mx-auto pt-4 pb-12 animate-fade-in-up",
		children: [/* @__PURE__ */ jsxs("button", {
			onClick: onBack,
			className: "mb-8 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all active:scale-95",
			children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }), " Back to App"]
		}), /* @__PURE__ */ jsxs("div", {
			className: "bg-white rounded-3xl shadow-xl overflow-hidden",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative p-10 bg-slate-900 text-white overflow-hidden",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-sky-500/30 to-amber-500/30 blur-[60px] -translate-y-1/2 translate-x-1/3 rounded-full pointer-events-none" }), /* @__PURE__ */ jsxs("div", {
					className: "relative z-10 flex items-center gap-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-inner",
						children: /* @__PURE__ */ jsx(Code2, { className: "w-10 h-10 text-sky-400" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
						className: "text-4xl md:text-5xl font-extrabold tracking-tight mb-2",
						children: "About VarSync"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xl text-slate-300 font-medium",
						children: "Crafting Digital Experiences"
					})] })]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "p-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "prose prose-slate max-w-none",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-10",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-2xl font-bold text-slate-800 mb-4 mt-0",
								children: "Why we built this"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-lg text-slate-700 leading-relaxed font-medium",
								children: "Teachers spend countless hours of their precious time creating quizzes for students. We built PaperQuizMaker as a simple way to return the favor - giving educators an easy, fast solution to create quizzes so they can focus on what they do best: educating the next generation."
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-xl text-slate-600 leading-relaxed font-medium mb-12",
							children: [
								"PaperQuizMaker is a ",
								/* @__PURE__ */ jsx("strong", {
									className: "text-slate-800",
									children: "free community product"
								}),
								" proudly built by the ",
								/* @__PURE__ */ jsx("strong", {
									className: "text-slate-800",
									children: "VarSync"
								}),
								" team. We believe in building technology that genuinely helps people, saves time, and solves real problems for educators and students."
							]
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-2xl font-bold text-slate-800 mb-6",
							children: "Creator of this product"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col md:flex-row gap-8 items-center md:items-start p-8 bg-sky-50/50 border border-sky-100 rounded-3xl mb-12",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0 bg-white",
								children: /* @__PURE__ */ jsx("img", {
									src: "https://varsync.in/vishal.png",
									alt: "Vishal",
									className: "w-full h-full object-cover"
								})
							}), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 mb-1",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-2xl font-bold text-slate-800 m-0",
										children: "Vishal"
									}), /* @__PURE__ */ jsx("span", {
										className: "px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold rounded-full",
										children: "Creator & Developer"
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-slate-600 mb-4 leading-relaxed",
									children: "Passionate technologist and visionary behind VarSync. Believes in building technology that genuinely helps businesses grow and simplifies everyday problems."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex gap-3",
									children: [
										/* @__PURE__ */ jsx("a", {
											href: "https://www.linkedin.com/in/vishalshetty17/",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "p-2 bg-white text-slate-500 hover:text-[#0a66c2] border border-slate-200 rounded-lg shadow-sm transition-all hover:-translate-y-1",
											children: /* @__PURE__ */ jsx(Linkedin, { className: "w-5 h-5" })
										}),
										/* @__PURE__ */ jsx("a", {
											href: "https://github.com/Vishal1720",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "p-2 bg-white text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg shadow-sm transition-all hover:-translate-y-1",
											children: /* @__PURE__ */ jsx(Github, { className: "w-5 h-5" })
										}),
										/* @__PURE__ */ jsx("a", {
											href: "https://vishal.varsync.in",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "p-2 bg-white text-slate-500 hover:text-sky-600 border border-slate-200 rounded-lg shadow-sm transition-all hover:-translate-y-1",
											children: /* @__PURE__ */ jsx(MonitorPlay, { className: "w-5 h-5" })
										})
									]
								})
							] })]
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-2xl font-bold text-slate-800 mb-6",
							children: "Other Products by VarSync"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12",
							children: [/* @__PURE__ */ jsxs("a", {
								href: "https://splitmalple.vercel.app/",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "p-6 border-2 border-slate-100 rounded-2xl hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10 transition-all group bg-white",
								children: [/* @__PURE__ */ jsxs("h3", {
									className: "text-xl font-bold text-slate-800 group-hover:text-emerald-600 flex items-center justify-between mb-2",
									children: ["SplitMalple", /* @__PURE__ */ jsx(ExternalLink, { className: "w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" })]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-slate-500 leading-relaxed",
									children: "The fair way to pay. Split bills exactly based on what you consumed."
								})]
							}), /* @__PURE__ */ jsxs("a", {
								href: "https://menumalple.vercel.app/",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "p-6 border-2 border-slate-100 rounded-2xl hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/10 transition-all group bg-white",
								children: [/* @__PURE__ */ jsxs("h3", {
									className: "text-xl font-bold text-slate-800 group-hover:text-sky-600 flex items-center justify-between mb-2",
									children: ["MenuMalple", /* @__PURE__ */ jsx(ExternalLink, { className: "w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" })]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-slate-500 leading-relaxed",
									children: "Modern digital menu and ecosystem for restaurant operations."
								})]
							})]
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-6",
					children: /* @__PURE__ */ jsxs("a", {
						href: "https://varsync.in",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3",
						children: ["Visit VarSync.in ", /* @__PURE__ */ jsx(ExternalLink, { className: "w-5 h-5" })]
					})
				})]
			})]
		})]
	});
};
//#endregion
//#region src/App.jsx
function App({ initialView }) {
	const [step, setStep] = useState(1);
	const [creationMethod, setCreationMethod] = useState(null);
	const [questions, setQuestions] = useState([]);
	const [fileName, setFileName] = useState("");
	const [currentView, setCurrentView] = useState(() => {
		if (initialView) return initialView;
		if (typeof window !== "undefined") return window.location.pathname === "/about" ? "about" : "app";
		return "app";
	});
	const [paperSettings, setPaperSettings] = useState(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("paperSettings");
			if (saved) try {
				return JSON.parse(saved);
			} catch (e) {
				console.error("Failed to parse settings from local storage");
			}
		}
		return {
			institutionName: "",
			subject: "Mathematics",
			examTitle: "",
			date: "",
			duration: "",
			totalMarks: "",
			instructions: "Answer all questions. Select the most appropriate answer.",
			optionsLayout: "1-col",
			template: "classic"
		};
	});
	useEffect(() => {
		if (typeof window !== "undefined") localStorage.setItem("paperSettings", JSON.stringify(paperSettings));
	}, [paperSettings]);
	useEffect(() => {
		if (typeof window === "undefined") return;
		const initialPath = window.location.pathname === "/about" ? "/about" : "/";
		window.history.replaceState({
			step: 1,
			creationMethod: null,
			view: window.location.pathname === "/about" ? "about" : "app"
		}, "", initialPath);
		const handlePopState = (e) => {
			if (e.state) {
				setStep(e.state.step || 1);
				setCreationMethod(e.state.creationMethod || null);
				setCurrentView(e.state.view || "app");
			}
		};
		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, []);
	const navigateTo = (newStep, newMethod) => {
		const methodToSave = newMethod !== void 0 ? newMethod : creationMethod;
		setStep(newStep);
		if (newMethod !== void 0) setCreationMethod(newMethod);
		setCurrentView("app");
		window.history.pushState({
			step: newStep,
			creationMethod: methodToSave,
			view: "app"
		}, "", "");
	};
	const navigateToView = (viewName) => {
		setCurrentView(viewName);
		const path = viewName === "about" ? "/about" : "/";
		window.history.pushState({
			step,
			creationMethod,
			view: viewName
		}, "", path);
	};
	const handleUploadSuccess = (parsedQuestions, name) => {
		setQuestions(parsedQuestions);
		setFileName(name);
		navigateTo(2, name === "Manual Quiz" ? "manual" : "excel");
	};
	const handleReset = () => {
		if (window.confirm("Start a new quiz? Current questions will be cleared, but your settings will be saved.")) {
			setQuestions([]);
			setFileName("");
			navigateTo(1, null);
		}
	};
	const highestAccessibleStep = questions.length > 0 ? 5 : creationMethod ? 2 : 1;
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-slate-50 flex flex-col font-sans relative overflow-hidden text-slate-800",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-sky-200/40 blur-[100px] animate-pulse-soft" }), /* @__PURE__ */ jsx("div", {
					className: "absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-amber-200/30 blur-[120px] animate-pulse-soft",
					style: { animationDelay: "1s" }
				})]
			}),
			/* @__PURE__ */ jsx(Header, { onReset: questions.length > 0 && currentView === "app" ? handleReset : void 0 }),
			/* @__PURE__ */ jsx("main", {
				className: "flex-1 max-w-7xl w-full mx-auto px-4 py-4 md:py-8 relative z-0",
				children: currentView === "about" ? /* @__PURE__ */ jsx(AboutPage, { onBack: () => navigateToView("app") }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
					className: "hidden md:block",
					children: /* @__PURE__ */ jsx(StepIndicator, {
						currentStep: step,
						highestAccessibleStep,
						onStepClick: (s) => navigateTo(s)
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-4 md:mt-8 pb-24 md:pb-8",
					children: [
						step === 1 && /* @__PURE__ */ jsx(Fragment, { children: creationMethod === null ? /* @__PURE__ */ jsx(MethodSelector, { onSelect: (method) => {
							if (method === "manual") handleUploadSuccess([], "Manual Quiz");
							else navigateTo(1, "excel");
						} }) : creationMethod === "excel" ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("button", {
							onClick: () => navigateTo(1, null),
							className: "mb-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all active:scale-95",
							children: "← Back to Options"
						}), /* @__PURE__ */ jsx(ExcelUploader, { onUploadSuccess: handleUploadSuccess })] }) : null }),
						step === 2 && /* @__PURE__ */ jsxs("div", {
							className: "animate-fade-in-up",
							children: [/* @__PURE__ */ jsx("div", {
								className: "mb-8 p-5 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center justify-between shadow-sm",
								children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "font-semibold text-lg",
									children: fileName
								}), /* @__PURE__ */ jsxs("div", {
									className: "text-sm mt-1 flex items-center gap-1",
									children: [
										/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500 inline-block" }),
										questions.length,
										" Questions Imported Successfully"
									]
								})] })
							}), /* @__PURE__ */ jsx(QuestionList, {
								questions,
								setQuestions,
								onNext: () => navigateTo(3),
								onBack: () => {
									if (fileName === "Manual Quiz") navigateTo(1, null);
									else navigateTo(1, "excel");
								}
							})]
						}),
						step === 3 && /* @__PURE__ */ jsx("div", {
							className: "animate-fade-in-up",
							children: /* @__PURE__ */ jsx(PaperSettings, {
								settings: paperSettings,
								setSettings: setPaperSettings,
								onNext: () => navigateTo(4),
								onBack: () => navigateTo(2)
							})
						}),
						step >= 4 && /* @__PURE__ */ jsxs("div", {
							className: "animate-fade-in-up max-w-6xl mx-auto",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex justify-between items-end mb-8 border-b border-slate-200 pb-4",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
										className: "text-3xl font-extrabold text-slate-900 tracking-tight",
										children: "Preview & Download"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-slate-500 mt-2 text-lg",
										children: "Review your question paper before downloading."
									})] }), /* @__PURE__ */ jsxs("div", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ jsx("button", {
											onClick: () => navigateTo(3),
											className: "px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all shadow-sm hover:shadow active:scale-95",
											children: "Back"
										}), step === 4 && /* @__PURE__ */ jsx("button", {
											onClick: () => navigateTo(5),
											className: "px-6 py-2.5 bg-sky-600 text-white rounded-xl font-medium hover:bg-sky-700 transition-all shadow-md hover:shadow-lg hover:shadow-sky-500/20 active:scale-95",
											children: "Continue to Download"
										})]
									})]
								}),
								step === 5 && /* @__PURE__ */ jsxs("div", {
									className: "mb-12 p-10 glass-card rounded-2xl text-center relative overflow-hidden",
									children: [
										/* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-amber-500 to-emerald-400" }),
										/* @__PURE__ */ jsx("h3", {
											className: "text-2xl font-bold text-slate-900 mb-8",
											children: "Your PDFs are ready to generate"
										}),
										/* @__PURE__ */ jsx(DownloadButtons, {
											questions,
											settings: paperSettings
										})
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-8 bg-slate-100/50 backdrop-blur-sm p-4 sm:p-8 rounded-2xl overflow-x-auto shadow-inner border border-slate-200/50",
									children: /* @__PURE__ */ jsx(QuizPreview, {
										questions,
										settings: paperSettings
									})
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-200 z-50 px-2 pb-safe pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]",
							children: /* @__PURE__ */ jsx(StepIndicator, {
								currentStep: step,
								highestAccessibleStep,
								onStepClick: (s) => navigateTo(s),
								isMobile: true
							})
						})
					]
				})] })
			}),
			/* @__PURE__ */ jsxs("footer", {
				className: "py-8 text-center text-slate-500 text-sm mt-auto glass border-t-0 border-slate-200/50 relative z-10",
				children: ["Created by ", /* @__PURE__ */ jsx("button", {
					onClick: () => navigateToView("about"),
					className: "text-sky-600 hover:text-sky-800 font-bold transition-colors underline-offset-4 hover:underline",
					children: "VarSync"
				})]
			})
		]
	});
}
//#endregion
//#region src/entry-server.jsx
function render(url) {
	const initialView = url === "/about" ? "about" : "app";
	return ReactDOMServer.renderToString(/* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(App, { initialView }) }));
}
//#endregion
export { render };
