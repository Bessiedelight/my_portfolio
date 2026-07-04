import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import styles from '@/styles/modules/Admin.module.scss';

interface ArticleForm {
    title: string;
    coverImage: string;
    mediumUrl: string;
    order: number;
}

const emptyForm: ArticleForm = { title: '', coverImage: '', mediumUrl: '', order: 0 };

export default function AdminArticles() {
    const articles = useQuery(api.articles.list);
    const createArticle = useMutation(api.articles.create);
    const updateArticle = useMutation(api.articles.update);
    const removeArticle = useMutation(api.articles.remove);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<Id<"articles"> | null>(null);
    const [form, setForm] = useState<ArticleForm>(emptyForm);
    const [saving, setSaving] = useState(false);

    const openCreate = () => {
        setEditingId(null);
        setForm({ ...emptyForm, order: (articles?.length ?? 0) + 1 });
        setShowForm(true);
    };

    const openEdit = (a: any) => {
        setEditingId(a._id);
        setForm({ title: a.title, coverImage: a.coverImage, mediumUrl: a.mediumUrl, order: a.order });
        setShowForm(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingId) await updateArticle({ id: editingId, ...form });
            else await createArticle(form);
            setShowForm(false);
            setForm(emptyForm);
            setEditingId(null);
        } catch (err) { console.error(err); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id: Id<"articles">) => {
        if (window.confirm('Delete this article?')) await removeArticle({ id });
    };

    const sorted = articles?.slice().sort((a, b) => a.order - b.order);

    return (
        <div>
            <div className={styles['c-admin__section-header']}>
                <h2>Articles</h2>
                <button className={styles['c-admin__btn-primary']} onClick={openCreate}>+ New Article</button>
            </div>

            {showForm && (
                <div className={styles['c-admin__modal-overlay']} onClick={() => setShowForm(false)}>
                    <div className={styles['c-admin__modal']} onClick={e => e.stopPropagation()}>
                        <div className={styles['c-admin__modal-header']}>
                            <h3>{editingId ? 'Edit Article' : 'New Article'}</h3>
                            <button onClick={() => setShowForm(false)} className={styles['c-admin__modal-close']}>&times;</button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className={styles['c-admin__form-group']}>
                                <label>Title</label>
                                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                            </div>
                            <div className={styles['c-admin__form-group']}>
                                <label>Cover Image URL</label>
                                <input type="text" value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})} required />
                            </div>
                            <div className={styles['c-admin__form-group']}>
                                <label>Medium URL</label>
                                <input type="url" value={form.mediumUrl} onChange={e => setForm({...form, mediumUrl: e.target.value})} required />
                            </div>
                            <div className={styles['c-admin__form-group']}>
                                <label>Display Order</label>
                                <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)||0})} />
                            </div>
                            <div className={styles['c-admin__modal-actions']}>
                                <button type="button" className={styles['c-admin__btn-secondary']} onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className={styles['c-admin__btn-primary']} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {!articles ? (
                <div className={styles['c-admin__loading']}>Loading...</div>
            ) : sorted && sorted.length === 0 ? (
                <div className={styles['c-admin__empty']}>No articles yet. Create your first one!</div>
            ) : (
                <div className={styles['c-admin__table-wrap']}>
                    <table className={styles['c-admin__table']}>
                        <thead><tr><th>#</th><th>Title</th><th>Medium URL</th><th>Actions</th></tr></thead>
                        <tbody>
                            {sorted?.map(a => (
                                <tr key={a._id}>
                                    <td>{a.order}</td>
                                    <td>{a.title}</td>
                                    <td><a href={a.mediumUrl} target="_blank" rel="noopener noreferrer" className={styles['c-admin__link']}>{a.mediumUrl.substring(0, 40)}{a.mediumUrl.length > 40 ? '...' : ''}</a></td>
                                    <td>
                                        <div className={styles['c-admin__row-actions']}>
                                            <button onClick={() => openEdit(a)} className={styles['c-admin__btn-icon']} title="Edit">&#9998;</button>
                                            <button onClick={() => handleDelete(a._id)} className={`${styles['c-admin__btn-icon']} ${styles['c-admin__btn-danger']}`} title="Delete">&#128465;</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
