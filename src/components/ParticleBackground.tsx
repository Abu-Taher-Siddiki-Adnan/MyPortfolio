import React, { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse coordinates tracking
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 120, // Interaction radius
    };

    // Particles list
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseSize: number;
    }
    let particles: Particle[] = [];

    // Initialize particles
    const initParticles = (w: number, h: number) => {
      const density = Math.min(100, Math.floor((w * h) / 11000)); // Dynamic density
      const tempParticles: Particle[] = [];
      for (let i = 0; i < density; i++) {
        const size = Math.random() * 2 + 1;
        tempParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: size,
          baseSize: size,
        });
      }
      particles = tempParticles;
    };

    // ResizeObserver on parent container (Responsive Sizing Rule)
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = entryWidth;
        height = entryHeight;
        canvas.width = entryWidth;
        canvas.height = entryHeight;
        initParticles(entryWidth, entryHeight);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Animation Loop
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Select elegant color scheme for dark slate background
      const particleColor = "rgba(129, 140, 248, 0.3)";

      // Draw and update particles
      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Boundary collision
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction (repel/attract effect)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            // Subtle attract/repel dynamic based on distance
            p.x -= (dx / distance) * force * 0.8;
            p.y -= (dy / distance) * force * 0.8;
            p.size = p.baseSize + force * 1.5;
          } else {
            if (p.size > p.baseSize) {
              p.size -= 0.1;
            }
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      // Draw interactive lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            // Dynamic alpha based on distance
            const alphaMultiplier = (100 - distance) / 100;
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.08 * alphaMultiplier})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Event listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Bind events to the container so mouse tracking spans correctly
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="particles-container"
      className="absolute inset-0 pointer-events-auto z-0"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-70"
      />
    </div>
  );
}
