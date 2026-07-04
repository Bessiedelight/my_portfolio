import { META_ARTICLES } from '@/data/articles.data';
import { MetaDataProps } from '@/types/components/global';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next-translate-routes';
import Image from 'next/image';
import classNames from 'classnames';
import styles from '@/styles/modules/Articles.module.scss';
import CharsInOut from '@/components/shared/gsap/CharsInOut';
import LinesInOut from '@/components/shared/gsap/LinesInOut';
import TranslateInOut from '@/components/shared/gsap/TranslateInOut';

export default function Articles({}: InferGetStaticPropsType<typeof getStaticProps>) {
    const { locale } = useRouter();
    const articles = useQuery(api.articles.list);

    const sorted = articles?.slice().sort((a, b) => a.order - b.order);

    return (
        <section className={styles['c-articles']}>
            <div className="o-container">
                <div className={styles['c-articles__header']}>
                    <h1 className="u-uppercase">
                        <CharsInOut target="#articles-title">
                            <span id="articles-title">
                                {locale === 'fr' ? 'Articles' : 'Articles'}
                            </span>
                        </CharsInOut>
                    </h1>
                    <LinesInOut target="#articles-subtitle" delay={0.2}>
                        <p id="articles-subtitle">
                            {locale === 'fr'
                                ? 'Découvrez mes dernières réflexions sur l\'IA, l\'ingénierie et le design.'
                                : 'Explore my latest thoughts on AI, engineering, and design.'}
                        </p>
                    </LinesInOut>
                </div>

                <div className={styles['c-articles__list']}>
                    {!articles ? (
                        <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>Loading articles...</div>
                    ) : sorted && sorted.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>No articles published yet.</div>
                    ) : (
                        sorted?.map((article, index) => (
                            <TranslateInOut
                                key={article._id}
                                delay={0.4 + (index * 0.1)}
                                y="20px"
                            >
                                <a
                                    href={article.mediumUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles['c-articles__item']}
                                >
                                    <div className={styles['c-articles__item--cover']}>
                                        <Image
                                            src={article.coverImage}
                                            alt={article.title}
                                            width={600}
                                            height={340}
                                            priority={index < 3}
                                        />
                                    </div>
                                    <h2 className={styles['c-articles__item--title']}>
                                        {article.title}
                                    </h2>
                                    <div className={styles['c-articles__item--footer']}>
                                        <span style={{ fontSize: '12px', opacity: 0.6 }}>
                                            Read on Medium →
                                        </span>
                                    </div>
                                </a>
                            </TranslateInOut>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export const getStaticProps: GetStaticProps<{
    metaData: MetaDataProps;
}> = async ({ locale }) => {
    const lang = locale ?? 'en';
    const metaData = META_ARTICLES[lang];

    return {
        props: {
            metaData
        }
    }
}
