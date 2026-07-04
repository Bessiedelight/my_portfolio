import '@/styles/style.scss';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import localFont from 'next/font/local';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { withTranslateRoutes } from 'next-translate-routes';
import { useRouter } from 'next-translate-routes/router';
import { useEffect, useState } from 'react';
import useNextCssRemovalPrevention from '@/hooks/useNextCssRemovalPrevention';
import { ThemeProvider } from 'next-themes';
import { TransitionContextProvider } from '@/context/transitionContext';
import { NavigationContextProvider } from '@/context/navigationContext';
import MetaData from '@/components/MetaData';
import Loader from '@/components/Loader';
import Layout from '@/components/Layout';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const neueMontreal = localFont({
    fallback: ['-apple-systen', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
    src: [
        {
            path: '../public/fonts/NeueMontreal-Regular.woff',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../public/fonts/NeueMontreal-Regular.woff2',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../public/fonts/NeueMontreal-Medium.woff',
            weight: '500',
            style: 'normal'
        },
        {
            path: '../public/fonts/NeueMontreal-Medium.woff2',
            weight: '500',
            style: 'normal'
        }
    ],
    display: 'swap'
});

gsap.registerPlugin(ScrollTrigger);

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const metaData = pageProps.metaData;

    /* Removes focus from next/link element after page change */
    useEffect(() => {
        document.activeElement instanceof HTMLElement && document.activeElement.blur();
    }, [router]);

    /* Temporary fix to avoid flash of unstyled content (FOUC) during route transitions */
    useNextCssRemovalPrevention();

    /* Pages with a custom getLayout bypass the portfolio shell entirely */
    if (Component.getLayout) {
        return (
            <>
                <style jsx global>
                    {`
                        :root {
                            --font-primary: ${neueMontreal.style.fontFamily};
                        }
                    `}
                </style>
                {Component.getLayout(<Component {...pageProps} />)}
            </>
        );
    }

    return (
        <>
             <ThemeProvider defaultTheme="light" disableTransitionOnChange>
                <MetaData {...metaData} />
                {isLoading &&
                    <Loader setIsLoading={setIsLoading} setIsReady={setIsReady} />
                }
                {isReady &&
                    <ConvexProvider client={convex}>
                        <TransitionContextProvider>
                            <NavigationContextProvider>
                                <style jsx global>
                                    {
                                        `
                                            :root {
                                                --font-primary: ${neueMontreal.style.fontFamily};
                                            }
                                        `
                                    }
                                </style>
                                <Layout>
                                    <Component {...pageProps} />
                                </Layout>
                            </NavigationContextProvider>
                        </TransitionContextProvider>
                    </ConvexProvider>
                }
            </ThemeProvider>
        </>
    );
}

export default withTranslateRoutes(App);
