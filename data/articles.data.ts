import { Lang, MetaDataProps, CallToActionContent } from '@/types/components/global';

export const META_ARTICLES: Lang<MetaDataProps> = {
    en: {
        title: `Articles | ${process.env.NEXT_PUBLIC_SITE_NAME}`
    },
    fr: {
        title: `Articles | ${process.env.NEXT_PUBLIC_SITE_NAME}`
    }
};

export type Article = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    content: string;
    coverImage: string;
    likes: number;
    comments: number;
};

export const ARTICLES_LIST: Lang<Article[]> = {
    en: [
        {
            slug: 'understanding-llms',
            title: 'Understanding Large Language Models in 2026',
            excerpt: 'A deep dive into the architecture and practical applications of modern LLMs.',
            date: 'June 15, 2026',
            category: 'AI & Machine Learning',
            content: 'Large Language Models (LLMs) have revolutionized the way we interact with technology. This article explores the fundamental concepts behind them...',
            coverImage: '/static/images/article-llms-cover.png',
            likes: 124,
            comments: 12
        },
        {
            slug: 'building-agentic-workflows',
            title: 'Building Agentic Workflows with LangGraph',
            excerpt: 'How to structure multi-agent systems for complex problem solving.',
            date: 'May 28, 2026',
            category: 'Engineering',
            content: 'Multi-agent systems represent the next frontier of AI application development. By utilizing frameworks like LangGraph...',
            coverImage: '/static/images/article-agents-cover.png',
            likes: 89,
            comments: 5
        },
        {
            slug: 'future-of-frontend',
            title: 'The Future of Frontend Development',
            excerpt: 'How AI is reshaping the way we build user interfaces.',
            date: 'April 10, 2026',
            category: 'Web Development',
            content: 'Frontend development is shifting from component assembly to prompt-driven UI generation. Here is what you need to know...',
            coverImage: '/static/images/article-frontend-cover.png',
            likes: 256,
            comments: 34
        }
    ],
    fr: [
        {
            slug: 'understanding-llms',
            title: 'Comprendre les grands modèles de langage en 2026',
            excerpt: 'Une plongée approfondie dans l\'architecture et les applications pratiques des LLM modernes.',
            date: '15 Juin 2026',
            category: 'IA & Apprentissage Automatique',
            content: 'Les grands modèles de langage (LLM) ont révolutionné la façon dont nous interagissons avec la technologie...',
            coverImage: '/static/images/article-llms-cover.png',
            likes: 124,
            comments: 12
        },
        {
            slug: 'building-agentic-workflows',
            title: 'Créer des flux de travail agentiques avec LangGraph',
            excerpt: 'Comment structurer des systèmes multi-agents pour la résolution de problèmes complexes.',
            date: '28 Mai 2026',
            category: 'Ingénierie',
            content: 'Les systèmes multi-agents représentent la prochaine frontière du développement d\'applications d\'IA...',
            coverImage: '/static/images/article-agents-cover.png',
            likes: 89,
            comments: 5
        },
        {
            slug: 'future-of-frontend',
            title: 'L\'avenir du développement Frontend',
            excerpt: 'Comment l\'IA remodèle la façon dont nous concevons les interfaces utilisateur.',
            date: '10 Avril 2026',
            category: 'Développement Web',
            content: 'Le développement Frontend passe de l\'assemblage de composants à la génération d\'interface utilisateur guidée par des invites...',
            coverImage: '/static/images/article-frontend-cover.png',
            likes: 256,
            comments: 34
        }
    ]
};
