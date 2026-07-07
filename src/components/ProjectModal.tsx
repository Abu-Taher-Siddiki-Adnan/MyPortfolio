import React from "react";
import { X, Play, Monitor, ShieldCheck, Database, Smartphone, LayoutDashboard } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  projectId: string;
  title: string;
  onClose: () => void;
}

export default function ProjectModal({ isOpen, projectId, title, onClose }: ProjectModalProps) {
  if (!isOpen) return null;

  // Render contextual walkthrough mockups based on which project is clicked
  const renderMockWalkthrough = () => {
    switch (projectId) {
      case "student-management":
        return (
          <div className="flex flex-col h-full bg-[#020617] p-6 relative select-none">
            {/* Mock Dashboard Layout */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-wider">SMS-Portal v2.4</span>
              </div>
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 flex-grow">
              <div className="col-span-1 bg-[#0f172a] rounded-xl p-4 border border-slate-800 flex flex-col gap-2">
                <div className="h-6 w-full bg-slate-800/50 rounded-md"></div>
                <div className="h-6 w-4/5 bg-slate-800/50 rounded-md"></div>
                <div className="h-6 w-5/6 bg-slate-800/50 rounded-md"></div>
                <div className="h-6 w-1/2 bg-slate-800/50 rounded-md"></div>
              </div>
              
              <div className="col-span-2 flex flex-col gap-4">
                <div className="bg-[#0f172a] rounded-xl p-4 border border-slate-800 flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-mono">Academic Growth Analytics</span>
                    <span className="text-xs text-indigo-400 font-bold font-mono">+12.4%</span>
                  </div>
                  {/* Simulated Chart Bars */}
                  <div className="flex items-end justify-between h-24 pt-4 gap-2">
                    <div className="w-full bg-indigo-500/20 h-[40%] rounded-t-sm"></div>
                    <div className="w-full bg-indigo-500/40 h-[65%] rounded-t-sm"></div>
                    <div className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 h-[85%] rounded-t-sm relative">
                      <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-[9px] font-mono text-purple-400 font-bold">Peak</div>
                    </div>
                    <div className="w-full bg-indigo-500/30 h-[50%] rounded-t-sm"></div>
                    <div className="w-full bg-indigo-500/50 h-[75%] rounded-t-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-[#000000]/60 backdrop-blur-xs flex items-center justify-center">
              <div className="bg-[#0f172a]/95 border border-indigo-500/20 rounded-2xl p-6 text-center max-w-sm flex flex-col items-center shadow-2xl">
                <Play className="w-12 h-12 text-indigo-400 mb-3 animate-pulse" />
                <h4 className="text-base font-extrabold text-white mb-1">Student Management ERP Walkthrough</h4>
                <p className="text-xs text-slate-400 mb-4">Learn how the system handles 50,000+ school logs using Django REST & PostgreSQL.</p>
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 font-mono bg-indigo-500/10 px-3 py-1 rounded-full">Interactive Demo Mode</span>
              </div>
            </div>
          </div>
        );

      case "library-manager":
        return (
          <div className="flex flex-col h-full bg-[#020617] p-6 relative select-none">
            {/* Mock Database Indexes */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-400" />
                <span className="font-mono text-xs text-purple-400 font-bold uppercase tracking-wider">Inventory Mainframe</span>
              </div>
              <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-bold">99.8% Index Coverage</span>
            </div>

            <div className="flex-grow flex flex-col gap-3 justify-center items-center">
              <div className="w-4/5 h-8 bg-[#0f172a] border border-slate-800 rounded-lg flex items-center px-4 justify-between">
                <span className="text-xs text-slate-500 font-mono">search_books_indexed("The Alchemist")</span>
                <span className="text-[10px] font-mono text-emerald-400">0.002s result_ok</span>
              </div>
              <div className="w-4/5 h-8 bg-[#0f172a] border border-slate-800 rounded-lg flex items-center px-4 justify-between">
                <span className="text-xs text-slate-500 font-mono">update_records_cascade_bulk()</span>
                <span className="text-[10px] font-mono text-emerald-400">12 records refreshed</span>
              </div>
            </div>

            <div className="absolute inset-0 bg-[#000000]/60 backdrop-blur-xs flex items-center justify-center">
              <div className="bg-[#0f172a]/95 border border-indigo-500/20 rounded-2xl p-6 text-center max-w-sm flex flex-col items-center shadow-2xl">
                <Monitor className="w-12 h-12 text-purple-400 mb-3 animate-pulse" />
                <h4 className="text-base font-extrabold text-white mb-1">Library Inventory Optimization</h4>
                <p className="text-xs text-slate-400 mb-4">Automated inventory tracking system built with scalable cataloging pipelines.</p>
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 font-mono bg-purple-500/10 px-3 py-1 rounded-full">Systems Demo Mode</span>
              </div>
            </div>
          </div>
        );

      case "techbazar":
        return (
          <div className="flex flex-col h-full bg-[#020617] p-6 relative select-none justify-between">
            <div className="flex justify-center mt-4">
              {/* Mock Mobile frame */}
              <div className="w-48 h-64 bg-[#0f172a] border-4 border-slate-800 rounded-3xl p-4 flex flex-col gap-3 relative">
                <div className="w-16 h-3 bg-slate-800 rounded-full mx-auto mb-2"></div>
                <div className="h-20 bg-slate-900/50 rounded-xl flex items-center justify-center text-[10px] text-slate-500 font-mono">Holographic Card</div>
                <div className="h-6 bg-indigo-500/20 rounded-lg flex items-center justify-center text-[8px] text-indigo-400 font-bold uppercase">Add to Cart</div>
                <div className="h-8 bg-slate-900/50 rounded-xl flex items-center justify-around">
                  <span className="w-2 h-2 rounded-full bg-indigo-500/40"></span>
                  <span className="w-2 h-2 rounded-full bg-purple-500/40"></span>
                  <span className="w-2 h-2 rounded-full bg-indigo-300/40"></span>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-[#000000]/60 backdrop-blur-xs flex items-center justify-center">
              <div className="bg-[#0f172a]/95 border border-indigo-500/20 rounded-2xl p-6 text-center max-w-sm flex flex-col items-center shadow-2xl">
                <Smartphone className="w-12 h-12 text-indigo-400 mb-3 animate-pulse" />
                <h4 className="text-base font-extrabold text-white mb-1">TechBazar Mobile Framework</h4>
                <p className="text-xs text-slate-400 mb-4">Exploring cross-platform reactive state managers and smooth Flutter layout loops.</p>
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 font-mono bg-indigo-500/10 px-3 py-1 rounded-full">Interactive Demo Mode</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-400 font-mono text-xs uppercase tracking-widest p-6 text-center">
            [ System Demo Placeholder for {title} ]
          </div>
        );
    }
  };

  return (
    <div 
      id="project-demo-modal"
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in"
    >
      <div className="max-w-4xl w-full relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          id="close-modal-btn"
          className="absolute -top-12 right-0 text-white hover:text-indigo-400 text-4xl leading-none font-light cursor-pointer focus:outline-none"
          aria-label="Close modal dialog"
        >
          &times;
        </button>

        {/* Cinematic Aspect-Video Player Container */}
        <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          {renderMockWalkthrough()}
        </div>

        {/* Modal Info Footer */}
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{title} Demo</h3>
          <p className="text-slate-400 text-sm">
            Walking through the core architecture, layout patterns, and responsive controller states.
          </p>
        </div>
      </div>
    </div>
  );
}
