import { useState } from 'react';
import styles from '@/styles/modules/Admin.module.scss';

interface AdminAuthProps {
    onAuthenticated: (token: string) => void;
}

export default function AdminAuth({ onAuthenticated }: AdminAuthProps) {
    const [passphrase, setPassphrase] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ passphrase }),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                sessionStorage.setItem('admin_token', data.token);
                onAuthenticated(data.token);
            } else {
                setError(data.error || 'Authentication failed');
                setPassphrase('');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles['c-admin__auth']}>
            <div className={styles['c-admin__auth-card']}>
                <div className={styles['c-admin__auth-icon']}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>
                <h1>Admin Access</h1>
                <p>Enter the admin passphrase to continue.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                        placeholder="Passphrase"
                        autoFocus
                        disabled={loading}
                    />
                    {error && <div className={styles['c-admin__auth-error']}>{error}</div>}
                    <button type="submit" disabled={loading || !passphrase}>
                        {loading ? 'Verifying...' : 'Unlock'}
                    </button>
                </form>
            </div>
        </div>
    );
}
