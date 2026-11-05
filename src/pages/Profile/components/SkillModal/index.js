import { useState } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from '../ExperienceModal/ExperienceModal.module.scss';

const cx = classNames.bind(styles);

function SkillModal({ skill, isSaving, error, onSubmit, onRequestClose }) {
    const [form, setForm] = useState({
        skillName: skill?.skillName || '',
        skillDescription: skill?.skillDescription || '',
    });
    const [validationError, setValidationError] = useState('');
    const change = ({ target: { name, value } }) => {
        setForm(prev => ({ ...prev, [name]: value }));
        setValidationError('');
    };
    const submit = (event) => {
        event.preventDefault();
        if (isSaving) return;
        if (!form.skillName.trim()) {
            setValidationError('Vui lòng nhập tên kỹ năng.');
            return;
        }
        onSubmit({ skillName: form.skillName.trim(), skillDescription: form.skillDescription.trim() });
    };
    return (
        <Modal isOpen onRequestClose={isSaving ? undefined : onRequestClose}
            shouldCloseOnOverlayClick={!isSaving} shouldCloseOnEsc={!isSaving}
            appElement={document.getElementById('root')}
            contentLabel={skill ? 'Sửa kỹ năng' : 'Thêm kỹ năng'}
            className={cx('modal')} overlayClassName={cx('overlay')}>
            <form onSubmit={submit}>
                <div className={cx('header')}>
                    <h2>{skill ? 'Sửa kỹ năng' : 'Thêm kỹ năng'}</h2>
                    <button type="button" aria-label="Đóng" disabled={isSaving} onClick={onRequestClose}>×</button>
                </div>
                <fieldset disabled={isSaving} className={cx('fields')}>
                    <label htmlFor="skill-name">Tên kỹ năng *</label>
                    <input id="skill-name" name="skillName" value={form.skillName}
                        onChange={change} maxLength={255} required />
                    <label htmlFor="skill-description">Mô tả</label>
                    <textarea id="skill-description" name="skillDescription"
                        value={form.skillDescription} onChange={change} maxLength={5000} rows={4} />
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

export default SkillModal;
