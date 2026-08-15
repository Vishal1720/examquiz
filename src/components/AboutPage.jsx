import { Code2, Heart, ExternalLink, ArrowLeft, Github, Linkedin, MonitorPlay, Sparkles } from 'lucide-react';

export const AboutPage = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto pt-4 pb-12 animate-fade-in-up">
      <button 
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" /> Back to App
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Area */}
        <div className="relative p-10 bg-slate-900 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-sky-500/30 to-amber-500/30 blur-[60px] -translate-y-1/2 translate-x-1/3 rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-inner">
              <Code2 className="w-10 h-10 text-sky-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">About VarSync</h1>
              <p className="text-xl text-slate-300 font-medium">Crafting Digital Experiences</p>
            </div>
          </div>
        </div>

        <div className="p-10">
          <div className="prose prose-slate max-w-none">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-0">
                Why we built this
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed font-medium">
                Teachers spend countless hours of their precious time creating quizzes for students. We built PaperQuizMaker as a simple way to return the favor—giving educators an easy, fast solution to create quizzes so they can focus on what they do best: educating the next generation.
              </p>
            </div>

            <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12">
              PaperQuizMaker is a <strong className="text-slate-800">free community product</strong> proudly built by the <strong className="text-slate-800">VarSync</strong> team. We believe in building technology that genuinely helps people, saves time, and solves real problems for educators and students.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-6">Creator of this product</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start p-8 bg-sky-50/50 border border-sky-100 rounded-3xl mb-12">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0 bg-white">
                <img src="https://varsync.in/vishal.png" alt="Vishal" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-bold text-slate-800 m-0">Vishal</h3>
                  <span className="px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold rounded-full">Creator & Developer</span>
                </div>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Passionate technologist and visionary behind VarSync. Believes in building technology that genuinely helps businesses grow and simplifies everyday problems.
                </p>
                <div className="flex gap-3">
                  <a href="https://www.linkedin.com/in/vishalshetty17/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-slate-500 hover:text-[#0a66c2] border border-slate-200 rounded-lg shadow-sm transition-all hover:-translate-y-1">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/Vishal1720" target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg shadow-sm transition-all hover:-translate-y-1">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://vishal.varsync.in" target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-slate-500 hover:text-sky-600 border border-slate-200 rounded-lg shadow-sm transition-all hover:-translate-y-1">
                    <MonitorPlay className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-6">Other Products by VarSync</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <a href="https://splitmalple.vercel.app/" target="_blank" rel="noopener noreferrer" className="p-6 border-2 border-slate-100 rounded-2xl hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10 transition-all group bg-white">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 flex items-center justify-between mb-2">
                  SplitMalple
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-slate-500 leading-relaxed">The fair way to pay. Split bills exactly based on what you consumed.</p>
              </a>
              
              <a href="https://menumalple.vercel.app/" target="_blank" rel="noopener noreferrer" className="p-6 border-2 border-slate-100 rounded-2xl hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/10 transition-all group bg-white">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-sky-600 flex items-center justify-between mb-2">
                  MenuMalple
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-slate-500 leading-relaxed">Modern digital menu and ecosystem for restaurant operations.</p>
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-slate-500 font-medium flex items-center gap-2">
              Built with <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> by Vishal
            </p>
            <a 
              href="https://varsync.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3"
            >
              Visit VarSync.in <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
