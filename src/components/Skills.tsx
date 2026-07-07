import React from "react";
import { Cpu, Terminal, Globe, Award, Smartphone, Brain, Search } from "lucide-react";
import { SKILLS_DATA } from "../data";

const skillIconMap: Record<string, any> = {
  Code: Terminal,
  Cpu: Cpu,
  Globe: Globe,
  Flame: Award,
  Smartphone: Smartphone,
  Brain: Brain,
  Search: Search
};

const brandColorMap: Record<string, { iconColor: string; shadowClass: string }> = {
  "Python": { 
    iconColor: "text-amber-400", 
    shadowClass: "group-hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] group-hover:border-amber-500/30" 
  },
  "AI & ML": { 
    iconColor: "text-purple-400", 
    shadowClass: "group-hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] group-hover:border-purple-500/30" 
  },
  "Research": { 
    iconColor: "text-pink-400", 
    shadowClass: "group-hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] group-hover:border-pink-500/30" 
  },
  "C/C++": { 
    iconColor: "text-blue-400", 
    shadowClass: "group-hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] group-hover:border-blue-500/30" 
  },
  "Dart": { 
    iconColor: "text-sky-400", 
    shadowClass: "group-hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] group-hover:border-sky-500/30" 
  },
  "Flutter": { 
    iconColor: "text-indigo-400", 
    shadowClass: "group-hover:shadow-[0_0_25px_rgba(99,102,241,0.2)] group-hover:border-indigo-500/30" 
  }
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-[#020617]/40 border-y border-slate-800/50 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Centered Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#e4e1ed] mb-4">
            Technical Arsenal
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            A curated showcase of core frameworks, languages, and technical competencies.
          </p>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-4"></div>
        </div>

        {/* Brand card grids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {SKILLS_DATA.map((skill) => {
            const IconComp = skillIconMap[skill.icon] || Terminal;
            const colors = brandColorMap[skill.name] || { iconColor: "text-indigo-400", shadowClass: "group-hover:shadow-[0_0_25px_rgba(99,102,241,0.2)]" };

            return (
              <div
                key={skill.name}
                id={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`glass-card group p-8 rounded-[24px] flex flex-col items-center justify-center text-center transform hover:scale-105 duration-300 bg-slate-900/60 border border-slate-800 select-none transition-all ${colors.shadowClass}`}
              >
                <div className="mb-4">
                  <IconComp className={`w-12 h-12 ${colors.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                </div>
                <span className="font-semibold text-sm uppercase tracking-wider text-slate-200">
                  {skill.name}
                </span>

                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
