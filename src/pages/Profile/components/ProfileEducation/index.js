import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { GraduationCap } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from '../ProfileExperience/ProfileExperience.module.scss';
import EducationModal from '../EducationModal';
import { getEducationsApi, createEducationApi, updateEducationApi, deleteEducationApi } from '~/services/education.service';

const cx = classNames.bind(styles);
const sortEducations = (items) => [...items].sort((a, b) =>
    Number(b.current) - Number(a.current) || (b.startDate || '').localeCompare(a.startDate || '') || b.id - a.id);
const monthLabel = (date) => date ? `thg ${Number(date.slice(5, 7))} ${date.slice(0, 4)}` : '';

function EducationList({ email }) {
    const { accessToken, accountLogin } = useSelector(state => state.auth);
    const isOwner = Boolean(email && accountLogin?.email === email);
    const [educations, setEducations] = useState([]);
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
        getEducationsApi(accessToken, email).then(data => {
            if (active) setEducations(sortEducations(data));
        }).catch(() => { if (active) setLoadError(true); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [email, accessToken, retry]);

    const save = async (data) => {
        if (!isOwner || busy.current) return;
        busy.current = true; setSaving(true); setError('');
        try {
            const result = modal.education
                ? await updateEducationApi(modal.education.id, data, accessToken)
                : await createEducationApi(data, accessToken);
            if (!mounted.current) return;
            setEducations(prev => sortEducations([...prev.filter(item => item.id !== result.id), result]));
            setModal(null);
        } catch (err) {
            if (mounted.current) setError('Không lưu được học vấn. Vui lòng kiểm tra thông tin và thử lại.');
        } finally {
            busy.current = false;
            if (mounted.current) setSaving(false);
        }
    };
    const remove = async (education) => {
        if (!isOwner || busy.current || !window.confirm(`Xóa học vấn tại “${education.schoolName}”?`)) return;
        busy.current = true; setSaving(true); setError('');
        try {
            await deleteEducationApi(education.id, accessToken);
            if (mounted.current) setEducations(prev => prev.filter(item => item.id !== education.id));
        } catch (err) {
            if (mounted.current) setError('Không xóa được học vấn. Vui lòng thử lại.');
        } finally {
            busy.current = false;
            if (mounted.current) setSaving(false);
        }
    };
    const open = (education = null) => { setError(''); setModal({ education }); };

    return (
        <section className={cx('experience-section')} aria-label="Học vấn">
            <div className={cx('header')}>
                <h2>Trình độ học vấn</h2>
                {isOwner && <button disabled={saving || loading || loadError} onClick={() => open()}>Thêm học vấn</button>}
            </div>
            {loading ? <p role="status">Đang tải học vấn...</p> : loadError ? (
                <div role="alert">Không tải được học vấn. <button onClick={() => setRetry(prev => prev + 1)}>Thử lại</button></div>
            ) : educations.length === 0 ? <p>Chưa có thông tin học vấn.</p> : educations.map(education => (
                <div key={education.id} className={cx('experience-item')}>
                    <div className={cx('logo')}><GraduationCap size={36} aria-hidden="true" /></div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>{education.schoolName}</div>
                        <div className={cx('company')}>{[education.degree, education.fieldOfStudy].filter(Boolean).join(' · ')}</div>
                        <div className={cx('time')}>{[monthLabel(education.startDate), education.current ? 'Hiện tại' : monthLabel(education.endDate)].filter(Boolean).join(' - ')}</div>
                        {education.className && <div className={cx('location')}>Lớp: {education.className}</div>}
                        {education.description && <p className={cx('description')}>{education.description}</p>}
                        {isOwner && <div className={cx('actions')}>
                            <button aria-label={`Sửa học vấn ${education.schoolName}`} disabled={saving} onClick={() => open(education)}>Sửa</button>
                            <button aria-label={`Xóa học vấn ${education.schoolName}`} disabled={saving} onClick={() => remove(education)}>Xóa</button>
                        </div>}
                    </div>
                </div>
            ))}
            {error && !modal && <p role="alert" className={cx('error')}>{error}</p>}
            {modal && isOwner && <EducationModal education={modal.education} isSaving={saving} error={error}
                onSubmit={save} onRequestClose={() => { if (!busy.current) { setModal(null); setError(''); } }} />}
        </section>
    );
}

function ProfileEducation({ profileData }) {
    const { accessToken } = useSelector(state => state.auth);
    return profileData?.email ? <EducationList key={`${profileData.email}:${accessToken}`} email={profileData.email} /> : null;
}
export default ProfileEducation;
