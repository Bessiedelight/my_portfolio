import { Lang } from '@/types/components/global';
import { HomeHeaderProps } from '@/types/components/headers';
import { HomeIntroductionContent } from '@/types/components/introductions';
import { HomeFeaturedProjectContent } from '@/types/components/sections';

export const HOME_HEADER: Lang<HomeHeaderProps> = {
    en: {
        titles: ['AI', 'Engineer'],
        subfield: '',
        image: '/static/images/home-portrait.png',
        content: 'We taught machines to learn. Then to create. Now, they can act. I help make them take action.',
        name: ['Bessie Delight', 'Kekeli']
    },
    fr: {
        titles: ['Ingénieur', 'IA'],
        subfield: 'Machine Learning & LLMs',
        image: '/static/images/home-portrait.png',
        content: 'Conception d\'agents intelligents et systèmes ML évolutifs',
        name: ['Bessie Delight', 'Kekeli']
    }
};

export const HOME_INTRODUCTION: Lang<HomeIntroductionContent> = {
    en: {
        titles: [ 
            'I\'ve always been fascinated by how we can leverage powerful models to solve real-world problems.',
            '',
            'From fine-tuning models for specific domains to engineering how they interact with tools, systems, and even other models, I enjoy designing intelligent workflows that can make decisions and take meaningful actions.',
             '',
            'What excites me most is not just building AI, but orchestrating the components around it to create practical solutions that make a difference.'
        ],
        content: [
            'Turning intelligence into impact is something I genuinely love, and I hope the systems I build contribute to solving problems that matter.',
            ''
        ],
        button: {
            label: 'More about me',
            href: '/about'
        }
    },
    fr: {
        titles: [
            'Passionné par l\'Intelligence Artificielle, j\'ai toujours été enthousiaste à l\'idée de créer des systèmes intelligents. Accro aux LLMs et fréquemment impliqué dans des workflows basés sur des agents.',
            'Lorsque je ne suis pas en train d\'entraîner des modèles ou d\'explorer de nouveaux papiers de recherche en IA, je crée des projets personnels ou contribue à des bibliothèques ML open-source.'
        ],
        content: [
            'Au fil des années, j\'ai consacré du temps à convertir des travaux de recherche en applications ML prêtes pour la production, performantes et évolutives. Chaque projet est une opportunité de repousser les limites de l\'IA.',
            'J\'aime tout simplement travailler sur des problèmes d\'IA de pointe, seul ou avec des personnes avant-gardistes.'
        ],
        button: {
            label: 'En savoir plus sur moi',
            href: '/about'
        }
    }
};

export const HOME_FEATURED_PROJECT_CONTENT: Lang<HomeFeaturedProjectContent> = {
    en: {
        title: 'Featured work',
        button: {
            label: 'See all projects',
            href: {
                pathname: '/projects',
                query: { type: 'work' }
            }
        }
    },
    fr: {
        title: 'Projet en vedette',
        button: {
            label: 'Voir tous les projets',
            href: {
                pathname: '/projects',
                query: { type: 'work' }
            }
        }
    }
};

export const HOME_LATEST_PROJECT_CONTENT: Lang<HomeFeaturedProjectContent> = {
    en: {
        title: 'Latest personal project',
        button: {
            label: 'See all personal projects',
            href: {
                pathname: '/projects',
                query: { type: 'personal' }
            }
        }
    },
    fr: {
        title: 'Dernier projet personnel',
        button: {
            label: 'Voir tous les projets personnels',
            href: {
                pathname: '/projects',
                query: { type: 'personal' }
            }
        }
    }
};