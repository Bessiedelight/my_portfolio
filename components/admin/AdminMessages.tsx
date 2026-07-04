import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import styles from '@/styles/modules/Admin.module.scss';

export default function AdminMessages() {
    const messages = useQuery(api.messages.list);

    const sorted = messages?.slice().sort((a, b) => b.createdAt - a.createdAt);

    const formatDate = (ts: number) => {
        return new Date(ts).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    return (
        <div>
            <div className={styles['c-admin__section-header']}>
                <h2>Messages</h2>
                <span className={styles['c-admin__count']}>{messages?.length ?? 0} total</span>
            </div>

            {!messages ? (
                <div className={styles['c-admin__loading']}>Loading...</div>
            ) : sorted && sorted.length === 0 ? (
                <div className={styles['c-admin__empty']}>No messages yet.</div>
            ) : (
                <div className={styles['c-admin__messages']}>
                    {sorted?.map((msg) => (
                        <div key={msg._id} className={styles['c-admin__message']}>
                            <div className={styles['c-admin__message-header']}>
                                <div className={styles['c-admin__message-sender']}>
                                    <strong>{msg.firstname} {msg.lastname}</strong>
                                    <a href={`mailto:${msg.email}`} className={styles['c-admin__link']}>{msg.email}</a>
                                </div>
                                <time className={styles['c-admin__message-date']}>{formatDate(msg.createdAt)}</time>
                            </div>
                            <p className={styles['c-admin__message-body']}>{msg.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
