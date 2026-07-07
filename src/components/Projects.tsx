import React, { useState } from "react";
import { ExternalLink, Code, Github } from "lucide-react";
import { PROJECTS_DATA } from "../data";
import { Project } from "../types";

interface ProjectsProps {
  onOpenDemo: (projectId: string, title: string) => void;
}

export default function Projects({ onOpenDemo }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "web" | "mobile">("all");

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (activeFilter === "all") return true;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      
      {/* Centered Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Featured Projects
        </h2>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-12"></div>

        {/* Dynamic Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "web", "mobile"].map((filter) => (
            <button
              key={filter}
              id={`filter-${filter}`}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-6 py-2 rounded-full border cursor-pointer uppercase text-xs font-bold tracking-wider transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-indigo-500 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                  : "border-slate-800 text-slate-400 hover:border-indigo-500 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            className="glass-card bg-slate-900/60 border border-slate-800 rounded-[24px] overflow-hidden flex flex-col hover:border-indigo-500/30 group"
          >
            {/* Project Image Header */}
            {project.image ? (
              <div className="h-48 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-transparent to-transparent"></div>
              </div>
            ) : (
              <div className="h-48 bg-slate-950 flex items-center justify-center relative overflow-hidden">
                <Code className="w-12 h-12 text-slate-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-transparent to-transparent"></div>
              </div>
            )}

            {/* Project Details */}
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] rounded font-bold uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-[10px] rounded font-bold uppercase tracking-wider ml-auto font-mono">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-800/60">
                {project.demoUrl ? (
                  <button
                    onClick={() => onOpenDemo(project.id, project.title)}
                    id={`project-demo-btn-${project.id}`}
                    className="text-indigo-400 font-bold flex items-center gap-1.5 hover:gap-2.5 hover:text-indigo-300 transition-all cursor-pointer text-sm"
                  >
                    Demo 
                    <ExternalLink className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-slate-500 text-sm font-medium">Concept Only</span>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    id={`project-github-link-${project.id}`}
                    className="text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
