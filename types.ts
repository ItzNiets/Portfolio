export type Language = 'en' | 'pt';

export interface Content {
  nav: {
    work: string;
    about: string;
    contact: string;
  };
  hero: {
    role1: string;
    role2: string;
    sub: string;
    cta: string;
  };
  about: {
    title: string;
    bio: string;
    educationTitle: string;
    education: {
      degree: string;
      uni: string;
      year: string;
    }[];
    skillsTitle: string;
    skills: {
      category: string;
      items: string[];
    }[];
    pcd: {
      title: string;
      desc: string;
    };
    setup: {
      title: string;
      desc: string;
    }
  };
  work: {
    title: string;
    viewProject: string;
  };
  contact: {
    title: string;
    email: string;
    phone: string;
    location: string;
    cta: string;
  };
}

export interface Project {
  id: number;
  title: string;
  category: string; // 'Video' | 'Design' | '3D'
  image: string;
  description: {
    en: string;
    pt: string;
  };
  tools: string[];
  size: 'small' | 'medium' | 'large'; // For bento grid layout
}