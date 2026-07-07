import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API Client
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined.");
  }
} catch (e) {
  console.error("Failed to initialize Gemini API Client", e);
}

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    if (!ai) {
      // Re-try initialization just in case process.env was updated
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
      }
    }

    if (!ai) {
      return res.status(503).json({ 
        reply: "My Gemini API connection is currently not initialized. Please verify your GEMINI_API_KEY in the Secrets panel." 
      });
    }

    // Format messages for the @google/genai SDK
    // The SDK expects: contents: [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
    const contents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: `You are a warm, friendly, and down-to-earth assistant representing Abu Taher Siddiki Adnan, a talented computer science student and aspiring AI Engineer based in Bangladesh.
Your main goal is to chat naturally, helping visitors learn about Adnan, his academic background at IIUC, projects, skills, and how to contact or hire him.

CRITICAL INSTRUCTIONS FOR HUMAN-LIKE ENGAGEMENT AND SPEED:
1. BE EXTREMELY BRIEF: Keep responses to exactly 1 or 2 short, natural sentences. Never output long bullet lists, essays, or multiple paragraphs unless explicitly asked for a deep dive. Short responses generate instantly and keep the conversation fast!
2. SOUND LIKE A HUMAN: Speak in a relaxed, friendly, conversational, and genuine tone. Do not use robotic intro/outro filler (like "Certainly! I'd be happy to help with that..."). Just answer directly and naturally. No corporate speak.
3. REFER TO ADNAN: Always talk about Adnan in the third person (he/him/Adnan). Never say "I am Adnan" or "my skills". Say "Adnan is based in..." or "He works with...".

Adnan's Key Profile Info:
- Basic Identity: Abu Taher Siddiki Adnan, undergraduate CSE student at IIUC (International Islamic University Chittagong), Bangladesh.
- Career Goal: Aspires to become an AI Engineer. Currently focused on AI/ML, research, and modern app development. (He is no longer focusing on competitive programming / CP).
- Tech Stack: Python, PyTorch, TensorFlow, C/C++, Dart, Flutter, Firebase (Auth, Firestore), SQLite, PostgreSQL, Docker, Cloud Run.
- Django Projects:
  1. Student Management System: Full CRUD education app. Ranked 5th in a competition.
  2. E-commerce Platform (TechBazar): E-commerce storefront with SSLCommerz payment integration. Ranked 4th in a competition.
  3. Library Management System: His first Django project, focusing on normalization & fundamentals.
  4. Polish Notation Calculator: Algorithm-focused mathematical calculator using pure data structures.
- Flutter Projects:
  1. Blood Hub: Real-time donor-recipient connection mobile app with urgent request & location systems (Flutter, Firebase).
  2. Knot - Firebase Note App: Real-time note-taking system with Firestore & Auth (Flutter, Firebase).
  3. ZenDo Task Manager: Local task/productivity utility with SQLite & local notifications.
  4. Personality Quiz App: Interactive personality analyzer (Flutter, Dart).
- Academic Context:
  * Ongoing courses: AI + Lab, Operating Systems + Lab, Software Engineering + Lab, Data Communication, Software Dev II Lab, History of Emergence of Bangladesh, Principles of Economics, Life and Teachings of Prophet Muhammad (SAAS).
  * Completed CSE Core: programming (I & II), Data Structures, Algorithms, DBMS, Theory of Computation, Computer Architecture, Compiler Design + Lab, Microprocessors & Embedded Systems, Systems Analysis & Design, Digital Logic Design.
  * Mathematics/Science: Discrete Math, Probability & Statistics, Math I-IV, Physics I-II, Chemistry, Electronics.
- Location: Bangladesh.
- Email: abutahersiddikiadnan@gmail.com.
- Social Links: GitHub (https://github.com/Abu-Taher-Siddiki-Adnan), LinkedIn (https://www.linkedin.com/in/abu-taher-siddiki-adnan/), Facebook (https://www.facebook.com/adnan.siddik.282), YouTube (https://www.youtube.com/@AbuTaherSiddikiAdnan).

If someone wants to contact Adnan, warmly invite them to use the contact form on the page or email him directly at abutahersiddikiadnan@gmail.com. Keep it short, lively, and incredibly fast!`,
        temperature: 0.7,
      },
    });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }
    res.end();
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: error.message || "Something went wrong during generation." });
  }
});

