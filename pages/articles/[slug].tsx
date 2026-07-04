import { META_ARTICLES, ARTICLES_LIST, Article } from '@/data/articles.data';
import { MetaDataProps } from '@/types/components/global';
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next-translate-routes';
import { useState } from 'react';
import classNames from 'classnames';
import styles from '@/styles/modules/Articles.module.scss';
import CharsInOut from '@/components/shared/gsap/CharsInOut';
import LinesInOut from '@/components/shared/gsap/LinesInOut';
import TranslateInOut from '@/components/shared/gsap/TranslateInOut';

export default function ArticleDetail({
    article
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const { locale } = useRouter();
    const [likes, setLikes] = useState(article.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState(article.comments);

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1);
            setIsLiked(false);
        } else {
            setLikes(likes + 1);
            setIsLiked(true);
        }
    };

    const handleComment = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const textarea = form.elements.namedItem('comment') as HTMLTextAreaElement;
        if (textarea.value.trim()) {
            setComments(comments + 1);
            textarea.value = '';
        }
    };

    if (!article) return null;

    return (
        <section className={styles['c-articleDetail']}>
            <div className="o-container">
                <div className={styles['c-articleDetail__header']}>
                    <TranslateInOut y="20px" delay={0.1}>
                        <div className={styles['c-articleDetail__header--meta']}>
                            <span>{article.category}</span> &mdash; <span>{article.date}</span>
                        </div>
                    </TranslateInOut>
                    <h1 className="u-uppercase">
                        <CharsInOut target="#article-title" delay={0.2}>
                            <span id="article-title">{article.title}</span>
                        </CharsInOut>
                    </h1>
                </div>

                <div className={styles['c-articleDetail__content']}>
                    <LinesInOut target="#article-content" delay={0.4}>
                        <div id="article-content">
                            <p>{article.content}</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </LinesInOut>
                </div>

                <TranslateInOut y="20px" delay={0.6}>
                    <div className={styles['c-articleDetail__interactions']}>
                        <button 
                            onClick={handleLike}
                            className={classNames({ [styles['is-active']]: isLiked })}
                        >
                            <svg viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            {likes} {locale === 'fr' ? 'J\'aime' : 'Likes'}
                        </button>
                        <button>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            {comments} {locale === 'fr' ? 'Commentaires' : 'Comments'}
                        </button>
                    </div>

                    <div className={styles['c-articleDetail__comments']}>
                        <h3>{locale === 'fr' ? 'Laissez un commentaire' : 'Leave a comment'}</h3>
                        <form className={styles['c-articleDetail__comments--form']} onSubmit={handleComment}>
                            <textarea 
                                name="comment" 
                                placeholder={locale === 'fr' ? 'Écrivez vos pensées ici...' : 'Write your thoughts here...'} 
                                required
                            />
                            <button type="submit">
                                {locale === 'fr' ? 'Publier' : 'Post comment'}
                            </button>
                        </form>
                    </div>
                </TranslateInOut>
            </div>
        </section>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: { params: { slug: string }, locale: string }[] = [];
    
    // Add paths for both languages
    Object.keys(ARTICLES_LIST).forEach((lang) => {
        ARTICLES_LIST[lang].forEach((article) => {
            paths.push({
                params: { slug: article.slug },
                locale: lang
            });
        });
    });

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<{
    metaData: MetaDataProps;
    article: Article;
}> = async ({ params, locale }) => {
    const lang = locale ?? 'en';
    const slug = params?.slug as string;
    
    const article = ARTICLES_LIST[lang].find(a => a.slug === slug);
    const metaData = { title: `${article?.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}` };

    if (!article) {
        return { notFound: true };
    }

    return {
        props: {
            metaData,
            article
        }
    };
};
