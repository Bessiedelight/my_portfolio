import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import AdminAuth from '@/components/admin/AdminAuth';
import AdminDashboard from '@/components/admin/AdminDashboard';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function AdminPage() {
    const [token, setToken] = useState<string | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const stored = sessionStorage.getItem('admin_token');
        if (stored) {
            fetch('/api/admin/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: stored }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.valid) setToken(stored);
                    else sessionStorage.removeItem('admin_token');
                })
                .catch(() => sessionStorage.removeItem('admin_token'))
                .finally(() => setChecking(false));
        } else {
            setChecking(false);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('admin_token');
        setToken(null);
    };

    if (checking) {
        return (
            <>
                <Head><title>Admin | Portfolio</title></Head>
                <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0b' }}>
                    <div style={{ color: '#888', fontSize: '14px' }}>Loading...</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Admin | Portfolio</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <ConvexProvider client={convex}>
                {token ? (
                    <AdminDashboard onLogout={handleLogout} />
                ) : (
                    <AdminAuth onAuthenticated={setToken} />
                )}
            </ConvexProvider>
        </>
    );
}

/* Bypass the portfolio Layout for this page */
AdminPage.getLayout = (page: React.ReactElement) => page;
