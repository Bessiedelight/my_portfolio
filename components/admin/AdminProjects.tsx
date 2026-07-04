import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import styles from '@/styles/modules/Admin.module.scss';

interface ProjectForm {
    title: string;
    description: string;
    image: string;
    url: string;
    githubUrl: string;
    type: string;
    order: number;
}

const emptyForm: ProjectForm = { title: '', description: '', image: '', url: '', githubUrl: '', type: 'work', order: 0 };

export default function AdminProjects() {
    const projects = useQuery(api.projects.list);
    const createProject = useMutation(api.projects.create);
    const updateProject = useMutation(api.projects.update);
    const removeProject = useMutation(api.projects.remove);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<Id<"projects"> | null>(null);
    const [form, setForm] = useState<ProjectForm>(emptyForm);
    const [saving, setSaving] = useState(false);

    const openCreate = () => {
        setEditingId(null);
        setForm({ ...emptyForm, order: (projects?.length ?? 0) + 1 });
        setShowForm(true);
    };

    const openEdit = (p: any) => {
        setEditingId(p._id);
        setForm({
            title: p.title, description: p.description, image: p.image,
            url: p.url || '', githubUrl: p.githubUrl || '', type: p.type, order: p.order,
        });
        setShowForm(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                title: form.title, description: form.description, image: form.image,
                type: form.type, order: form.order,
                url: form.url || undefined, githubUrl: form.githubUrl || undefined,
            };
            if (editingId) await updateProject({ id: editingId, ...payload });
            else await createProject(payload);
            setShowForm(false);
            setForm(emptyForm);
            setEditingId(null);
        } catch (err) { console.error(err); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id: Id<"projects">) => {
        if (window.confirm('Delete this project?')) await removeProject({ id });
    };

    const sorted = projects?.slice().sort((a, b) => a.order - b.order);

    return (
        <div>
            <div className={styles['c-admin__section-header']}>
                <h2>Projects</h2>
                <button className={styles['c-admin__btn-primary']} onClick={openCreate}>+ New Project</button>
            </div>

            {showForm && (
                <div className={styles['c-admin__modal-overlay']} onClick={() => setShowForm(false)}>
                    <div className={styles['c-admin__modal']} onClick={e => e.stopPropagation()}>
                        <div className={styles['c-admin__modal-header']}>
                            <h3>{editingId ? 'Edit Project' : 'New Project'}</h3>
                            <button onClick={() => setShowForm(false)} className={styles['c-admin__modal-close']}>&times;</button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className={styles['c-admin__form-group']}>
                                <label>Title</label>
                                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                            </div>
                            <div className={styles['c-admin__form-group']}>
                                <label>Description</label>
                                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} required rows={3} />
                            </div>
                            <div className={styles['c-admin__form-group']}>
                                <label>Image URL</label>
                                <input type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})} required />
                            </div>
                            <div className={styles['c-admin__form-group']}>
                                <label>Website URL (optional)</label>
                                <input type="text" value={form.url} onChange={e => setForm({...form, url: e.target.value})} />
                            </div>
                            <div className={styles['c-admin__form-group']}>
                                <label>GitHub URL (optional)</label>
                                <input type="text" value={form.githubUrl} onChange={e => setForm({...form, githubUrl: e.target.value})} />
                            </div>
                            <div className={styles['c-admin__form-row']}>
                                <div className={styles['c-admin__form-group']}>
                                    <label>Type</label>
                                    <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                                        <option value="work">Work</option>
                                        <option value="personal">Personal</option>
                                    </select>
                                </div>
                                <div className={styles['c-admin__form-group']}>
                                    <label>Order</label>
                                    <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)||0})} />
                                </div>
                            </div>
                            <div className={styles['c-admin__modal-actions']}>
                                <button type="button" className={styles['c-admin__btn-secondary']} onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className={styles['c-admin__btn-primary']} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {!projects ? (
                <div className={styles['c-admin__loading']}>Loading...</div>
            ) : sorted && sorted.length === 0 ? (
                <div className={styles['c-admin__empty']}>No projects yet. Create your first one!</div>
            ) : (
                <div className={styles['c-admin__table-wrap']}>
                    <table className={styles['c-admin__table']}>
                        <thead><tr><th>#</th><th>Title</th><th>Type</th><th>URL</th><th>Actions</th></tr></thead>
                        <tbody>
                            {sorted?.map(p => (
                                <tr key={p._id}>
                                    <td>{p.order}</td>
                                    <td>{p.title}</td>
                                    <td><span className={`${styles['c-admin__badge']} ${styles[`c-admin__badge--${p.type}`]}`}>{p.type}</span></td>
                                    <td>{p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" className={styles['c-admin__link']}>{p.url.substring(0, 30)}...</a> : '—'}</td>
                                    <td>
                                        <div className={styles['c-admin__row-actions']}>
                                            <button onClick={() => openEdit(p)} className={styles['c-admin__btn-icon']} title="Edit">&#9998;</button>
                                            <button onClick={() => handleDelete(p._id)} className={`${styles['c-admin__btn-icon']} ${styles['c-admin__btn-danger']}`} title="Delete">&#128465;</button>
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
