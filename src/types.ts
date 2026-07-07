export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  category: 'web' | 'mobile' | 'desktop';
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
}

export interface Skill {
  name: string;
  category: 'core' | 'backend' | 'frontend' | 'mobile' | 'languages';
  icon: string; // lucide icon name
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}
