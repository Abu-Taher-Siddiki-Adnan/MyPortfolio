import { Project, Skill } from "./types";

export const PORTFOLIO_OWNER = {
  name: "Abu Taher Siddiki Adnan",
  tagline: "AI Engineer & CSE Student",
  subTitle: "Undergraduate CSE student at IIUC, Bangladesh. Engineering intelligent systems, advanced algorithm research, and premium cross-platform Flutter applications.",
  email: "abutahersiddikiadnan@gmail.com",
  personalEmail: "abutahersiddikiadnan@gmail.com",
  location: "Bangladesh",
  education: "Undergraduate Student, Department of CSE at IIUC",
  github: "https://github.com/Abu-Taher-Siddiki-Adnan",
  linkedin: "https://www.linkedin.com/in/abu-taher-siddiki-adnan/",
  facebook: "https://www.facebook.com/adnan.siddik.282",
  youtube: "https://www.youtube.com/@AbuTaherSiddikiAdnan",
  portraitUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRbAa2I0HyG7etnKgdJj8f2Vihdq3OoKxIuhziWRcYGPg-IPDYVSC1NWa-tNV8DbfFsYDLktwGjMKARYHLjkRHmXQ5F1fTfCss1pZVJHJVsX1wrC4eZZAFF5180I3ex6693QhPpaN4oiy1qy2E96Kki5mgUZwkMLa14MmbIOZDthPZFwjE6NYQGrA-dZAbPFXQHjOlxOTxEtwKSVbsiRLVwBkbSEh6v4Fr0NO-7F1ed-kHuOnb1eDKUjoY5JAQ4RZGMEzQW8b16Bty"
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "blood-hub",
    title: "Blood Hub",
    description: "A real-time cross-platform blood donor matching mobile application featuring location tracking and high-priority urgent requests.",
    tags: ["Flutter", "Firebase", "Real-time"],
    category: "mobile",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan"
  },
  {
    id: "knot-note",
    title: "Knot – Firebase Note App",
    description: "Real-time cloud-based note-taking application using Firebase Firestore, dynamic queries, and user authentication secure protocols.",
    tags: ["Flutter", "Firebase", "Firestore"],
    category: "mobile",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan"
  },
  {
    id: "zendo-task",
    title: "ZenDo Task Manager",
    description: "Local task and productivity utility incorporating custom SQLite databases and background notification schedulers.",
    tags: ["Flutter", "SQLite", "Notifications"],
    category: "mobile",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan"
  },
  {
    id: "personality-quiz",
    title: "Personality Quiz App",
    description: "An engaging mobile quiz environment evaluating behavioral queries with custom score tallies and profile summaries.",
    tags: ["Flutter", "Dart"],
    category: "mobile",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan"
  },
  {
    id: "student-management",
    title: "Student Management System",
    description: "Full CRUD educational management system featuring real-time stats and student records. Ranked 5th in a programming/system design competition.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXyg13NcBI4QcHL3S5E5HWLC2xfMzER91GG6RKgZk23OdTp6LIbe5s2VZ6EKSxTmTlIxTNJkFkEP7CN4eOWjZrlBRKnDW5dJef1nqHrHyjYk5e8JO1uviJ1jMVqnS5GOdCtqMOCndoeK93WQqcXweBwRCiwBW0Svp9q3EwuFpOMZP7u9wjp6FMBeRTNj91HdlU3UMm7tbICSNZPW35eACHCOs1O9pXdsyqEnss1xCWnzi-9ybgQ9mFuBPk5-C8HHRj0HeaRce74iuZ",
    tags: ["Django", "Python", "CRUD"],
    category: "web",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan"
  },
  {
    id: "techbazar",
    title: "E-commerce Platform (TechBazar)",
    description: "A full-featured digital storefront with integrated SSLCommerz payment gateway. Ranked 4th in a high-profile web development competition.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-kcOkrllOUYDoS4h_N-LKVJ-sgZSnpohiSzrjJ2MBcprefqix-naa2cmlhSWlQKdR8gojJQnwIbYpXJfD0A0x5UbjTazxtyq9zJsiSAybYPuHuSIeYlx7kOrG05B3Lx0tv04d9mcqnNb8fkove57qy1lNRobEBWQsRoLVdzLOEGqyxCriXQ4Z9tqEYuSNglPO_xt4khBE9XjYOt2KL4H-wq87oAfav6Ks2e6dldpKOA6vlJ2cGhKDVd98q6fPIUHg0U4m3E6meglR",
    tags: ["Django", "SSLCommerz", "Python"],
    category: "web",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan"
  },
  {
    id: "library-manager",
    title: "Library Management System",
    description: "His first Django implementation exploring database normalization, backend system design principles, and automated inventory flows.",
    tags: ["Django", "Python", "Database"],
    category: "web",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan"
  },
  {
    id: "polish-calculator",
    title: "Polish Notation Calculator",
    description: "Algorithm-focused, mathematical calculator prioritizing clean data structures and expression evaluation workflows.",
    tags: ["Python", "Algorithms", "Data Structures"],
    category: "desktop",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan"
  }
];

export const SKILLS_DATA: Skill[] = [
  {
    name: "AI & ML",
    category: "languages",
    icon: "Brain",
    description: "Deep learning models, natural language processing, predictive algorithms"
  },
  {
    name: "Flutter",
    category: "mobile",
    icon: "Smartphone",
    description: "Premium cross-platform mobile apps, seamless layouts, responsive designs"
  },
  {
    name: "Research",
    category: "languages",
    icon: "Search",
    description: "Advanced system modeling, algorithm design, scientific computer science research"
  },
  {
    name: "Python",
    category: "languages",
    icon: "Code",
    description: "Intelligent analytics, data pipelines, and scalable microservices"
  },
  {
    name: "C/C++",
    category: "languages",
    icon: "Cpu",
    description: "System programming, high-performance algorithms, and hardware-level execution"
  }
];

export const ABOUT_CARDS = [
  {
    icon: "Brain",
    title: "AI & ML Developer",
    description: "Focusing on implementing artificial intelligence, deep learning models, intelligent chatbots, and integrating cutting-edge analytics into real-world applications.",
    color: "text-primary"
  },
  {
    icon: "Smartphone",
    title: "Flutter Craftsman",
    description: "Creating highly customized, premium cross-platform mobile experiences with Flutter and Dart. Precision-focused on pixel density, gestures, and fluid interactive loops.",
    color: "text-secondary"
  },
  {
    icon: "Search",
    title: "Scientific Research",
    description: "Deeply interested in computer science research, advanced algorithm designs, system performance modeling, and mathematical analysis of systems.",
    color: "text-tertiary"
  }
];
