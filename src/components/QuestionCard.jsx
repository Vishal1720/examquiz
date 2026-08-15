import { Edit2, Trash2 } from 'lucide-react';

export const QuestionCard = ({ question, index, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-4 whitespace-pre-wrap">
            <span className="text-gray-500 mr-2">Question {index + 1}.</span>
            {question.question}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {['A', 'B', 'C', 'D'].map(opt => (
              <div
                key={opt}
                className={`p-3 rounded-lg border text-sm ${question.answer === opt
                    ? 'border-green-200 bg-green-50 text-green-900'
                    : 'border-gray-100 bg-gray-50 text-gray-700'
                  }`}
              >
                <span className="font-semibold mr-2">{opt}.</span>
                <span className="whitespace-pre-wrap">{question.options[opt]}</span>
              </div>
            ))}
          </div>

          <div className="text-sm font-medium text-gray-600">
            Correct Answer: <span className="text-green-600 font-bold ml-1">{question.answer}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            title="Edit Question"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Question"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