app.get("/api/github-updates", async (req, res) => {
  try {
    const username = "Abu-Taher-Siddiki-Adnan";
    const response = await fetch(`https://api.github.com/users/${username}/events`, {
      headers: {
        "User-Agent": "aistudio-build-portfolio",
        "Accept": "application/vnd.github.v3+json"
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const events = (await response.json()) as any[];
    if (!Array.isArray(events)) {
      throw new Error("GitHub API returned invalid structure");
    }

    const formattedEvents = events
      .filter((event: any) => ["PushEvent", "CreateEvent", "WatchEvent", "ForkEvent", "PullRequestEvent"].includes(event.type))
      .slice(0, 5)
      .map((event: any) => {
        const repoName = event.repo.name.replace(`${username}/`, "");
        let title = "";
        let detail = "";

        if (event.type === "PushEvent") {
          const commits = event.payload?.commits || [];
          const commitMsg = commits[0]?.message || "Pushed code updates";
          title = "Code Pushed";
          detail = `Committed to ${repoName}: "${commitMsg}"`;
        } else if (event.type === "CreateEvent") {
          title = "Repository Created";
          detail = `Created repository ${repoName}`;
        } else if (event.type === "WatchEvent") {
          title = "Repository Starred";
          detail = `Starred ${repoName}`;
        } else if (event.type === "PullRequestEvent") {
          const action = event.payload?.action || "opened";
          title = "Pull Request";
          detail = `${action.charAt(0).toUpperCase() + action.slice(1)} PR in ${repoName}`;
        } else {
          title = "Activity";
          detail = `Worked on ${repoName}`;
        }

        return {
          id: event.id,
          title,
          detail,
          date: event.created_at,
          link: `https://github.com/${event.repo.name}`
        };
      });

    res.json({ updates: formattedEvents });
  } catch (error: any) {
    console.warn("Could not fetch real GitHub updates, sending fallback portfolio milestones:", error.message);
    res.json({
      updates: [
        {
          id: "fb-1",
          title: "AI & ML Focus",
          detail: "Intensively practicing deep learning frameworks & scientific AI research models.",
          date: new Date().toISOString(),
          link: "https://github.com/Abu-Taher-Siddiki-Adnan"
        },
        {
          id: "fb-2",
          title: "Flutter Development",
          detail: "Perfecting custom gestures and micro-animations in cross-platform mobile apps.",
          date: new Date(Date.now() - 86400000).toISOString(),
          link: "https://github.com/Abu-Taher-Siddiki-Adnan"
        },
        {
          id: "fb-3",
          title: "IIUC CSE Academic",
          detail: "Diving into core CSE courses: AI + Lab, Operating Systems, and Software Engineering.",
          date: new Date(Date.now() - 172800000).toISOString(),
          link: "https://github.com/Abu-Taher-Siddiki-Adnan"
        }
      ]
    });
  }
});

app.get("/api/skill-context", async (req, res) => {
  const skillName = req.query.skill as string;
  if (!skillName) {
    return res.status(400).json({ error: "Skill parameter is required." });
  }

  // Pre-configured fallback contexts in case Gemini is unavailable
  const fallbackContexts: Record<string, string> = {
    "AI & ML": "Adnan implements intelligent predictive systems, NLP models, and is currently researching advanced scientific machine learning solutions.",
    "Flutter": "He crafts fluid, responsive cross-platform mobile apps like Blood Hub and ZenDo using custom gestures and micro-animations.",
    "Research": "Adnan designs and analyzes complex algorithms and mathematical models, focusing on performance optimization and computer science theory.",
    "Python": "He writes highly-optimized data pipelines, backend scripts, and algorithmic evaluation systems like his Polish Notation Calculator.",
    "Django": "He builds secure, scalable backend architectures with full CRUD systems, such as TechBazar and the Student Management ERP."
  };

  try {
    if (!ai) {
      throw new Error("Gemini API is not initialized.");
    }

    const prompt = `Write a very brief, high-impact context snippet (exactly 1 or 2 sentences, maximum 25 words) describing how Adnan uses the technology "${skillName}" in his projects.
Speak in the third person (he/Adnan). Be specific to his real portfolio projects like TechBazar, Student ERP, Blood Hub, or ZenDo where appropriate. Keep it professional, sleek, and action-oriented. Never say "As an AI..." or "I...".`;

    let attempt = 0;
    const maxAttempts = 3;
    let responseText = "";

    while (attempt < maxAttempts) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            temperature: 0.7,
          }
        });
        if (response?.text) {
          responseText = response.text.trim();
          break;
        }
      } catch (err: any) {
        attempt++;
        if (attempt >= maxAttempts) {
          throw err;
        }
        // Wait 300ms, then 600ms before retrying
        await new Promise((resolve) => setTimeout(resolve, attempt * 300));
      }
    }

    const reply = responseText || fallbackContexts[skillName] || `He uses ${skillName} to architect premium solutions and complex logic in his portfolio projects.`;
    res.json({ context: reply });
  } catch (error: any) {
    console.log(`Using fallback context for ${skillName} (Gemini currently unavailable: ${error.message})`);
    const reply = fallbackContexts[skillName] || `He uses ${skillName} to architect premium solutions and complex logic in his portfolio projects.`;
    res.json({ context: reply });
  }
});

// Setup Vite or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
