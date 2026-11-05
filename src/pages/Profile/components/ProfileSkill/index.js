import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Sparkles } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from '../ProfileExperience/ProfileExperience.module.scss';
import SkillModal from '../SkillModal';
import { getSkillsApi, createSkillApi, updateSkillApi, deleteSkillApi } from '~/services/skill.service';

const cx = classNames.bind(styles);

function ProfileSkill({ profileData }) {
    const { accessToken, accountLogin } = useSelector(state => state.auth);
    const email = profileData?.email;
    const isOwner = Boolean(email && accountLogin?.email === email);
    const [skills, setSkills] = useState([]);
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
        getSkillsApi(accessToken, email).then(data => {
            if (active) setSkills(data);
        }).catch(() => { if (active) setLoadError(true); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [email, accessToken, retry]);

    const save = async (data) => {
        if (!isOwner || busy.current) return;
        busy.current = true; setSaving(true); setError('');
        try {
            const result = modal.skill
                ? await updateSkillApi(modal.skill.id, data, accessToken)
                : await createSkillApi(data, accessToken);
            if (!mounted.current) return;
            setSkills(prev => [...prev.filter(item => item.id !== result.id), result]);
            setModal(null);
        } catch (err) {
            if (mounted.current) setError('Không lưu được kỹ năng. Vui lòng kiểm tra thông tin và thử lại.');
        } finally {
            busy.current = false;
            if (mounted.current) setSaving(false);
        }
    };
    const remove = async (skill) => {
        if (!isOwner || busy.current || !window.confirm(`Xóa kỹ năng “${skill.skillName}”?`)) return;
        busy.current = true; setSaving(true); setError('');
        try {
            await deleteSkillApi(skill.id, accessToken);
            if (mounted.current) setSkills(prev => prev.filter(item => item.id !== skill.id));
        } catch (err) {
            if (mounted.current) setError('Không xóa được kỹ năng. Vui lòng thử lại.');
        } finally {
            busy.current = false;
            if (mounted.current) setSaving(false);
        }
    };

    return (
        <section className={cx('experience-section')} aria-label="Kỹ năng">
            <div className={cx('header')}>
                <h2>Kỹ năng</h2>
                {isOwner && <button disabled={saving || loading || loadError}
                    onClick={() => { setError(''); setModal({ skill: null }); }}>Thêm kỹ năng</button>}
            </div>
            {loading ? <p role="status">Đang tải kỹ năng...</p> : loadError ? (
                <div role="alert">Không tải được kỹ năng. <button onClick={() => setRetry(value => value + 1)}>Thử lại</button></div>
            ) : skills.length === 0 ? <p>Chưa có kỹ năng.</p> : skills.map(skill => (
                <div key={skill.id} className={cx('experience-item')}>
                    <div className={cx('logo')}><Sparkles size={36} aria-hidden="true" /></div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>{skill.skillName}</div>
                        {skill.skillDescription && <p className={cx('description')}>{skill.skillDescription}</p>}
                        {isOwner && <div className={cx('actions')}>
                            <button disabled={saving} onClick={() => { setError(''); setModal({ skill }); }}>Sửa</button>
                            <button disabled={saving} onClick={() => remove(skill)}>Xóa</button>
                        </div>}
                    </div>
                </div>
            ))}
            {error && !modal && <p role="alert" className={cx('error')}>{error}</p>}
            {modal && isOwner && <SkillModal skill={modal.skill} isSaving={saving} error={error}
                onSubmit={save} onRequestClose={() => { if (!busy.current) { setModal(null); setError(''); } }} />}
        </section>
    );
}

export default ProfileSkill;
