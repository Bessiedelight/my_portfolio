import { LoaderProps } from '@/types/components/global';
import styles from '@/styles/modules/Loader.module.scss';
import gsap from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';
import { useRef, useState, useEffect } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(CustomEase);
}

const aiTechStacks = [
    { text: 'Langchain', style: { fontFamily: 'system-ui', fontWeight: 600 } },
    { text: 'Pytorch', style: { fontFamily: 'system-ui', fontWeight: 600 } },
    { text: 'Llamaindex', style: { fontFamily: 'system-ui', fontWeight: 600 } },
    { text: 'Tensorflow', style: { fontFamily: 'system-ui', fontWeight: 600 } },
    { text: 'Hugging face', style: { fontFamily: 'system-ui', fontWeight: 600 } }
];

export default function Loader({
    setIsLoading,
    setIsReady
}: LoaderProps) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % aiTechStacks.length);
        }, 300);
        return () => clearInterval(interval);
    }, []);

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(textRef.current, {
                opacity: 0,
                delay: 1.5,
                duration: 0.3
            });

            gsap.to(loaderRef.current, {
                ease: CustomEase.create('primaryEase', 'M0,0 C0.62,0.05 0.01,0.99 1,1'),
                scaleY: 0,
                transformOrigin: '50% 0',
                willChange: 'transform',
                delay: 1.8,
                duration: 1.25,
                onStart: () => {
                    setIsReady(true);
                },
                onComplete: () => {
                    setIsLoading(false);
                }
            });
        });

        return () => ctx.revert();
    }, []);

    const currentStack = aiTechStacks[wordIndex];

    return (
        <div className={styles['c-loader']} ref={loaderRef}>
            <div 
                ref={textRef} 
                className={styles['c-loader__text']}
                style={{
                    fontFamily: currentStack.style.fontFamily,
                    fontWeight: currentStack.style.fontWeight,
                    fontStyle: currentStack.style.fontStyle || 'normal',
                    letterSpacing: currentStack.style.letterSpacing || '0.1em'
                }}
            >
                {currentStack.text}
            </div>
        </div>
    );
};