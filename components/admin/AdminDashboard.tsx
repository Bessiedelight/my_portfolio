import { useState } from 'react';
import styles from '@/styles/modules/Admin.module.scss';
import AdminArticles from './AdminArticles';
import AdminProjects from './AdminProjects';
import AdminMessages from './AdminMessages';

type Tab = 'articles' | 'projects' | 'messages';

interface AdminDashboardProps {
    onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState<Tab>('articles');

    const tabs: { key: Tab; label: string; icon: JSX.Element }[] = [
        {
            key: 'articles',
            label: 'Articles',
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                </svg>
            ),
        },
        {
            key: 'projects',
            label: 'Projects',
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
            ),
        },
        {
            key: 'messages',
            label: 'Messages',
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            ),
        },
    ];

    return (
        <div className={styles['c-admin__dashboard']}>
            <header className={styles['c-admin__header']}>
                <div className={styles['c-admin__header-left']}>
                    <h1>Dashboard</h1>
                </div>
                <button
                    className={styles['c-admin__logout']}
                    onClick={onLogout}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </button>
            </header>

            <nav className={styles['c-admin__tabs']}>
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`${styles['c-admin__tab']} ${activeTab === tab.key ? styles['is-active'] : ''}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </nav>

            <div className={styles['c-admin__content']}>
                {activeTab === 'articles' && <AdminArticles />}
                {activeTab === 'projects' && <AdminProjects />}
                {activeTab === 'messages' && <AdminMessages />}
            </div>
        </div>
    );
}
