import React from "react";
import { Code2, Smartphone, Zap, Brain, Search } from "lucide-react";
import { ABOUT_CARDS } from "../data";

const iconMap: Record<string, any> = {
  Code: Code2,
  Smartphone: Smartphone,
  Zap: Zap,
  Brain: Brain,
  Search: Search
};

// Translate data.ts colors to Indigo theme colors
const getThemeColorClass = (color: string) => {
  if (color === "text-primary") return "text-indigo-400";
  if (color === "text-secondary") return "text-indigo-300";
  if (color === "text-tertiary") return "text-purple-400";
  return color;
};

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      
      {/* Centered Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#e4e1ed] mb-4">
          About Me
        </h2>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
      </div>

      {/* About cards grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {ABOUT_CARDS.map((card, idx) => {
          const IconComponent = iconMap[card.icon] || Code2;
          const colorClass = getThemeColorClass(card.color);
          return (
            <div 
              key={idx}
              id={`about-card-${idx}`}
              className="glass-card p-8 rounded-2xl flex flex-col hover:border-indigo-500/30 group bg-slate-900/60 border border-slate-800"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className={`w-6 h-6 ${colorClass}`} />
              </div>
              
              <h3 className="text-xl font-bold text-[#e4e1ed] mb-4">
                {card.title}
              </h3>
              
              <p className="text-slate-300 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
