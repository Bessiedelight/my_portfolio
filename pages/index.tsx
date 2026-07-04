import { HOME_FEATURED_PROJECT_CONTENT, HOME_HEADER, HOME_INTRODUCTION, HOME_LATEST_PROJECT_CONTENT } from '@/data/home.data';
import { CALL_TO_ACTION } from '@/data/global.data';
import { CallToActionContent } from '@/types/components/global';
import { HomeHeaderProps } from '@/types/components/headers';
import { HomeIntroductionContent } from '@/types/components/introductions';
import { HomeFeaturedProjectContent } from '@/types/components/sections';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useMemo } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import HomeHeader from '@/components/HomeHeader';
import HomeIntroduction from '@/components/HomeIntroduction';
import HomeFeaturedProject from '@/components/HomeFeaturedProject';
import CallToAction from '@/components/CallToAction';

export default function Home({
    homeHeader,
    homeIntroduction,
    homeFeaturedProjectContent,
    homeLatestProjectContent,
    callToAction
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const allProjects = useQuery(api.projects.list);

    const featuredWork = useMemo(() => {
        if (!allProjects) return null;
        const work = allProjects
            .filter(p => p.type === 'work')
            .sort((a, b) => a.order - b.order);
        if (work.length === 0) return null;
        return {
            title: work[0].title,
            description: work[0].description,
            image: work[0].image,
            url: work[0].url,
            githubUrl: work[0].githubUrl,
        };
    }, [allProjects]);

    const featuredPersonal = useMemo(() => {
        if (!allProjects) return null;
        const personal = allProjects
            .filter(p => p.type === 'personal')
            .sort((a, b) => a.order - b.order);
        if (personal.length === 0) return null;
        return {
            title: personal[0].title,
            description: personal[0].description,
            image: personal[0].image,
            url: personal[0].url,
            githubUrl: personal[0].githubUrl,
        };
    }, [allProjects]);

    return (
        <>
            <HomeHeader
                {...homeHeader}
            />
            <HomeIntroduction
                index="01"
                {...homeIntroduction}
            />
            {featuredWork &&
                <HomeFeaturedProject
                    index="02"
                    {...homeFeaturedProjectContent}
                    project={featuredWork}
                />
            }
            {featuredPersonal &&
                <HomeFeaturedProject
                    index="03"
                    {...homeLatestProjectContent}
                    project={featuredPersonal}
                />
            }
            <CallToAction
                index="04"
                {...callToAction}
            />
        </>
    )
}

export const getStaticProps: GetStaticProps<{
    homeHeader: HomeHeaderProps;
    homeIntroduction: HomeIntroductionContent;
    homeFeaturedProjectContent: HomeFeaturedProjectContent;
    homeLatestProjectContent: HomeFeaturedProjectContent;
    callToAction: CallToActionContent;
}> = async ({ locale }) => {
    const lang = locale ?? '';
    const homeHeader = HOME_HEADER[lang];
    const homeIntroduction = HOME_INTRODUCTION[lang];
    const homeFeaturedProjectContent = HOME_FEATURED_PROJECT_CONTENT[lang];
    const homeLatestProjectContent = HOME_LATEST_PROJECT_CONTENT[lang];
    const callToAction = CALL_TO_ACTION[lang];

    return {
        props: {
            homeHeader,
            homeIntroduction,
            homeFeaturedProjectContent,
            homeLatestProjectContent,
            callToAction
        }
    }
}