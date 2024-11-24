import type { Project, Skill } from '~/types/portfolio'

export const usePortfolioData = () => {
  const projects = ref<Project[]>([
    {
      id: 'mantis',
      title: 'Mantis Mitmachprojekt',
      subtitle: 'Ecological Research Platform',
      description: 'A citizen science platform for tracking Mantis religiosa populations across Germany.',
      tech: ['Vue.js', 'Flask', 'PostgreSQL'],
      link: 'https://gottesanbeterin-gesucht.de',
      repo: 'https://gitlab.com/opendata-apps/mantis'
    },
    {
      id: 'fingerprint',
      title: 'Browser Fingerprinting',
      subtitle: 'Privacy Research',
      description: 'Advanced browser fingerprinting techniques and countermeasures for web privacy.',
      tech: ['JavaScript', 'WebAPI', 'Security']
    },
    {
      id: 'llm',
      title: 'LLM Integration',
      subtitle: 'AI Platform',
      description: 'Enterprise solution for seamless integration of language models.',
      tech: ['Python', 'API', 'NLP']
    },
    {
      id: 'ai',
      title: 'AI',
      subtitle: 'AI Platform',
      description: 'Enterprise solution for seamless integration of language models.',
      tech: ['Python', 'API', 'NLP']
    },
    {
      id: 'portfolio',
      title: 'Personal Portfolio',
      subtitle: 'Showcase of Projects',
      description: 'A personal portfolio website to showcase my projects and skills.',
      tech: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
      link: 'https://leonkohli.dev',
      repo: 'https://github.com/leonkohli/portfolio'
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Platform',
      subtitle: 'Online Shopping',
      description: 'A full-featured e-commerce platform with payment integration.',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: 'https://example-ecommerce.com',
      repo: 'https://github.com/example/ecommerce'
    },
    {
      id: 'blog',
      title: 'Personal Blog',
      subtitle: 'Blogging Platform',
      description: 'A blogging platform to share thoughts and articles.',
      tech: ['Gatsby', 'GraphQL', 'Markdown'],
      link: 'https://leonkohli.dev/blog',
      repo: 'https://github.com/leonkohli/blog'
    },
    {
      id: 'chatapp',
      title: 'Real-time Chat Application',
      subtitle: 'Messaging App',
      description: 'A real-time chat application using WebSocket.',
      tech: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      link: 'https://example-chatapp.com',
      repo: 'https://github.com/example/chatapp'
    },
    {
      id: 'weatherapp',
      title: 'Weather App',
      subtitle: 'Weather Forecast',
      description: 'A weather application that provides real-time weather updates.',
      tech: ['React', 'OpenWeatherMap API'],
      link: 'https://example-weatherapp.com',
      repo: 'https://github.com/example/weatherapp'
    },
    {
      id: 'taskmanager',
      title: 'Task Manager',
      subtitle: 'Productivity Tool',
      description: 'A task management tool to organize and prioritize tasks.',
      tech: ['Angular', 'Node.js', 'MongoDB'],
      link: 'https://example-taskmanager.com',
      repo: 'https://github.com/example/taskmanager'
    },
    {
      id: 'recipeapp',
      title: 'Recipe Finder',
      subtitle: 'Cooking App',
      description: 'An application to find and share recipes.',
      tech: ['Vue.js', 'API', 'Tailwind CSS'],
      link: 'https://example-recipeapp.com',
      repo: 'https://github.com/example/recipeapp'
    },
    {
      id: 'fitnessapp',
      title: 'Fitness Tracker',
      subtitle: 'Health App',
      description: 'A fitness tracking application to monitor workouts and progress.',
      tech: ['React Native', 'Firebase'],
      link: 'https://example-fitnessapp.com',
      repo: 'https://github.com/example/fitnessapp'
    },
    {
      id: 'musicapp',
      title: 'Music Streaming App',
      subtitle: 'Music Platform',
      description: 'A music streaming application with playlist features.',
      tech: ['Vue.js', 'Node.js', 'MongoDB'],
      link: 'https://example-musicapp.com',
      repo: 'https://github.com/example/musicapp'
    },
    {
      id: 'newsapp',
      title: 'News Aggregator',
      subtitle: 'News Platform',
      description: 'An application that aggregates news from various sources.',
      tech: ['React', 'News API'],
      link: 'https://example-newsapp.com',
      repo: 'https://github.com/example/newsapp'
    }
    
  ])

  return {
    projects,
  }
} 