import { Project, Skill } from "./types";

export const PORTFOLIO_OWNER = {
  name: "Abu Taher Siddiki Adnan",
  tagline: "AI/ML Enthusiast & Flutter Developer",
  subTitle: "Undergraduate CSE student at IIUC, Bangladesh. Engineering intelligent systems, advanced algorithm research, and premium cross-platform Flutter applications.",
  email: "abutahersiddikiadnan@gmail.com",
  personalEmail: "abutahersiddikiadnan@gmail.com",
  location: "Bangladesh",
  education: "Undergraduate Student, Department of CSE at IIUC",
  github: "https://github.com/Abu-Taher-Siddiki-Adnan",
  linkedin: "https://www.linkedin.com/in/abu-taher-siddiki-adnan/",
  facebook: "https://www.facebook.com/adnan.siddik.282",
  youtube: "https://www.youtube.com/@AbuTaherSiddikiAdnan",
  portraitUrl: "/images/myPic.png"
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "blood-hub",
    title: "Blood Hub",
    description: "A real-time cross-platform blood donor matching mobile application featuring location tracking and high-priority urgent requests.",
    tags: ["Flutter", "Firebase", "Real-time"],
    category: "mobile",
    image: "/images/blood_hub.png",
    websiteUrl: "https://blood-hub-bd.vercel.app/"
  },
  {
    id: "knot-note",
    title: "Knot – Firebase Note App",
    description: "Real-time cloud-based note-taking application using Firebase Firestore, dynamic queries, and user authentication secure protocols.",
    tags: ["Flutter", "Firebase", "Firestore"],
    category: "mobile",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan/Knot",
    image: "/images/Knot.png",
    downloadUrl: "https://github.com/Abu-Taher-Siddiki-Adnan/Knot/releases/tag/v1.0.0"
  },
  {
    id: "zendo-task",
    title: "ZenDo Task Manager",
    description: "Local task and productivity utility incorporating custom SQLite databases and background notification schedulers.",
    tags: ["Flutter", "SQLite", "Notifications"],
    category: "mobile",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan/ZenDo",
    image: "/images/Zendo.png",
    videoUrl: "https://www.youtube.com/watch?v=jfyld2fvy88",
    downloadUrl: "https://github.com/Abu-Taher-Siddiki-Adnan/ZenDo/releases/tag/v1.1.0"
  },
  {
    id: "medical-insurance-predictor",
    title: "Medical Insurance Cost Predictor",
    description: "A machine learning model that predicts estimated medical insurance costs based on personal and lifestyle factors such as age, BMI, smoking status, and region — trained on real-world insurance data using scikit-learn.",
    tags: ["Python", "Machine Learning", "scikit-learn"],
    category: "ml",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan/Medical_Insurance_Predictor",
    image: "/images/medical_insurance.png",
    demoUrl:"https://huggingface.co/spaces/Adnan282/Medical-Insurance-Predictor"
  },
  {
    id: "techbazar",
    title: "E-commerce Platform (TechBazar)",
    description: "A full-featured digital storefront with integrated SSLCommerz payment gateway. Ranked 4th in a high-profile web development competition.",
    image: "/images/tech.png",
    tags: ["Django", "SSLCommerz", "Python"],
    category: "web",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan/TechBazar",
    videoUrl: "https://youtu.be/-buVQigLGCo?si=hu-rIeuPmXizkvfz&t=242"
  },
  {
    id: "library-manager",
    title: "Library Management System",
    description: "His first Django implementation exploring database normalization, backend system design principles, and automated inventory flows.",
    tags: ["Django", "Python", "Database"],
    category: "web",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan/Library_Management_System",
    image: "/images/library.png",
    videoUrl:"https://www.youtube.com/watch?v=lyYiYlb2n_Q"
  },
  {
    id: "online-learning-platform",
    title: "Online Learning Platform",
    description: "A React-based educational platform developed as a course assignment for the Tools curriculum, featuring interactive lessons and a responsive dashboard.",
    tags: ["React", "JavaScript", "Web"],
    category: "web",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan/Online_Learning_Platform",
    image: "/images/olp.png",
    demoUrl:"https://learnify-omega-eight.vercel.app/"
  },
  {
    id: "shopease-bd",
    title: "ShopEase BD",
    description: "An assignment project built for the Tools & Technologies course, with an emphasis on responsive e-commerce layout and product browsing.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "web",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan/ShopEase_BD",
    image: "/images/shopease_bd.png",
    demoUrl: "https://abu-taher-siddiki-adnan.github.io/ShopEase_BD/"
  },
  {
    id: "student-management-system",
    title: "Student Management System",
    description: "A Python-driven student management tool built to streamline academic records, attendance tracking, and user workflows.",
    tags: ["Python", "Django", "Education"],
    category: "web",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan/Student_Management_System",
    image: "/images/student.png",
    videoUrl:"https://www.youtube.com/watch?v=-buVQigLGCo&t=98s"
  },
  {
    id: "polish-calculator",
    title: "Polish Notation Calculator",
    description: "Algorithm-focused, mathematical calculator prioritizing clean data structures and expression evaluation workflows.",
    tags: ["Python", "Algorithms", "Data Structures"],
    category: "web",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan/Calculator",
    image: "/images/calc.png",
    demoUrl:"https://calculator-opal-two-60.vercel.app/",
    videoUrl:"https://www.youtube.com/watch?v=d0XZmHHVIoo"
  },
  {
    id: "smart-shop",
    title: "Smart Shop",
    description: "A collaborative Tools course project for shop management featuring clean UI design and customer-facing storefront flows.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "web",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan/Smart_Shop",
    image: "/images/smartshop.png"
  },
  {
    id: "personality-quiz-flutter-app",
    title: "Personality Quiz Flutter App",
    description: "A first Flutter project delivering an interactive quiz experience, result analysis, and beautifully animated mobile screens.",
    tags: ["Flutter", "Dart", "Mobile"],
    category: "mobile",
    githubUrl: "https://github.com/Abu-Taher-Siddiki-Adnan/Personality_Quiz_Flutter_App",
    image: "/images/personality.jpg",
    downloadUrl:"https://github.com/Abu-Taher-Siddiki-Adnan/Personality_Quiz_Flutter_App/releases/tag/v1.0.0",
    videoUrl:"https://www.youtube.com/watch?v=2F92xFSqIXM&t=61s",

  },
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