import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import AIChatbot from "./components/AIChatbot";
import ProjectModal from "./components/ProjectModal";
import { PORTFOLIO_OWNER } from "./data";

interface FadeInSectionProps {
  children: React.ReactNode;
}

function FadeInSection({ children }: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light");
    root.classList.add("dark");
  }, []);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    projectId: string;
    title: string;
  }>({
    isOpen: false,
    projectId: "",
    title: ""
  });

  // Track scroll position to update active section in the Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenDemo = (projectId: string, title: string) => {
    setModalState({
      isOpen: true,
      projectId,
      title
    });
  };

  const handleCloseDemo = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 relative overflow-x-hidden font-sans selection:bg-indigo-500 selection:text-white">
      {/* Ambient background blur spotlights */}
      <div className="floating-circle bg-indigo-600 w-96 h-96 top-20 left-[-10%] opacity-15"></div>
      <div className="floating-circle bg-purple-600 w-80 h-80 bottom-40 right-[-5%] opacity-15"></div>

      {/* Main Header / Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Page Sections */}
      <main className="relative z-10">
        <Hero />
        <FadeInSection>
          <About />
        </FadeInSection>
        <FadeInSection>
          <Skills />
        </FadeInSection>
        <FadeInSection>
          <Projects onOpenDemo={handleOpenDemo} />
        </FadeInSection>
        <FadeInSection>
          <Contact />
        </FadeInSection>
      </main>

      {/* Footer */}
      <footer className="bg-[#020617] border-t border-slate-800 mt-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-6 max-w-7xl mx-auto">
          <div className="font-extrabold tracking-wider text-indigo-400 text-sm uppercase font-mono">
            {PORTFOLIO_OWNER.name}.
          </div>
          <p className="text-sm text-slate-400 mt-4 md:mt-0 font-medium">
            © {new Date().getFullYear()} {PORTFOLIO_OWNER.name}. Built with Digital Alchemy.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm font-medium">
            <a 
              href="#home" 
              id="footer-privacy"
              className="text-slate-400 hover:text-indigo-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#home" 
              id="footer-terms"
              className="text-slate-400 hover:text-indigo-400 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Interactive Assistant */}
      <AIChatbot />

      {/* Interactive Project Video Walkthrough Modal */}
      <ProjectModal 
        isOpen={modalState.isOpen}
        projectId={modalState.projectId}
        title={modalState.title}
        onClose={handleCloseDemo}
      />
    </div>
  );
}
