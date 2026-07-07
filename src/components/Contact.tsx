import React, { useEffect, useState } from "react";
import { Mail, MapPin, Linkedin, Github, Facebook, Youtube, CheckCircle } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!submitted) return;

    const timer = window.setTimeout(() => {
      setSubmitted(false);
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("_subject", formData.subject || "Portfolio Inquiry");
      formPayload.append("message", formData.message);

      const response = await fetch("https://formspree.io/f/mrewvzrw", {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formPayload
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to send message.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      setErrorMsg(error?.message || "Unable to send your message right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Info Column */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Let's Create Something Great
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-10">
            Currently open for selective freelance contracts, high-impact consulting, or full-time remote engineering positions. Drop a message to discuss your next digital breakthrough.
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-mono">
                  Email
                </p>
                <a
                  href={`mailto:${PORTFOLIO_OWNER.email}`}
                  id="contact-email-link"
                  className="text-white hover:text-indigo-400 transition-colors text-lg"
                >
                  {PORTFOLIO_OWNER.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold font-mono">
                  Location
                </p>
                <p className="text-white text-lg">{PORTFOLIO_OWNER.location}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href={PORTFOLIO_OWNER.linkedin}
              target="_blank"
              rel="noreferrer"
              id="social-linkedin"
              className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={PORTFOLIO_OWNER.github}
              target="_blank"
              rel="noreferrer"
              id="social-github"
              className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300"
              aria-label="GitHub profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={PORTFOLIO_OWNER.youtube}
              target="_blank"
              rel="noreferrer"
              id="social-youtube"
              className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-300"
              aria-label="YouTube channel"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href={(PORTFOLIO_OWNER as any).facebook}
              target="_blank"
              rel="noreferrer"
              id="social-facebook"
              className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300"
              aria-label="Facebook profile"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="glass-card bg-slate-900/60 border border-slate-800 p-8 rounded-[24px] relative overflow-hidden">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <CheckCircle className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-white mb-2">Message Dispatched</h3>
              <p className="text-slate-300 text-sm max-w-sm">
                Thank you! Your inquiry was sent with high priority. Adnan will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs rounded-xl font-mono leading-relaxed shadow-sm">
                  <strong className="block text-amber-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">Submission Error</strong>
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono block ml-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-[#020617] border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono block ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="youremail@example.com"
                    className="w-full bg-[#020617] border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono block ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Inquiry"
                  className="w-full bg-[#020617] border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono block ml-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  id="contact-message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full bg-[#020617] border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                disabled={isSubmitting}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold py-4 rounded-xl shimmer-btn hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.25)] cursor-pointer"
              >
                {isSubmitting ? "Transmitting..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
