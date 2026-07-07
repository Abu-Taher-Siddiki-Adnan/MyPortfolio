import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 w-full h-20 z-50 bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-800 shrink-0 transition-all duration-300">
      <nav className="flex justify-between items-center h-full px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {/* Geometric Diamond Emblem */}
          <div className="w-8 h-8 bg-indigo-500 rounded-sm rotate-45 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-4 h-4 bg-[#0F172A] rounded-full"></div>
          </div>
          <a 
            href="#home" 
            id="nav-logo"
            className="text-xl font-bold tracking-tight text-white font-sans uppercase"
          >
            Adnan
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  id={`nav-link-${item.id}`}
                  className={`transition-all duration-300 pb-1 ${
                    isActive 
                      ? "text-white border-b-2 border-indigo-500 font-semibold" 
                      : "text-slate-400 hover:text-white border-b-2 border-transparent"
                  }`}
                >
                  {item.label.toUpperCase()}
                </a>
              );
            })}
          </div>

        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          id="mobile-nav-toggle"
          className="md:hidden text-indigo-400 focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div 
          id="mobile-menu-container"
          className="md:hidden bg-[#0f172a]/95 backdrop-blur-lg border-b border-slate-800 px-6 py-4 flex flex-col gap-4 animate-fade-in"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              id={`mobile-nav-link-${item.id}`}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-bold uppercase tracking-wider transition-colors py-2 block ${
                activeSection === item.id ? "text-indigo-400 border-l-2 border-indigo-500 pl-2" : "text-slate-400"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
