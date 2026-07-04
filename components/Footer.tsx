import { FooterProps } from '@/types/components/global';
import styles from '@/styles/modules/Footer.module.scss';
import { gsap } from 'gsap';
import useTransitionContext from '@/context/transitionContext';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { useRouter } from 'next-translate-routes';
import { getTranslation } from '@/utils/translation';
import Link from 'next-translate-routes/link';
import Button from './shared/Button';
import classNames from 'classnames';

export default function Footer({
    title,
    socialMedias
}: FooterProps) {
    const { locale } = useRouter();
    const { timeline, primaryEase, footerRef } = useTransitionContext();
    const copyright = getTranslation('All rights reserved', locale ?? '');

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            /* Intro animation */
            gsap.to(footerRef.current,
                {
                    opacity: 1,
                    ease: primaryEase,
                    duration: 1,
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top bottom',
                        end: 'bottom top'
                    }
                }
            );

            /* Outro animation */
            timeline?.add(
                gsap.to(footerRef.current,
                    {
                        opacity: 0,
                        ease: primaryEase,
                        duration: 0.45
                    }
                ),
                0
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <footer className={styles['c-footer']}>
            <div className="o-container">
                <div className={classNames
                    (
                        'o-grid',
                        styles['c-footer__row']
                    )}
                    ref={footerRef}
                    style={{ opacity: 0 }}
                >

                    <div className={styles['c-footer__title']}>
                        <div className={styles['c-footer__title--name']}>
                            <Link href="/" aria-label={process.env.NEXT_PUBLIC_SITE_NAME} scroll={false}>
                                {process.env.NEXT_PUBLIC_SITE_NAME}
                            </Link>
                        </div>
                        <div className={classNames
                            (
                                'o-wysiwyg',
                                styles['c-footer__title--jobTitle']
                            )}
                        >
                            <p>{title}</p>
                        </div>
                    </div>
                    <div className={styles['c-footer__socialLinks']}>
                        <ul>
                            {socialMedias.map(({ title, url }, i) => (
                                <li key={i}>
                                    <Button
                                        label={title}
                                        className="c-btn--external"
                                        externalHref={url}
                                        isExternal
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles['c-footer__copyright']}>
                        <div className={classNames(
                            'o-wysiwyg',
                            styles['c-footer__copyright--year']
                        )}>
                            <p>&copy; {new Date().getFullYear()}</p>
                        </div>
                        <div className={classNames(
                            'o-wysiwyg',
                            styles['c-footer__copyright--text']
                        )}>
                            <p>{copyright}</p>
                        </div>
                        <a
                            href="/admin"
                            className={styles['c-footer__admin']}
                            aria-label="Admin"
                            title="Admin"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}