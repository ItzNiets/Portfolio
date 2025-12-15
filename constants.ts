import { Content, Project } from './types';

export const CONTENT: Record<string, Content> = {
  en: {
    nav: {
      work: 'Works',
      about: 'Profile',
      contact: 'Contact',
    },
    hero: {
      role1: 'VISUAL',
      role2: 'PRODUCER',
      sub: 'Cinematic VFX • Motion • Art Direction',
      cta: 'View Selected Works',
    },
    about: {
      title: 'PROFILE',
      bio: 'I am a 19-year-old Digital Games student at PUCPR with a relentless focus on digital art and post-production. My workflow combines technical precision with creative chaos. I am an autodidact, organized, and driven by the pursuit of visual perfection.',
      educationTitle: 'ACADEMIC DATA',
      education: [
        {
          degree: 'Bachelor in Digital Games',
          uni: 'Pontifícia Universidade Católica do Paraná (PUCPR)',
          year: '2025 - 2028 (Expected)',
        },
        {
          degree: 'High School',
          uni: 'Colégio Integral',
          year: 'Completed 2024',
        }
      ],
      skillsTitle: 'ARSENAL',
      skills: [
        { category: 'Post-Production', items: ['DaVinci Resolve (Adv)', 'Adobe Premiere'] },
        { category: 'Visual Design', items: ['Photoshop (Adv)', 'Composition', 'Manipulation'] },
        { category: 'Motion & 3D', items: ['After Effects', 'Blender', 'Generative AI'] },
      ],
      pcd: {
        title: 'Focus & Inclusion',
        desc: 'PCD Professional (Partial hearing loss/Device user). This perspective grants me exceptional adaptation for digital communication and independence.',
      },
      setup: {
        title: 'Infrastructure',
        desc: 'Owner of a high-performance workstation capable of heavy 3D rendering and 4K video workflows. Remote-ready.',
      }
    },
    work: {
      title: 'OPUS MAGNUM',
      viewProject: 'Inspect Asset',
    },
    contact: {
      title: 'ESTABLISH LINK',
      email: 'Email',
      phone: 'Phone',
      location: 'Base of Operations',
      cta: 'Let\'s create something impossible.',
    }
  },
  pt: {
    nav: {
      work: 'Trabalhos',
      about: 'Perfil',
      contact: 'Contato',
    },
    hero: {
      role1: 'PRODUTOR',
      role2: 'VISUAL',
      sub: 'VFX Cinemático • Motion • Direção de Arte',
      cta: 'Ver Trabalhos Selecionados',
    },
    about: {
      title: 'PERFIL',
      bio: 'Estudante de Jogos Digitais de 19 anos na PUCPR com foco obsessivo em arte digital e pós-produção. Meu fluxo combina precisão técnica com caos criativo. Autodidata, organizado e movido pela busca da perfeição visual.',
      educationTitle: 'DADOS ACADÊMICOS',
      education: [
        {
          degree: 'Bacharelado em Jogos Digitais',
          uni: 'Pontifícia Universidade Católica do Paraná (PUCPR)',
          year: '2025 - 2028 (Previsão)',
        },
        {
          degree: 'Ensino Médio',
          uni: 'Colégio Integral',
          year: 'Concluído 2024',
        }
      ],
      skillsTitle: 'ARSENAL',
      skills: [
        { category: 'Pós-Produção', items: ['DaVinci Resolve (Avançado)', 'Adobe Premiere'] },
        { category: 'Design Visual', items: ['Photoshop (Avançado)', 'Composição', 'Manipulação'] },
        { category: 'Motion & 3D', items: ['After Effects', 'Blender', 'IA Generativa'] },
      ],
      pcd: {
        title: 'Inclusão & Foco',
        desc: 'Profissional PCD (Deficiência auditiva parcial/Usuário de aparelho). Essa perspectiva me garante adaptação excepcional para comunicação digital e total independência.',
      },
      setup: {
        title: 'Infraestrutura',
        desc: 'Proprietário de workstation de alta performance capaz de renderização 3D pesada e fluxos de vídeo 4K. Pronto para remoto.',
      }
    },
    work: {
      title: 'OPUS MAGNUM',
      viewProject: 'Inspecionar',
    },
    contact: {
      title: 'ESTABELECER LINK',
      email: 'Email',
      phone: 'Telefone',
      location: 'Base de Operações',
      cta: 'Vamos criar o impossível.',
    }
  }
};

// NOTE: To display your own images:
// 1. Create a folder named "public" in your project root.
// 2. Inside "public", create a folder named "images".
// 3. Add your image files there (e.g., project-1.jpg).
// 4. Update the 'image' path below to match your filename: 'images/project-1.jpg'.

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Neon Genesis',
    category: 'Design',
    // Example: Replace with 'images/neon-genesis.jpg' once you upload the file
    image: 'images/project-1.jpg',
    description: {
      en: 'Surrealist composition using advanced masking techniques.',
      pt: 'Composição surrealista usando técnicas avançadas de máscara.',
    },
    tools: ['Photoshop', 'MidJourney'],
    size: 'large',
  },
  {
    id: 2,
    title: 'Kinetic Flow',
    category: 'Video',
    image: 'images/project-2.jpg',
    description: {
      en: 'Music video color grading and rhythmic editing.',
      pt: 'Color grading de videoclipe e edição rítmica.',
    },
    tools: ['DaVinci Resolve', 'Premiere'],
    size: 'medium',
  },
  {
    id: 3,
    title: 'Cyberpunk Asset',
    category: '3D',
    image: 'images/project-3.jpg',
    description: {
      en: 'Hard surface modeling for game environment.',
      pt: 'Modelagem hard surface para ambiente de jogo.',
    },
    tools: ['Blender'],
    size: 'small',
  },
  {
    id: 4,
    title: 'Void Walker',
    category: 'VFX',
    image: 'images/project-4.jpg',
    description: {
      en: 'Motion tracking and particle effects composition.',
      pt: 'Motion tracking e composição de efeitos de partículas.',
    },
    tools: ['After Effects'],
    size: 'medium',
  },
   {
    id: 5,
    title: 'Ethereal Edit',
    category: 'Video',
    image: 'images/project-5.jpg',
    description: {
      en: 'Commercial montage with fluid transitions.',
      pt: 'Montagem comercial com transições fluidas.',
    },
    tools: ['DaVinci Resolve'],
    size: 'small',
  },
];