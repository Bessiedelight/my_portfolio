import { HomeHeaderProps } from '@/types/components/headers';
import styles from '@/styles/modules/HomeHeader.module.scss';
import CharsInOut from "./shared/gsap/CharsInOut";
import ClipPathInOut from './shared/gsap/ClipPathInOut';
import TranslateInOut from './shared/gsap/TranslateInOut';
import LinesInOut from './shared/gsap/LinesInOut';
import Image from 'next/image';
import classNames from 'classnames';
import { useRef, useState, useEffect, useCallback } from 'react';
import ChatPopup from './ChatPopup';

export default function HomeHeader({
    titles,
    subfield,
    image,
    content,
    name
}: HomeHeaderProps) {
    const mediaRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const [nameFontSize, setNameFontSize] = useState(16);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const fitText = useCallback(() => {
        if (!mediaRef.current || !nameRef.current) return;
        const containerWidth = mediaRef.current.offsetWidth;
        if (containerWidth > 0) {
            setNameFontSize(containerWidth * 0.095);
        }
    }, []);

    useEffect(() => {
        if (!mediaRef.current) return;
        
        const resizeObserver = new ResizeObserver(() => {
            fitText();
        });
        
        resizeObserver.observe(mediaRef.current);
        fitText();
        
        return () => resizeObserver.disconnect();
    }, [fitText]);

    return (
        <section className={styles['c-homeHeader']}>
            <ChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            <div className={classNames(
                'o-container',
                styles['c-homeHeader__container']
            )}>
                <div className={classNames(
                    'o-grid',
                    styles['c-homeHeader__grid']
                )}>
                    <div className={styles['c-homeHeader__title']}>
                        <h1 className="u-margin--none">
                            {titles.map((title, i) => (
                                <CharsInOut
                                    key={i}
                                    delay={0.46}
                                    target={`#header-title-${i}`}
                                >
                                    <span id={`header-title-${i}`}>
                                        {title}
                                    </span>
                                </CharsInOut>
                            ))}
                        </h1>
                        <div className="u-overflow--hidden">
                            <TranslateInOut
                                fade={false}
                                delay={0.46}
                                y="100%"
                            >
                                <div className={styles['c-homeHeader__title--subfield']}>
                                    <h2 className="h4 u-margin--none u-uppercase">{subfield}</h2>
                                </div>
                            </TranslateInOut>
                        </div>
                    </div>
                    <div className={styles['c-homeHeader__media']} ref={mediaRef}>
                        <ClipPathInOut
                            fade={false}
                            delay={1}
                            clipPath="inset(100% 0% 0% 0%)"
                        >
                            <div className={styles['c-homeHeader__media--img']}>
                                <button 
                                    className={styles['c-homeHeader__media--ask']}
                                    onClick={() => setIsChatOpen(true)}
                                >
                                    <span></span>
                                </button>
                                <picture>
                                    <Image
                                        alt={name.join(' ')}
                                        src={image}
                                        width={480}
                                        height={628}
                                        priority
                                    />
                                </picture>
                            </div>
                        </ClipPathInOut>
                        <div className={styles['c-homeHeader__name']}>
                            <h2
                                ref={nameRef}
                                className="u-margin--none u-uppercase"
                                style={{ fontSize: `${nameFontSize}px` }}
                            >
                                {name.map((element, i) => (
                                    <CharsInOut
                                        key={i}
                                        delay={0.46}
                                        target={`#header-name-${i}`}
                                    >
                                        <span id={`header-name-${i}`}>
                                            {element}
                                        </span>
                                    </CharsInOut>
                                ))}
                            </h2>
                        </div>
                    </div>
                    <div className={styles['c-homeHeader__text']}>
                        <LinesInOut
                            delay={1}
                            target="#text"
                        >
                            <div className="o-wysiwyg u-uppercase">
                                <p id="text">{content}</p>
                            </div>
                        </LinesInOut>
                    </div>
                </div>
            </div>
        </section>
    );
};