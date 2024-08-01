import '../styles/globals.css';
import Layout from '../layout/Application';
import { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import LoadingScreen from '../components/LoadingScreen';

function MyApp({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        Router.events.on('routeChangeStart', handleStart);
        Router.events.on('routeChangeComplete', handleComplete);
        Router.events.on('routeChangeError', handleComplete);
        
        return () => {
            Router.events.off('routeChangeStart', handleStart);
            Router.events.off('routeChangeComplete', handleComplete);
            Router.events.off('routeChangeError', handleComplete);
        };
    }, []);

    return (
        <>
            {loading && <LoadingScreen />}
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
