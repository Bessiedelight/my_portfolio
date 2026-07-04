import { Lang, MetaDataProps } from '@/types/components/global';
import { AboutHeaderProps } from '@/types/components/headers';
import { AboutIntroductionContent } from '@/types/components/introductions';
import image from 'next/image';

export const META_ABOUT: Lang<MetaDataProps> = {
    en: {
        title: `About | ${process.env.NEXT_PUBLIC_SITE_NAME}`
    },
    fr: {
        title: `À propos | ${process.env.NEXT_PUBLIC_SITE_NAME}`
    }
};

export const ABOUT_HEADER: Lang<AboutHeaderProps> = {
    en: {
        titles: ['Passionate', 'AI Engineer', ''],
        image: '/static/images/about-header.jpg'
    },
    fr: {
        titles: ['Ingénieur', 'IA', 'Passionné'],
        image: '/static/images/about-header.jpg'
    }
};

export const ABOUT_INTRODUCTION: Lang<AboutIntroductionContent> = {
    en: {
        content: [
            'I\'m an entry-level AI Engineer passionate about building intelligent systems that solve real problems. I specialize in designing multi-agent architectures, LLM-powered pipelines, and agentic workflows — from code review fleets that run ten specialized agents in parallel to production automation systems processing hundreds of requests per minute.',
            'I believe the best way to truly understand AI is to build it from the ground up. That\'s why I\'ve implemented transformers from scratch, designed human-in-the-loop safety patterns, and continuously push myself to learn what\'s next. Every project is an opportunity to go deeper.'
        ]
    },
    fr: {
        content: [
            'Je suis un ingénieur IA junior passionné par la construction de systèmes intelligents qui résolvent de vrais problèmes. Je me spécialise dans la conception d\'architectures multi-agents, de pipelines alimentés par des LLMs et de workflows agentiques — des flottes de revue de code exécutant dix agents spécialisés en parallèle aux systèmes d\'automatisation en production traitant des centaines de requêtes par minute.',
            'Je crois que la meilleure façon de vraiment comprendre l\'IA est de la construire de zéro. C\'est pourquoi j\'ai implémenté des transformers from scratch, conçu des patterns de sécurité avec intervention humaine, et je continue à me pousser pour apprendre ce qui vient ensuite. Chaque projet est une opportunité d\'aller plus loin.'
        ]
    }
};