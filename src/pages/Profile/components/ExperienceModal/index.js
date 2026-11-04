import { useState } from 'react';
import Modal from 'react-modal';
import MonthYearPicker from '~/components/MonthYearPicker';
import classNames from 'classnames/bind';
import styles from './ExperienceModal.module.scss';

const cx = classNames.bind(styles);

function ExperienceModal({ isOpen, experience, isSaving, error, onSubmit, onRequestClose }) {
    const [form, setForm] = useState(() => ({
        title: experience?.title || '', companyName: experience?.companyName || '',
        employmentType: experience?.employmentType || '', location: experience?.location || '',
        startDate: experience?.startDate?.slice(0, 7) || '', endDate: experience?.endDate?.slice(0, 7) || '',
        current: experience?.current || false, description: experience?.description || '',
    }));
    const [validationError, setValidationError] = useState('');
    const now = new Date();
    const maxMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const change = (event) => {
        const { name, value, checked, type } = event.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value,
            ...(name === 'current' && checked ? { endDate: '' } : {}) }));
        setValidationError('');
    };
    const submit = (event) => {
        event.preventDefault();
        if (isSaving) return;
        if (!form.title.trim() || !form.companyName.trim() || !form.startDate) {
            setValidationError('Vui lòng nhập chức danh, công ty và thời gian bắt đầu.'); return;
        }
        if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(form.startDate) || form.startDate > maxMonth || (!form.current && (!/^\d{4}-(0[1-9]|1[0-2])$/.test(form.endDate) || form.endDate < form.startDate || form.endDate > maxMonth))) {
            setValidationError('Thời gian làm việc không hợp lệ.'); return;
        }
        onSubmit({ ...form, title: form.title.trim(), companyName: form.companyName.trim(),
            employmentType: form.employmentType.trim(), location: form.location.trim(), description: form.description.trim(),
            startDate: `${form.startDate}-01`, endDate: form.current ? null : `${form.endDate}-01` });
    };
    return (
        <Modal isOpen={isOpen} onRequestClose={isSaving ? undefined : onRequestClose}
            shouldCloseOnOverlayClick={!isSaving} shouldCloseOnEsc={!isSaving}
            appElement={document.getElementById('root')} contentLabel={experience ? 'Sửa kinh nghiệm' : 'Thêm kinh nghiệm'}
            className={cx('modal')} overlayClassName={cx('overlay')}>
            <form onSubmit={submit}>
                <div className={cx('header')}>
                    <h2>{experience ? 'Sửa kinh nghiệm' : 'Thêm kinh nghiệm'}</h2>
                    <button type="button" aria-label="Đóng" disabled={isSaving} onClick={onRequestClose}>×</button>
                </div>
                <fieldset disabled={isSaving} className={cx('fields')}>
                    <label htmlFor="experience-title">Chức danh *</label>
                    <input id="experience-title" name="title" value={form.title} onChange={change} maxLength={255} required />
                    <label htmlFor="experience-company">Công ty *</label>
                    <input id="experience-company" name="companyName" value={form.companyName} onChange={change} maxLength={255} required />
                    <label htmlFor="experience-type">Loại hình công việc</label>
                    <input id="experience-type" name="employmentType" value={form.employmentType} onChange={change} maxLength={255} placeholder="Ví dụ: Toàn thời gian, Thực tập" />
                    <label htmlFor="experience-location">Địa điểm</label>
                    <input id="experience-location" name="location" value={form.location} onChange={change} maxLength={255} />
                    <label className={cx('checkbox')}>
                        <input type="checkbox" name="current" checked={form.current} onChange={change} /> Đang làm việc tại đây
                    </label>
                    <label htmlFor="experience-start">Bắt đầu *</label>
                    <MonthYearPicker id="experience-start" name="startDate" value={form.startDate} onChange={change} max={maxMonth} required />
                    {!form.current && <>
                        <label htmlFor="experience-end">Kết thúc *</label>
                        <MonthYearPicker id="experience-end" name="endDate" value={form.endDate} onChange={change} max={maxMonth} required />
                    </>}
                    <label htmlFor="experience-description">Mô tả</label>
                    <textarea id="experience-description" name="description" value={form.description} onChange={change} maxLength={5000} rows={4} />
                </fieldset>
                {(validationError || error) && <p role="alert" className={cx('error')}>{validationError || error}</p>}
                <div className={cx('footer')}>
                    <button type="button" disabled={isSaving} onClick={onRequestClose}>Hủy</button>
                    <button type="submit" disabled={isSaving}>{isSaving ? 'Đang lưu...' : 'Lưu'}</button>
                </div>
            </form>
        </Modal>
    );
}
export default ExperienceModal;
