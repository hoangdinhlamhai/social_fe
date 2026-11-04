import { useState } from 'react';
import Modal from 'react-modal';
import MonthYearPicker from '~/components/MonthYearPicker';
import classNames from 'classnames/bind';
import styles from '../ExperienceModal/ExperienceModal.module.scss';

const cx = classNames.bind(styles);

function EducationModal({ education, isSaving, error, onSubmit, onRequestClose }) {
    const [form, setForm] = useState(() => ({
        schoolName: education?.schoolName || '', degree: education?.degree || '',
        fieldOfStudy: education?.fieldOfStudy || '', className: education?.className || '',
        startDate: education?.startDate?.slice(0, 7) || '', endDate: education?.endDate?.slice(0, 7) || '',
        current: education?.current || false, description: education?.description || '',
    }));
    const [validationError, setValidationError] = useState('');
    const now = new Date();
    const maxMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const change = ({ target: { name, value, checked, type } }) => {
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value,
            ...(name === 'current' && checked ? { endDate: '' } : {}) }));
        setValidationError('');
    };
    const submit = (event) => {
        event.preventDefault();
        if (isSaving) return;
        if (!form.schoolName.trim()) { setValidationError('Vui lòng nhập tên trường.'); return; }
        const monthPattern = /^\d{4}-(0[1-9]|1[0-2])$/;
        if (!monthPattern.test(form.startDate) || form.startDate > maxMonth
            || (!form.current && (!monthPattern.test(form.endDate) || form.endDate < form.startDate || form.endDate > maxMonth))) {
            setValidationError('Vui lòng chọn đủ tháng, năm và thời gian học hợp lệ.'); return;
        }
        onSubmit({ ...form, schoolName: form.schoolName.trim(), degree: form.degree.trim(),
            fieldOfStudy: form.fieldOfStudy.trim(), className: form.className.trim(), description: form.description.trim(),
            startDate: `${form.startDate}-01`, endDate: form.current ? null : `${form.endDate}-01` });
    };
    return (
        <Modal isOpen onRequestClose={isSaving ? undefined : onRequestClose}
            shouldCloseOnOverlayClick={!isSaving} shouldCloseOnEsc={!isSaving}
            appElement={document.getElementById('root')} contentLabel={education ? 'Sửa học vấn' : 'Thêm học vấn'}
            className={cx('modal')} overlayClassName={cx('overlay')}>
            <form onSubmit={submit}>
                <div className={cx('header')}>
                    <h2>{education ? 'Sửa học vấn' : 'Thêm học vấn'}</h2>
                    <button type="button" aria-label="Đóng" disabled={isSaving} onClick={onRequestClose}>×</button>
                </div>
                <fieldset disabled={isSaving} className={cx('fields')}>
                    <label htmlFor="education-school">Trường *</label>
                    <input id="education-school" name="schoolName" value={form.schoolName} onChange={change} maxLength={255} required />
                    <label htmlFor="education-degree">Bằng cấp</label>
                    <input id="education-degree" name="degree" value={form.degree} onChange={change} maxLength={255} />
                    <label htmlFor="education-field">Chuyên ngành</label>
                    <input id="education-field" name="fieldOfStudy" value={form.fieldOfStudy} onChange={change} maxLength={255} />
                    <label htmlFor="education-class">Lớp</label>
                    <input id="education-class" name="className" value={form.className} onChange={change} maxLength={255} />
                    <label className={cx('checkbox')}>
                        <input type="checkbox" name="current" checked={form.current} onChange={change} /> Đang học tại đây
                    </label>
                    <label htmlFor="education-start">Bắt đầu *</label>
                    <MonthYearPicker id="education-start" name="startDate" value={form.startDate} onChange={change} max={maxMonth} required />
                    {!form.current && <>
                        <label htmlFor="education-end">Kết thúc *</label>
                        <MonthYearPicker id="education-end" name="endDate" value={form.endDate} onChange={change} max={maxMonth} required />
                    </>}
                    <label htmlFor="education-description">Mô tả</label>
                    <textarea id="education-description" name="description" value={form.description} onChange={change} maxLength={5000} rows={4} />
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
export default EducationModal;
