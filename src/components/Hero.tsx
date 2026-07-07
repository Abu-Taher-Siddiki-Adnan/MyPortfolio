import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  const phrases = ["AI Engineer", "CSE Researcher", "Flutter Craftsman", "Problem Solver"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = phrases[currentWordIndex];
    
    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText === fullWord) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 2500);
        } else {
          timer = setTimeout(handleType, 100);
        }
      } else {
        // Deleting
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % phrases.length);
        } else {
          timer = setTimeout(handleType, 50);
        }
      }
    };

    timer = setTimeout(handleType, isDeleting ? 50 : 150);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center pt-28 px-6 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Particle System Background */}
      <ParticleBackground />

      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] bg-indigo-600 rounded-full filter blur-[120px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-[-10%] w-[350px] h-[350px] bg-purple-600 rounded-full filter blur-[120px] opacity-10"></div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full relative z-10">
        
        {/* Text Content Block */}
        <div className="order-2 md:order-1 flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 font-sans leading-none">
            I'm <span className="text-indigo-400 glow-text">{PORTFOLIO_OWNER.name}</span>
          </h1>

          <div className="text-indigo-300 text-2xl md:text-3xl font-bold mb-6 h-12 flex items-center">
            <span className="font-mono">{currentText}</span>
            <span className="w-1.5 h-8 bg-indigo-400 ml-1 animate-ping"></span>
          </div>

          <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            {PORTFOLIO_OWNER.subTitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects" 
              id="hero-view-work"
              className="shimmer-btn bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              View My Work
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <a 
              href="#contact" 
              id="hero-talk"
              className="px-8 py-4 rounded-xl border border-indigo-500 text-indigo-400 font-bold hover:bg-indigo-500/10 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-300 active:scale-95 text-center cursor-pointer"
            >
              Let's Talk
            </a>
          </div>
        </div>

        {/* Visual Media Block */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative group w-full max-w-[360px]">
            {/* Holographic Border Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[34px] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            
            {/* The Main Portrait Card with Geometric Slate Border */}
            <div className="relative aspect-[5/6] bg-slate-900 rounded-[30px] overflow-hidden border border-slate-800 shadow-2xl">
              <img 
                src={PORTFOLIO_OWNER.portraitUrl}
                referrerPolicy="no-referrer"
                alt="Adnan - Digital Alchemist"
                id="hero-portrait"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-out"
              />
              
              {/* Overlay Glass Shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
