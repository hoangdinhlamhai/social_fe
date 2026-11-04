import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Building2 } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './ProfileExperience.module.scss';
import ExperienceModal from '../ExperienceModal';
import { getExperiencesApi, createExperienceApi, updateExperienceApi, deleteExperienceApi } from '~/services/experience.service';

const cx = classNames.bind(styles);
const sortExperiences = (items) => [...items].sort((a, b) =>
    Number(b.current) - Number(a.current) || (b.startDate || '').localeCompare(a.startDate || '') || b.id - a.id);
const monthLabel = (date) => date ? `thg ${Number(date.slice(5, 7))} ${date.slice(0, 4)}` : '';

function ExperienceList({ email }) {
    const { accessToken, accountLogin } = useSelector(state => state.auth);
    const isOwner = Boolean(email && accountLogin?.email === email);
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [error, setError] = useState('');
    const [retry, setRetry] = useState(0);
    const [modal, setModal] = useState(null);
    const [saving, setSaving] = useState(false);
    const busy = useRef(false);
    const mounted = useRef(false);

    useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
    useEffect(() => {
        let active = true;
        setLoading(true); setLoadError(false);
        getExperiencesApi(accessToken, email).then(data => {
            if (active) setExperiences(sortExperiences(data));
        }).catch(() => { if (active) setLoadError(true); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [email, accessToken, retry]);

    const save = async (data) => {
        if (!isOwner || busy.current) return;
        busy.current = true; setSaving(true); setError('');
        try {
            const result = modal.experience
                ? await updateExperienceApi(modal.experience.id, data, accessToken)
                : await createExperienceApi(data, accessToken);
            if (!mounted.current) return;
            setExperiences(prev => sortExperiences([...prev.filter(item => item.id !== result.id), result]));
            setModal(null);
        } catch (err) {
            if (mounted.current) setError('Không lưu được kinh nghiệm. Vui lòng kiểm tra thông tin và thử lại.');
        } finally {
            busy.current = false;
            if (mounted.current) setSaving(false);
        }
    };
    const remove = async (experience) => {
        if (!isOwner || busy.current || !window.confirm(`Xóa kinh nghiệm “${experience.title || experience.companyName}”?`)) return;
        busy.current = true; setSaving(true); setError('');
        try {
            await deleteExperienceApi(experience.id, accessToken);
            if (mounted.current) setExperiences(prev => prev.filter(item => item.id !== experience.id));
        } catch (err) {
            if (mounted.current) setError('Không xóa được kinh nghiệm. Vui lòng thử lại.');
        } finally {
            busy.current = false;
            if (mounted.current) setSaving(false);
        }
    };
    const open = (experience = null) => { setError(''); setModal({ experience }); };

    return (
        <section className={cx('experience-section')} aria-label="Kinh nghiệm">
            <div className={cx('header')}>
                <h2>Kinh nghiệm</h2>
                {isOwner && <button disabled={saving || loading || loadError} onClick={() => open()}>Thêm kinh nghiệm</button>}
            </div>
            {loading ? <p role="status">Đang tải kinh nghiệm...</p> : loadError ? (
                <div role="alert">Không tải được kinh nghiệm. <button onClick={() => setRetry(prev => prev + 1)}>Thử lại</button></div>
            ) : experiences.length === 0 ? <p>Chưa có kinh nghiệm làm việc.</p> : experiences.map(exp => (
                <div key={exp.id} className={cx('experience-item')}>
                    <div className={cx('logo')}><Building2 size={36} aria-hidden="true" /></div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>{exp.title || 'Kinh nghiệm làm việc'}</div>
                        <div className={cx('company')}>{[exp.companyName, exp.employmentType].filter(Boolean).join(' · ')}</div>
                        <div className={cx('time')}>{[monthLabel(exp.startDate), exp.current ? 'Hiện tại' : monthLabel(exp.endDate)].filter(Boolean).join(' - ')}</div>
                        {exp.location && <div className={cx('location')}>{exp.location}</div>}
                        {exp.description && <p className={cx('description')}>{exp.description}</p>}
                        {isOwner && <div className={cx('actions')}>
                            <button aria-label={`Sửa ${exp.title || exp.companyName}`} disabled={saving} onClick={() => open(exp)}>Sửa</button>
                            <button aria-label={`Xóa ${exp.title || exp.companyName}`} disabled={saving} onClick={() => remove(exp)}>Xóa</button>
                        </div>}
                    </div>
                </div>
            ))}
            {error && !modal && <p role="alert" className={cx('error')}>{error}</p>}
            {modal && isOwner && <ExperienceModal isOpen experience={modal.experience} isSaving={saving} error={error}
                onSubmit={save} onRequestClose={() => { if (!busy.current) { setModal(null); setError(''); } }} />}
        </section>
    );
}

function ProfileExperience({ profileData }) {
    const { accessToken } = useSelector(state => state.auth);
    return profileData?.email ? <ExperienceList key={`${profileData.email}:${accessToken}`} email={profileData.email} /> : null;
}
export default ProfileExperience;
